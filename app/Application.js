/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Vega.Application', {
    extend: 'Ext.app.Application',
    
    name: 'Vega',

    stores: [
        // TODO: add global / shared stores here
        'NavigationTree' , 'Components', 'Colors', 'Vendors', 'RawMatTypes', 'Warehouses'
    ],

    controllers: [
        'Root'
    ],

    views: [
        'authentication.Login', 'main.Main'
    ],

    appready: true,
    user: {name: 'user'},

    defaultToken: 'dashboard',
    enableQuickTips: true,

    init: function(){
        var me = this;
        console.log('Application.js - init method');

        //this.setGlyphFontFamily('Pictos');

        /*
        me.splashscreen = Ext.getBody().mask(
            'Loading application, Please wait...', 'splashscreen'
        );

        me.splashscreen.addCls('splashscreen');

        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
            cls: 'x-splash-icon'
        });
        */
    },

    launch: function () {
        // TODO - Launch the application
        console.log('Application.js - launch method');

        Ext.Ajax.timeout = 3600000;
        //Ext.tip.QuickTipManager.init();

        var me = this;

        //Ext.GlobalEvents.fireEvent('beforemainviewrender');

        /*Ext.Ajax.request({
            //url: '/api/Sessions',
            url: '/security/checkLogin.ashx',
            scope: this,
            success: function(response, options) {
                // decode response
                var result = Ext.decode(response.responseText);
                //console.log('checkLogin', result.data);
                // check if success flag is true
                if(result.success) {
                    // has session...add to application stack
                    //Vega.LoggedInUser = Ext.create( 'Vega.model.security.User', result.data );
                    //Ext.util.Cookies.set('loggedInUser', result.data);
                    this.onUser(
                        me.user = result.data
                    );
                    Vega.util.SessionMonitor.start();
                    console.log('login success', Vega.app.user, me.user);
                }
                // couldn't login...show error
                else {
                    console.log('login failed', me.user, Vega.app.user);
                    this.onUser();
                }
            },
            failure: function(response, options) {
                console.log(response);
                Ext.Msg.alert(response.status.toString(), response.statusText + ', an error occurred during your request. Please try again.' );
            },
            callback: function(response, opotions) {

            }
        });*/

        //var loggedIn = Ext.util.Cookies.get('loggedInUser');
    },

    onUser: function(user){
        this.appready = true;
        this.fireEvent('appready', this, user);
        //Ext.getBody().unmask();
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
