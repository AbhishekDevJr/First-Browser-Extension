document.addEventListener('DOMContentLoaded', () => {
    const clearDataButton = document.getElementById('button-30');
    const contentDiv = document.getElementById('content');
    if (clearDataButton) {
        clearDataButton.addEventListener('click', () => {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tab = tabs[0];
                if (tab && tab.url) {
                    const url = new URL(tab.url);
                    const origin = url.origin;

                    const removalOptions = {
                        origins: [origin]
                    };

                    const dataTypes = {
                        cookies: true,
                        localStorage: true,
                        cache: true,
                        indexedDB: true,
                        serviceWorkers: true,
                        webSQL: true
                    };

                    chrome.browsingData.remove(removalOptions, dataTypes, () => {
                        console.log(`Cleared data for ${origin}`);
                        contentDiv.innerHTML = '<p>Site data cleared successfully!</p>';
                        // chrome.notifications.create({
                        //     type: 'basic',
                        //     iconUrl: 'images/icon48.png',
                        //     title: 'Site Data Cleared',
                        //     message: `Cleared data for ${origin}`
                        // }, () => {
                        //     window.close();  // Close the popup
                        // });
                    });
                }
            });
        });
    } else {
        console.error('Button with ID "clearData" not found.');
    }
});
