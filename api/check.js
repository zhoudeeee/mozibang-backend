export default async (req, res) => {
  if (req.method !== 'GET') return res.status(405).end();
  const { order } = req.query;
  if (!order) return res.status(400).send('Missing order');
  const auth = global.orders.get(order);
  if (!auth) return res.json({ code: 404 });
  global.orders.delete(order); // 一次性
  res.json({ code: 200, auth });
};
