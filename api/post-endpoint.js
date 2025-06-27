export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
  
    const token = req.headers['x-api-key']?.trim();
    if (token !== 'TOPSECRET') {
      return res.status(403).send('Forbidden');
    }

    // if (req.body.lpId % 2 === 1) {
    //   return res.status(403).send('Only even lastProcessedId allowed');
    // }
  
    const body = req.body;
  
    res.status(200).json({
      success: true,
      received: body
    });
}
