const express = require('express');
const router = express.Router()
const passport = require('passport');
const { fork } = require('child_process');

const products = require('../js/products');
const messages = require('../js/messages');


const { Strategy: LocalStrategy } = require('passport-local');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const path = require('path');



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


router.get('/info', async (req, resp) => {

    const info = {
        args: process.argv.slice(2),
        os: process.platform,
        node_v: process.version,
        memory: process.memoryUsage(),
        path: process.execPath,
        pid: process.pid,
        dir: process.cwd()
    };

    console.log(info);

    resp.render('info', { title: 'Info', info });
});

//  Despliegue productos random
router.get('/api/random', (req, resp) => {
    const result = {};

    const amount = parseInt(req.query.cant) || 100_000_000

    const forked = fork(path.join(__dirname, './random.js'));

    forked.send({ start: true, amount });

    forked.on('message', (result) => {
        resp.json(result);
    });
});


module.exports = router