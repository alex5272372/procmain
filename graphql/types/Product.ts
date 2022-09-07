import { extendType, inputObjectType, intArg, nonNull, objectType } from 'nexus'
import { Context } from '../context'
import { statuses } from '../../pages/detail/product'

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.int('status')
    statuses.forEach((st: { key: string, name: string }, i: number) => {
      t.boolean(st.key, {
        resolve: source => ((source.status || 0) & 2 ** i) !== 0
      })
    })
  }
})

export const ProductsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('products', {
      type: Product,
      args: {
        limit: intArg(),
        page: intArg()
      },
      resolve: async (_source, args: any, context: Context) =>
        await context.prisma.product.findMany({
          skip: args.limit * (args.page - 1),
          take: args.limit
        })
    }),
    t.nonNull.int('productsCount', {
      resolve: async (_source, _args, context: Context) =>
        await context.prisma.product.count()
    }),
    t.field('productObject', {
      type: Product,
      args: {
        id: nonNull(intArg())
      },
      resolve: async (_source, args, context) =>
        await context.prisma.product.findUnique({ where: { id: args.id }})
    })
  }
})

export const ProductStatusesInput = inputObjectType({
  name: 'ProductStatusesInput',
  definition(t) {
    statuses.forEach((st: { key: string, name: string }) => {
      t.boolean(st.key)
    })
  }
})

export const ProductInput = inputObjectType({
  name: 'ProductInput',
  definition(t) {
    t.string('name')
    t.field('statuses', { type: ProductStatusesInput })
  }
})

export const ProductMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateProduct', {
      type: Product,
      args: { id: nonNull(intArg()), data: nonNull(ProductInput) },
      resolve: async (_source, args, context) => {
        const { statuses: dataStatuses, ...data }: any = args.data
        if (dataStatuses) {
          const dbObj = await context.prisma.product.findUnique({
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
        return await context.prisma.product.update({
          where: { id: args.id }, data
        })
      }
    }),
    t.nonNull.field('deleteProduct', {
      type: Product,
      args: { id: nonNull(intArg()) },
      resolve: async (_source, args, context) => {
        return await context.prisma.product.delete({
          where: { id: args.id }
        })
      }
    })
  }
})
