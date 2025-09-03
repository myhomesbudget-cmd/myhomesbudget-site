// /it/supabase-client.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const url  = window.__SUPABASE_URL__  || "https://upcusjlumfeadgbhziwq.supabase.co";
const key  = window.__SUPABASE_ANON__ || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwY3Vzamx1bWZlYWRnYmh6aXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MTAzMTgsImV4cCI6MjA3MTk4NjMxOH0.U3cukTOaAZCPOF9f0mnyO00ghRgrzxwPx6GwqKuZmCM";

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

