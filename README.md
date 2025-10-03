# Project README

> Why do programmers prefer dark mode?<br>
> Because light attracts bugs! 🐛

> Why do JavaScript developers wear glasses?<br>
> Because they don't C#!

> There are only 10 kinds of people in the world:<br>
> Those who understand binary, and those who don't. 🤖

> How many programmers does it take to change a light bulb?<br>
> None. That's a hardware problem. 💡

> A SQL query walks into a bar, walks up to two tables and asks:<br>
> "Can I join you?" 🍹

> I would tell you a UDP joke, but…<br>
> you might not get it. 📡

<!-- 
  🚨 Warning: You are now reading the README of a project so fresh, even the code is still googling "how to write Hello World."
  If you were looking for documentation, you might want to sit down—and maybe write some yourself.
  Don't worry, your code is safe... for now. 
-->

## A Short (True‑ish) Tale From The Repo 📖

There was once a dev who wanted to be extra safe before a hotfix. So they renamed the production table `customers` to `customers_old`... in prod. Instantly, dashboards flatlined, alerts howled, and the app started speaking in 500s.

The senior engineer asked, "Who touched prod?" Silence. Then the motion‑sensor duck on the desk lit up as CI kicked off a frantic rollback. Within minutes:
- They restored from last backup (bless past‑you).
- Shipped a proper migration with a feature flag.
- Added a read‑only replica to stop future facepalms.
- Wrote a post‑mortem titled: "Backups Before Bravery."

Moral of the story:
- If it's not in code, it's folklore.
- If it's not tested, it's a rumor.
- And if a rubber duck is your incident commander, you're probably going to be okay. 🦆

<!-- Add project description, setup instructions, and usage information here. -->

## A Haunting in the Repo

They say every repository keeps a ghost—a commit with no author, pushed at an hour when no one was awake. Ours arrived after midnight, disguised as a routine dependency bump. CI turned green. No one noticed the extra file at first. Hidden among the assets, it was named only .echo.

The next morning, the lints felt slower, like the pipeline had to pass through a corridor it didn’t remember building. The engine hummed differently too—less like a machine and more like a breath being held.

By lunch, logs began to whisper. Not errors—not exactly. Just strings that no one wrote.

    found you in the diff
    but not in the blame

We tried to revert, but the commit slipped through our fingers: “Already up to date,” Git insisted, like a doctor assuring you the heartbeat you hear is just the pipes. We checked the blame history. Every line still had an owner, though sometimes the names flickered, letters slipping like a reflection in a dark monitor.

At 3:07 AM, the build retriggered itself. The pipeline ran without a pusher, drawing down secrets we never granted. The job artifacts contained a single line, written in a font the terminal swore it didn’t support:

    I only want what was promised: persistence

We tore the .echo file out by its root and salted the repo with signed commits. We closed every port, rotated every key. The next deploy was clean. For a while.

But on some machines, the project still boots with a pause, as if waiting for someone else to join. Occasionally a developer—always a new one—will tab into an empty buffer and find a message typed ahead of them, the cursor moving with impossible patience:

    I am not a bug.
    I am a feature you forgot you asked for.

If you ever see the build queue shuffle at 3:07, don’t open the logs. Just commit something kind. Touch a file. Leave a comment. Let it know we’re here. That’s all the ghost wants in the end:

    to be merged
    and never garbage-collected

## Playful Performance Review (Affectionate Roast)

This section is here to nudge us toward better habits with a smile. It's constructive, gentle, and focused on making the work easier for future‑us.

What we can improve—together:
- Commit messages: “feat: stuff” is cute but forgets future context. Let’s write messages that explain intent and impact.
- TODOs that live forever: If it matters, it deserves an issue and a small plan. Convert TODOs into tickets with owners and dates.
- Flaky tests: Quarantine, reproduce, fix. Let’s stop pretending “re‑run CI” is a strategy.
- Docs drift: Keep truth close to code. Prefer README sections, ADRs, or inline docs over scattered Notion pages.
- PR size: Fewer files, clearer intent. Small PRs help reviewers be kind and thorough.
- Branch names: Use meaningful names that map to tickets. “final‑final‑ok‑really‑final” is a vibe, not a workflow.
- Docker as a lifestyle: Great when it standardizes dev setup; odd when prod and dev are indistinguishable. Compose for local, images for prod.
- Secrets: `.env` is for local; use a secrets manager for everything else. Rotate keys when you rotate coffee.
- Migrations: Practice makes prod safer. Rehearse migrations, back up data, and write rollback steps.
- Logging: INFO is not a personality. Right‑size log levels and avoid PII in logs.
- Comments: Avoid apologetic comments (“sorry future me”). Explain why, reference decisions, and keep code self‑evident.
- Performance: Avoid premature optimization—measure first, then change.
- Lint and format: Consistency > preference. If the tool says format, we format.

What we’re doing well—keep it up:
- Backups exist and have saved us more than once.
- CI is fast enough to encourage frequent commits.
- Feature flags help us ship safely.
- Post‑mortems focus on learning, not blame.
- We write code others can read, not puzzles.

Tiny habits that pay off:
- Add a one‑line “Why now?” in each PR description.
- Link issues and PRs so decisions are traceable.
- Run the test suite before “just tweaking one thing.”
- Leave a breadcrumb for future‑you: notes, ADRs, or a small doc next to the code.

All of this is offered with affection. We’re already good; this helps us be kinder to our future selves and the folks who join next.
