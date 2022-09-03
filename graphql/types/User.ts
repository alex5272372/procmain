import { extendType, inputObjectType, intArg, nonNull, objectType } from 'nexus'
import { Context } from '../context'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('email')
  }
})

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: User,
      args: {
        limit: intArg(),
        page: intArg()
      },
      resolve: async (_source, args: any, context: Context) =>
        await context.prisma.user.findMany({
          skip: args.limit * (args.page - 1),
          take: args.limit
        })
    }),
    t.nonNull.int('usersCount', {
      resolve: async (_source, _args, context: Context) =>
        await context.prisma.user.count()
    }),
    t.field('userObject', {
      type: User,
      args: {
        id: nonNull(intArg())
      },
      resolve: async (_source, args, context) =>
        await context.prisma.user.findUnique({ where: { id: args.id }})
    })
  }
})

export const UserInput = inputObjectType({
  name: 'UserInput',
  definition(t) {
    t.string('email')
  }
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateUser', {
      type: User,
      args: { id: nonNull(intArg()), data: nonNull(UserInput) },
      resolve: async (_source, args, context) => {
        const data: any = args.data
        return await context.prisma.user.update({
          where: { id: args.id }, data
        })
      }
    }),
    t.nonNull.field('deleteUser', {
      type: User,
      args: { id: nonNull(intArg()) },
      resolve: async (_source, args, context) => {
        return await context.prisma.user.delete({
          where: { id: args.id }
        })
      }
    })
  }
})
