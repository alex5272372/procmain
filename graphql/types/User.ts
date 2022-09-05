import { extendType, inputObjectType, intArg, nonNull, objectType } from 'nexus'
import { Context } from '../context'
import { statuses } from '../../pages/detail/user'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('email')
    t.int('status')
    statuses.forEach((st: { key: string, name: string }, i: number) => {
      t.boolean(st.key, {
        resolve: source => ((source.status || 0) & 2 ** i) !== 0
      })
    })
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

export const UserStatusesInput = inputObjectType({
  name: 'UserStatusesInput',
  definition(t) {
    statuses.forEach((st: { key: string, name: string }) => {
      t.boolean(st.key)
    })
  }
})

export const UserInput = inputObjectType({
  name: 'UserInput',
  definition(t) {
    t.string('email')
    t.field('statuses', { type: UserStatusesInput })
  }
})

export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateUser', {
      type: User,
      args: { id: nonNull(intArg()), data: nonNull(UserInput) },
      resolve: async (_source, args, context) => {
        const { statuses: dataStatuses, ...data }: any = args.data
        if (dataStatuses) {
          const dbObj = await context.prisma.user.findUnique({
            where: { id: args.id },
            select: { status: true }
          })
          let status = dbObj?.status || 0
          Object.keys(dataStatuses).forEach((key: string) => {
            const index = statuses.findIndex((st: { key: string, name: string }) => st.key === key)
            if (index !== -1)
              if (dataStatuses[key] === false) status = status & ~(1 << index)
              else if (dataStatuses[key] === true) status = status | (1 << index)
          })
          data.status = status
        }
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
