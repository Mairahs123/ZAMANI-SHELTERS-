// api/approve-payment.js
export default async function handler(req, res) {
    // Enable CORS so your frontend can talk to this backend function
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { paymentId } = req.body;
        const apiKey = process.env.PI_API_KEY; // This reads the secret key you saved in Vercel!

        if (!paymentId) {
            return res.status(400).json({ error: 'Missing paymentId' });
        }

        // Hit the official Pi Network API to approve the transaction automatically
        const piResponse = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await piResponse.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
