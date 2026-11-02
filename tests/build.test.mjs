import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const root = resolve('dist');
function walk(path) {
  return readdirSync(path, {withFileTypes:true}).flatMap((entry) => entry.isDirectory() ? walk(join(path,entry.name)) : [join(path,entry.name)]);
}
const pages = walk(root).filter((file) => file.endsWith('.html'));

test('built page links and media point to existing local files', () => {
  const missing = new Set();
  for (const page of pages) {
    const html = readFileSync(page,'utf8');
    for (const match of html.matchAll(/\b(?:src|href|poster)="(\/[^"\s]*)"/g)) {
      if (match[1].startsWith('//')) continue;
      const path = decodeURIComponent(new URL(match[1],'https://www.kuadron.com').pathname);
      let target = join(root,path);
      if (existsSync(target) && statSync(target).isDirectory()) target = join(target,'index.html');
      if (!existsSync(target)) missing.add(`${page}: ${match[1]}`);
    }
  }
  assert.deepEqual([...missing],[]);
});

test('each built page has one title, one main heading and valid structured data', () => {
  assert.ok(pages.length >= 93, 'Existing pages must remain available');
  for (const page of pages) {
    const html = readFileSync(page,'utf8');
    assert.equal([...html.matchAll(/<title>/g)].length,1,page);
    assert.equal([...html.matchAll(/<h1\b/g)].length,1,page);
    for (const json of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(json[1]);
    assert.doesNotMatch(html,/<script[^>]+src="https:\/\/www.googletagmanager.com/,page);
  }
});

test('English home emits the Turkish and English alternates', () => {
  const html = readFileSync(join(root,'en/index.html'),'utf8');
  assert.match(html,/hreflang="tr" href="https:\/\/www.kuadron.com\/"/);
  assert.match(html,/hreflang="en" href="https:\/\/www.kuadron.com\/en\/"/);
});

test('sitemap pairs translated service paths rather than assuming equal slugs', () => {
  const xml = readFileSync(join(root,'sitemap-0.xml'),'utf8');
  const entry = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].find((entry) => entry[1].includes('<loc>https://www.kuadron.com/yazilim-gelistirme/</loc>'))?.[1];
  assert.ok(entry);
  assert.match(entry,/hreflang="tr" href="https:\/\/www.kuadron.com\/yazilim-gelistirme\/"/);
  assert.match(entry,/hreflang="en" href="https:\/\/www.kuadron.com\/en\/software-development\/"/);
});


test('every sitemap URL equals its page canonical and all language links are canonical', () => {
  const xml = readFileSync(join(root,'sitemap-0.xml'),'utf8');
  for (const match of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const url = new URL(match[1]);
    const path = join(root,decodeURIComponent(url.pathname),'index.html');
    const html = readFileSync(path,'utf8');
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(canonical,url.href,path);
  }
  for (const page of pages) {
    const html = readFileSync(page,'utf8');
    for (const match of html.matchAll(/<link rel="alternate" hreflang="[^"]+" href="([^"]+)"/g)) {
      const url = new URL(match[1]);
      const target = join(root,decodeURIComponent(url.pathname),'index.html');
      const canonical = readFileSync(target,'utf8').match(/<link rel="canonical" href="([^"]+)"/)?.[1];
      assert.equal(canonical,url.href,page);
    }
  }
});

test('rendered phone patterns compile in Unicode sets mode and reject letters', () => {
  const html = readFileSync(join(root,'index.html'),'utf8');
  const pattern = html.match(/type="tel"[^>]*pattern="([^"]+)"/)?.[1];
  assert.ok(pattern);
  const regexp = new RegExp(`^(?:${pattern})$`,'v');
  assert.equal(regexp.test('abc'),false);
  assert.equal(regexp.test('+90 (312) 503 20 51'),true);
  assert.equal(regexp.test('03125032051'),true);
});

test('both home pages keep the Kuadron message and show the expanded product portfolio', () => {
  const reference = JSON.parse(readFileSync(new URL('./fixtures/corporate-copy.json', import.meta.url),'utf8'));
  for (const [path,lang,contact] of [['index.html','tr','/#iletisim'],['en/index.html','en','/en/#contact-us']]) {
    const html = readFileSync(join(root,path),'utf8');
    const hero = html.match(/<section class="home-hero"[\s\S]*?<\/section>/)?.[0];
    assert.ok(hero,path);
    for (const key of ['heroTitleLine1','heroTitleHighlight','heroSubtitle']) {
      assert.ok(hero.includes(reference[lang].home[key]),`${path}: ${key}`);
    }
    assert.ok(hero.includes(`href="${contact}"`),path);
    assert.doesNotMatch(hero,/ERP verinize sorun|Ask your ERP data|data-featured-product=/,path);
    const portfolio = [...hero.matchAll(/data-portfolio-product="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(portfolio,['ozbi','strife','tork','reportql'],path);
    const ids = [...html.matchAll(/<article\b[^>]*data-product="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(ids,['ozbi','strife','tork','reportql'],path);
    assert.ok(html.includes(reference[lang].home.pillarsTitle),path);
    for (const pillar of reference[lang].home.pillars) assert.ok(html.includes(pillar.description),path);
  }
});

test('product pages use the same OzBI and Strife records and keep Strife enquiries on Kuadron', () => {
  for (const [path,contact] of [
    ['urun-gelistirme-ve-pazarlama/index.html','/#iletisim'],
    ['en/product-development-and-marketing/index.html','/en/#contact-us'],
  ]) {
    const html = readFileSync(join(root,path),'utf8');
    const ids = [...html.matchAll(/<article\b[^>]*data-product="([^"]+)"/g)].map((match) => match[1]);
    assert.deepEqual(ids,['ozbi','strife','tork','reportql','kys'],path);
    const strife = html.match(/<article\b[^>]*data-product="strife"[\s\S]*?<\/article>/)?.[0];
    assert.ok(strife,path);
    assert.ok(strife.includes(`href="${contact}"`),path);
    assert.match(strife,/strife-tournament\.png/,path);
    assert.doesNotMatch(strife,/Front Runner|front-runner|https?:\/\/(?:www\.)?strife\.com/,path);
  }
});

test('home services renders all 11 capabilities across 3 grouped architectural columns', () => {
  const reference = JSON.parse(readFileSync(new URL('./fixtures/corporate-copy.json', import.meta.url),'utf8'));
  for (const [path,lang] of [['index.html','tr'],['en/index.html','en']]) {
    const html = readFileSync(join(root,path),'utf8');
    const services = html.match(/<section id="cozumler"[\s\S]*?<\/section>/)?.[0];
    assert.ok(services,path);
    assert.doesNotMatch(services,/capability-list/,path);
    assert.equal([...services.matchAll(/class="capability-group"/g)].length,3,path);
    assert.equal([...services.matchAll(/class="capability-item"/g)].length,reference[lang].home.serviceList.length,path);
    for (const service of reference[lang].home.serviceList) {
      const esc = (text) => text.replaceAll('&', '&amp;');
      assert.ok(services.includes(esc(service.category)),`${path}: ${service.category}`);
      assert.ok(services.includes(esc(service.title)),`${path}: ${service.title}`);
    }
  }
});
