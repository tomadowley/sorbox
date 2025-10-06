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

## 100 Developer Jokes

> I told my computer I needed a break—now it won’t stop sending exceptions. 💥<br>
> Why do programmers prefer nature? It has lots of trees—perfect for recursion. 🌲<br>
> I would tell you a recursion joke, but first I have to tell you a recursion joke. 🔁<br>
> Debugging: Like being the detective in a crime where you’re also the murderer. 🕵️‍♂️<br>
> A programmer’s wife tells him, “While you’re at the store, get some milk.” He never comes back. 🥛<br>
> There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors. 0️⃣1️⃣<br>
> I changed my password to “incorrect.” Now whenever I forget, it tells me: “Your password is incorrect.” 🔐<br>
> I had a problem, so I thought I’d use Java. Now I have a ProblemFactory. ☕<br>
> With great power comes great responsibility—so I use sudo. 🧑‍💻<br>
> My code doesn’t have bugs; it develops random features. 🐞<br>
> How many programmers does it take to change a light bulb? None. That’s a hardware issue. 💡<br>
> A SQL query walks into a bar and sees two tables. “Mind if I join you?” 🍸<br>
> Why do Python devs prefer snakes? They like everything being interpreted. 🐍<br>
> I tried to teach my cat Git. Now it just keeps staging mice. 🐭<br>
> The cloud is just someone else’s computer with your problems. ☁️<br>
> My boss told me to have a good day—so I went home and closed the laptop. 🏠<br>
> I use tabs for indentation—because I enjoy chaos. ↹<br>
> I use spaces for indentation—because I enjoy arguments. ␣␣<br>
> “Works on my machine” is the modern “It wasn’t me.” 🙃<br>
> I told the rubber duck my secrets; now it’s demanding stock options. 🦆<br>
> Commit messages are like diary entries you hope no one reads. 📓<br>
> If at first you don’t succeed; call it version 1.0. 🏷️<br>
> I named my dog “Async.” He never comes when you call. 🐶<br>
> Don’t worry if the code is slow—it’s just being “eventually consistent.” 🐢<br>
> I asked my compiler for help; it said: “You had me at hello world.” 👋<br>
> The best part of programming? Thinking. The worst part? Typing what you thought. ⌨️<br>
> I broke production. On the plus side, the error logs look amazing. 📈<br>
> My favorite algorithm? Searching for answers on Stack Overflow. 🔍<br>
> Code without tests is like a parachute without strings. You only notice when it’s too late. 🪂<br>
> Never trust atoms. They make up everything—including your metrics. ⚛️<br>
> You can’t spell “useless” without “UI.” Just kidding. Mostly. 🎨<br>
> I made a REST API. It’s tired now. 🛌<br>
> I told my team I was making a microservice. It turned into a microstress. 🧩<br>
> I prefer dark mode because light attracts bugs. 🦟<br>
> We don’t make mistakes—we commit them. ✅<br>
> When in doubt, blame DNS. It’s probably DNS. 🌐<br>
> My code is write-only; it’s too embarrassing to read. 🙈<br>
> I tried DevOps. Now I’m responsible for everything and nothing. 🔄<br>
> Git told me I’m in a detached HEAD state. Same, Git. Same. 🧠<br>
> If you can’t explain your code to a rubber duck, the duck will explain you to HR. 🦆<br>
> I’m not lazy; I’m just caching my energy. 🧠<br>
> I put a comment in my code: “Here be dragons.” Now I’m the dragon. 🐉<br>
> My stack is full—but my heart is empty. 🥞💔<br>
> I turned coffee into code and then back into bugs. ♻️<br>
> I asked ChatGPT to write code. It asked me for unit tests. Fair. ✅<br>
> If you think math is hard, try naming things. 🏷️<br>
> I once met a programmer who didn’t use Stack Overflow. We call them “legend.” 🏆<br>
> The sprint is two weeks. The burnout is forever. 🏃‍♂️<br>
> I use feature flags to control my emotions. 🚩<br>
> The backlog is a wish list for future stress. 📜<br>
> I wrote a function so pure it refuses side effects and compliments. 🧼<br>
> I ship on Fridays—to teach the team resilience. 📦<br>
> If code were poetry, my linter would be the harshest critic. ✍️<br>
> I refactored my life. Now it’s just more readable. 🧹<br>
> I told my manager I’d finish “soon.” We now use “soon” as a time unit. ⏳<br>
> The only thing worse than legacy code is legacy documentation. 📚<br>
> I added logging. Now I have proof I don’t understand anything. 📝<br>
> There’s no place like 127.0.0.1. 🏠<br>
> I tried pair programming. Now I have twice the opinions. 👥<br>
> My code review feedback: “Consider not.” 🛑<br>
> I created a backup strategy: hope and prayer. 🙏<br>
> “Temporary fix” is the longest-lived creature in production. 🦖<br>
> I wrote an optimization that made everything worse—much faster. ⚡<br>
> I love deadlines. They make a whooshing sound as they fly by. 🕒<br>
> If it compiles, ship it. If it runs, write a blog post. 📝<br>
> I added a TODO. Future me sent a resignation letter. 📨<br>
> I asked for code coverage; I got code courage. 🛡️<br>
> I don’t always test my code, but when I do, I do it in production. 🧪<br>
> The best alarm clock is a pager at 3 AM. ⏰<br>
> I built a monolith because I like commitment. 🗿<br>
> My microservice is so small it fits in a tweet. 🐦<br>
> Kubernetes: because making things simple was getting too easy. ☸️<br>
> I said I’d learn Rust. Now I have ownership of my problems. 🦀<br>
> I use Vim. My productivity is modal. 🧭<br>
> I use Emacs. My editor is an operating system. 🛠️<br>
> I joined a stand-up and sat down emotionally. 🪑<br>
> I automated my tasks; now I have more tasks. 🤖<br>
> I deployed a fix. The bug deployed feelings. 💬<br>
> I wrote a script to clean logs. Now the logs judge me. 🧽<br>
> I containerized my app. Now my problems are portable. 📦<br>
> I added retries. Now my failures are persistent. 🔁<br>
> I hate flaky tests, but they love me. 💖<br>
> The best feature: “It doesn’t crash anymore.” 🎯<br>
> I have 99 problems, but a switch case solved one. 🔄<br>
> My branch name explains nothing and everything: “wip-final-final-2.” 🌿<br>
> I used AI to write documentation. It apologized. 🤖📖<br>
> Burnout-driven development: BDD. 🔥<br>
> I implemented OAuth. Now I’m unauthorized to sleep. 🔑<br>
> I tuned the GC. Now it collects my dreams. 🧹<br>
> I tried to DRY. Now everything is brittle. 🏜️<br>
> I copy-pasted from the official docs. Still wrong. 📎<br>
> I added types. Now my feelings have interfaces. 🧩<br>
> The bus factor is one: the bus is my calendar. 🚌<br>
> I wrote a CLI. Now I talk to my computer more than my friends. 💬<br>
> I compressed my assets. My soul remains unoptimized. 🗜️<br>
> I set up CI/CD. Now I see my mistakes continuously. 🔄<br>
> I made a breaking change. It broke me. 💔<br>
> I joined a retrospective. We looked back at our regrets. 🪞<br>
> I added a feature flag named “hope.” It’s still off. 🚩<br>
> I ran a benchmark. The result: disappointment per second. 📊<br>
> I dockerized my feelings: they still leak. 🧯<br>
> I used NoSQL to store emotions. Now they’re eventually consistent. 🗂️<br>
> I wrote a migration named “final.” It wasn’t. 🗃️<br>
> My unit tests pass; my life tests fail. ✅❌<br>
> I added observability. Now I observe too much. 👀<br>
> I optimized the hot path. The cold path is lonely. 🧊<br>
> I renamed a function. Now the blame history haunts me. 👻<br>
> I documented everything except the important parts. 📖<br>
> I said “LGTM” because I was tired. It did not, in fact, look good to me. 😴<br>
> I enabled strict mode—on my emotions. ⚙️<br>
> I made a demo that only works during demos. 🎬<br>
> I added feature parity—with my hopes and dreams. 🎯<br>
> I created a backlog item: “Fix everything.” It’s still open. 📌<br>
> I did TDD: Tears-Driven Development. 😭<br>
> I wrote a linter rule that judges my lifestyle. 🧑‍⚖️<br>
> I turned off notifications. Now I fear everything. 🔕<br>
> I wrote a health check. It says I’m unhealthy. ❤️‍🩹<br>
> I use feature toggles to toggle my personality. 🎚️<br>
> I said “just a small change.” The post-mortem disagrees. 📝<br>
> I made a design doc. It designed my anxiety. 🧠<br>
> I set up monitoring. Now I’m monitored by my code. 📡<br>
> I added a cron job. It adds dread hourly. ⏱️<br>
> I wrote a wrapper. Now I’m wrapped in tech debt. 🎁<br>
> I reduced latency. Now I’m impatient. ⏩<br>
> I pushed to main. Main pushed back. 🔁<br>

