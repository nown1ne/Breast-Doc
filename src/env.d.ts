/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
// aerjnf
interface ImportMetaEnv {
  readonly SUPABASE_URL: string
  readonly SUPABASE_ANON_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}