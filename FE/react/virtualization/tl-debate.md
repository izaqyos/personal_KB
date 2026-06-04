---
title: TL debate — pushing back on virt
captured: 2026-05-20
tags: [react, fe, performance, eng-management, communication]
context: FW rules page, ≤500 rows, TL pushing for virt
---

# debate: virt for the FW rules page

TL's playbook + counters. each round ends w/ a concrete ask to redirect the conversation onto measurable ground.

---

## 1. "virt is best practice / industry standard"

**TL:** every modern UI uses virt. linear, notion, gmail — they all virtualize. we should too.

**you:** they virtualize because they're rendering 50k+ items in feeds and inboxes. our page caps at 500 rules — one per row, set by PM. 'best practice' isn't context-free; it's a fit-for-purpose call. show me one of those products virtualizing their settings/admin pages with a few hundred items. they don't.

**redirect:** what's the user problem we're solving? if it's perf — let's measure first.

---

## 2. "what if we have 10k rules later?"

**TL:** we should design for scale. customers will grow.

**you:** PM scoped this at ≤500. if and when we hit 2k+, that's a re-architect anyway — server-side pagination, filter pre-query, maybe virt. premature virt won't save us from that. YAGNI.

what i will do: design row components to accept a `style` prop so virt is a drop-in later. that's the cheapest insurance — one PR, no UX cost today.

**redirect:** let's add a perf-budget gate: if mount > 100ms or scroll FPS < 50, we revisit. agree on numbers, not vibes.

---

## 3. "perf is always better with virt"

**TL:** less DOM = faster. just objectively true.

**you:** for 500 rows of ~7 cells each = 3.5k nodes. mount on an M1 is ~30ms, scroll is 60fps. that's already imperceptible. you can't be 'faster than imperceptible'.

meanwhile virt adds: ctrl+f broken, a11y regressions, flaky e2e tests, sticky header layout hacks. that's worse user-perceived perf, not better. perf is end-to-end UX, not DOM-node-count.

**redirect:** wanna profile a real build before we decide? i'll run a perf trace, you tell me what number we're optimizing for.

---

## 4. "the library does everything, it's free"

**TL:** tanstack/react-virtual is like 10 lines. it's not over-engineering.

**you:** lib is 10 lines. integration isn't. ctrl+f still breaks. tests still need scroll-into-view setup. a11y still needs `aria-rowcount`/`rowindex` plumbing. row component still needs `style` prop spread, which touches everywhere RuleRow is used — table, modal preview, drag preview, expand panel.

'10 lines to add' ≠ '10 lines of impact'. measure cost in PRs, not LOC.

**redirect:** spike it on a branch for 2 hours, count every file touched. if it's truly 1 file, fine. it won't be.

---

## 5. "ctrl+f doesn't matter, we have a search box"

**TL:** users will use our search, not ctrl+f.

**you:** in admin tools, power users *always* fall back to ctrl+f — it's muscle memory. and they cmd+F across multiple sections of the page at once, including non-table parts. our search only filters the table. they're not the same.

also: print, screenshot for ticket attachments, screen reader users, copy-paste a range. all break. that's not one paper cut, it's five.

**redirect:** let's ask 3 actual users (or support) when they last ctrl+f'd on the rules page. data > assumption.

---

## 6. "i'll handle the a11y, it's quick"

**TL:** i'll just add aria-rowcount, it's 1 line.

**you:** aria-rowcount is the easy part. the hard parts:
- focus management on scroll (focused row unmounts → focus lost → SR confused)
- keyboard nav across window boundaries (arrow keys, page up/down)
- screen reader announcement of row position
- screen reader testing — NVDA, JAWS, VoiceOver, all behave differently

who's testing this and on what cadence? if 'i'll handle it' = 'we ship without testing it' → we get a CR-level a11y bug. that's not quick, that's deferred risk.

**redirect:** show me the a11y test plan. if there isn't one, we're not ready to virt.

---

## 7. "great learning opportunity for the team"

**TL:** good chance for the team to learn virt.

**you:** agreed virt is worth knowing. but production code is not the place to learn — production code is the place to *apply* what you've learned. learning belongs in a spike, an internal tool, a katas channel.

if you want team enablement, i'll host a 30-min lunch & learn on tanstack/virtual with my demo branch. we get the knowledge without putting it on the critical path of a customer feature.

**redirect:** i'll set up the lunch & learn this sprint. ship the FW page on plain `.map()`.

---

## 8. "all the other teams are doing it"

**TL:** team X uses virt on their list. why not us?

**you:** what's their list size? what's their list shape (uniform rows? expandable? editable inline?)? we shouldn't copy patterns without copying constraints.

if team X has a 20k-row event log, virt is right for them. our FW rules page is a different shape. fit-for-purpose.

**redirect:** i'll go ask team X what their dataset looks like. if it matches ours i'll change my mind.

---

## 9. "it's a one-time investment"

**TL:** we eat the cost once, then it's free forever.

**you:** no it's not. ongoing tax:
- every new row variant (expanded, error state, loading) re-litigates the height cache
- every e2e test for a new feature needs scroll-into-view setup
- every CSS change risks breaking absolute-positioned rows
- every new dev needs to understand windowing to debug "why isn't this row showing"
- every retro of a11y bug starts with 'is it virt-related?'

it's not amortized — it's recurring. and the dataset isn't growing, so the benefit isn't recurring either.

**redirect:** let's track the time we spend maintaining virt code on a side project i ran last year. i'll pull the numbers. (or just trust me — it's nonzero.)

---

## 10. "performance is non-negotiable"

**TL:** we don't compromise on perf.

**you:** agreed — and our current measurements *don't show a perf problem*. you can't optimize what isn't slow.

what we *do* have is engineering capacity and a deadline. spending 1–2 sprints on virt + retrofit + a11y + tests means *not* doing [thing PM actually wants]. that's the real tradeoff.

**redirect:** what's the next PM priority on the board? if virt blocks it, that's the argument that lands with leadership.

---

## meta-strategy

> don't argue **against** virt. argue **for** the smallest change that solves the stated problem.

your TL wants to feel like they're shipping good engineering. give them wins they can celebrate:

1. **agree on perf budget** — concrete numbers, written down. "mount < 100ms, scroll > 50fps, < 5k DOM nodes". when 500 rows passes the budget, the conversation is over.

2. **commit to a design-for-retrofit** — `<Row>` accepts `style`. that's a real concession, costs ~10 min, gives TL the future-proofing they want.

3. **offer a spike** — "2 hours on a branch to measure". if virt's truly cheap, you've lost nothing. if it's not, the evidence kills the debate.

4. **lunch & learn** — gives TL the team-enablement story. cheaper than shipping.

5. **propose the real escalation path** — "if we hit 2k rows we revisit". put it in a comment in the code. now the future-proofing is documented without being implemented.

---

## the closing line if it gets stuck

> "i'm not against virt. i'm against virt **now**, for **this** dataset, at **this** cost. give me a perf budget we both agree on. when 500 rows fails it, i'll write the virt PR myself."

puts you on the same side. forces the debate onto measurable ground. makes them the one who has to produce evidence.

---

## supporting artifacts in this dir

- [`perf-budget.md`](./perf-budget.md) — concrete numbers to anchor the debate
- [`design-for-retrofit.md`](./design-for-retrofit.md) — code comment + Row component pattern
- [`demo.html`](./demo.html) — measured perf at 100/1k/10k/50k rows
- [`README.md`](./README.md) — full virt knowledge dump
