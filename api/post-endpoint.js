export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed'
    });
  }

  const requestApiKey = req.headers['x-api-key']?.trim();
  const secret = process.env.API_KEY;
  
  if (requestApiKey !== secret) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden'
    });
  }

  const onlyEven = req.query.only_even === 'true';
  const body = req.body;

  if (onlyEven && body.lpId % 2 === 1) {
    return res.status(403).json({
      success: false,
      error: 'Only even lastProcessedId allowed!'
    });
  }

  res.status(200).json({
    success: true,
    received: body
  });
}
