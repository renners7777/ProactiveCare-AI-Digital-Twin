/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;  
  readonly VITE_SUPABASE_PROJECT_ID?: string;
  readonly VITE_SUPABASE_DB_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
