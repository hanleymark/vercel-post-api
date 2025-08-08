export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
    });
  }

  const requestApiKey = req.headers['x-api-key']?.trim();
  const secret = process.env.API_KEY?.trim();

  if (!secret || requestApiKey !== secret) {
    console.log(`Req API key: ${requestApiKey}, Secret: ${secret}`);
    return res.status(403).json({
      success: false,
      error: 'Forbidden or missing API key',
    });
  }

  // Log request details to console 
  console.log('--- Received log entry ---');
  console.log(JSON.stringify(req.body, null, 2));
  console.log('--------------------------');

  return res.status(200).json({
    success: true,
    message: 'Log entry received',
  });
}
