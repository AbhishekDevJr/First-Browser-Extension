chrome.action.onClicked.addListener((tab) => {
    const url = new URL(tab.url);
    const domain = url.hostname;
  
    console.log('Clicked on extension icon.');
    console.log('Current tab URL:', tab.url);
  
    // Avoid running on chrome:// URLs
    if (url.protocol === 'chrome:') {
      console.error('Cannot run script on chrome:// URLs');
      return;
    }
  
    console.log('Clearing cookies for domain:', domain);
  
    // Clear cookies
    chrome.cookies.getAll({ domain: domain }, (cookies) => {
      for (let cookie of cookies) {
        chrome.cookies.remove({
          url: "https://" + domain + cookie.path,
          name: cookie.name
        });
      }
      console.log('Cookies cleared.');
    });
  
    // Inject content script to clear local and session storage
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error('Error injecting script:', chrome.runtime.lastError);
        return;
      }
  
      console.log('Script injected:', results);
  
      chrome.tabs.sendMessage(tab.id, { action: "clearStorage" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message to content script:', chrome.runtime.lastError);
          return;
        }
  
        console.log('Message response:', response);
        if (response && response.status === "Local and session storage cleared") {
          console.log('Storage cleared successfully, showing success popup.');
          // Show success popup
          chrome.action.setPopup({ popup: 'success.html' });
          chrome.action.openPopup();
        } else {
          console.error('Unexpected response:', response);
        }
      });
    });
  });
  