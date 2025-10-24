// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add web support for reanimated
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Configure transformer for web compatibility
config.transformer.unstable_allowRequireContext = true;

module.exports = config;
