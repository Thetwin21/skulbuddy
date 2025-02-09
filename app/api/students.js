// pages/api/students.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('your-db-name');

  const students = await db.collection('users').find({ role: 'student' }).toArray();
  res.status(200).json(students);
}