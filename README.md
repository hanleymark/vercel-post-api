# vercel-post-api

This project provides two POST API endpoints for secure data processing and logging, designed for deployment on Vercel.

## Endpoints

### 1. `/api/post-endpoint`

**Method:** `POST`  
**Description:**  
Processes incoming requests with validation and optional restrictions based on query parameters.

**Headers:**
- `x-api-key`: Required. Must match the server's `API_KEY` environment variable.

**Query Parameters:**
- `fail_on_multiple` (optional): If set, requests with `lastProcessedId` as a multiple of this integer will be rejected.

**Body Example:**
```json
{
  "header": {
    "lastProcessedId": 123
  }
}
```

**Responses:**
- `200 OK`: Success.
- `400 Bad Request`: Invalid input (e.g., non-integer values).
- `403 Forbidden`: Invalid or missing API key, or restricted multiple.
- `405 Method Not Allowed`: Only POST requests are accepted.

---

### 2. `/api/cn-process-log`

**Method:** `POST`  
**Description:**  
Accepts log entries and prints them to the server console.

**Headers:**
- `x-api-key`: Required. Must match the server's `API_KEY` environment variable.

**Body:**  
Any JSON object representing the log entry.

**Responses:**
- `200 OK`: Log entry received.
- `403 Forbidden`: Invalid or missing API key.
- `405 Method Not Allowed`: Only POST requests are accepted.

---

## Environment Variables

- `API_KEY`: The secret key required in the `x-api-key` header for all requests.

## Deployment

This API is designed for deployment on [Vercel](https://vercel.com/).  
See [vercel.json](vercel.json) for configuration.