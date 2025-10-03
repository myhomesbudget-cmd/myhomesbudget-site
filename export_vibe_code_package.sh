#!/usr/bin/env bash
set -euo pipefail

# VIBE-CODE EXPERT: EXPORT PACK
# Uso:
#   1) Posizionati nella root del repo (stesso livello di package.json)
#   2) chmod +x export_vibe_code_package.sh
#   3) ./export_vibe_code_package.sh
#
# Output: vibe_code_package.zip contenente i file chiave (solo se esistono)

# Abilita glob profondi e ignora pattern senza match
shopt -s globstar nullglob

# Cartella temporanea di raccolta
DEST=".vibe_code_package_tmp"
ZIP="vibe_code_package.zip"

# Pulisce eventuali residui
rm -f "$ZIP" || true
rm -rf "$DEST" || true
mkdir -p "$DEST"

# --- CANDIDATI (file/dir) DA INCLUDERE SE PRESENTI ---
# Config
CANDIDATES=(
  "package.json"
  "pnpm-lock.yaml" "yarn.lock" "package-lock.json"
  "tailwind.config.js" "tailwind.config.cjs" "tailwind.config.ts"
  "tsconfig.json" "jsconfig.json"
  "next.config.js" "next.config.mjs" "next.config.ts"
  ".env.example"
)

# Docs & guide
CANDIDATES+=(
  "README.md"
  "docs"                # intera cartella se esiste
)

# Layout e componenti comuni
CANDIDATES+=(
  "components/Topbar.tsx" "components/Topbar.jsx" "components/Topbar.ts"
  "components/Footer.tsx" "components/Footer.jsx" "components/Footer.ts"
  "components/Layout.tsx" "components/Layout.jsx" "components/Layout.ts"
  "components/ui"         # intera cartella UI (shadcn, ecc.)
)

# Pagine (app router e pages router)
CANDIDATES+=(
  "app/page.tsx" "app/page.jsx" "app/page.ts"
  "app/(dashboard)" "app/(profile)"
  "pages/index.tsx" "pages/index.jsx" "pages/index.ts"
  "pages/dashboard.tsx" "pages/dashboard.jsx" "pages/dashboard.ts"
  "pages/profile.tsx" "pages/profile.jsx" "pages/profile.ts"
)

# Stili e utils
CANDIDATES+=(
  "styles"               # es. styles/globals.css
  "utils"                # es. utils/formatCurrency.ts
)

# --- RACCOLTA SELETTIVA ---
echo ">> Raccolgo i file chiave..."
COUNT=0
for item in "${CANDIDATES[@]}"; do
  # Espande eventuali glob (già abilitati)
  matches=( $item )
  for path in "${matches[@]}"; do
    if [[ -f "$path" ]]; then
      # file singolo: preserva la struttura di directory
      mkdir -p "$DEST/$(dirname "$path")"
      cp -a "$path" "$DEST/$path"
      echo " + file  : $path"
      ((COUNT++)) || true
    elif [[ -d "$path" ]]; then
      # directory: copia tutta la cartella
      mkdir -p "$DEST/$path"
      cp -a "$path"/. "$DEST/$path"/
      echo " + dir   : $path/**"
      ((COUNT++)) || true
    fi
  done
done

if [[ "$COUNT" -eq 0 ]]; then
  echo "!! Nessun file candidato trovato. Sei nella root del repo giusto?"
  echo "   (Deve esistere almeno package.json o una delle cartelle indicate)"
  rm -rf "$DEST"
  exit 1
fi

# --- CREA LO ZIP FINALE ---
echo ">> Creo archivio $ZIP ..."
( cd "$DEST" && zip -r "../$ZIP" . >/dev/null )
echo ">> Fatto. Creato: $ZIP"

# Cleanup temp
rm -rf "$DEST"

echo ""
echo "✅ Pronto: carica '$ZIP' nella sezione Conoscenza del Gem (Vibe-Code Expert)."
echo "Suggerimento: aggiorna lo zip solo quando cambi convenzioni o layout base."
