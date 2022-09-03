import { Decimal } from '@prisma/client/runtime'
import { Kind } from 'graphql'
import { scalarType } from 'nexus'

export * from './User'

export const DateScalar = scalarType({
  name: 'Date',
  asNexusMethod: 'date',
  description: 'Date custom scalar type',
  serialize: value => value.getTime(),
  parseValue: value => new Date(value),
  parseLiteral: ast => ast.kind === Kind.INT ? new Date(ast.value) : null
})

export const DecimalScalar = scalarType({
  name: 'Decimal',
  asNexusMethod: 'decimal',
  description: 'Decimal custom scalar type',
  serialize: value => new Decimal(value),
  parseValue: value => value.toNumber(),
  parseLiteral: ast => ast.kind === Kind.STRING ? parseFloat(ast.value) : null
})

export const JsonScalar = scalarType({
  name: 'JSON',
  asNexusMethod: 'json',
  description: 'JSON custom scalar type',
  serialize: value => JSON.stringify(value),
  parseValue: value => JSON.parse(value),
  parseLiteral: ast => ast.kind === Kind.STRING ? JSON.parse(ast.value) : null
})
