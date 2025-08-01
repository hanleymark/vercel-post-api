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

  // Simulate HTTP error for odd lastProcessedId values
  const multipleStr = req.query.fail_on_multiple;
  const multiple = multipleStr !== undefined ? parseInt(multipleStr, 10) : null;
  const failOnMultiple = !Number.isNaN(multiple);

  const body = req.body;
  const lastProcessedIdStr = body?.lastProcessedId;
  const lastProcessedId = parseInt(lastProcessedIdStr, 10);
  
  if (failOnMultiple && !Number.isInteger(lastProcessedId)) {
	return res.status(400).json({
		success: false,
		error: 'Invalid lastProcessedId',
		received: body
	});
  }

  if (failOnMultiple && lastProcessedId % multiple === 0) {
    return res.status(403).json({
      success: false,
      error: `lastProcessedId multiples of ${multiple} not allowed`,
      received: body
    });
  }

  res.status(200).json({
    "success": true,
	"failOnMultiple": failOnMultiple,
	"multiple": multiple,
	"received": body
  });
}
