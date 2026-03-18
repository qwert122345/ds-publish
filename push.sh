#!/bin/bash
# Quick push script - run after making changes to sync with GitHub
cd "$(dirname "$0")"
git add -A
git status
if [[ -n $(git status -s) ]]; then
  git commit -m "Update: $(date '+%Y-%m-%d %H:%M')"
  git push
  echo "Pushed to GitHub."
else
  echo "No changes to commit."
fi
