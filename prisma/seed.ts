import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import * as fs from 'fs'
import * as path from 'path'
import users from './data/users.json'

const prisma = new PrismaClient()

const crypt = (pass: string) => bcrypt.hashSync(pass, bcrypt.genSaltSync(10))

const mapElement = (element: any): any => {
  const resEl: Record<string, unknown> = {}

  for (const key in element) {
    if (key.substring(0, 1) === '_')
      resEl[key.substring(1)] = eval(element[key] as string)

    else if (key.substring(0, 1) === '/')
      resEl[key.substring(1)] = fs.readFileSync(path.join(__dirname, ...element[key]), 'utf8')

    else if (Array.isArray(element[key]))
      resEl[key] = mapData(element[key])

    else if (typeof element[key] === 'object' && element[key] !== null)
      resEl[key] = mapElement(element[key])

    else
      resEl[key] = element[key]
  }
  return resEl
}

const mapData = (data: any[]): any[] => {
  const resData = []

  for (const element of data) {
    if (Array.isArray(element))
      resData.push(mapData(element))

    else if (typeof element === 'object' && element !== null)
      resData.push(mapElement(element))

    else
      resData.push(element)
  }
  return resData
}

const main = async () => {
  const usersData = mapData(users)
  for (const data of usersData) await prisma.user.create({ data })
  console.log('Users creation completed')
}

main()
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
