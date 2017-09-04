'use strict';

var path = require('path'),
    fs = require('fs'),
    nconf = require('nconf'),
    logger = require('winston'),
    env = process.env.NODE_ENV || 'development',
    root = './config/env',
    rootEnv = path.join(root, env);

/**
 * Always take the environment from `process.env.NODE_ENV`,
 * otherwhise defaults to `development`
 *
 */
nconf.overrides({
  NODE_ENV: env
});

/**
 * Load configuration in the following order (Top values take preference):
 *
 * 1. Parse from `process.argv`
 * 2. Parse from `process.env` (CURRENT: ONLY NODE_ENV)
 * 3. Parse from environment json file
 *
 * TODO: Add load of env vars from file.
 * TODO: Restrict posibles values of NODE_ENV to `production`, `development`, `test`?
 */
nconf = nconf.argv().env(['NODE_ENV']);

/**
 * Load all files in /config/env/[ENVIRONMENT]/
 */
fs.readdirSync(rootEnv).forEach(function(name) {
  var filename = path.join(rootEnv, name);
  logger.debug('%s config file loaded [%s]..', name, filename);
  nconf = nconf.file(name + '-' + env, { file: filename });
});

module.exports = nconf;
