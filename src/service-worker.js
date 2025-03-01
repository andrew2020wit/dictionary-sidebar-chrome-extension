const onIconPath = '../src/images/icon-on.png';
const offIconPath = '../src/images/icon-off.png';

let isTurnOn = false;

chrome.storage.sync.get("isTurnOn", (data) => {
    isTurnOn = data.isTurnOn;
    this.setIcon();
});

// take wordToTranslate from content-script
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        const wordToTranslate = request?.wordToTranslate;

        if (!wordToTranslate || !isTurnOn) return;

        chrome.storage.sync.set({ wordToTranslate: wordToTranslate });

        chrome.sidePanel.open({tabId: sender.tab.id});
    }
);

// TurnOn|Off click
chrome.action.onClicked.addListener((tab)=> {
    isTurnOn = !isTurnOn;

    this.setTurnOnState(isTurnOn);

    this.setIcon();

    if (isTurnOn) {
        chrome.sidePanel.open({ windowId: tab.windowId });
    }
});

function setTurnOnState(isTurnOn) {
    chrome.storage.sync.set({ isTurnOn: isTurnOn });
}

function setIcon() {
    const iconPath = isTurnOn ? onIconPath : offIconPath;
    chrome.action.setIcon({ path: iconPath });
}