// pages/api/admins.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('your-db-name');

  const admins = await db.collection('users').find({ role: 'admin' }).toArray();
  res.status(200).json(admins);
}