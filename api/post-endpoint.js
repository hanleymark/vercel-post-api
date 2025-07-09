export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed'
    });
  }

  const requestApiKey = req.headers['x-api-key']?.trim();
  const secret = process.env.API_KEY?.trim();

  if (!secret) {
    return res.status(500).json({
      success: false,
      error: 'Missing API key'
    });
  }

  
  if (requestApiKey !== secret) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden'
    });
  }

  // Simulate HTTP error for odd lastProcessedId values
  const evenOnly = req.query.even_only === 'true';
  const body = req.body;
  const lastProcessedId = body?.lastProcessedId;

  if (evenOnly && lastProcessedId % 2 !== 0) {
    return res.status(403).json({
      success: false,
      error: 'Only even lastProcessedId allowed!',
      received: body
    });
  }

  res.status(200).json({
    success: true,
    received: body
  });
}
