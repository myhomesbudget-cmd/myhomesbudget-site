// Riusa il client Supabase già inizializzato (es. in /it/supabase-client.js)
const supabase = window.supabase;

// Usa lo schema 'app'
const db = supabase ? supabase.schema('app') : null;

if (!db) {
  console.error('[GoalProgress] Supabase client non trovato. Assicurati che /it/supabase-client.js sia caricato prima di questo file.');
} else {
  (async function readGoalProgress() {
    const { data, error } = await db
      .from('v_goal_progress')
      .select('goal_id,title,target_amount,contributed_amount,progress_pct,remaining_amount')
      .order('title', { ascending: true })
      .limit(1);

    if (error) {
      console.error('[GoalProgress] Error:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return;
    }

    console.log('[GoalProgress] Data:', data);
  })();
}
