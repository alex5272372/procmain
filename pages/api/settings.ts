import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const body = {
    name: 'Accounting platform'
  }
  res.status(200).json(body)
}