bwaaaahahaah
> I renamed thdfbe repo; now Git thinks we’re strangers. 🫤<br>
> I wrote a regex to fix everythin dg; now everything is a string. 🔤<br>
> My kanban board is just a list of apologies. 🙇<br>
> I added logging at level “existential.” 🌀<br>
> I optimized startup time by never shutting down. ♾️<br>
> I enabled auto-scaling; my stress scaled too. 📈<br>
> I tried toadntadg a e er ga
wtrgw
aer b
qer hqphit qeddadfb
erg wrtgrt werere]er
gadfb
qergq
e
qå
 q
 er gßadf adf adf a
 df
 adf
 adf
  
  adf
  adg
  ad
  
> I tried to be full-stack; now I’m fully stuck. 🧱<br>
> I scheduled a meeting to discuss meetings. It recurs. 📅<br>
> I used feature branches to branch my personality. 🌿<br>
> I documented the undocumented; now it’s outdated. 🗒️<br>
> I implemented rate limiting; now my enthusiasm is throttled. 🚦<br>
> I enabled linting for thoughts; now I can’t think in tabs. 🧠↹<br>
> I added a feature called “later.” It never runs. ⏭️<br>
> I wrote a migration for feelings; it rolled back. 🔄<br>
> I containerized my worries; the image won’t build. 🧱<br>
> I set up CI for naps; pipeline stuck in “pending.” 💤<br>
> I added a spinner to motivation; still loading… 🌀<br>
> I created a monorepo for hobbies; conflicts everywhere. 🧶<br>
> I enabled autoscaling for chores; scaled to infinity. ♾️<br>
> I added health checks for joy; failing in prod. ❤️‍🩹<br>
> I wrote a cron for water; skipped on weekends. 💧<br>
> I split my problems into microservices; now they need orchestration. ☸️<br>
> I used timeouts for meetings; they still hang. ⌛<br>
> I built a locking mechanism for focus; deadlocked. 🔒<br>
> I added a circuit breaker for stress; it tripped. ⚡<br>
> I wrote a serializer for jokes; deserialized into silence. 🤐<br>
> I implemented pub/sub for ideas; no subscribers. 📬<br>
> I added a feature “Done-ish.” It’s perpetually in QA. 🧪<br>
> I used feature flags for bravery; default false. 🚩<br>
> I created a dashboard for peace; no data. 📊<br>
> I enabled sticky sessions for inspiration; still slipping. 🧠<br>
> I wrote a state machine for sleep; stuck in “awake.” 🛌<br>
> I added metrics to fun; fun dropped to zero. 📉<br>
> I turned on tracing for regrets; spans everywhere. 🧵<br>
> I made an SDK for apologies; not supported. 📦<br>
> I configured retries for hope; maxed out. 🔁<br>
> I added pagination to emails; still unread. 📧<br>
> I wrote unit tests for snacks; all passing, none available. 🍪<br>
> I implemented SSO for naps; sign-in forbidden. 🔑<br>
> I added a webhook for luck; no callback. 🪝<br>
> I used long polling for inspiration; timed out. 🕰️<br>
> I built a CDN for compliments; cache miss. 🗄️<br>
> I enabled HSTS for boundaries; still not secure. 🛡️<br>
> I made a sandbox for chaos; escaped. 🏖️<br>
> I added a feature “Do Not Disturb.” Life ignored it. 🔕<br>
> I configured rate limits for meetings; they burst. 🚦<br>
> I wrote a function “focus()”; returns None. 🧑‍💻<br>
> I built a message queue for chores; queue overflow. 📥<br>
> I added DNS for dreams; records not found. 🧾<br>
> I set TTL for worries; they never expire. ⏲️<br>
> I used immutable infrastructure for plans; can’t adapt. 🧱<br>
> I turned on gzip for complaints; still heavy. 🗜️<br>
> I added a heatmap for mistakes; it’s all red. 🌡️<br>
> I configured alerts for joy; severity “low.” 🚨<br>
> I wrote a CLI for courage; “permission denied.” 💻<br>
> I enabled optimistic UI for tasks; reality rolled back. ✨<br>
> I used blue/green deploys for rest; always blue. 🔵<br>
> I added autosave for kindness; file not found. 💾<br>
> I created a feature “Off.” It’s permanently on. 🔘<br>
> I wrote a job for hydration; skipped due to budget. 🧃<br>
> I added a firewall for procrastination; open port 25/7. 🔥<br>
> I used telemetry for happiness; signal lost. 📡<br>
> I added a linter rule: “No despair.” Build failed. 🧑‍⚖️<br>
> I wrote a daemon for chores; possessed by laziness. 👻<br>
> I enabled autosuggest for solutions; suggested naps. 💤<br>
> I configured sharding for responsibilities; still unbalanced. 🧩<br>
> I built a resolver for arguments; returns “it depends.” 🧭<br>
> I added a feature “Refactor Feelings.” PR too large. 🔧<br>
> I turned on read receipts for empathy; unread. 📨<br>
> I wrote a watcher for motivation; file not changing. 👀<br>
> I created a lockfile for commitments; conflicts ahead. 🔐<br>
> I added a seed script for hope; integrity constraint. 🌱<br>
> I implemented CQRS for chores; no queries, no commands. 🧼<br>
> I enabled strict mode for weekends; assertion failed. 🗓️<br>
> I built a bridge to burnout; crossed daily. 🌉<br>
> I added an index on priorities; still slow. 📇<br>
> I wrote a gateway for compliments; upstream unavailable. 🚪<br>
> I used gRPC for gratitude; connection reset. 🙏<br>
> I added a health endpoint for code; returns “tired.” 🩺<br>
> I configured feature parity with rest; not implemented. ⚙️<br>
> I turned on debug logs for joy; no output. 📜<br>
> I wrote a reconciler for calendars; merge conflicts. 📆<br>
> I implemented rate limiting for worries; burst exceeded. 🚦<br>
> I added a map for decisions; undefined route. 🗺️<br>
> I used retries with backoff for dreams; backoff infinite. 🔁<br>
> I built a sandbox for productivity; cat used it. 🐱<br>
> I added a validator for excuses; invalid format. ✅<br>
> I created an adapter for reality; incompatible interface. 🔌<br>
> I enabled hot reload for boundaries; changes ignored. 🔥<br>
> I set up HA for hope; single point of failure. 🧱<br>
> I wrote a generator for laughter; yields occasionally. ⚙️<br>
> I added probes for focus; readiness: false. 🧪<br>
> I turned on autoscaling for patience; scale down to zero. 📉<br>
> I made a cron for cleaning; skipped due to holidays. 🧹<br>
> I configured IAM for chores; access denied. 🔑<br>
> I built a registry for dreams; unlisted. 📚<br>
> I added a pool for ideas; drained. 🏊‍♂️<br>
> I used cached credentials for courage; expired. 🗄️<br>
> I enabled CORS for boundaries; wildcard allowed. ✨<br>
> I created an audit log for snacks; evidence missing. 📝<br>
> I added fixtures for fun; tests still failing. 🧪<br>
> I wrote an orchestrator for naps; never scheduled. 🎼<br>
> I turned on dark mode for stress; can’t see the end. 🌚<br>
> I made a reverse proxy for decisions; 502 Bad Gateway. 🧱<br>
> I added versioning to promises; breaking changes. 🔖<br>
> I built a data lake for regrets; too deep to swim. 🏞️<br>
> I used WebAuthn for boundaries; token misplaced. 🔐<br>
> I configured observability for calm; noisy by default. 👀<br>
> I wrote a feature “Silent Mode.” Bugs screamed louder. 🤫<br>
> I added a cron “Smile.” It ran at 3:07 AM. ⏰<br>
> I enabled autosave for ideas; saved as untitled. 💾<br>
> I built a reconciler for friendships; merge failed. 🤝<br>
> I created a secret for confidence; leaked immediately. 🧪<br>
> I added deduplication to chores; duplicates increased. 🔢<br>
> I turned on feature “Vacation.” Behind compliance review. 🏖️<br>
> I wrote a heartbeat for motivation; flatlined. 💓<br>
> I used canaries for stress; they all fainted. 🐤<br>
> I configured QoS for joy; best effort only. 🎯<br>
> I added rate limits for guilt; unlimited tier. 🛑<br>
> I built an adapter for peace; not compatible. 🔌<br>
> I enabled feature discovery for happiness; feature not found. 🔎<br>

