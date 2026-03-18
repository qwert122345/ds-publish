# Design System Preview

Figma plugin to preview design tokens, components, and styles from the current file.

## GitHub Setup

### 1. Create repository on GitHub
- Go to [github.com/new](https://github.com/new)
- Repository name: e.g. `design-system-preview` or `ds-publish`
- Create repository (do not add README)

### 2. Push this project
```bash
cd Cursor/ds-publish   # or your ds-publish folder path
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/qwert122345/ds-publish.git
git push -u origin main
```

### 3. Auto-sync on update
**Option A: Run script after changes**
```bash
./push.sh
```

**Option B: Commit & push manually**
```bash
git add -A
git commit -m "Your message"
git push
```

## Features

- **Token**: Variables with collection grouping, path grouping, reference resolution
- **Component**: Components grouped by name prefix
- **Style**: Color, Text style, Effect, Grid styles

## Installation

1. In Figma: **Plugins** → **Development** → **Import plugin from manifest...**
2. Select the `manifest.json` in this folder

## Usage

- Open a Figma file with variables/components/styles
- Run the plugin
- Click Token/Component/Style tabs to switch views
- Click accordions to expand/collapse groups
- Click component chips to scroll to the node in canvas

## Development

Edit `code.js` and save. Re-run the plugin in Figma to see changes. No build step required.
