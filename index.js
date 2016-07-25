var AnalyticsFilter = require('./lib/AnalyticsFilter');

module.exports = {
  name: 'ember-google-analytics',

  treeForVendor: function(tree) {
    return new AnalyticsFilter(tree, this.options);
  },

  config: function(env, baseConfig) {
    if (!env) {
      return;
    }
    this.options = baseConfig['ember-google-analytics'] || {};
  },

  included: function(app) {
    this._super.included(app);

    if (this.options.trackingId) {
      app.import(this.options.localStorage ? 'vendor/google-analytics-local-storage.js' : 'vendor/google-analytics.js');
    }
  }

};
