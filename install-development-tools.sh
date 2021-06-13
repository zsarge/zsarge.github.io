#!/usr/bin/env bash 

# This script is for installing all the tools I use to work on this site.
# (I've had to do this enough times it makes sense to use a script for consistancy)

# stolen from: https://stackoverflow.com/a/4774063/10976718
SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

cd $SCRIPTPATH

npm install
sudo npm install --global @gridsome/cli

echo ""
echo "Install finished."
echo "Use `npm run-script develop` to start working with the site."