const { Client } = require('pg')

async function dataMod(dbName) {
  process.env.PGUSER = 'postgres'
  process.env.PGHOST = 'procmain.eu'
  process.env.PGPASSWORD = 'FS9final'
  process.env.PGPORT = 5432
  process.env.PGDATABASE = dbName
  const client = new Client()

  const queries = [
    `INSERT INTO users
    (id, username, name, email, tel) VALUES
    (1, 'gogi', 'Gogi Doe', 'gogi@gmail.com', '+38-063-444-55-66'),
    (2, 'emma', 'Emma Garfield', 'emma@gmail.com', '+38-067-222-88-45'),
    (3, 'alex', 'Alex Nikolas', 'alex@gmail.com', '+38-099-234-56-78')`,
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
    (1, 'Awesome company')`,
    `INSERT INTO customers
    (id, name) VALUES
    (1, 'Intex'),
    (2, 'Bestway')`,
    `INSERT INTO products
    (id, name) VALUES
    (1, 'Swimming pool'),
    (2, 'Filter pump'),
    (3, 'Filter cartridge')`
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
  dataMod('acc')
} catch (err) {
  console.log(err.message)
}