## Another 200 Songs for Coding

> Dreams — Beck<br>
> Gamma Ray — Beck<br>
> Devils Haircut — Beck<br>
> Dreaming — Blondie<br>
> Heart of Glass — Blondie<br>
> Atomic — Blondie<br>
> Once in a Lifetime — Talking Heads<br>
> Psycho Killer — Talking Heads<br>
> Burning Down the House — Talking Heads<br>
> Road to Nowhere — Talking Heads<br>
> Message in a Bottle — The Police<br>
> Every Little Thing She Does Is Magic — The Police<br>
> Every Breath You Take — The Police<br>
> Roxanne — The Police<br>
> Synchronicity II — The Police<br>
> Fields of Gold — Sting<br>
> Englishman in New York — Sting<br>
> Desert Rose — Sting<br>
> In the Air Tonight — Phil Collins<br>
> Against All Odds — Phil Collins<br>
> Sussudio — Phil Collins<br>
> Easy Lover — Phil Collins & Philip Bailey<br>
> Take Me Home — Phil Collins<br>
> Land of Confusion — Genesis<br>
> Invisible Touch — Genesis<br>
> Follow You Follow Me — Genesis<br>
> Solsbury Hill — Peter Gabriel<br>
> Sledgehammer — Peter Gabriel<br>
> In Your Eyes — Peter Gabriel<br>
> Don’t Give Up — Peter Gabriel & Kate Bush<br>
> Running Up That Hill — Kate Bush<br>
> Hounds of Love — Kate Bush<br>
> Cloudbusting — Kate Bush<br>
> Wuthering Heights — Kate Bush<br>
> Babooshka — Kate Bush<br>
> Vienna — Ultravox<br>
> Dancing With Tears in My Eyes — Ultravox<br>
> True — Spandau Ballet<br>
> Gold — Spandau Ballet<br>
> Take on Me — a-ha<br>
> The Sun Always Shines on T.V. — a-ha<br>
> Hunting High and Low — a-ha<br>
> Owner of a Lonely Heart — Yes<br>
> Roundabout — Yes<br>
> Love Shack — The B-52’s<br>
> Rock Lobster — The B-52’s<br>
> Tempted — Squeeze<br>
> Black Coffee in Bed — Squeeze<br>
> Cool for Cats — Squeeze<br>
> Everybody Wants To Rule The World — Tears for Fears<br>
> Pale Shelter — Tears for Fears<br>
> Sowing the Seeds of Love — Tears for Fears<br>
> Don’t You (Forget About Me) — Simple Minds<br>
> Alive and Kicking — Simple Minds<br>
> Belfast Child — Simple Minds<br>
> The One I Love — R.E.M.<br>
> Losing My Religion — R.E.M.<br>
> Shiny Happy People — R.E.M.<br>
> Nightswimming — R.E.M.<br>
> Man on the Moon — R.E.M.<br>
> Blue Monday — New Order<br>
> Temptation — New Order<br>
> The Perfect Kiss — New Order<br>
> Love Will Tear Us Apart — Joy Division<br>
> Atmosphere — Joy Division<br>
> She’s Lost Control — Joy Division<br>
> Heroes — David Bowie<br>
> Modern Love — David Bowie<br>
> Ashes to Ashes — David Bowie<br>
> China Girl — David Bowie<br>
> Under Pressure — Queen & David Bowie<br>
> Another One Bites the Dust — Queen<br>
> Don’t Stop Me Now — Queen<br>
> Radio Ga Ga — Queen<br>
> I Want to Break Free — Queen<br>
> Tiny Dancer — Elton John<br>
> Your Song — Elton John<br>
> Rocket Man — Elton John<br>
> Bennie and the Jets — Elton John<br>
> I’m Still Standing — Elton John<br>
> Piano Man — Billy Joel<br>
> Uptown Girl — Billy Joel<br>
> The Longest Time — Billy Joel<br>
> We Didn’t Start the Fire — Billy Joel<br>
> Vienna — Billy Joel<br>
> Africa — Toto<br>
> Rosanna — Toto<br>
> Hold the Line — Toto<br>
> Don’t Stop Believin’ — Journey<br>
> Separate Ways — Journey<br>
> Open Arms — Journey<br>
> Sweet Dreams (Are Made of This) — Eurythmics<br>
> Love Is a Stranger — Eurythmics<br>
> Here Comes the Rain Again — Eurythmics<br>
> Enjoy the Silence — Depeche Mode<br>
> Personal Jesus — Depeche Mode<br>
> Policy of Truth — Depeche Mode<br>
> World in My Eyes — Depeche Mode<br>
> Just Can’t Get Enough — Depeche Mode<br>
> Drive — The Cars<br>
> Just What I Needed — The Cars<br>
> You Might Think — The Cars<br>
> The Killing Moon — Echo & The Bunnymen<br>
> Lips Like Sugar — Echo & The Bunnymen<br>
> Bring on the Dancing Horses — Echo & The Bunnymen<br>
> Under the Milky Way — The Church<br>
> Reptile — The Church<br>
> If I Should Fall From Grace With God — The Pogues<br>
> Fairytale of New York — The Pogues & Kirsty MacColl<br>
> Common People — Pulp<br>
> Disco 2000 — Pulp<br>
> Babies — Pulp<br>
> Parklife — Blur<br>
> Song 2 — Blur<br>
> Coffee & TV — Blur<br>
> Tender — Blur<br>
> Beetlebum — Blur<br>
> Don’t Look Back in Anger — Oasis<br>
> Morning Glory — Oasis<br>
> Supersonic — Oasis<br>
> Live Forever — Oasis<br>
> Champagne Supernova — Oasis<br>
> There Is a Light That Never Goes Out — The Smiths<br>
> This Charming Man — The Smiths<br>
> How Soon Is Now? — The Smiths<br>
> The Boy with the Thorn in His Side — The Smiths<br>
> Girlfriend in a Coma — The Smiths<br>
> Mr. Brightside — The Killers<br>
> When You Were Young — The Killers<br>
> All These Things That I’ve Done — The Killers<br>
> Human — The Killers<br>
> Read My Mind — The Killers<br>
> Hysteria — Muse<br>
> Starlight — Muse<br>
> Time Is Running Out — Muse<br>
> Supermassive Black Hole — Muse<br>
> Knights of Cydonia — Muse<br>
> Plug In Baby — Muse<br>
> Float On — Modest Mouse<br>
> Dashboard — Modest Mouse<br>
> The World at Large — Modest Mouse<br>
> Maps — Yeah Yeah Yeahs<br>
> Heads Will Roll — Yeah Yeah Yeahs<br>
> Zero — Yeah Yeah Yeahs<br>
> Electric Feel — MGMT<br>
> Time to Pretend — MGMT<br>
> Little Dark Age — MGMT<br>
> 1901 — Phoenix<br>
> Lisztomania — Phoenix<br>
> If I Ever Feel Better — Phoenix<br>
> Sleepyhead — Passion Pit<br>
> Take a Walk — Passion Pit<br>
> Carried Away — Passion Pit<br>
> What You Know — Two Door Cinema Club<br>
> Something Good Can Work — Two Door Cinema Club<br>
> Undercover Martyn — Two Door Cinema Club<br>
> Midnight City — M83<br>
> Wait — M83<br>
> Outro — M83<br>
> The Suburbs — Arcade Fire<br>
> Ready to Start — Arcade Fire<br>
> Sprawl II — Arcade Fire<br>
> Holocene — Bon Iver<br>
> Skinny Love — Bon Iver<br>
> Perth — Bon Iver<br>
> Yellow — Coldplay<br>
> The Scientist — Coldplay<br>
> Speed of Sound — Coldplay<br>
> Fix You — Coldplay<br>
> Viva La Vida — Coldplay<br>
> Clocks — Coldplay<br>
> Lovers in Japan — Coldplay<br>
> Chasing Cars — Snow Patrol<br>
> Run — Snow Patrol<br>
> Open Your Eyes — Snow Patrol<br>
> Somewhere Only We Know — Keane<br>
> Everybody’s Changing — Keane<br>
> Is It Any Wonder? — Keane<br>
> Take Me Out — Franz Ferdinand<br>
> Do You Want To — Franz Ferdinand<br>
> No You Girls — Franz Ferdinand<br>
> Reptilia — The Strokes<br>
> Hard to Explain — The Strokes<br>
> Last Nite — The Strokes<br>
> Someday — The Strokes<br>
> Juicebox — The Strokes<br>
> Graceland — Paul Simon<br>
> You Can Call Me Al — Paul Simon<br>
> Diamonds on the Soles of Her Shoes — Paul Simon<br>
> Big Jet Plane — Angus & Julia Stone<br>
> Paper Aeroplane — Angus & Julia Stone<br>
> Chateau — Angus & Julia Stone<br>
> Riptide — Vance Joy<br>
> Mess Is Mine — Vance Joy<br>
> Georgia — Vance Joy<br>
> Sweet Disposition — The Temper Trap<br>
> Fader — The Temper Trap<br>
> Soldier On — The Temper Trap<br>
> Dog Days Are Over — Florence + The Machine<br>
> Shake It Out — Florence + The Machine<br>
> Spectrum — Florence + The Machine<br>
> The Less I Know The Better — Tame Impala<br>
> Let It Happen — Tame Impala<br>
> Elephant — Tame Impala<br>
> New Person, Same Old Mistakes — Tame Impala<br>
> Feels Like We Only Go Backwards — Tame Impala<br>
> On Hold — The xx<br>
> Intro — The xx<br>
> Crystalised — The xx<br>
> Angels — The xx<br>
> Shelter — The xx<br>
> You & Me — Disclosure<br>
> Latch — Disclosure feat. Sam Smith<br>
> Omen — Disclosure feat. Sam Smith<br>
> White Noise — Disclosure<br>
> Sunset Lover — Petit Biscuit<br>
> Memories — Petit Biscuit<br>
> Problems — Petit Biscuit<br>
> Say My Name — ODESZA feat. Zyra<br>
> A Moment Apart — ODESZA<br>
> Line of Sight — ODESZA<br>
> Bloom — ODESZA<br>
> Higher Ground — ODESZA feat. Naomi Wild<br>
> Innerbloom — RÜFÜS DU SOL<br>
> No Place — RÜFÜS DU SOL<br>
> Treat You Better — RÜFÜS DU SOL<br>
> Desert Night — RÜFÜS DU SOL<br>
> Something to Believe In — Young the Giant<br>
> Cough Syrup — Young the Giant<br>
> My Body — Young the Giant<br>
> Tightrope — Walk the Moon<br>
> Shut Up and Dance — Walk the Moon<br>
> Anna Sun — Walk the Moon<br>
> A-Punk — Vampire Weekend<br>
> Oxford Comma — Vampire Weekend<br>
> Cape Cod Kwassa Kwassa — Vampire Weekend<br>
> Harmony Hall — Vampire Weekend<br>
> Hold On — Alabama Shakes<br>
> Don’t Wanna Fight — Alabama Shakes<br>
> Sound & Color — Alabama Shakes<br>
> The 1975 — The 1975<br>
> Somebody Else — The 1975<br>
> Love It If We Made It — The 1975<br>
> It’s Not Living (If It’s Not With You) — The 1975<br>
> Chocolate — The 1975<br>
> Stolen Dance — Milky Chance<br>
> Down by the River — Milky Chance<br>
> Flashed Junk Mind — Milky Chance<br>
> Heartbeats — José González<br>
> Stay Alive — José González<br>
> Crosses — José González<br>
> Reckoner — Radiohead<br>
> Nude — Radiohead<br>
> There There — Radiohead<br>
> Lucky — Radiohead<br>
> High and Dry — Radiohead<br>
> Fake Plastic Trees — Radiohead<br>
> Weird Fishes/Arpeggi — Radiohead<br>
> Everlong — Foo Fighters<br>
> The Pretender — Foo Fighters<br>
> Walk — Foo Fighters<br>
> Learn to Fly — Foo Fighters<br>
> Times Like These — Foo Fighters<br>
> Drive — Incubus<br>
> Wish You Were Here — Incubus<br>
> Love Hurts — Incubus<br>
> Pardon Me — Incubus<br>
> Dig — Incubus<br>
> 3AM — Matchbox Twenty<br>
> Unwell — Matchbox Twenty<br>
> Push — Matchbox Twenty<br>
> How Far We’ve Come — Matchbox Twenty<br>
> Drops of Jupiter — Train<br>
> Meet Virginia — Train<br>
> Hey Soul Sister — Train<br>
> Use Somebody — Kings of Leon<br>
> Sex on Fire — Kings of Leon<br>
> Pyro — Kings of Leon<br>
> Closer — The Chainsmokers feat. Halsey<br>
> Don’t Let Me Down — The Chainsmokers feat. Daya<br>
> Paris — The Chainsmokers<br>
> Stolen Dance — Milky Chance<br>
> Pumped Up Kicks — Foster the People<br>
> Sit Next to Me — Foster the People<br>
> Houdini — Foster the People<br>
> On Top of the World — Imagine Dragons<br>
> Radioactive — Imagine Dragons<br>
> Believer — Imagine Dragons<br>
> Demons — Imagine Dragons<br>
> Whatever It Takes — Imagine Dragons<br>
> Cool — Dua Lipa<br>
> Levitating — Dua Lipa<br>
> Physical — Dua Lipa<br>
> Don’t Start Now — Dua Lipa<br>
> New Rules — Dua Lipa<br>
> You Know I’m No Good — Amy Winehouse<br>
> Stronger Than Me — Amy Winehouse<br>
> Back to Black — Amy Winehouse<br>
> Valerie — Amy Winehouse<br>
> Rehab — Amy Winehouse<br>
> N.Y. State of Mind — Nas<br>
> The World Is Yours — Nas<br>
> If I Ruled the World — Nas feat. Lauryn Hill<br>
> C.R.E.A.M. — Wu-Tang Clan<br>
> Protect Ya Neck — Wu-Tang Clan<br>
> Ms. Jackson — OutKast<br>
> Hey Ya! — OutKast<br>
> Roses — OutKast<br>
> B.O.B — OutKast<br>
> Lose Yourself — Eminem<br>
> The Real Slim Shady — Eminem<br>
> Stan — Eminem<br>
> Humble — Kendrick Lamar<br>
> DNA. — Kendrick Lamar<br>
> Alright — Kendrick Lamar<br>
> Money Trees — Kendrick Lamar<br>
> Swimming Pools (Drank) — Kendrick Lamar<br>
> Power — Kanye West<br>
> Stronger — Kanye West<br>
> Heartless — Kanye West<br>
> Jesus Walks — Kanye West<br>
> Runaway — Kanye West<br>
> Sicko Mode — Travis Scott<br>
> Goosebumps — Travis Scott<br>
> Antidote — Travis Scott<br>
> Highest in the Room — Travis Scott<br>
> The Box — Roddy Ricch<br>
> Rockstar — DaBaby feat. Roddy Ricch<br>
> Bodak Yellow — Cardi B<br>
> I Like It — Cardi B<br>
> Super Bass — Nicki Minaj<br>
> Starships — Nicki Minaj<br>
> Work It — Missy Elliott<br>
> Get Ur Freak On — Missy Elliott<br>
> One Dance — Drake<br>
> Passionfruit — Drake<br>
> Controlla — Drake<br>
> Nonstop — Drake<br>
> God’s Plan — Drake<br>
> Formation — Beyoncé<br>
> Love on Top — Beyoncé<br>
> Halo — Beyoncé<br>
> Single Ladies — Beyoncé<br>
> Crazy in Love — Beyoncé feat. Jay-Z<br>
> Electric — Alina Baraz<br>
> Fantasy — Alina Baraz<br>
> Drift — Alina Baraz<br>
> Shelter — Porter Robinson & Madeon<br>
> Language — Porter Robinson<br>
> Divinity — Porter Robinson<br>
> Ghost Voices — Virtual Self<br>
> The Island — Pendulum<br>
> The Veldt — deadmau5 feat. Chris James<br>
> Avaritia — deadmau5<br>
> Raise Your Weapon — deadmau5<br>
> Opus — Eric Prydz<br>
> Pjanoo — Eric Prydz<br>
> Call on Me — Eric Prydz<br>
> Adagio for Strings — Tiësto<br>
> The Business — Tiësto<br>
> Red Lights — Tiësto<br>
> Levels — Avicii<br>
> The Nights — Avicii<br>
> Waiting for Love — Avicii<br>
> Sun & Moon — Above & Beyond<br>
> Thing Called Love — Above & Beyond<br>
> Blue Sky Action — Above & Beyond<br>
> Disarm You — Kaskade feat. Ilsey<br>
> I Remember — Kaskade & deadmau5<br>
> 4 AM — Kaskade<br>
> Shelter — Madeon & Porter Robinson<br>
> Icarus — Madeon<br>
> Finale — Madeon<br>
> Strobe — deadmau5<br>
> Ghosts ’n’ Stuff — deadmau5<br>
> Not Exactly — deadmau5<br>
> Say It — Flume feat. Tove Lo<br>
> Never Be Like You — Flume feat. Kai<br>
> Hyperreal — Flume<br>
> Gold — Chet Faker<br>
> 1998 — Chet Faker<br>
> Talk Is Cheap — Chet Faker<br>
> Shine — Years & Years<br>
> King — Years & Years<br>
> Desire — Years & Years<br>
> Recover — CHVRCHES<br>
> The Mother We Share — CHVRCHES<br>
> Leave a Trace — CHVRCHES<br>
> On Melancholy Hill — Gorillaz<br>
> 19-2000 — Gorillaz<br>
> Feel Good Inc. — Gorillaz<br>
> Instant Crush — Daft Punk feat. Julian Casablancas<br>
> Doin’ It Right — Daft Punk feat. Panda Bear<br>
> Aerodynamic — Daft Punk<br>

siofinsd
sd

Hello my name is jeff
hell omy name is tom
