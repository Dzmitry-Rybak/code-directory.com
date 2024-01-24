import pool from '../postgrespool.js';
import jwt from 'jsonwebtoken';
import secret from '../../config/config.js';

const getFilters = async (req, res) => {
    if (req.headers.authorization) {
            
        const token = await req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        
        const userId = decoded.user_id;

        try {
                    
            const query = `SELECT * FROM user_question_marks where user_id = ${userId} AND stack = 'questions_${req.query.stack}_${req.query.language}' `
            
            const client =  await pool.connect();
            const result = await client.query(query);
        
            client.release();
            return res.status(200).json({message: 'Data received successfully', data: result.rows[0]})
    
        } catch(err) {
            console.error(err);
        }
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

const postFilters = async (req,res) => {
    if (req.headers.authorization) {
            
        const token = await req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        
        const userId = decoded.user_id;
        try {
            const {filter, array} = req.body;
            const programmingLanguage = `questions_${req.query.stack}_${req.query.language}`;
            
            const query = `INSERT INTO user_question_marks (user_id, stack, ${filter}) VALUES ($1, $2, $3) ON CONFLICT (user_id, stack) DO UPDATE SET ${filter} = excluded.${filter}`;
            const values = [userId, programmingLanguage, array];
        
            const client =  await pool.connect();
            await client.query(query, values);
        
            client.release();
            res.status(200).json({message: 'Data received successfully'});
        
        } catch(err) {
            console.error(err);
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }

}

export {getFilters, postFilters}