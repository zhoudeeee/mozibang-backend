import crypto from 'crypto';
const orders = new Map();                       // 内存缓存，量大了换 Redis
const SECRET = process.env.PAY_SECRET;          // 第④步填

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const { order, amount } = req.body;
  if (!order || amount < 1) return res.status(400).send('Bad order');
  const exp   = Date.now() + 365 * 24 * 3600 * 1000; // 1 年
  const sig   = crypto.createHmac('sha256', SECRET).update(order + exp).digest('base64');
  const auth  = Buffer.from(`${order}|${exp}|${sig}`).toString('base64');
  orders.set(order, auth);
  res.json({ code: 200, message: 'ok' });
};
