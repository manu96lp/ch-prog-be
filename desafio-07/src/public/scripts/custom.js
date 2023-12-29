const socket = io();

let userData = {
    user: null,
};

const formatMessageTimestamp = (dateTime) => {
    return new Date(dateTime).toTimeString().substring(0, 5);
}

const transformTimestamps = () => {
    const elements = document.querySelectorAll('[data-timestamp]:not([data-timestamp=""])');

    elements.forEach((e) => {
        e.innerHTML = formatMessageTimestamp(e.dataset.timestamp);
        e.dataset.timestamp = '';
    });
};

const createProductsListContent = (data) => {
    let content = '';
    
    data.forEach((x) => {
        content += `<div class="col"><div class="card mx-auto" style="width: 18rem;">`;
        content += `<img class="product-image" src="${x.image}" onerror="this.onerror=null;this.src='/static/images/error.jpg';" `;
        content += `alt="product-image"><div class="card-body"><h5 class="card-title">${x.title}</h5>`;
        content += `<p class="card-text">${x.description}</p><p class="card-text text-primary">$${x.price}</p></div></div></div>`;
    });
    
    return content;
};

const createMessageContent = (data) => {
    let content = '';
    
    content += `<div class="d-flex flex-row justify-content-start">`;
    content += `<img src="https://robohash.org/${data.user}" alt="avatar">`;
    content += `<div class="small ms-3 w-100"><div class="d-flex justify-content-between">`;
    content += `<p class="small mb-1">${data.user}</p>`;
    content += `<p class="small mb-1 text-muted">${formatMessageTimestamp(data.timestamp)}</p></div>`;
    content += `<p class="mb-0 text-start">${data.message}</p></div></div>`;
    
    return content;
};

const listenToProductEvents = () => {
    const productsContainer = document.querySelector('#realtime-products .row');

    if (productsContainer) {
        socket.on('allProducts', (data) => {
            productsContainer.innerHTML = createProductsListContent(data);
        });
    }
};

const listenToChatEvents = () => {
    const messagesContainer = document.querySelector('#chat .chat-container .card-body');

    if (messagesContainer) {
        socket.on('newMessage', (data) => {
            messagesContainer.insertAdjacentHTML('beforeend', createMessageContent(data));
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        });
    }
};

const askForUserData = async () => {
    const result = await Swal.fire({
        title: "We need your e-mail",
        input: "email",
        inputPlaceholder: "Enter your email",
        showCancelButton: true,
        confirmButtonText: "Confirm"
    });

    if (result) {
        userData.user = result.value;
    }
};

const hookChatSend = () => {
    const sendButtonElem = document.querySelector('#chat-send');
    const chatInputElem = document.querySelector('#chat-content');

    if (!sendButtonElem || !chatInputElem) {
        return;
    }

    const sendMessageCallback = () => {
        const chatInputValue = chatInputElem?.value;

        if (!chatInputValue) {
            return;
        }

        if (!userData.user) {
            askForUserData();
            return;
        }

        socket.emit('userMessage', {
            user: userData.user,
            message: chatInputValue,
        });

        chatInputElem.value = '';
    };

    sendButtonElem.addEventListener('click', sendMessageCallback);
    chatInputElem.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            sendMessageCallback();
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    listenToProductEvents();
    listenToChatEvents();
    hookChatSend();
    transformTimestamps();
});
