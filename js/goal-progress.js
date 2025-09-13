// Riusa il client Supabase esistente inizializzato altrove (es. /it/supabase-client.js)
const supabase = window.supabase;

if (!supabase) {
  console.error('[GoalProgress] Supabase client non trovato. Assicurati che /it/supabase-client.js sia caricato PRIMA di questo file.');
} else {
  (async function readGoalProgress() {
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
  })();
}
