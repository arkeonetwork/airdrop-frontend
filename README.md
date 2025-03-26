# Arkeo Airdrop Frontend


## Description

This project is a React frontend application that provides a user interface for the Arkeo Airdrop.

## Prerequisites

- Node.js 18 or higher
- Yarn package manager
- Docker and Docker Compose (for containerized deployment)

## Local Development

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd arkeo-airdrop-frontend
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a `.env` file based on the `.env.example`:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   yarn dev
   ```

5. Access the application at `http://localhost:5173` (or the port shown in your terminal)

## Environment Variables

Configure these variables in your `.env` file:

| Variable                 | Description                                |
| ------------------------ | ------------------------------------------ |
| VITE_WALLET_CONNECT_ID   | WalletConnect project ID                   |
| VITE_ARKEO_ENDPOINT_REST | Arkeo REST API endpoint                    |
| VITE_ARKEO_ENDPOINT_RPC  | Arkeo RPC endpoint                         |
| VITE_THORCHAIN_SERVER    | THORChain server URL                       |
| VITE_IS_TESTNET          | Set to true for testnet, false for mainnet |

## Building for Production

To build the application for production:

```bash
yarn build
```

The built files will be in the `dist` directory, ready to be served by a web server.

## Docker Deployment

### Using Docker Compose (Recommended)

1. Make sure Docker and Docker Compose are installed on your system
2. Configure your environment variables in `.env`
3. Build and start the container:
   ```bash
   docker-compose up -d
   ```
4. Access the application at `http://localhost:3000`

### Using Docker Directly

1. Build the Docker image:

   ```bash
   docker build -t arkeo-airdrop-frontend .
   ```

2. Run the container:

   ```bash
   docker run -p 3000:80 --env-file .env arkeo-airdrop-frontend
   ```

3. Access the application at `http://localhost:3000`

## Project Structure

```
arkeo-airdrop-frontend/
├── src/                # Source code
├── public/             # Static assets
├── dist/               # Built application (after build)
├── node_modules/       # Dependencies
├── Dockerfile          # Docker configuration
├── nginx.conf          # Nginx configuration for production
├── docker-compose.yml  # Docker Compose configuration
├── vite.config.js      # Vite configuration
├── package.json        # Project dependencies and scripts
└── .env                # Environment variables (not committed to git)
```

## Scripts

- `yarn dev`: Start development server
- `yarn build`: Build for production
- `yarn lint`: Run linter
- `yarn preview`: Preview production build locally

## License

MIT

