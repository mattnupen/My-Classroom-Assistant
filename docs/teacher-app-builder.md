# Add the app builder to Claude

The apps that come with My Classroom Assistant cover the common jobs. When you want one that doesn't exist yet — name cards in your own layout, a quick exit-ticket tally, a reading-group splitter — Claude can build it for you. First you add the **app builder** to Claude.

The app builder is a **skill**: an add-on that teaches Claude a new job. This one teaches it to build small classroom apps that run on your computer and never send anything anywhere. You add it once. It takes about five minutes.

## Before you start

- **Find the file.** In your My Classroom Assistant folder, next to `README.md`, there's a file called **`teacher-app-builder-skill-upload.zip`**. That's the app builder. Don't open or unzip it — you'll hand it to Claude as it is.
- **Using a school or district Claude account?** Your administrator may need to turn skills on first. If the buttons below are missing or greyed out, send them this: *"Please turn on 'Cloud code execution and file creation' and 'Skills' in Organization settings → Plugins & skills → Policy."*

## Step 1 — Turn on code execution

Skills need this setting. (On a school or district account, your administrator controls it; see above.)

1. In Claude (the desktop app or claude.ai), click your name at the bottom left, then **Settings**, then **Capabilities**.
2. Make sure **Code execution and file creation** is switched on. It only lets Claude make files for you (slides, handouts, apps); it doesn't change anything else on your computer.

## Step 2 — Add the app builder

1. Click **Customize** in the left sidebar, then **Skills**.
2. Click the **+** button, then **Create skill**, then **Upload a skill**.
3. Choose **`teacher-app-builder-skill-upload.zip`** from your My Classroom Assistant folder.
4. **teacher-app-builder** now appears in your list of skills. Make sure the switch next to it is **on**.

That's it. Skills you add to your Claude account also show up in Cowork — there's nothing separate to do there.

## Step 3 — Check that it worked

1. Start a **new** Cowork chat with your My Classroom Assistant folder selected.
2. Type: **build me an app**
3. **What should happen:** Claude asks what you'd like the app to help you do, with an example answer. No code, no talk of files.

When it's done building, your new app is in **Class Tools**, in the sidebar under **Your apps**. Every app that reads your class list has a **Try it with a made-up class** button — use it first.

## If it didn't work

| What you see | What to do |
|---|---|
| No **Skills** under Customize, or it's greyed out | Code execution is off. Do Step 1. On a school or district account, ask your administrator (message above). |
| The upload fails | Make sure you chose the `.zip` file itself. If your computer unzipped it into a folder, don't zip that folder yourself — get a fresh copy of the `.zip` from your My Classroom Assistant download. |
| No **Upload a skill** option | Your organization may have turned off adding your own skills. Ask your administrator. |
| Claude says it needs an add-on first, or starts building without asking you anything | Check the switch next to **teacher-app-builder** is on, then start a fresh chat and try: **use the app builder to build me an app** |
| Claude says it builds apps into your classroom assistant folder | The chat isn't in your My Classroom Assistant folder. Start a new chat with that folder selected. |

These menu names come from Anthropic's help page [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude) (checked September 2026). If Claude's menus have changed, that page has the current steps.

## Updating the app builder

When My Classroom Assistant updates, the app builder sometimes does too. To swap in the new one: **Customize → Skills**, click **teacher-app-builder**, click the **…** button, choose **Delete**, then do Step 2 again with the new `.zip`. Apps you've already built aren't affected.

## What it will never do

Every app it builds follows the same four rules as the apps that came with the project: it's a single file; it never sends anything off your computer; it never saves your students' information in the browser; and it only gives you things to print, download, or copy. If you ask for something that would break one of these, Claude tells you in plain words and offers the closest safe version. This is true whichever way you share student information with Claude.

## For terminal users (Claude Code)

If you've added the app builder to your Claude account and you sign in to Claude Code with that same account, it's already there — run `/skills` to see it under "claude.ai sync" (needs Claude Code v2.1.273 or later). Otherwise, from your My Classroom Assistant folder:

```bash
unzip teacher-app-builder-skill-upload.zip -d ~/.claude/skills/
```

The zip holds a `teacher-app-builder/` folder, so this creates `~/.claude/skills/teacher-app-builder/SKILL.md`. Start a new Claude Code session in the project folder.
