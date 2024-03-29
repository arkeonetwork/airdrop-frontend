/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WALLET_CONNECT_ID: string;
  readonly VITE_ARKEO_ENDPOINT_REST: string;
  readonly VITE_ARKEO_ENDPOINT_RPC: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
