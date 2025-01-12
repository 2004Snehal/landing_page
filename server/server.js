import express from 'express';
import cors from 'cors';
import { mongoConnect } from './models/db.js';
import userRouter from './routes/userRoute.js'
import internRouter from './routes/internRoute.js'




const app = express();

// Configure CORS to accept requests from your frontend
app.use(cors({
    origin: 'http://localhost:5173', // Your Vite frontend URL
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

const PORT = 5174;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
});