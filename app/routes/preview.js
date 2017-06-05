import Ember from 'ember';
import WarnOnExitRouteMixin from 'exp-player/mixins/warn-on-exit-route';
import FramePlayerRoute from '../mixins/frame-player-route';

// Adapted from Experimenter preview route https://github.com/CenterForOpenScience/experimenter/blob/develop/app/routes/experiments/info/preview.js
export default Ember.Route.extend(WarnOnExitRouteMixin, FramePlayerRoute, {
    _createStudyResponse() {
        const response = this._super();
        response.setProperties({
            id: 'PREVIEW_DATA_DISREGARD'
        });
        return response.reopen({
            save() {
                console.log('Preview Data Save:', this.toJSON());
                if (this.get('completed')) {
                    var controller = Ember.getOwner(this).lookup('controller:preview');
                    controller.showPreviewData(this).then(() => {
                        // Override the WarnOnExitMixin's behavior
                        controller.set('forceExit', true);
                        // TODO transition to study detail or study create?
                        // return _this.transitionTo('experiments.info');
                    });
                    return Ember.RSVP.reject();
                } else {
                    return Ember.RSVP.resolve(this);
                }
            }});
        }
});
