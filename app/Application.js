/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Vega.Application', {
    extend: 'Ext.app.Application',

    stores: [
        // TODO: add global / shared stores here
        'NavigationTree', 'Styles', 'Components', 'StyleColors', 'RawColors', 'Colors', 'Bodies', 'RawMatTypes', 'Bomnos', 'Lotnos', 'Vendors', 'Customers', 'Warehouses', 'Settings'
    ],

    controllers: [
        'Root', 'Progress'
    ],

    views: [
        'pages.Error404Window', 'auth.Login', 'main.Main'
    ],

    name: 'Vega',

    defaultToken: 'dashboard',
    enableQuickTips: true,
    glyphFontFamily: 'Pictos',

    config: {
        appready: false,
        user: null,
        prevNode: null,
        sp: null
    },

    init: function(){
        var me = this;
        Ext.tip.QuickTipManager.init();
        //this.setGlyphFontFamily('Pictos');

        me.splashscreen = Ext.getBody().mask(
            'Loading application, Please wait...', 'splashscreen'
        );

        me.splashscreen.addCls('splashscreen');

        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
            cls: 'x-splash-icon'
        });

        /*
        //Fires before a network request is made to retrieve a data object.
        Ext.Ajax.on('beforerequest', function (con, opt) {

            //To show the mask
            Ext.getBody().mask('Server loading... Please wait');

        }, this);

        //Fires if the request was successfully completed and hide the mask.
        Ext.Ajax.on('requestcomplete', function (con, res, opt) {

            //To hide the mask
            Ext.getBody().unmask();

        }, this);

        //Fires if an error HTTP status was returned from the server  and hide the mask.
        Ext.Ajax.on('requestexception', function (con, response, opt) {

            //To hide the mask
            Ext.getBody().unmask();

        }, this);
        */

        console.log('Application.js - init method');
    },

    launch: function () {
        // TODO - Launch the application

        var me = this;

        Ext.Ajax.timeout = 900000;
        //Ext.tip.QuickTipManager.init();
        //Ext.GlobalEvents.fireEvent('beforemainviewrender');

        /*
        var sp = Ext.create('Ext.state.LocalStorageProvider');
        Ext.state.Manager.setProvider(sp);

        sp.on('statechange', function(sp, key, value){
            console.log('statechange', key, value);
        });
        */

        Ext.Ajax.request({
            url: '/api/Sessions',
            //url: '/security/checkLogin.ashx',
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
                    Ext.getStore('Settings').load();

                    me.onUser(
                        Vega.user = Ext.create('Vega.model.auth.User', result.data)
                    );

                    Vega.util.SessionMonitor.start();
                }
                // couldn't login...show error
                else {
                    console.log('login failed', me.user, Vega.user);
                    this.onUser();
                }
            },
            failure: function(response, options) {
                //console.log(response);
                Ext.Msg.alert(response.statusText, response.status + ' - ' + response.responseText );
            },
            callback: function(response, opotions) {
                //console.log('checkLogin - callback', response);
            }
        });

        console.log('Application.js - launch method');
        //var loggedIn = Ext.util.Cookies.get('loggedInUser');
    },

    onUser: function(user){

        Vega.app.setAppready(true);
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
