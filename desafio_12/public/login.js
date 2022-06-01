const form = document.querySelector('#loginForm');
const nameInput = document.querySelector('#loginName');
const passwordInput = document.querySelector('#password');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (emailInput.value && passwordInput.value) {
        console.log({
            email: emailInput.value,
            password: passwordInput.value,
        });
    
        await fetch('login', {
            method: 'POST',
            body: JSON.stringify({
                email: emailInput.value,
                password: passwordInput.value,
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
        .catch((error) => console.log({error}));
    }
});