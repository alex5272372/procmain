const { Client } = require('pg')

async function dataDef(dbName) {
  process.env.PGUSER = 'postgres'
  process.env.PGHOST = 'procmain.eu'
  process.env.PGPASSWORD = 'FS9final'
  process.env.PGPORT = 5432
  let client = new Client()

  let queries = [
    `DROP DATABASE IF EXISTS ${dbName}`,
    `CREATE DATABASE ${dbName}`
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

  process.env.PGDATABASE = dbName
  client = new Client()

  queries = [
    'CREATE TABLE users (id SERIAL PRIMARY KEY, name varchar(50))',
    'CREATE TABLE roles (id SERIAL PRIMARY KEY, name varchar(50))',
    'CREATE TABLE groups (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users (id), role_id INTEGER REFERENCES roles (id))',
    'CREATE TABLE organizations (id SERIAL PRIMARY KEY, name varchar(50))',
    'CREATE TABLE customers (id SERIAL PRIMARY KEY, name varchar(50))',
    'CREATE TABLE products (id SERIAL PRIMARY KEY, name varchar(50))'
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
