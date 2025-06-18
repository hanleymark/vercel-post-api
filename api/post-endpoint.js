export default function handler(req, res) {
    console.log(JSON.stringify(req));
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const token = req.headers['x-api-key'];
    if (token !== 'TOPSECRET') {
        return res.status(403).send('Forbidden');
    }

    const data = req.body;
    console.log('Received:', data);

    res.status(200).json({ received: true });
}
