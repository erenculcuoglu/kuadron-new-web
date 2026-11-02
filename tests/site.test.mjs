import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import ts from 'typescript';

function execute(file, context) {
  const { outputText } = ts.transpileModule(readFileSync(new URL(file, import.meta.url), 'utf8'), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  });
  const exports = {};
  runInNewContext(outputText, { ...context, exports });
  return exports;
}
const { ROUTE_PAIRS, getAlternateUrl, hasBilingualAlternate, canonicalPath } = execute('../src/config/routes.ts', {});
function classes() {
  const values = new Set(['hidden']);
  return { add: (...items) => items.forEach((item) => values.add(item)), remove: (...items) => items.forEach((item) => values.delete(item)), contains: (item) => values.has(item), toggle: (item, force) => force ? values.add(item) : values.delete(item) };
}
function formHarness({ endpoint = '', newsletter = false, fetch = async () => ({ok:true}), valid = true, data = { email: 'test@example.com', message: 'Test & check' }, fallbackText = '' } = {}) {
  const attributes = {};
  const feedback = { textContent: '', dataset: {}, classList: classes(), setAttribute: (key, value) => { attributes[key] = value; } };
  const button = { disabled: false };
  const label = { textContent: 'Submit' };
  let submit;
  let resets = 0;
  const form = {
    dataset: { endpoint, fallbackText, isNewsletter: String(newsletter), successText: 'Received', fallbackEmail: 'info@kuadron.com' },
    reportValidity: () => valid,
    querySelector: (selector) => selector === '[data-form-feedback]' ? feedback : selector === '[data-submit-label]' ? label : button,
    addEventListener: (_, handler) => { submit = handler; },
    setAttribute() {}, removeAttribute() {}, reset() { resets++; },
  };
  const window = { location: { href: '' } };
  execute('../src/scripts/forms.ts', {
    document: { documentElement: {lang:'en'}, querySelectorAll: () => [form] },
    window, fetch, AbortSignal,
    FormData: class { get(key) { return data[key]; } forEach(callback) { Object.entries(data).forEach(([key, value]) => callback(value, key)); } },
  });
  return { feedback, attributes, button, label, window, submit: () => submit({ preventDefault() {} }), resets: () => resets };
}

test('all language pairs resolve with or without a trailing slash', () => {
  for (const route of ROUTE_PAIRS) {
    for (const value of [route.tr, route.en]) {
      for (const path of [value, value.replace(/\/+$/, '') || '/']) {
        assert.equal(hasBilingualAlternate(path), true, path);
        assert.equal(getAlternateUrl(path, 'tr'), route.tr, path);
        assert.equal(getAlternateUrl(path, 'en'), route.en, path);
      }
    }
  }
  assert.equal(hasBilingualAlternate('/blog/crm-ne-saglar'), false);
  assert.equal(hasBilingualAlternate('/missing'), false);
});

test('an unconfigured newsletter never reports a saved address', async () => {
  const h = formHarness({newsletter:true});
  await h.submit();
  assert.equal(h.resets(), 0);
  assert.equal(h.feedback.dataset.state, 'notice');
  assert.match(h.feedback.textContent, /not saved/);
});

test('email fallback prepares a draft and does not claim delivery', async () => {
  const h = formHarness();
  await h.submit();
  assert.match(h.window.location.href, /^mailto:info@kuadron.com\?/);
  assert.match(decodeURIComponent(h.window.location.href), /Test & check/);
  assert.match(h.feedback.textContent, /has not sent/);
  assert.equal(h.resets(), 0);
});

test('successful API submissions clear the form only after a 2xx response', async () => {
  let request;
  const h = formHarness({ endpoint:'/submit', fetch: async (url, options) => { request = {url, ...options}; return {ok:true}; } });
  await h.submit();
  assert.equal(request.url, '/submit');
  assert.equal(request.method, 'POST');
  assert.equal(h.resets(), 1);
  assert.equal(h.feedback.dataset.state, 'success');
  assert.equal(h.button.disabled, false);
});

test('HTTP and connection errors preserve entries and allow retry', async () => {
  for (const fetch of [async () => ({ok:false}), async () => { throw new Error('offline'); }]) {
    const h = formHarness({ endpoint:'/submit', fetch });
    await h.submit();
    assert.equal(h.resets(), 0);
    assert.equal(h.feedback.dataset.state, 'error');
    assert.equal(h.attributes.role, 'alert');
    assert.equal(h.attributes['aria-live'], 'assertive');
    assert.equal(h.button.disabled, false);
    assert.equal(h.label.textContent, 'Submit');
  }
});

test('invalid input and honeypot data never reach the endpoint', async () => {
  let calls = 0;
  for (const options of [{valid:false}, {data:{_gotcha:'bot'}}]) {
    const h = formHarness({ endpoint:'/submit', fetch: async () => { calls++; return {ok:true}; }, ...options });
    await h.submit();
    assert.equal(h.resets(), 0);
  }
  assert.equal(calls, 0);
});

test('a second submit cannot send the same pending request again', async () => {
  let complete;
  let calls = 0;
  const h = formHarness({ endpoint:'/submit', fetch: () => { calls++; return new Promise((resolve) => { complete = resolve; }); } });
  const pending = h.submit();
  await h.submit();
  assert.equal(calls, 1);
  assert.equal(h.button.disabled, true);
  complete({ok:true});
  await pending;
  assert.equal(h.button.disabled, false);
});

