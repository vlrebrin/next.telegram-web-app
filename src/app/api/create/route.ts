import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from'../../../lib/conf-data'

export default function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { user } = req.body;
    // const user: Prisma.UserCreateInput = JSON.parse(req.body);
    const savedUser = prisma.user.create({
      data: user
    });
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' })
  }

}