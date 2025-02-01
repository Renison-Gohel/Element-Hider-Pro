// content.js

const elementState = new Map();

function processXPath(xpath, state) {
  const elements = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );

  for (let i = 0; i < elements.snapshotLength; i++) {
    const el = elements.snapshotItem(i);
    if (state) {
      if (!elementState.has(el)) {
        elementState.set(el, el.style.display);
      }
      el.style.display = 'none';
    } else if (elementState.has(el)) {
      el.style.display = elementState.get(el);
      elementState.delete(el);
    }
  }
}

const observer = new MutationObserver(() => {
  chrome.storage.local.get('xpaths', ({ xpaths = [] }) => {
    xpaths.forEach(({ expression, enabled }) => {
      if (enabled) processXPath(expression, true);
    });
  });
});

chrome.storage.local.get('xpaths', ({ xpaths = [] }) => {
  xpaths.forEach(({ expression, enabled }) => {
    if (enabled) processXPath(expression, true);
  });
  observer.observe(document, { subtree: true, childList: true });
});

chrome.runtime.onMessage.addListener(({ action, xpath, state, xpaths }) => {
  switch(action) {
    case 'toggleXPath':
      processXPath(xpath, state);
      break;
    case 'updateXPaths':
      xpaths.forEach(({ expression, enabled }) => 
        processXPath(expression, enabled)
      );
      break;
    case 'removeXPath':
      processXPath(xpath, false);
      break;
  }
});