import TrackMixin from 'ember-google-analytics/mixins/track-transition';

export function initialize(appInstance) {
  let router;
  if (typeof appInstance.lookup === 'function') {
    router = appInstance.lookup('router:main');
  } else {
    router = appInstance.container.lookup('router:main');
  }
  router.reopen(TrackMixin);
}

export default {
  name: 'track-transition',
  initialize: initialize
};
