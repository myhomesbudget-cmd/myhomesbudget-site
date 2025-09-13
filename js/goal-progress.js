<script type="module">
  import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

  // Riusa le tue env se già esistono sul window (non rompiamo nulla)
  const SUPABASE_URL = window.__SUPABASE_URL__  || "https://upcusjlumfeadgbhziwq.supabase.co";
  const SUPABASE_ANON= window.__SUPABASE_ANON__ || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwY3Vzamx1bWZlYWRnYmh6aXdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY0MTAzMTgsImV4cCI6MjA3MTk4NjMxOH0.U3cukTOaAZCPOF9f0mny";
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

  async function readGoalProgress() {
    // Se hai più goal, qui ne prendiamo uno solo (il più recente per created_at nulls last)
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
    // Non tocchiamo ancora il DOM. Nel prossimo step li mappiamo nel tuo box.
  }

  // Esegui alla load
  readGoalProgress();
</script>
