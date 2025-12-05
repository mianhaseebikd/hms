import express from 'express';
const app = express();


app.get('/', (req, res) => {
    res.send(`<h1>Hello this is me Mian Haseeb Ahmad Datalink Solutions!</h1> `);
});

export default app;