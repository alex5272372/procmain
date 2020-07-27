const { Client } = require('pg')

async function dataDef(dbName) {
  process.env.PGUSER = 'postgres'
  process.env.PGHOST = 'procmain.eu'
  process.env.PGPASSWORD = 'FS9final'
  process.env.PGPORT = 5432
  process.env.PGDATABASE = dbName
  const client = new Client()

  const queries = [
    `INSERT INTO users
    (id, name) VALUES
    (1, 'gogi'),
    (2, 'emma'),
    (3, 'alex')`,
    `INSERT INTO roles
    (id, name) VALUES
    (1, 'admin'),
    (2, 'user')`,
    `INSERT INTO groups
    (id, user_id, role_id) VALUES
    (1, 1, 2),
    (2, 3, 1)`,
    `INSERT INTO organizations
    (id, name) VALUES
    (1, 'My company')`,
    `INSERT INTO customers
    (id, name) VALUES
    (1, 'My customer')`,
    `INSERT INTO products
    (id, name) VALUES
    (1, 'My product')`
  ]

  await client.connect()
  try {
    for (const q of queries) {
      console.log(q)
      await client.query(q)
    }
  } finally {
    await client.end()
  }
}

try {
  dataDef('acc')
} catch (err) {
  console.log(err.message)
}
