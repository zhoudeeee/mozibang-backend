import crypto from 'crypto';

// 1. 初始化内存 Map（Vercel 每次冷启动都会重新创建）
const orders = new Map();
const SECRET = process.env.PAY_SECRET;   // 2. 环境变量

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') return res.status(405).end();
    const { order } = req.query;
    if (!order) return res.status(400).json({ code: 400, message: 'Missing order' }));

    const auth = orders.get(order);
    if (!auth) return res.json({ code: 404 }));

    orders.delete(order);   // 一次性
    return res.json({ code: 200, auth }));
  } catch (e) {
    console.error('💥 check crash:', e);
    return res.status(500).json({ code: 500, message: e.message }));
  }
}
