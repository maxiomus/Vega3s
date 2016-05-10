/**
 * Created by tech on 9/8/2015.
 */
Ext.define('Ext.app.route.Mixin', {
    extend : 'Ext.Mixin',

    requires : [
        'Ext.app.BaseController'
    ],

    mixinConfig : {
        id : 'route'
    },

    config : {
        routes : null
    }
}, function(Mixin) {
    Mixin.borrow(Ext.app.BaseController, ['redirectTo', 'updateRoutes', 'getBefore', 'isActive']);
});
