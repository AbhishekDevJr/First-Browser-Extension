chrome.action.onClicked.addListener((tab) => {
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
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'images/icon48.png',
                title: 'Site Data Cleared',
                message: `Cleared data for ${origin}`
            });
        });
    }
});
