<script type="module">
// === CONFIGURA QUI con i tuoi valori ===
const SUPABASE_URL = "https://upcusjlumfeadgbhziwq.supabase.co";       // il tuo Project URL
const SUPABASE_ANON_KEY = "sb_publishable_HmEbBow...";                 // la tua Publishable Key
// ======================================

// Importa la libreria Supabase
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Esporta client da riusare in altre pagine
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
</script>
