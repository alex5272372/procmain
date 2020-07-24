const express = require('express')
const { json } = require('body-parser')

if (!process.env.PORT) process.env.PORT = 3000
process.env.PGUSER = 'postgres'
process.env.PGHOST = 'procmain.eu'
process.env.PGPASSWORD = 'FS9final'
process.env.PGDATABASE = 'acc'
process.env.PGPORT = 5432

const app = express()

app.set('views', __dirname + '/templates')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/public'))
app.use(json())

require('./routes')(app)
require('./routes/users')(app)
require('./routes/roles')(app)
require('./routes/groups')(app)

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`))
