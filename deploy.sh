#!/usr/bin/env sh

# modified from: https://cli.vuejs.org/guide/deployment.html#github-pages

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd docs

# if you are deploying to a custom domain
echo "zsarge.live" > CNAME

git add -A
git commit -S -m 'automatic deploy'
git push

cd -