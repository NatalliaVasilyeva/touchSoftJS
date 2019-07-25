var allHistory;
var inputArea = null;
var contentArea = null;
var header = null;
var currentMessageBlock = null;
var historyElement;
var historyArea;
var inputAreaElement;
var headerElement;
var contentAreaElement;
var sendBtn = null;
var sendBtnElement;
var currentMessageBlockElement;
var minBtn;
var isMinState;

var chatCssStyle =
    '.main-window-class {' +
    'border: 2px solid black;' +
    'background-color: #f1f1f1;' +
    'border-radius: 15px;' +
    'margin: 10px 0;' +
    'width:500px;' +
    'right:10px;' +
    'position: fixed;' +
    'bottom:15px;' +
    '}' +
    '.chat-header-class {' +
    'background: lightskyblue;' +
    'color: blue;' +
    'padding: 5px;' +
    'height: 30px;' +
    'position: relative;' +
    'overflow: hidden;' +
    'border: 0px solid darkblue;' +
    'border-radius: 15px 15px 0 0;' +
    '}' +
    '.content-area-class {' +
    'height:610px;' +
    'overflow-x:hidden;' +
    'position: relative;' +
    '}' +
    '.history-area-all-class {' +
    'border-bottom: 2px solid black;' +
    'border-top:2px solid black;' +
    'background: aqua;' +
    'margin: 0;' +
    'max-width: 500px;' +
    'height: 500px;' +
    'overflow-x:hidden;' +
    'position: relative;' +
    '}' +
    '#history-area {' +
    'display: inline-block;' +
    'background: white;' +
    'color: black;' +
    'padding-left: 5%;' +
    'padding-right: 3%;' +
    'border-radius: 10px;' +
    'height: 480px;' +
    'width: 90%;' +
    'overflow-y: auto;' +
    'overflow-x: auto;' +
    'margin-bottom: 0;' +
    '}' +
    '.history-area-all-class li {' +
    'padding-bottom: 10px;' +
    'padding-top: 10px;' +
    'margin-bottom: 5px;' +
    '}' +
    '.my-message-class{' +
    'background: khaki;' +
    'color: darkblue;' +
    'text-align: left;' +
    '}' +
    '.bot-message-class{' +
    'background: lightcyan;' +
    'color: purple;' +
    'text-align: right;' +
    '}' +
    '.current-message-block-class{' +
    'background: lightskyblue;' +
    'vertical-align: middle;' +
    'height: 100px;' +
    'width: 100%;' +
    'position: relative;' +
    'bottom: 0px;' +
    'border-radius: 0 0 15px 15px;' +
    '}' +
    '.input-area-class {' +
    'vertical-align: middle;' +
    'height: 100px;' +
    'width: 80%;' +
    'position: relative;' +
    'bottom: 0px;' +
    'left: 0px;' +
    'border-radius: 0 0 0 15px;' +
    'resize: none;' +
    'border-right: 2px solid black;' +
    'float: left;' +
    '}' +
    '.send-button-class{' +
    'vertical-align: middle;' +
    'height: 100px;' +
    'padding: 5px;' +
    'width: 19%;' +
    'position: absolute;' +
    'bottom: 0px;' +
    'right: 0px;' +
    'border-radius: 0 0 15px 0;' +
    'border-left: 2px solid black;' +
    'margin-left: 10px;' +
    '}' +
    '#minBtn  {' +
    'height: 30px;' +
    'width: 30px;' +
    'position: relative;' +
    'float: right;' +
    '}' +
    '.hidden {' +
    'display: none;' +
    '}';


    function createStyle() {
    var cssStyle = document.createElement('style');
    cssStyle.innerHTML=chatCssStyle;
    return cssStyle;

    }

    function createChatHeader() {
        var header = document.createElement('div');
        header.id = 'chat-header';
        header.classList.add('chat-header-class');
        header.innerHTML = "<button id ='minBtn' type = 'submit'>-</button>";
        return header;
    }

function createContentArea() {
    var contentArea = document.createElement('div');
    contentArea.id = 'content-area';
    contentArea.classList.add('content-area-class');
    return contentArea;
}


function createHistoryArea() {
    var allHistory = document.createElement('div');
    allHistory.id = 'history-area-all';
    allHistory.classList.add('history-area-all-class');
    historyArea = document.createElement('ul');
    historyArea.id = 'history-area';
    historyArea.classList.add('history-area-class');
    allHistory.appendChild(historyArea);
    return allHistory;
}

