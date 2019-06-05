const path = require('path');
const express = require('express');
//const bodyParser = require('body-parser');
//const exphbs = require('express-handlebars');
const app = express();

/*app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));*/

app.listen(3000, () => console.log('App listening on port 3000'));

/*app.post('/', function(req, res) {
    res.render('home', {
        name: 'John'
    });
    console.log(req.body);
    res.sendStatus(200);
});*/

/*const {Pool, Client} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: 'renifd22'
});

pool.query('SELECT $1::varchar AS my_first_query', ['Hello, world!'], function (err, result) {
    if (err) {
        return console.error('error happened during query', err);
    }
    console.log(result.rows);
    pool.end();
});*/
