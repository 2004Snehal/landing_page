import express from 'express';
import cors from 'cors';
import { mongoConnect } from './models/db.js';
import userRouter from './routes/userRoute.js'
import internRouter from './routes/internRoute.js'
import dotenv from 'dotenv';
dotenv.config()



const app = express();


app.use(cors({
    origin: process.env.REACT_URL || 'http://localhost:3000',
    methods: ['POST', 'GET', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());


await mongoConnect();


// Add a test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

app.use('/user',userRouter);
app.use('/intern',internRouter);

const PORT = process.env.PORT || 5174;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});