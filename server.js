const express = require('express');
const tls = require('tls');
const { URL } = require('url');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use('/static', express.static('static'));

app.get('/api/cert-expiry', async (req, res) => {
    const { domain } = req.query;

    if (!domain) {
        return res.status(400).json({ error: 'Domain is required' });
    }

    let parsedUrl;
    try {
        parsedUrl = new URL(domain);
    } catch (error) {
        return res.status(400).json({ error: 'Invalid URL format' });
    }

    const hostname = parsedUrl.hostname;
    const tlsPort = parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80);

    const options = {
        host: hostname,
        port: tlsPort,
        servername: hostname,
    };

    const socket = tls.connect(options, () => {
        const cert = socket.getPeerCertificate();

        if (!cert || Object.keys(cert).length === 0) {
            return res.status(400).json({ error: 'No certificate found' });
        }

        const expiryDate = new Date(cert.valid_to);

        res.json({ domain: parsedUrl.href, expiryDate });
        socket.end();
    });

    socket.on('error', (error) => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the certificate' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
