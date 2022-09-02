#!/bin/bash
cd ~/pm-prod
git pull
yarn install
yarn build
pm2 restart pm-prod