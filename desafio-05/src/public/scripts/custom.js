const socket = io();

const createProductsListContent = (data) => {
    let content = '';
    
    data.forEach((x) => {
        content += `<div class="col"><div class="card mx-auto" style="width: 18rem;">`;
        content += `<img class="product-image" src="${x.image}" onerror="this.onerror=null;this.src='/static/images/error.jpg';" `;
        content += `alt="product-image"><div class="card-body"><h5 class="card-title">${x.title}</h5>`;
        content += `<p class="card-text">${x.description}</p><p class="card-text text-primary">$${x.price}</p></div></div></div>`;
    });
    
    return content;
}

document.addEventListener("DOMContentLoaded", () => {
    const realTimeProductsElem = document.querySelector('#realtime-products .row');

    if (!realTimeProductsElem) {
        return;
    }

    socket.on('products', (data) => {
        realTimeProductsElem.innerHTML = createProductsListContent(data);
    });
});
