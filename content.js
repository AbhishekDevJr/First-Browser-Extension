console.log('Content script loaded.');

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message);

  if (message.action === "clearStorage") {
    // Clear local storage
    localStorage.clear();

    // Clear session storage
    sessionStorage.clear();

    console.log('Local and session storage cleared');
    sendResponse({ status: "Local and session storage cleared" });
  } else {
    console.log('Unknown message action:', message.action);
  }
});
