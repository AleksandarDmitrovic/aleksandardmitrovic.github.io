/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_EMAILJS_SERVICE_ID: string;
  readonly VITE_APP_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_APP_EMAILJS_PUBLIC_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
