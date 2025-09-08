// /js/plan.js
import { supabase } from "/it/supabase-client.js";

// Rileva lingua dalla URL (/it/, /en/, /es/)
export function detectLang() {
  const m = location.pathname.match(/^\/(it|en|es)(\/|$)/i);
  return m ? m[1].toLowerCase() : "it";
}

// RPC → stato piano dell'utente loggato
export async function getPlanStatus() {
  const { data, error } = await supabase.rpc("my_plan_status");
  if (error) {
    console.warn("my_plan_status error:", error);
    return null;
  }
  return data; // { plan, status, trial_days_left }
}

// RPC → può scrivere?
export async function canWrite() {
  const { data, error } = await supabase.rpc("i_can_write");
  if (error) {
    console.warn("i_can_write error:", error);
    return false;
  }
  return !!data;
}

// Guard da chiamare PRIMA di ogni insert/update/delete
export async function assertCanWrite(src = "action") {
  const ok = await canWrite();
  if (ok) return true;

  const lang = detectLang();
  const status = await getPlanStatus();
  if (status?.plan === "starter" && status.status === "expired") {
    // paywall centralizzato
    location.href = `/${lang}/paywall.html?src=${encodeURIComponent(src)}`;
    return false;
  }
  alert("Scrittura non consentita dal piano corrente.");
  return false;
}

// Banner informativo (inserisce contenuto in #plan-banner se esiste)
export async function mountPlanBanner() {
  const host = document.getElementById("plan-banner");
  if (!host) return;

  const lang = detectLang();
  const dict = {
    it: {
      trial: (d) => `Prova attiva — ${d} giorni rimanenti.`,
      expired: "Il periodo di prova è terminato.",
      btn: "Aggiorna piano",
    },
    en: {
      trial: (d) => `Trial active — ${d} days left.`,
      expired: "Your trial has ended.",
      btn: "Upgrade plan",
    },
    es: {
      trial: (d) => `Prueba activa — ${d} días restantes.`,
      expired: "La prueba ha finalizado.",
      btn: "Mejorar plan",
    },
  };
  const t = dict[lang] || dict.it; // ✅ fix: niente riferimento a 't' prima di definirlo

  try {
    const s = await getPlanStatus();
    host.innerHTML = ""; // pulisci

    // Mostra solo per Starter (trial o scaduto). Plus/Pro → nessun banner.
    if (!s) return;
    if (s.plan === "starter" && s.status === "trial") {
      const div = document.createElement("div");
      div.className = "plan-banner plan-banner--trial";
      div.innerHTML = `
        <span>${t.trial(s.trial_days_left ?? 0)}</span>
        <button class="plan-banner__btn" type="button">${t.btn}</button>
      `;
      div.querySelector("button").onclick = () =>
        (location.href = `/${lang}/pricing.html`);
      host.appendChild(div);
    } else if (s.plan === "starter" && s.status === "expired") {
      const div = document.createElement("div");
      div.className = "plan-banner plan-banner--expired";
      div.innerHTML = `
        <span>${t.expired}</span>
        <button class="plan-banner__btn" type="button">${t.btn}</button>
      `;
      div.querySelector("button").onclick = () =>
        (location.href = `/${lang}/pricing.html`);
      host.appendChild(div);
    }
  } catch (e) {
    console.warn("mountPlanBanner error:", e);
  }

  // Stili minimi (inietta una sola volta)
  if (!document.getElementById("plan-banner-css")) {
    const style = document.createElement("style");
    style.id = "plan-banner-css";
    style.textContent = `
      .plan-banner{display:flex;gap:.75rem;align-items:center;justify-content:space-between;
        padding:.75rem 1rem;border-radius:12px;margin:.5rem 0}
      .plan-banner--trial{background:#eef2ff;color:#1e1b4b}
      .plan-banner--expired{background:#ffe4e6;color:#881337}
      .plan-banner__btn{border:0;border-radius:10px;padding:.45rem .8rem;cursor:pointer}
      .plan-banner--trial .plan-banner__btn{background:#4f46e5;color:#fff}
      .plan-banner--expired .plan-banner__btn{background:#e11d48;color:#fff}
    `;
    document.head.appendChild(style);
  }
}
