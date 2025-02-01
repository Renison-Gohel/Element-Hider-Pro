document.addEventListener('DOMContentLoaded', async () => {
  const dialog = document.getElementById('dialog');
  const xpathInput = document.getElementById('xpathInput');
  
  // Default XPaths
  const defaultXPaths = [
    {
      name: 'Video Title',
      expression: '//ytd-watch-metadata//div[@id="title"]//yt-formatted-string',
      enabled: false,
      default: true
    },
    {
      name: 'Top Bar',
      expression: '//div[contains(@class, "ytp-chrome-top")]',
      enabled: false,
      default: true
    },
    {
      name: 'Owner Details',
      expression: '//ytd-video-owner-renderer',
      enabled: false,
      default: true
    }
  ];

  // Load or initialize storage
  let { xpaths = [] } = await chrome.storage.local.get('xpaths');
  if (xpaths.length === 0) {
    xpaths = defaultXPaths;
    await chrome.storage.local.set({ xpaths });
  }

  // Update render function
  function renderXPathList(items) {
    const container = document.getElementById('xpathList');
    container.innerHTML = items.map((item, index) => `
      <div class="xpath-item">
        <div class="xpath-content">
          <div class="xpath-name">${item.name}</div>
          <div class="xpath-expression">${item.expression}</div>
        </div>
        <label class="switch">
          <input type="checkbox" ${item.enabled ? 'checked' : ''} 
                 data-index="${index}">
          <span class="slider"></span>
        </label>
        ${item.default ? '' : `
          <button class="btn text" data-index="${index}">
            <i class="material-icons">delete</i>
          </button>
        `}
      </div>
    `).join('');

    // Add event listeners
    document.querySelectorAll('.switch input').forEach(checkbox => {
      checkbox.addEventListener('change', toggleXPathState);
    });

    document.querySelectorAll('.btn.text').forEach(button => {
      button.addEventListener('click', deleteXPath);
    });
  }

  // Event handlers
  document.getElementById('addXpath').addEventListener('click', () => {
    dialog.showModal();
    xpathInput.focus();
  });

  document.getElementById('cancelBtn').addEventListener('click', () => {
    dialog.close();
    xpathInput.value = '';
  });

  document.getElementById('saveBtn').addEventListener('click', async () => {
    const name = ruleName.value.trim() || 'Custom Rule';
    const expression = xpathInput.value.trim();
    
    if (expression) {
      xpaths = [...xpaths, { 
        name,
        expression, 
        enabled: true 
      }];
      await chrome.storage.local.set({ xpaths });
      renderXPathList(xpaths);
      dialog.close();
      ruleName.value = '';
      xpathInput.value = '';
    }
  });

  async function toggleXPathState(e) {
    const index = e.target.dataset.index;
    xpaths[index].enabled = e.target.checked;
    await chrome.storage.local.set({ xpaths });
    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: 'toggleXPath',
        xpath: xpaths[index].expression,
        state: e.target.checked
      });
    });
  }

  async function deleteXPath(e) {
    const index = e.target.closest('button').dataset.index;
    xpaths = xpaths.filter((_, i) => i !== parseInt(index));
    await chrome.storage.local.set({ xpaths });
    renderXPathList(xpaths);
  }

  // Initial render
  renderXPathList(xpaths);
});