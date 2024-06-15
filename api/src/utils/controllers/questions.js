import pool from '../postgrespool.js';
import jwt from 'jsonwebtoken';
import secret from '../../config/config.js';

const gettingQuestions = async (req, res) => {
    let sqlQuery = `SELECT CAST(ROW_NUMBER() OVER (ORDER BY question_id) AS INTEGER) AS row_num, question_id, question, answer, example_path, user_id, filter FROM questions_${req.query.stack}_${req.query.language}`;
   // let sqlQuery = `SELECT question, question_id, answer, example_path  FROM questions_${req.query.stack}_${req.query.language}`;
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secret);
            
            const userId = decoded.user_id;
            sqlQuery += ` WHERE user_id IN (0, ${userId}) ORDER BY question_id `;
        } else {
            sqlQuery += ` WHERE user_id = 0 ORDER BY question_id`;
        }

        const client = await pool.connect();
        const result = await client.query(sqlQuery);
    
        client.release(); // Release the client back to the connection pool
        return res.json({message: 'Data received successfully', data: result.rows}); // Send the result in JSON format
    } catch (err) {
        if(err.name === "TokenExpiredError") {
            return res.status(401).json({ message: 'Token expired' });
        } else {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: 'Token expired' });
            } else if (err.code === '42P01') { // Check for the undefined_table error
                return res.status(400).json({ message: 'The specified table does not exist' });
            } else {
                console.error(err);
                return res.status(500).send('Server error');
            }
        }
        
    }
}

const postingNewQuestion = async (req, res) => {
    if (req.headers.authorization) {

        const token = await req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        
        const userId = decoded.user_id;
        try {
            const { question, answer, stack, language } = req.body;
            
            const query = `INSERT INTO questions_${stack.toLowerCase()}_${language.toLowerCase()} (user_id, question, answer, example_path) VALUES ($1, $2, $3, $4)`;
        
            const values = [userId, question, answer, 'not available'];
            
            const client = await pool.connect();
            await client.query(query, values);
            
            client.release();
            res.status(201).json({ message: 'Questions posted successfully', status: 201 });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    
}

const gettingAnswer = async (req, res) => {
    let sqlQuery = `SELECT question, answer, example_path FROM questions_${req.query.stack}_${req.query.language} WHERE question_id = ${req.query.id}`;
    const client = await pool.connect();
    const result = await client.query(sqlQuery);

    // Now, with a 404, the ability to go back is restricted. We can consider alternative handling approaches.
    // if(result.rows.length === 0) {
    //     return res.status(404).json({error: 'Not Found'})
    // }
    
    client.release();
    return res.json({message: 'Answer received successfully', data: result.rows});
}

const verifyCode = async (req, res) => {
    if (req.headers.authorization) {

        const token = await req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        const { code } = req.body;
        const userId = decoded.user_id;
        
    try {
        const result = await pool.query('SELECT label, value, language FROM access_codes WHERE code = $1', [code]);
        
        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid code' });
        }

        const { label, value, language } = result.rows[0];

        // Получаем текущий массив accessible_stacks для пользователя
        const userResult = await pool.query('SELECT accessible_stacks FROM users WHERE user_id = $1', [userId]);
        const accessibleStacks = userResult.rows[0].accessible_stacks;

        // Проверяем наличие элемента в массиве
        if (accessibleStacks) {
            const stackExists = accessibleStacks.some(stack => 
                stack.label === label && stack.value === value
            );
            if (stackExists) {
                return res.status(400).json({ message: 'Stack already exists in accessible stacks' });
            }
        }


        // if (accessibleStacks && accessibleStacks.includes(result.rows[0])) {
        //     return res.status(400).json({ message: 'Stack already exists in accessible stacks' });
        // }

        // Добавляем элемент в массив accessible_stacks
        await pool.query(`
            UPDATE users 
            SET accessible_stacks = array_append(accessible_stacks, $1)
            WHERE user_id = $2
        `, [JSON.stringify({ label, value, language }), userId]);

        return res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }

};

const getCodeStacks = async (req, res) => {
    if (req.headers.authorization) {

        const token = await req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        
        const userId = decoded.user_id;

        try {
            const result = await pool.query('SELECT accessible_stacks FROM users WHERE user_id = $1', [userId]);
    
            if (result.rows.length === 0) {
                return res.status(400).json({ message: 'accessible stacks not found' });
            }
    
            const stacks = result.rows[0].accessible_stacks;
    
            return res.json({ stacks });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
        }
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};


export {gettingQuestions, postingNewQuestion, gettingAnswer, verifyCode, getCodeStacks}
