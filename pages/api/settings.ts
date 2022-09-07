import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const body = {
    database: process.env.DATABASE_URL?.split('@')[1]
  }
  res.status(200).json(body)
}
