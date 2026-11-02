# Project log

Keep this up to date as you go — a few lines per work session is enough. It's much harder to reconstruct at the end.

**Team name:**
**Startup name:** Verdant
**Live site link:**

---

## Work sessions

Copy this block for each session.

### Session — 2026-11-02 — driver: not recorded

- **Goal for this session:** Replace the generic starter site with a plant watering planner and consider an initial revenue model.
- **Key prompts we gave Copilot** (paste the important ones):
  1. "i want an app that can help me remember when i should water my plants. i want to be able to add and remove plants after they die. i want to prioritize watering. i want to monetize this app by thinking of putting adds on it, but not sure if thats a good idea. I could use your advice, or maybe offer feature to rent out plant sitters."
- **What worked:** Built a prioritized plant list with add, mark-watered, remove, and browser-local saving. Added a first-pass monetization recommendation to the business case.
- **What broke, and how we fixed it:** The first behavior-test harness used separate JavaScript contexts for the starter data and app. Loading both scripts in one context fixed the test setup.
- **Committed?** no — commit message: n/a

### Session — [date] — driver: [first name]

- **Goal for this session:**
- **Key prompts we gave Copilot** (paste the important ones):
  1.
  2.
- **What worked:**
- **What broke, and how we fixed it:**
- **Committed?** yes / no — commit message:

---

## Things that broke (running list)

| Date | What went wrong | What we tried | What finally fixed it |
|---|---|---|---|
| | | | |

## What a real version would need

Everything we wanted but faked or left out — real logins, a real database, payments, security, moderation, an app, staff, etc. For each one, say **why** it's needed and roughly **how hard or expensive** you think it would be.

| Feature we faked or skipped | Why a real company would need it | How hard / expensive? |
|---|---|---|
| Push watering reminders and account sync | The prototype only stores data in one browser and shows priorities when opened; a real service needs reliable reminders and cross-device backup. | Medium: notifications, accounts, a database, and ongoing hosting/security work. |
| Plant-sitter booking marketplace | Real bookings require local sitter supply, customer support, screening, safety policies, and payment handling. | High: two-sided marketplace operations and trust/safety work. |
| | | |

## Reflection (fill in at the end)

1. What surprised you most about building software with AI?
2. Which parts were easy, and which were hard? Why do you think that is?
3. If a competitor had the same AI tool, how long would it take them to copy your site?
