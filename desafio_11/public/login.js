const form = document.querySelector('#loginForm');
const nameInput = document.querySelector('#loginName');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (nameInput.value) {
        console.log(nameInput.value);

        await fetch('login', {
            method: 'POST',
            body: JSON.stringify({
                name: nameInput.value,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            if (data.error) return;

            if (data.redirect) window.location.href = data.redirect;
            console.log(data);
        })
        .catch((error) => console.log(error));
    }
});