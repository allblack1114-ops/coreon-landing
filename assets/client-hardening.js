(() => {
  'use strict';

  const block = (event) => {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };

  // Deterrence only: browser-delivered code cannot be made fully inaccessible.
  document.addEventListener('contextmenu', block, { capture: true });
  document.addEventListener('dragstart', (event) => {
    if (event.target && event.target.tagName === 'IMG') block(event);
  }, { capture: true });

  document.addEventListener('keydown', (event) => {
    const key = String(event.key || '').toLowerCase();
    const ctrlOrMeta = event.ctrlKey || event.metaKey;
    const devShortcut =
      key === 'f12' ||
      (ctrlOrMeta && event.shiftKey && ['i', 'j', 'c'].includes(key)) ||
      (ctrlOrMeta && ['u', 's'].includes(key));

    if (devShortcut) block(event);
  }, { capture: true });
})();
