type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
const touched = new WeakSet<Field>();

function isField(target: EventTarget | null): target is Field {
  return (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement)
    && target.classList.contains('k-input');
}

function updateField(field: Field) {
  const invalid = !field.validity.valid;
  field.classList.toggle('user-invalid-fallback', invalid);
  field.classList.toggle('user-valid-fallback', !invalid && field.value !== '');
  field.setAttribute('aria-invalid', String(invalid));

  const errorId = field.getAttribute('aria-errormessage');
  if (!errorId) return;
  const descriptions = new Set((field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean));
  if (invalid) descriptions.add(errorId);
  else descriptions.delete(errorId);
  if (descriptions.size) field.setAttribute('aria-describedby', [...descriptions].join(' '));
  else field.removeAttribute('aria-describedby');
}

// Show errors after blur or a submit attempt. Recheck an edited field after that.
document.addEventListener('blur', (event) => {
  if (!isField(event.target)) return;
  touched.add(event.target);
  updateField(event.target);
}, true);

document.addEventListener('input', (event) => {
  if (isField(event.target) && touched.has(event.target)) updateField(event.target);
});

document.addEventListener('change', (event) => {
  if (isField(event.target) && touched.has(event.target)) updateField(event.target);
});

document.addEventListener('invalid', (event) => {
  if (!isField(event.target)) return;
  touched.add(event.target);
  updateField(event.target);
}, true);

// Reset both the visual state and screen reader state on every browser.
document.addEventListener('reset', (event) => {
  if (!(event.target instanceof HTMLFormElement)) return;
  Array.from(event.target.elements).forEach((field) => {
    if (!isField(field)) return;
    touched.delete(field);
    field.classList.remove('user-invalid-fallback', 'user-valid-fallback');
    field.removeAttribute('aria-invalid');
    const errorId = field.getAttribute('aria-errormessage');
    const descriptions = (field.getAttribute('aria-describedby') || '').split(/\s+/)
      .filter((id) => id && id !== errorId);
    if (descriptions.length) field.setAttribute('aria-describedby', descriptions.join(' '));
    else field.removeAttribute('aria-describedby');
  });
}, true);

export {};
