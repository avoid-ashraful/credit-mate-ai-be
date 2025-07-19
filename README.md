# Express.js Backend Project

A simple Express.js backend server with a hello world endpoint.

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Project

Start the server:
```bash
npm start
```

For development with auto-restart:
```bash
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

- `GET /` - Returns hello world message
- `GET /hello` - Returns hello world message from /hello endpoint

## Testing

You can test the endpoints using:

**Using curl:**
```bash
curl http://localhost:3000/
curl http://localhost:3000/hello
```

**Using your browser:**
- Visit `http://localhost:3000/`
- Visit `http://localhost:3000/hello`

## Requirements

- Node.js (version 14 or higher)
- npm