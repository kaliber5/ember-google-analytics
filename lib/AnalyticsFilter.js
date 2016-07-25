var Filter = require('broccoli-filter');

AnalyticsFilter.prototype = Object.create(Filter.prototype);
AnalyticsFilter.prototype.constructor = AnalyticsFilter;
function AnalyticsFilter(inputNode, options) {
  Filter.call(this, inputNode, {
    annotation: 'AnalyticsFilter'
  });

  this.trackingId = options.trackingId;
  this.fields = options.defaultFields || {};
  this.debug = options.debug || false;
  this.protocol = options.protocol || 'https://';
  this.trackingFile = this.debug ? 'analytics_debug.js' : 'analytics.js';
}

AnalyticsFilter.prototype.extensions = ['js'];
AnalyticsFilter.prototype.targetExtension = 'js';

AnalyticsFilter.prototype.processString = function(content, relativePath) {
  return content
    .replace(/###PROTOCOL###/g, this.protocol)
    .replace(/###FILE###/g, this.trackingFile)
    .replace(/###TRACKINGID###/g, "'" + this.trackingId + "'")
    .replace(/###FIELDS###/g, JSON.stringify(this.fields));
};

module.exports = AnalyticsFilter;