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
