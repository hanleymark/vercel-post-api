export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).end('Method Not Allowed');
    }
  
    const token = req.headers['x-api-key']?.trim();
    if (token !== 'TOPSECRET') {
      return res.status(403).send('Forbidden');
    }
  
    const body = req.body;
  
    res.status(200).json({
      success: true,
      received: body
    });
}
  