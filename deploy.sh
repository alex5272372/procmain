#!/bin/bash
cd ~/awesome-nextapp
git pull
yarn install
yarn build
pm2 restart nextapp