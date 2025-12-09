import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';  
const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}
));

// Set Cookie Parser Middleware 
app.use(cookieParser());

// To Set Limt for Data Received from Client Side 
app.use(express.json({ limit: '16kb' }));

app.use(express.urlencoded({ extended: true, limit: '16kb' }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send(`<h1>Hello this is me Mian Haseeb Ahmad Datalink Solutions!</h1> `);
});

export default app;