#!/bin/bash
set -e

dirty=""

if [ -n "$(git status --porcelain)" ]; then
  echo "\033[1;31mWarning: There are changes not committed.\033[0m"
  dirty=" (dirty)"
fi

git_hash=$(git rev-parse --short HEAD)
commit_msg="deploy github pages at commit: $git_hash$dirty"

rm -rf dist
npm ci
npm run build

cd dist
ln -s index.html 404.html
echo 'utils.dss886.com' > CNAME;

git init
git add -A
git commit -m "$commit_msg"
git push -f git@github.com:dss886/utils.dss886.com.git main:gh-pages

echo "\033[1;32m\nGithub Pages Deploy Success!\033[0m\n"