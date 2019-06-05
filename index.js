//require('./app/index');

const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/add', (req, res) => {
    if (!req.query.num1 || !req.query.num2) return res.sendStatus(400);

    let num1 = Number(req.query.num1);
    let num2 = Number(req.query.num2);
    let result = num1 + num2;
    res.send(result.toString());
});

app.listen(3000, () => console.log('App listening on port 3000'));
