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
    return res.status(403).json({
      success: false,
      error: 'Missing API key'
    });
  }

  if (requestApiKey !== secret) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden',
    });
  }

  const multipleStr = req.query.fail_on_multiple;
  const multiple = multipleStr !== undefined ? parseInt(multipleStr, 10) : null;
  const failOnMultiple = Number.isInteger(multiple); // ✅ correct meaning

  if (multipleStr !== undefined && !failOnMultiple) {
    return res.status(400).json({
      success: false,
      error: 'Invalid multiple: must be an integer',
      received: { fail_on_multiple: multipleStr }
    });
  }

  const body = req.body;
  const lastProcessedId = parseInt(body?.lastProcessedId, 10);

  if (failOnMultiple) {
    if (!Number.isInteger(lastProcessedId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid lastProcessedId: must be an integer',
        received: body
      });
    }

    if (lastProcessedId % multiple === 0) {
      return res.status(403).json({
        success: false,
        error: `lastProcessedId multiples of ${multiple} not allowed`,
        received: body
      });
    }
  }

  res.status(200).json({
    success: true,
    received: body
  });
}
