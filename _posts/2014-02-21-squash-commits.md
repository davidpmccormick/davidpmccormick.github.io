---
layout: post
title: Squash commits
---

1. Create a new branch from master: `git checkout -b ugly_commits_branch`
2. Commit all manner of total balls
2. Checkout master: `git checkout master`
3. Create a new branch from master: `git checkout -b rewrite_history_branch`
4. Squash-merge in the ugly stuff: `git merge --squash ugly_commits_branch`
5. Commit so it looks like you did everything right in the first place: `git commit -m "Act casual, yo!"`
