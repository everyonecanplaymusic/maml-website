#!/bin/sh
# stamp.sh — give every local .js/.css that a stamped page loads a
# ?v=<content hash>, so a changed file reaches visitors at once.
#
# Why: maml.us (Cloudflare) always re-sends HTML (max-age=0) but lets
# browsers keep .js/.css for 4 hours (max-age=14400, the zone's Browser
# Cache TTL). Without a version, an edit to facts-data.js stays invisible
# for up to 4h to anyone who opened the page recently. A new ?v= is a new
# URL, so the browser fetches it immediately.
#
#   sh stamp.sh           rewrite the ?v= stamps in every page in PAGES
#   sh stamp.sh --check   exit 1 if any stamp is stale (used by the
#                         pre-commit hook — see CLAUDE.md)
#
# PAGES is the list of stamped pages; other pages still have the 4h lag.
# A ref is resolved against its page's own folder (../styles.css works).
# The stamps are AUTO-GENERATED — never edit a ?v= by hand.
set -e
cd "$(dirname "$0")"
PAGES="facts/index.html courses.html courses-students.html courses-teacher.html"
stale=0
for page in $PAGES; do
  dir=$(dirname "$page")
  for ref in $(grep -o -E '(src|href)="[^"?]+\.(js|css)(\?v=[0-9a-f]+)?"' "$page" | sed -E 's/^(src|href)="//; s/"$//; s/\?v=.*//'); do
    [ -f "$dir/$ref" ] || continue                # only local files
    hash=$(shasum -a 1 "$dir/$ref" | cut -c1-8)
    want="$ref?v=$hash"
    if grep -q "\"$want\"" "$page"; then continue; fi
    stale=1
    if [ "$1" = "--check" ]; then
      echo "stale: $page → $ref (want ?v=$hash) — run: sh stamp.sh"
    else
      REF="$ref" WANT="$want" perl -pi -e 's/"\Q$ENV{REF}\E(\?v=[0-9a-f]+)?"/"$ENV{WANT}"/g' "$page"
      echo "stamped $page → $want"
    fi
  done
done
[ "$1" = "--check" ] && [ "$stale" = 1 ] && exit 1
exit 0
