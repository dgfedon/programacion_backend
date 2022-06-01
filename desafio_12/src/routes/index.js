const express = require('express');
const router = express.Router()
const passport = require('passport');

const products = require('../js/products');
const messages = require('../js/messages');


const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcrypt')



passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {

        const user = await User.findOne({ email })

        if (!user) return done(null, false)

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) return done(null, false);

        return done(null, user);
    } catch (error) {
        console.log(error);
        done(error)
    }
}))

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, email: user.email });
    })
})


passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    })
})

// Despliegue messages
router.get('/api/messages', async (req, resp) => {
    const messages = await messages.getAll();

    resp.json(messages)
});

// Despliegue inicial - Raiz del servidor => http://localhost:8080/
router.get('/', async (req, resp) => {
    if (!req.session.user) {
        return resp.redirect('/login');
    }
    const product = await products.getAll();
    let messages = await messages.getAll();

    resp.render('main', { title: 'Desafío 12', product, messages });
});

// Despliegue login
router.get('/login', async (req, resp) => {
    resp.render('login', { title: 'Login' });
});

// Despliegue register
router.get('/register', async (req, resp) => {
    resp.render('register', { title: 'Register' });
});

router.post('/register', async (req, resp) => {
    try {
        if (!req.body.email || !req.body.password) {
            return resp.json({
                error: true,
                message: "Missing information"
            })
        }

        const user = await User.findOne({ email: req.body.email });

        if (user) return resp.json({ error: true, message: 'Email ya registrado' })

        const hashedPw = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            email: req.body.email,
            password: hashedPw
        })

        await newUser.save()

    } catch (error) {
        console.log(error);
    }
})




router.post('/login', passport.authenticate('local', { session: true }), async (req, resp) => {
    console.log(req.user);

    return resp.json({
        redirect: '/',
    });
});



router.get('/logout', async (req, resp) => {
    if (!req.user) return resp.redirect('/login');
    const email = req.user.email
    req.logout((error) => {
        if (error) return
        return resp.render('logout', { title: 'Logout', name: email });
    })
});

// Despliegue products random
router.get('/api/productos-test', async (req, resp) => {
    const product = [1, 2, 3, 4].map((id) => {
        return {
            id,
            title: faker.commerce.product(),
            price: faker.commerce.price(),
            img: faker.image.image(),
        };
    });

    resp.render('random', { title: 'Productos Random', product });
});

module.exports = router