import bcrypt from 'bcryptjs';
const saltRounds = 10; // Number of "salt" iterations (rounds of hashing)
import jwt from 'jsonwebtoken';
import pool from '../postgrespool.js';
import secret from '../../config/config.js';

const signupUser = async (req, res) => {
    try {
        const { login, email, password } = req.body;

        let password_hash;

        try {
            password_hash = await bcrypt.hash(password, saltRounds);
        } catch (err) {
            console.error(err);
            return res.status(500).send('Server error');
        }

        const query = `INSERT INTO users (login, email, password_hash ) VALUES ($1, $2, $3)`;
    
        const values = [login, email, password_hash];
        
        const client = await pool.connect();
        await client.query(query, values);

        const userQuery = 'SELECT user_id, login FROM users WHERE email = $1';
        const userResult = await client.query(userQuery, [email])
        const user = userResult.rows[0];

        const token = jwt.sign(user, secret, {
            expiresIn: '30d'
        })

        client.release();
        res.status(201).json({ 
            message: 'Successfully', 
            token, 
            user: {
                id: user.user_id,
                name: user.login
            }
        })} catch (err) {
        if (err.constraint === 'users_email_key') {
            return res.status(400).json({ message: 'Email is already exists' });
        } else {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
}

const signinUser = async (req, res) => {

    const { email, password } = req.body;

    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    if (result.rows.length === 0) {
        return res.status(401).json({success: false, message: 'There is no users with this email' });
    }
    const user = result.rows[0];
    

    bcrypt.compare(password, user.password_hash, (err, result) => {
        if (err) {
            console.error(err);
        } else if(result) {
            const token = jwt.sign(user, secret, {
                expiresIn: '30d'
            })
            return res.status(200).json({
                token: token,
                message: 'sign in succesfull', 
                user: {
                    id: user.user_id,
                    name: user.login
                }});
        } else {
            return res.status(401).json({success: false, message: 'Password incorrect' });
        }
    })
} 

const logoutUser = async (req, res) => {
    req.logout((err) => {
        if(err) {
            return res.status(500).json({message: 'Ошибка при выходе из системы'})
        }
        res.status(200).json({message: 'Вы вышли успешно'})
    });
}

const deleteUser = async (req, res) => {
    if (req.headers.authorization) {
            
        const token = await req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        
        const userId = decoded.user_id;
        try {
            const query = 'DELETE FROM users WHERE user_id = $1';
            await pool.query(query, [userId]);
            res.status(200).json({message: 'account is deleted', status: 200})
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export {signupUser, signinUser, logoutUser, deleteUser}