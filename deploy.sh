#!/usr/bin/env sh

# modified from: https://cli.vuejs.org/guide/deployment.html#github-pages

# abort on errors
set -e

# build
npm run build

# copy custom 404 page
cp src/404.html docs/404.html

# navigate into the build output directory
cd docs

# if you are deploying to a custom domain
echo "zsarge.live" > CNAME

git add -A
git commit -S -m '[auto] build and deploy website'
git push

cd -