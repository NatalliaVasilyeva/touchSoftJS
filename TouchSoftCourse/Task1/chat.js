var allHistory;
var inputArea = null;
var contentArea = null;
var header = null;
var currentMessageBlock = null;
var historyElement;
var inputAreaElement;
var headerElement;
var contentAreaElement;
var sendBtn = null;
var sendBtnElement;
var currentMessageBlockElement;
var minBtn;
var isMinState;


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
    var historyArea = document.createElement('ul');
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
    // historyArea = createHistoryArea();
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

    mainWindow.appendChild(header);
    mainWindow.appendChild(contentArea);


    document.body.appendChild(mainWindow);
    minBtn = document.getElementById('minBtn');

    sendBtn.addEventListener('click', sendMessage);
    minBtn.addEventListener('click', minimizeWindow);

}

function createMessage(sender, text) {
    var date = new Date();
    var message = {sender: sender, date: date.getDate(), content: text}
    return message;
}

function addMessageToOutputArea(message) {
    var li = document.createElement('li');
    var outputMessage = document.createTextNode(message.sender + ' ' + message.date + ' ' + message.content);
    li.appendChild(outputMessage);
    historyElement.appendChild(li);
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

function minimizeWindow() {
    var windowState = localStorage.getItem('windowState');
    if (windowState == false) {
        document.getElementById('content-area').classList.remove('hidden');
    } else {
        document.getElementById('content-area').classList.add('hidden');
    }
    isMinState = !isMinState;
    localStorage.setItem('windowState', isMinState);
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

    if (localStorage.getItem('isMinimise') === true) {
        isMinState = true;
    } else {
        isMinState = false;
    }
}


window.onload = function startChat() {
    createChat();
    loadMessageFromLocalStorage();
    if (isMinState == true || isMinState == null) {
        document.getElementById('content-area').classList.add('hidden');
    } else {
        document.getElementById('content-area').classList.remove('hidden');
    }
};
