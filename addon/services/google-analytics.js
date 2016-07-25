import Ember from 'ember';
import getOwner from 'ember-getowner-polyfill';

const { computed, get, isEmpty, copy } = Ember;

export default Ember.Service.extend({

  /**
   * The addon config
   *
   * @property config
   * @type object
   * @protected
   */
  config: computed(function() {
    let appConfig = getOwner(this).resolveRegistration('config:environment');
    return get(appConfig, 'ember-google-analytics');
  }),

  /**
   * The trackingId, taken from the addon config
   *
   * @property trackingId
   * @type string
   * @protected
   */
  trackingId: computed.alias('config.trackingId'),

  /**
   * The default hitType
   *
   * @property hitType
   * @type string
   * @default 'pageview'
   * @protected
   * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#hitType
   */
  hitType: 'pageview',

  /**
   * More default fields to send with every track request
   *
   * @property trackFields
   * @type object
   * @protected
   */
  trackFields: undefined,

  /**
   * The field where to put the URL from our router. Depends on the hitType: "page" for pageviews and "screenName" for
   * screenviews
   *
   * @property urlField
   * @type string
   * @protected
   */
  urlField: computed('hitType', function() {
    return this.get('hitType') === 'screenview' ? 'screenName' : 'page';
  }),

  /**
   * Sends a hit to Google Analytics
   *
   * @method track
   * @param url
   * @public
   */
  track(url, hitType = this.get('hitType'), trackFields = this.get('trackFields')) {
    const ga = window.ga;

    if (!isEmpty(url)) {
      trackFields = copy(trackFields) || {};
      trackFields[this.get('urlField')] = url;
    }

    // do not track anything if we have no trackingId set up for the current environment
    if (isEmpty(this.get('trackingId'))) {
      return;
    }

    ga('send', hitType, trackFields);
  }
});
