import TrackMixin from 'ember-google-analytics/mixins/track-transition';

export function initialize(appInstance) {
  let router = appInstance.lookup('router:main');
  router.reopen(TrackMixin);
}

export default {
  name: 'track-transition',
  initialize: initialize
};
