'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(
  prodEnv,
  {
    NODE_ENV: '"development"'
  },
  { VUE_APP_API_KEY: '"AIzaSyC7_Ur_Eijy_bqTOltbKcrf-hctWnXJilo"' },
  { VUE_APP_AUTH_DOMAIN: '"everflowing-chalice.firebaseapp.com"' },
  { VUE_APP_DATABASE_URL: '"https://everflowing-chalice.firebaseio.com"' },
  { VUE_APP_PROJECT_ID: '"everflowing-chalice"' },
  { VUE_APP_STORAGE_BUCKET: '"gs://everflowing-chalice.appspot.com"' },
  { VUE_APP_MSG_SENDER_ID: '"958762923833"' }
);
