// /it/supabase-client.js
// Inserisci qui i TUOI valori presi da Settings → API
const SUPABASE_URL = "https://TUO-PROGETTO.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwY3Vzamx1bWZlYWRnYmh6aXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MTAzMTgsImV4cCI6MjA3MTk4NjMxOH0.U3cukTOaAZCPOF9f0mnyO00ghRgrzxwPx6GwqKuZmCM"; // anon public key vera

// Importa la libreria (ESM)
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Esporta il client da riusare in tutte le pagine
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
