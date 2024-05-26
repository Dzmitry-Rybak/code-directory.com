import express from 'express';
import cors from 'cors';
import router from './src/utils/routes/router.js';
import configurePassport from './src/config/passportMiddleware.js';
import dotenv from 'dotenv'; // ENVIRONMENT VARIABLES
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

configurePassport(app)

app.use(cors({
    origin: 'http://code-directory.com'
  }));
  
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.get('/', (req, res) => res.status(200).send('Welcome to node.js'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
