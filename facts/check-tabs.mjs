// check-tabs.mjs — every tab the FACTS page links must exist in the live
// Đàn Tranh Tab app. Run after editing facts-data.js or the app's library:
//
//   node facts/check-tabs.mjs
//
// Reads TAB_APP + "scores/manifest.json" (the app's own song list) and
// checks every `score` in `tab` / `levels` materials against it.
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ctx = { window: {} };
vm.runInNewContext(readFileSync(new URL("./facts-data.js", import.meta.url), "utf8"), ctx);
const F = ctx.window.FACTS;

const manifest = await (await fetch(`${F.TAB_APP}scores/manifest.json?nc=${Date.now()}`)).json();
const ids = new Set(manifest.scores.map((s) => s.id));

let bad = 0;
for (const m of F.materials) {
  const scores = m.kind === "tab" ? [m.score] : m.kind === "levels" ? m.levels.map((l) => l.score) : [];
  for (const s of scores) {
    const ok = ids.has(s);
    if (!ok) bad++;
    console.log(`${ok ? "ok  " : "MISSING"} ${m.id.padEnd(20)} ${s}`);
  }
}
console.log(bad ? `\n${bad} tab link(s) point at songs the app doesn't have.` : `\nAll tab links resolve (${manifest.count} songs in the app).`);
process.exit(bad ? 1 : 0);
