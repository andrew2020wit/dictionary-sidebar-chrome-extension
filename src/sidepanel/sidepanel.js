chrome.storage.sync.get("wordToTranslate", (data) => {
    const wordToTranslate = data.wordToTranslate;

    if (!wordToTranslate) return;

    this.setWord(data.wordToTranslate);
});

chrome.storage.onChanged.addListener(
    (changes, areaName)=> {
        if (changes.wordToTranslate) {
            const wordToTranslate = changes.wordToTranslate.newValue;

            if (wordToTranslate) setWord(wordToTranslate);
        }

        if(changes.isTurnOn?.newValue === false) {
            window.close();
        }
    }
)

function setWord(word) {
    const term = '{{term}}';

    const defaultDictionaryUrl = 'https://en.wiktionary.org/wiki/{{term}}';

    const currentUrlStorageKey = 'dictionary-sidebar-currentUrlStorageKey';

    let url = localStorage.getItem(currentUrlStorageKey)?.trim() || defaultDictionaryUrl;

    url = url.replace(term, word);

    const iframe = document.getElementById("dictionary-frame-id");

    iframe.src = url;
}