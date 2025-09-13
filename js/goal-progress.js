import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Riusa le env sul window se già definite, altrimenti fallback.
const SUPABASE_URL  = window.__SUPABASE_URL__  || "https://upcusjlumfeadgbhziwq.supabase.co";
const SUPABASE_ANON = window.__SUPABASE_ANON__ || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwY3Vzamx1bWZlYWRnYmh6aXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MTAzMTgsImV4cCI6MjA3MTk4NjMxOH0.U3cukTOaAZCPOF9f0mny";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

async function readGoalProgress() {
  const { data, error } = await supabase
    .from('v_goal_progress')
    .select('goal_id,title,target_amount,contributed_amount,progress_pct,remaining_amount')
    .order('title', { ascending: true })
    .limit(1);

  if (error) {
    console.error('[GoalProgress] Error:', error);
    return;
  }
  console.log('[GoalProgress] Data:', data);
}

// Esegui alla load
readGoalProgress();
