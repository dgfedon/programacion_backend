const socket = io.connect();

// Agregar nuevo item al chat
function renderChat(data) {
    const html = data.map((elem) => {
        return(`<div>
                    <strong style="color: blue;">${elem.mail}</strong>
                    <span style="color: brown;">[${elem.fyh}]:</span>
                    <em style="color: green;">${elem.msg}</em> 
                </div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
};

socket.on('messages', data => { 
    renderChat(data); 
});

// Enviar nuevos datos al servidor
function addMessage() {
    const getMsg = {
        mail: document.getElementById('mail').value,
        msg: document.getElementById('msg').value,
    };
    socket.emit('new-message', getMsg);
    return false;
};


// Agregar nuevo item tabla de productos
function renderProducts(data) {
    return fetch('./views/partials/table.hbs')
        .then( resp => resp.text())
        .then( hb => {
            const template = Handlebars.compile(hb);
            const html = template({ data })
            return html;
        });
};

socket.on('products', data => { 
    renderProducts(data)
    .then( html => {
        document.getElementById('products').innerHTML = html
    });
});

// Agregar nuevo item a la tabla
function addProduct() {
    const getProduct = {
        name: document.getElementById('name').value,
        price: document.getElementById('price').value,
        img: document.getElementById('img').value,
    };
    socket.emit('update', getProduct);
    return false;
};