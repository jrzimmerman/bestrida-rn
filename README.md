## Bestrida

[![Build Status](https://travis-ci.org/jrzimmerman/bestrida-rn.svg?branch=master)](https://travis-ci.org/jrzimmerman/bestrida-rn)
[![CircleCI](https://circleci.com/gh/jrzimmerman/bestrida-rn.svg?style=svg)](https://circleci.com/gh/jrzimmerman/bestrida-rn)
[![Stories in Ready](https://badge.waffle.io/jrzimmerman/bestrida-rn.png?label=ready&title=Ready)](http://waffle.io/jrzimmerman/bestrida-rn)

# Deployment

## Make sure to bump version `npm version (major|minor|patch)` or build `npm run bump-build`

## (iOS) Deploy to Apple Store
https://facebook.github.io/react-native/docs/running-on-device.html
Set to build for a generic device
Product > Archive and follow prompt

## (Android) Deploy to Google Play Store
https://facebook.github.io/react-native/docs/signed-apk-android.html
`cd android && ./gradlew assembleRelease`
The generated APK can be found under android/app/build/outputs/apk/app-release.apk, and is ready to be distributed.
Test release with: `react-native run-android --variant=release`
Deploy release to: https://play.google.com/apps/publish
