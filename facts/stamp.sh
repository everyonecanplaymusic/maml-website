#!/bin/sh
# stamp.sh — give every local .js/.css that facts/index.html loads a
# ?v=<content hash>, so a changed file reaches students at once.
#
# Why: maml.us (Cloudflare) always re-sends HTML (max-age=0) but lets
# browsers keep .js/.css for 4 hours (max-age=14400, the zone's Browser
# Cache TTL). Without a version, an edit to facts-data.js stays invisible
# for up to 4h to anyone who opened the page recently. A new ?v= is a new
# URL, so the browser fetches it immediately.
#
#   sh facts/stamp.sh           rewrite the ?v= stamps in facts/index.html
#   sh facts/stamp.sh --check   exit 1 if any stamp is stale (used by the
#                               pre-commit hook — see CLAUDE.md)
#
# The stamps are AUTO-GENERATED — never edit a ?v= by hand.
set -e
cd "$(dirname "$0")"
HTML=index.html
stale=0
for ref in $(grep -o -E '(src|href)="[^"?]+\.(js|css)(\?v=[0-9a-f]+)?"' "$HTML" | sed -E 's/^(src|href)="//; s/"$//; s/\?v=.*//'); do
  [ -f "$ref" ] || continue                       # only local files
  hash=$(shasum -a 1 "$ref" | cut -c1-8)
  want="$ref?v=$hash"
  if grep -q "\"$want\"" "$HTML"; then continue; fi
  stale=1
  if [ "$1" = "--check" ]; then
    echo "stale: $ref (want ?v=$hash) — run: sh facts/stamp.sh"
  else
    REF="$ref" WANT="$want" perl -pi -e 's/"\Q$ENV{REF}\E(\?v=[0-9a-f]+)?"/"$ENV{WANT}"/g' "$HTML"
    echo "stamped $want"
  fi
done
[ "$1" = "--check" ] && [ "$stale" = 1 ] && exit 1
exit 0
