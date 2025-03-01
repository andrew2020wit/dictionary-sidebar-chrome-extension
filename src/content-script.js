let turnOn = true;

const wordSeparator = [
    '‘',
    '“',
    ' ',
    '.',
    ',',
    '!',
    '?',
    ':',
    ';',
    '\t',
    '\n',
    '\r',
    "'",
    '`',
    '’',
    '"',
    '\\',
    '/',
    '[',
    ']',
    '(',
    ')',
    '{',
    '}',
    '-',
    '—',
    '<',
    '>'
];

chrome.storage.sync.get("isTurnOn", (data) => {
    turnOn = data.isTurnOn;
});

chrome.storage.onChanged.addListener(
    (changes, areaName)=> {
        if (!changes.isTurnOn) return;

        turnOn = changes.isTurnOn.newValue;
    }
)


window.document.addEventListener("click", () => {
    if (!turnOn) return;

    const word = takeSelectedWord();

    if (!word) return;

    chrome.runtime.sendMessage({wordToTranslate: word});
});

function takeSelectedWord() {
    const getSelection = window.getSelection();

    if (!getSelection) {
        return '';
    }

    const getSelectionToString = getSelection.toString().trim();

    if (getSelectionToString) {
        return getSelectionToString;
    }

    const focusOffset = getSelection.focusOffset;
    const nodeValue = getSelection.focusNode?.nodeValue;

    if (!nodeValue) {
        return '';
    }

    const nodeValueArr = nodeValue.split('');

    let firstIndex = findLastIndex(nodeValueArr, focusOffset, (value) => wordSeparator.includes(value));

    firstIndex = firstIndex === -1 ? 0 : firstIndex + 1;

    let lastIndex = nodeValueArr.findIndex((value, index) => wordSeparator.includes(value) && index > focusOffset);

    if (lastIndex === -1) {
        lastIndex = nodeValue.length;
    }

    return nodeValue.slice(firstIndex, lastIndex).trim();
}

function findLastIndex(
    array,
    from,
    predicate,
) {
    let l = from;
    while (l--) {
        if (predicate(array[l], l, array)) return l;
    }
    return -1;
}
