import session from 'express-session';
import passport from 'passport';
import secret from './config.js';
import initializePassport from './passport.js';

export default function configurePassport(app) {
    app.use(session({
        secret: secret,
        resave: false,
        saveUninitialized: false,
    }));
    
    app.use(passport.initialize()) // initialize the passport library
    app.use(passport.session()) // indicate that we will be using sessions
    
    initializePassport(passport);
}