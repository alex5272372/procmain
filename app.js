const express = require('express')

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
app.use(express.json())

require('./routes/balance')(app)
require('./routes/customers')(app)
require('./routes/groups')(app)
require('./routes')(app)
require('./routes/invoices')(app)
require('./routes/orders')(app)
require('./routes/organizations')(app)
require('./routes/products')(app)
require('./routes/roles')(app)
require('./routes/settings')(app)
require('./routes/signIn')(app)
require('./routes/signUp')(app)
require('./routes/users')(app)

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}`))
