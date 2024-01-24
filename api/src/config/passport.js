import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import pool from '../utils/postgrespool.js';
import secret from './config.js';

export default function (passport) {
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = secret;
    // opts.issuer = 'accounts.examplesoft.com';  - пока что не нужно
    // opts.audience = 'yoursite.net';
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const userId = jwt_payload.user_id;
        
        const query = 'SELECT * FROM users WHERE user_id = $1'; // Find user form DB
        pool.query(query, [userId], (error, result) => {
            if (error) {
                return done(error, false);
            }
            if (result.rows.length === 1) {
                const user = result.rows[0];
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}