function createCurrentMessageBlock() {
    var currentMessageBlock = document.createElement('div');
    currentMessageBlock.id = 'current-message-block';
    currentMessageBlock.classList.add('current-message-block-class');
    return currentMessageBlock;
}

function createInputArea() {
    var inputArea = document.createElement('textarea');
    inputArea.id = 'input-area';
    inputArea.classList.add('input-area-class');
    return inputArea;
}

function createSendButton() {
    var sendButton = document.createElement('button');
    sendButton.id = 'send-button';
    sendButton.classList.add('send-button-class');
    sendButton.innerHTML = 'Send';
    return sendButton;
}

function createChat() {
    var mainWindow = document.createElement('div');
    mainWindow.id = 'main-window';
    mainWindow.classList.add('main-window-class');
    header = createChatHeader();
    contentArea = createContentArea();
    currentMessageBlock = createCurrentMessageBlock();
    inputArea = createInputArea();
    sendBtn = createSendButton();
    allHistory = createHistoryArea();

    headerElement = header;
    contentAreaElement = contentArea;
    historyElement = allHistory;
    inputAreaElement = inputArea;
    sendBtnElement = sendBtn;
    currentMessageBlockElement = currentMessageBlock;

    currentMessageBlockElement.appendChild(inputAreaElement);
    currentMessageBlockElement.appendChild(sendBtnElement);
    contentArea.appendChild(historyElement);
    contentArea.appendChild(currentMessageBlockElement);

    mainWindow.appendChild(createStyle());
    mainWindow.appendChild(header);
    mainWindow.appendChild(contentArea);


    document.body.appendChild(mainWindow);
    minBtn = document.getElementById('minBtn');

    sendBtn.addEventListener('click', sendMessage);
    minBtn.addEventListener('click', changeWindow);

}

function createMessage(sender, text) {
    var date = new Date().toLocaleTimeString();
    var message = {sender: sender, date: date, content: text}
    return message;
}

function addMessageToOutputArea(message) {
    var li = document.createElement('li');
    if (message.sender === 'You') {
        li.classList.add('my-message-class');
    } else {
        li.classList.add('bot-message-class');
    }
    var outputMessage1 = document.createTextNode(message.sender + ': ' + message.date);

    var p = document.createElement('p');
    var outputMessage2 = document.createTextNode(message.content);
    p.appendChild(outputMessage2);
    li.appendChild(outputMessage1);
    li.appendChild(p);
    historyArea.appendChild(li);
    if (historyArea) historyArea.scrollTop = historyArea.scrollHeight;
}

function sendMessage() {
    var text = inputAreaElement.value;
    if (text != '') {
        var message = createMessage('You', text);
        addMessageToOutputArea(message);
        saveMessageInLocalStorage(message);
        sendBotAnswer(message);
        inputAreaElement.value = '';
    }
}

function changeWindow() {
    if (isMinState === false) {
        document.getElementById('content-area').classList.remove('hidden');
    } else {
        document.getElementById('content-area').classList.add('hidden');
    }
    isMinState = !isMinState;
    localStorage.setItem('isMinimise', isMinState);
}

function sendBotAnswer(message) {
    function sendAnswer() {
        var botMessage = createMessage('Bot', message.content.toLocaleUpperCase());
        addMessageToOutputArea(botMessage);
        saveMessageInLocalStorage(botMessage);
    };
    setTimeout(sendAnswer, 15000);
}

function saveMessageInLocalStorage(message) {
    var historyMessages = localStorage.getItem('history');
    var messages = [];
    if (historyMessages !== null) {
        messages = JSON.parse(historyMessages);
    }
    messages.push(message);
    localStorage.setItem('history', JSON.stringify(messages));
}

function loadMessageFromLocalStorage() {
    var historyMessages = localStorage.getItem('history');
    var messages = [];
    if (historyMessages !== null) {
        messages = JSON.parse(historyMessages);
        for (elem in messages) {
            addMessageToOutputArea(messages[elem]);
        }
    } else {
        localStorage.setItem('history', JSON.stringify([]));
    }

    isMinState = localStorage.getItem('isMinimise') === true || localStorage.getItem('isMinimize') === null;
}


window.onload = function startChat() {
    createChat();
    loadMessageFromLocalStorage();
    if (isMinState === true) {
        document.getElementById('content-area').classList.add('hidden');
    } else {
        document.getElementById('content-area').classList.remove('hidden');
    }
};
