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

## 200 More Songs for Coding

> Eye of the Tiger — Survivor<br>
> Take Care — Drake feat. Rihanna<br>
> Hotline Bling — Drake<br>
> God’s Plan — Drake<br>
> The Less I Know The Better — Tame Impala<br>
> Let It Happen — Tame Impala<br>
> New Person, Same Old Mistakes — Tame Impala<br>
> Feel It Still — Portugal. The Man<br>
> Redbone — Childish Gambino<br>
> Awake My Soul — Mumford & Sons<br>
> Little Lion Man — Mumford & Sons<br>
> Pumped Up Kicks — Foster the People<br>
> Sit Next to Me — Foster the People<br>
> Riptide — Vance Joy<br>
> Budapest — George Ezra<br>
> Shotgun — George Ezra<br>
> Take Me to Church — Hozier<br>
> Someone New — Hozier<br>
> Work — Rihanna feat. Drake<br>
> Umbrella — Rihanna feat. Jay-Z<br>
> Diamonds — Rihanna<br>
> Rolling in the Deep — Adele<br>
> Someone Like You — Adele<br>
> Skyfall — Adele<br>
> Set Fire to the Rain — Adele<br>
> Bad Romance — Lady Gaga<br>
> Poker Face — Lady Gaga<br>
> Shallow — Lady Gaga & Bradley Cooper<br>
> Born This Way — Lady Gaga<br>
> Applause — Lady Gaga<br>
> Happy — Pharrell Williams<br>
> Freedom — Pharrell Williams<br>
> Get Lucky — Daft Punk feat. Pharrell Williams<br>
> Digital Love — Daft Punk<br>
> Around the World — Daft Punk<br>
> One More Time — Daft Punk<br>
> Blue (Da Ba Dee) — Eiffel 65<br>
> Sandstorm — Darude<br>
> The Middle — Zedd, Maren Morris, Grey<br>
> Clarity — Zedd feat. Foxes<br>
> Strobe — deadmau5<br>
> Ghosts ’n’ Stuff — deadmau5<br>
> Raise Your Weapon — deadmau5<br>
> Scary Monsters and Nice Sprites — Skrillex<br>
> Bangarang — Skrillex<br>
> Where Are Ü Now — Jack Ü feat. Justin Bieber<br>
> Lean On — Major Lazer & DJ Snake feat. MØ<br>
> Light It Up — Major Lazer feat. Nyla & Fuse ODG<br>
> Sunflower — Post Malone & Swae Lee<br>
> Circles — Post Malone<br>
> Rockstar — Post Malone feat. 21 Savage<br>
> Congratulations — Post Malone<br>
> The Hills — The Weeknd<br>
> Starboy — The Weeknd feat. Daft Punk<br>
> I Feel It Coming — The Weeknd feat. Daft Punk<br>
> Can’t Feel My Face — The Weeknd<br>
> Save Your Tears — The Weeknd<br>
> Call Me Maybe — Carly Rae Jepsen<br>
> Run Away With Me — Carly Rae Jepsen<br>
> I Really Like You — Carly Rae Jepsen<br>
> Teenage Dream — Katy Perry<br>
> Firework — Katy Perry<br>
> Dark Horse — Katy Perry feat. Juicy J<br>
> Roar — Katy Perry<br>
> Shake It Off — Taylor Swift<br>
> Blank Space — Taylor Swift<br>
> Style — Taylor Swift<br>
> Cruel Summer — Taylor Swift<br>
> Anti-Hero — Taylor Swift<br>
> Bad Blood — Taylor Swift feat. Kendrick Lamar<br>
> Delicate — Taylor Swift<br>
> All Too Well — Taylor Swift<br>
> We Found Love — Rihanna feat. Calvin Harris<br>
> Summer — Calvin Harris<br>
> Feel So Close — Calvin Harris<br>
> Slide — Calvin Harris feat. Frank Ocean & Migos<br>
> This Is What You Came For — Calvin Harris & Rihanna<br>
> Blurred Lines — Robin Thicke feat. T.I. & Pharrell<br>
> Suit & Tie — Justin Timberlake feat. Jay-Z<br>
> SexyBack — Justin Timberlake<br>
> Mirrors — Justin Timberlake<br>
> Rock Your Body — Justin Timberlake<br>
> Numb/Encore — Jay-Z & Linkin Park<br>
> 99 Problems — Jay-Z<br>
> Empire State of Mind — Jay-Z feat. Alicia Keys<br>
> No One — Alicia Keys<br>
> If I Ain’t Got You — Alicia Keys<br>
> Girl on Fire — Alicia Keys<br>
> Valerie — Mark Ronson feat. Amy Winehouse<br>
> Back to Black — Amy Winehouse<br>
> Rehab — Amy Winehouse<br>
> Tears Dry on Their Own — Amy Winehouse<br>
> Stronger Than Me — Amy Winehouse<br>
> Hometown Glory — Adele<br>
> Don’t Look Back in Anger — Oasis<br>
> Champagne Supernova — Oasis<br>
> Live Forever — Oasis<br>
> Bittersweet Symphony — The Verve<br>
> Lucky Man — The Verve<br>
> Love Is Noise — The Verve<br>
> Everlong (Acoustic) — Foo Fighters<br>
> Best of You — Foo Fighters<br>
> The Pretender — Foo Fighters<br>
> My Hero — Foo Fighters<br>
> Times Like These — Foo Fighters<br>
> Black — Pearl Jam<br>
> Alive — Pearl Jam<br>
> Jeremy — Pearl Jam<br>
> Even Flow — Pearl Jam<br>
> Yellow Ledbetter — Pearl Jam<br>
> Under the Bridge — Red Hot Chili Peppers<br>
> Californication — Red Hot Chili Peppers<br>
> Scar Tissue — Red Hot Chili Peppers<br>
> Dani California — Red Hot Chili Peppers<br>
> Otherside — Red Hot Chili Peppers<br>
> By the Way — Red Hot Chili Peppers<br>
> Snow (Hey Oh) — Red Hot Chili Peppers<br>
> Dreams — The Cranberries<br>
> Zombie — The Cranberries<br>
> Linger — The Cranberries<br>
> Just Like Heaven — The Cure<br>
> Friday I’m in Love — The Cure<br>
> Lovesong — The Cure<br>
> Boys Don’t Cry — The Cure<br>
> Close to Me — The Cure<br>
> Don’t You Want Me — The Human League<br>
> Tainted Love — Soft Cell<br>
> Sweet Dreams (Are Made of This) — Eurythmics<br>
> Here Comes the Rain Again — Eurythmics<br>
> Enjoy the Silence — Depeche Mode<br>
> Personal Jesus — Depeche Mode<br>
> Policy of Truth — Depeche Mode<br>
> Just Can’t Get Enough — Depeche Mode<br>
> Bizarre Love Triangle — New Order<br>
> Regret — New Order<br>
> True Faith — New Order<br>
> Ceremony — New Order<br>
> Love Will Tear Us Apart — Joy Division<br>
> Shadowplay — Joy Division<br>
> Transmission — Joy Division<br>
> Mr. Blue Sky — Electric Light Orchestra<br>
> Don’t Bring Me Down — Electric Light Orchestra<br>
> Livin’ on a Prayer — Bon Jovi<br>
> You Give Love a Bad Name — Bon Jovi<br>
> It’s My Life — Bon Jovi<br>
> Wanted Dead or Alive — Bon Jovi<br>
> Beat It — Michael Jackson<br>
> Thriller — Michael Jackson<br>
> Smooth Criminal — Michael Jackson<br>
> Man in the Mirror — Michael Jackson<br>
> Billie Jean — Michael Jackson<br>
> Kiss — Prince<br>
> Purple Rain — Prince<br>
> When Doves Cry — Prince<br>
> 1999 — Prince<br>
> Raspberry Beret — Prince<br>
> September — Earth, Wind & Fire<br>
> Let’s Groove — Earth, Wind & Fire<br>
> Fantasy — Earth, Wind & Fire<br>
> Boogie Wonderland — Earth, Wind & Fire<br>
> Superstition — Stevie Wonder<br>
> I Wish — Stevie Wonder<br>
> Isn’t She Lovely — Stevie Wonder<br>
> Sir Duke — Stevie Wonder<br>
> Higher Ground — Stevie Wonder<br>
> What’s Going On — Marvin Gaye<br>
> Sexual Healing — Marvin Gaye<br>
> Ain’t No Sunshine — Bill Withers<br>
> Lovely Day — Bill Withers<br>
> Lean on Me — Bill Withers<br>
> Stand by Me — Ben E. King<br>
> Unchained Melody — The Righteous Brothers<br>
> My Girl — The Temptations<br>
> Just My Imagination — The Temptations<br>
> Heard It Through the Grapevine — Gladys Knight & The Pips<br>
> Respect — Aretha Franklin<br>
> Chain of Fools — Aretha Franklin<br>
> Natural Woman — Aretha Franklin<br>
> Proud Mary — Creedence Clearwater Revival<br>
> Fortunate Son — Creedence Clearwater Revival<br>
> Have You Ever Seen the Rain — Creedence Clearwater Revival<br>
> Bad Moon Rising — Creedence Clearwater Revival<br>
> Free Fallin’ — Tom Petty<br>
> American Girl — Tom Petty & The Heartbreakers<br>
> I Won’t Back Down — Tom Petty<br>
> Learning to Fly — Tom Petty<br>
> Heroes — David Bowie<br>
> Let’s Dance — David Bowie<br>
> Life on Mars? — David Bowie<br>
> Rebel Rebel — David Bowie<br>
> Space Oddity — David Bowie<br>
> Starman — David Bowie<br>
> The Man Who Sold the World — David Bowie<br>
> Dreams — Fleetwood Mac<br>
> Go Your Own Way — Fleetwood Mac<br>
> The Chain — Fleetwood Mac<br>
> Rhiannon — Fleetwood Mac<br>
> Landslide — Fleetwood Mac<br>
> Everywhere — Fleetwood Mac<br>
> Don’t Stop — Fleetwood Mac<br>
> With or Without You — U2<br>
> One — U2<br>
> Beautiful Day — U2<br>
> Sunday Bloody Sunday — U2<br>
> Where the Streets Have No Name — U2<br>
> Pride (In the Name of Love) — U2<br>
> Bitter Sweet Symphony — The Verve<br>
> There Is a Light That Never Goes Out — The Smiths<br>
> This Charming Man — The Smiths<br>
> How Soon Is Now? — The Smiths<br>
> Panic — The Smiths<br>
> Reptilia — The Strokes<br>
> Hard to Explain — The Strokes<br>
> Someday — The Strokes<br>
> Juicebox — The Strokes<br>
> 12:51 — The Strokes<br>
> Last Nite — The Strokes<br>
> Maps — Yeah Yeah Yeahs<br>
> Heads Will Roll — Yeah Yeah Yeahs<br>
> Zero — Yeah Yeah Yeahs<br>
> Gold Lion — Yeah Yeah Yeahs<br>
> Do I Wanna Know? — Arctic Monkeys<br>
> R U Mine? — Arctic Monkeys<br>
> I Bet You Look Good on the Dancefloor — Arctic Monkeys<br>
> Fluorescent Adolescent — Arctic Monkeys<br>
> 505 — Arctic Monkeys<br>
> No One Knows — Queens of the Stone Age<br>
> Go with the Flow — Queens of the Stone Age<br>
> Little Sister — Queens of the Stone Age<br>
> Make It Wit Chu — Queens of the Stone Age<br>
> The Sky Is a Neighborhood — Foo Fighters<br>
> Holocene — Bon Iver<br>
> Skinny Love — Bon Iver<br>
> Perth — Bon Iver<br>
> Retrograde — James Blake<br>
> The Wilhelm Scream — James Blake<br>
> Limit to Your Love — James Blake<br>
> Breathe Me — Sia<br>
> Elastic Heart — Sia<br>
> Unstoppable — Sia<br>
> Cheap Thrills — Sia<br>
> Titanium — David Guetta feat. Sia<br>
> Mi Gente — J Balvin & Willy William<br>
> Despacito — Luis Fonsi feat. Daddy Yankee<br>
> Shape of You — Ed Sheeran<br>
> Thinking Out Loud — Ed Sheeran<br>
> Photograph — Ed Sheeran<br>
> Castle on the Hill — Ed Sheeran<br>
> Galway Girl — Ed Sheeran<br>
> Bad Habits — Ed Sheeran<br>
> Counting Stars — OneRepublic<br>
> Apologize — OneRepublic<br>
> Secrets — OneRepublic<br>
> Stop and Stare — OneRepublic<br>
> If I Lose Myself — OneRepublic<br>
> Bleeding Love — Leona Lewis<br>
> Better in Time — Leona Lewis<br>
> Use Somebody — Kings of Leon<br>
> Sex on Fire — Kings of Leon<br>
> Closer — The Chainsmokers feat. Halsey<br>
> Don’t Let Me Down — The Chainsmokers feat. Daya<br>
> Paris — The Chainsmokers<br>
> Roses — The Chainsmokers<br>
> Habits (Stay High) — Tove Lo<br>
> Talking Body — Tove Lo<br>
> Stay — Zedd & Alessia Cara<br>
> The Nights — Avicii<br>
> Hey Brother — Avicii<br>
> Waiting for Love — Avicii<br>
> Levels — Avicii<br>
> Wake Me Up — Avicii<br>
> Firestone — Kygo feat. Conrad Sewell<br>
> Stole the Show — Kygo feat. Parson James<br>
> It Ain’t Me — Kygo & Selena Gomez<br>
> Freedom — Kygo feat. Zak Abel<br>
> Higher Love — Kygo & Whitney Houston<br>
> Lean On — Major Lazer & DJ Snake feat. MØ<br>
> Cold Water — Major Lazer feat. Justin Bieber & MØ<br>
> Tadow — Masego & FKJ<br>
> Lying Together — FKJ<br>
> Vincent — Don McLean<br>
> American Pie — Don McLean<br>
> The Sound of Silence — Simon & Garfunkel<br>
> Bridge Over Troubled Water — Simon & Garfunkel<br>
> Mrs. Robinson — Simon & Garfunkel<br>
> Scarborough Fair — Simon & Garfunkel<br>
> Hallelujah — Leonard Cohen<br>
> Suzanne — Leonard Cohen<br>
> Everybody Wants to Rule the World — Tears for Fears<br>
> Shout — Tears for Fears<br>
> Head Over Heels — Tears for Fears<br>
> Mad World — Tears for Fears<br>
> Don’t You (Forget About Me) — Simple Minds<br>
> Alive and Kicking — Simple Minds<br>
> Drive — The Cars<br>
> Just What I Needed — The Cars<br>
> Good Times Roll — The Cars<br>
> Heart of Glass — Blondie<br>
> Call Me — Blondie<br>
> Rapture — Blondie<br>
> One Way or Another — Blondie<br>
> Dreams — Beck<br>
> Loser — Beck<br>
> Where It’s At — Beck<br>
> E-Pro — Beck<br>
> Morning — Beck<br>
> The Suburbs — Arcade Fire<br>
> Wake Up — Arcade Fire<br>
> Ready to Start — Arcade Fire<br>
> Sprawl II (Mountains Beyond Mountains) — Arcade Fire<br>
> Reflektor — Arcade Fire<br>
> Electric Feel — MGMT<br>
> Time to Pretend — MGMT<br>
> Kids — MGMT<br>
> Congratulations — MGMT<br>
> Little Dark Age — MGMT<br>
> Midnight City — M83<br>
> Wait — M83<br>
> Outro — M83<br>
> Reunion — M83<br>
> Solitude — M83<br>
> Midnight — Coldplay<br>
> Adventure of a Lifetime — Coldplay<br>
> Paradise — Coldplay<br>
> Every Teardrop Is a Waterfall — Coldplay<br>
> A Sky Full of Stars — Coldplay<br>
> Hymn for the Weekend — Coldplay<br>
> Magic — Coldplay<br>
odfj

siofinsd
sd

Hello my name is jeff
hsoidhg
sdg
