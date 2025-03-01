const currentUrlStorageKey = 'dictionary-sidebar-currentUrlStorageKey';

const defaultDictionaryUrl = 'https://en.wiktionary.org/wiki/{{term}}';

const currentUrl = localStorage.getItem(currentUrlStorageKey) || defaultDictionaryUrl;

const urlInputElement = document.getElementById('dictionary-url-input');
const setUrlButtonElement = document.getElementById('dictionary-set-url-button');

urlInputElement.setAttribute('value', currentUrl);

setUrlButtonElement.addEventListener('click', () => {
    const url = urlInputElement.value?.trim() || '';

    localStorage.setItem(currentUrlStorageKey, url);
});
