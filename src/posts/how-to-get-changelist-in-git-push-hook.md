---
categories:
  - 编程世界
tags:
  - Git
  - Git Hooks
---

# How to Get Changelist in Git Push Hook

Git hooks is a useful tool to run scripts before or after events. We usually use it to check the format of commit message, lint our code, prevent pushing code to master branch, or run test scripts before pushing.

Sometimes we need to get the changelist in pre-push hook. It may not be as easy as you think -- It's hard to know how many commits you have been submitted since you last checking out to the new branch.

After some investigation, I've found a way to get the diff file list between the current `HEAD` and `origin/master`:

```bash
# Find the common ancestor of current hash and origin/master
# https://stackoverflow.com/questions/1549146/find-common-ancestor-of-two-git-branches
# Command inside `` will be executed and pass to the variable
common_ancestor=`git merge-base HEAD origin/master`
# --diff-filter=ACMRT Only show files which is appended, copied, modified, renamed or type-changed
changelist=`git diff $common_ancestor HEAD --name-only --diff-filter=ACMRT`
```

Posted to [gist](https://gist.github.com/xcatliu/ddc2aec4e4cde0824429477f7ea233cd)
