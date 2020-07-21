const express = require('express');
const bodyParser = require('body-parser');

process.env.PGUSER = 'postgres'
process.env.PGHOST = 'procmain.eu'
process.env.PGPASSWORD = 'FS9final'
process.env.PGDATABASE = 'acc'
process.env.PGPORT = 5432

let app = express();

app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

require('./routes')(app);
require('./routes/users')(app);

let port = process.env.PORT;
if (port === undefined) {
  port = 3000;
}
app.listen(port, () => console.log(`Server is listening on port ${port}`));
