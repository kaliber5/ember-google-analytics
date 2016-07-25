import Ember from 'ember';

const { inject, on } = Ember;

export default Ember.Mixin.create({
  googleAnalytics: inject.service(),
  _track: on('didTransition', function() {
    this.get('googleAnalytics').track(this.get('url'));
  })

});
