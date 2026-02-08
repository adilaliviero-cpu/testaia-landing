// js/supabase.js
const SUPABASE_URL = "https://SUA_URL_AQUI.supabase.co";
const SUPABASE_ANON_KEY = "SUA_CHAVE_PUBLICA_AQUI";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
