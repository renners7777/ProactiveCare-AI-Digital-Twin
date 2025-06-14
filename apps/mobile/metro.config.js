// /home/chris/Documents/ProactiveCare AI - Digital Twin /apps/mobile/metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Get the project root directory.
// __dirname is /home/chris/Documents/ProactiveCare AI - Digital Twin /apps/mobile
// So, path.resolve(__dirname, '../..') will be /home/chris/Documents/ProactiveCare AI - Digital Twin
const projectRoot = path.resolve(__dirname, '../..');
const workspaceRoot = projectRoot; // Assuming projectRoot is also the monorepo root

const config = getDefaultConfig(__dirname);

// 1. Watch all files in the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
    path.resolve(__dirname, 'node_modules'), // mobile app's own node_modules
];

// 3. Force Metro to resolve (sub)dependencies only from the `nodeModulesPaths`
config.resolver.disableHierarchicalLookup = true;

// 4. Add the 'common' package to extraNodeModules to ensure it's resolvable
// This helps if 'common' is not symlinked into mobile/node_modules
config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules, // Preserve existing extraNodeModules
    common: path.resolve(projectRoot, 'packages/common'),
};

module.exports = config;
