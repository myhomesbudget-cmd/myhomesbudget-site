// === CONFIGURA QUI con i tuoi valori ===
const SUPABASE_URL = "https://upcusjlumfeadgbhziwq.supabase.co";       // il tuo Project URL
const SUPABASE_ANON_KEY = "sb_publishable_HmEbBowyomvWuvAaSzt0bw_zzAWL_Q2";                  // la tua Publishable Key
// ======================================

// Importa la libreria Supabase
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Esporta il client da riusare in altre pagine
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