function consentHarness({ saved = null, id = 'G-TEST123', storageError = false } = {}) {
  const handlers = {};
  const scripts = [];
  let reloads = 0;
  const banner = {
    dataset: {analyticsId:id}, classList:classes(),
    querySelector: (selector) => ({ addEventListener: (_, handler) => { handlers[selector] = handler; } }),
  };
  execute('../src/scripts/consent.ts', {
    document: { getElementById: () => banner, querySelectorAll: () => [], createElement: () => ({}), head: { append: (script) => scripts.push(script) } },
    window: { location: { reload: () => { reloads++; } }, addEventListener() {} },
    localStorage: { getItem: () => { if (storageError) throw new Error('blocked'); return saved; }, setItem() { if (storageError) throw new Error('blocked'); } },
    encodeURIComponent,
  });
  return { banner, scripts, handlers, reloads: () => reloads };
}

test('analytics loads only after explicit consent', () => {
  const h = consentHarness();
  assert.equal(h.scripts.length, 0);
  assert.equal(h.banner.classList.contains('hidden'), false);
  h.handlers['[data-cookie-accept]']();
  h.handlers['[data-cookie-accept]']();
  assert.equal(h.scripts.length, 1);
  h.handlers['[data-cookie-reject]']();
  assert.equal(h.reloads(), 1);
});

test('saved rejection and missing analytics settings never load tracking', () => {
  for (const options of [{saved:'rejected'}, {id:''}, {id:'invalid'}]) {
    const h = consentHarness(options);
    assert.equal(h.scripts.length, 0);
    assert.equal(h.banner.classList.contains('hidden'), true);
  }
  assert.equal(consentHarness({saved:'accepted'}).scripts.length, 1);
});

test('blocked browser storage does not load tracking or break the controls', () => {
  const h = consentHarness({storageError:true});
  assert.equal(h.scripts.length, 0);
  h.handlers['[data-cookie-reject]']();
  assert.equal(h.banner.classList.contains('hidden'), true);
});


test('canonical paths stay the same for slash and slashless input', () => {
  for (const path of ['/', '/en/', '/hakkimizda/', '/blog/crm-ne-saglar/']) {
    assert.equal(canonicalPath(path), path);
    assert.equal(canonicalPath(path.replace(/\/+$/, '') || '/'), path);
  }
  assert.equal(canonicalPath('/404.html'), '/404.html');
});

test('application fallback keeps its specific instructions', async () => {
  const h = formHarness({fallbackText:'Not sent. Open the application form below.'});
  await h.submit();
  assert.equal(h.feedback.textContent,'Not sent. Open the application form below.');
  assert.equal(h.attributes.role,'status');
});

function validationHarness() {
  const handlers = {};
  class Field {
    constructor() {
      this.value = '';
      this.validity = {valid:false};
      this.classList = classes();
      this.classList.add('k-input');
      this.attributes = {'aria-errormessage':'field-error','aria-describedby':'field-hint'};
    }
    setAttribute(key, value) { this.attributes[key] = value; }
    getAttribute(key) { return this.attributes[key] ?? null; }
    removeAttribute(key) { delete this.attributes[key]; }
  }
  class Form { constructor(elements) { this.elements = elements; } }
  execute('../src/scripts/validation.ts', {
    document: {addEventListener: (name, handler) => { handlers[name] = handler; }},
    HTMLInputElement:Field, HTMLTextAreaElement:Field, HTMLSelectElement:Field, HTMLFormElement:Form,
  });
  const field = new Field();
  return {field, emit: (name) => handlers[name]({target:name === 'reset' ? new Form([field]) : field})};
}

test('validation waits for interaction and preserves existing hint descriptions', () => {
  const h = validationHarness();
  h.emit('input');
  assert.equal(h.field.getAttribute('aria-invalid'),null);
  h.emit('blur');
  assert.equal(h.field.getAttribute('aria-invalid'),'true');
  assert.equal(h.field.getAttribute('aria-describedby'),'field-hint field-error');
  h.field.value = 'valid';
  h.field.validity.valid = true;
  h.emit('input');
  assert.equal(h.field.getAttribute('aria-invalid'),'false');
  assert.equal(h.field.getAttribute('aria-describedby'),'field-hint');
});

test('submit errors are shown and reset removes old accessibility state', () => {
  const h = validationHarness();
  h.emit('invalid');
  assert.equal(h.field.classList.contains('user-invalid-fallback'),true);
  h.emit('reset');
  assert.equal(h.field.getAttribute('aria-invalid'),null);
  assert.equal(h.field.getAttribute('aria-describedby'),'field-hint');
  assert.equal(h.field.classList.contains('user-invalid-fallback'),false);
  h.emit('input');
  assert.equal(h.field.getAttribute('aria-invalid'),null);
});


test('original corporate copy and existing product descriptions remain unchanged', () => {
  const reference = JSON.parse(readFileSync(new URL('./fixtures/corporate-copy.json', import.meta.url),'utf8'));
  const content = JSON.parse(JSON.stringify(execute('../src/data/site-content.ts', {}).SITE_CONTENT));
  for (const lang of ['tr','en']) {
    assert.deepEqual(content[lang].home,reference[lang].home,`${lang} corporate home copy`);
    for (const original of reference[lang].existingProducts) {
      const current = content[lang].products.find((product) => product.id === original.id);
      assert.ok(current,original.id);
      for (const [key,value] of Object.entries(original)) assert.deepEqual(current[key],value,`${lang} ${original.id} ${key}`);
    }
  }
});
