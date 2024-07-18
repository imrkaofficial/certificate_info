# Certificate Expiry Checker

This project is a simple web application that allows users to check the expiration date of SSL certificates for any domain, including those with custom ports and protocols (http/https).

## Features

- Check SSL certificate expiration date for any domain
- Supports custom ports
- Handles http and https protocols

## Prerequisites

- Node.js (v12.x or higher)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/imrkaofficial/certificate_info.git
   cd cert-checker
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Start the server:

   ```bash
   node server.js
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Enter a domain with or without a port (e.g., `example.com`, `example.com:5063`, `http://example.com`, `https://example.com:5063`) and click "Check Expiry".

## Example

### Request

    GET /api/cert-expiry?domain=https://example.com:443

### Response

    {
        "domain": "https://example.com:443",
        "expiryDate": "2023-12-31T23:59:59.000Z"
    }

## Error Handling

### If the domain is not provided:

    {
        "error": "Domain is required"
    }

### If the URL format is invalid:

    {
        "error": "Invalid URL format"
    }

### If there is no certificate found:

    {
        "error": "No certificate found"
    }

### If an error occurs while fetching the certificate:

    {
        "error": "An error occurred while fetching the certificate"
    }

![Demo Image](/static/demo.png)

# License

This project is licensed under the [MIT License](/LICENSE).
