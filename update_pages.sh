#!/bin/sh
git checkout gh-pages && git merge master && git push origin && git checkout master
