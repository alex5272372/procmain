const express = require('express')
const bodyParser = require('body-parser')

if (!process.env.PORT) process.env.PORT = 3000
process.env.PGUSER = 'postgres'
process.env.PGHOST = 'procmain.eu'
process.env.PGPASSWORD = 'FS9final'
process.env.PGDATABASE = 'acc'
process.env.PGPORT = 5432

let app = express()

app.set('views', __dirname + '/templates')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())

require('./routes')(app)
require('./routes/users')(app)

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`))
