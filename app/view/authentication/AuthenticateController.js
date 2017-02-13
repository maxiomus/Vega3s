Ext.define('Vega.view.authentication.AuthenticateController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.authenticate',

    requires: [
        'Vega.util.Utils',
        'Vega.util.SessionMonitor',
        'Ext.ux.window.Notification'
    ],

    onTextFieldKeyPressed: function(field, e){

        var charCode = e.getCharCode(),
            me = this;
        if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
            (!e.shiftKey && charCode >= 65 && charCode <= 90)){
            if(me.capslockTooltip === undefined){
                me.capslockTooltip = Ext.create('widget.capslocktooltip');
            }
            me.capslockTooltip.show();
        } else {
            if(me.capslockTooltip !== undefined){
                me.capslockTooltip.hide();
            }
        }
    },

    /**
     * Handles special key press for textfield
     * @param field
     * @param e
     * @param eOpts
     */
    onTextFieldSpecialKey: function(field, e) {

        if (e.getKey() == e.ENTER) {
            this.onLoginButton();
        }
    },

    /**
     * Handles form submission for login
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    onLoginButton: function(button, e, eOpts) {
        var me = this,
            form = me.getView().down('authdialog').getForm();

        this.getView().mask('Authenticating... Pleas wait...');

        form.submit({
            clientValidation: true,
            url: '/api/Login/',
            scope: me,
            success: me.onLoginSuccess,
            failure: me.onLoginFailure,
            callback: function(options, success, response){
                //console.log(options, success, response);
            }
        });
    },

    onLoginSuccess: function(form, action) {
        var me = this,
            view = me.getView();
        // decode response
        view.unmask();
        view.close();
        //var result = Ext.decode(response.responseText);

        // check if success flag is true
        if(action.result.success) {
            // has session...add to application stack
            //Vega.LoggedInUser = Ext.create( 'Vega.model.security.User', result.data );
            //Ext.util.Cookies.set('loggedInUser', Ext.encode(result.data));
            Vega.user = Ext.create('Vega.model.authentication.User', action.result.data);
            //console.log('onLoginSuccess', action.result);
            // fire global event aftervalidateloggedin
            //Ext.GlobalEvents.fireEvent('aftervalidateloggedin');

            // Get previous location...
            var node = Vega.app.getPrevNode();
            if(node == null) {
                node = 'dashboard';
            }

            me.redirectTo(node);

            // show message
            Ext.create('Ext.ux.window.Notification', {
                position: 'br',
                useXAxis: true,
                cls: 'ux-notification-light',
                iconCls: 'ux-notification-icon-information',
                closable: false,
                title: 'Confirm',
                padding: '0 5px 0 5px',
                html: '<p>You are successfully logged in.</p>',
                slideInDuration: 800,
                slideBackDuration: 1500,
                autoCloseDelay: 4000,
                slideInAnimation: 'elasticIn',
                slideBackAnimation: 'elasticIn'
            }).show();
            // close window
            //Ext.getBody().unmask();
            Vega.util.SessionMonitor.start();
        }
        // couldn't login...show error
        else {
            Vega.util.Utils.showErrorMsg(result.msg);
            //Ext.Msg.alert('Error!', result.message);
        }
    },

    onLoginFailure: function(form, action){
        var me = this,
            view = me.getView(),
            password = view.down('textfield[name=password]');

        me.getView().unmask();

        var result = Ext.decode(action.response.responseText);

        switch (action.failureType) {
            case Ext.form.action.Action.CLIENT_INVALID:
                Vega.util.Utils.showErrorMsg('Form fields may not be submitted with invalid values');
                break;
            case Ext.form.action.Action.CONNECT_FAILURE:
                form.reset();
                Vega.util.Utils.showErrorMsg(action.response.responseText);
                break;
            case Ext.form.action.Action.SERVER_INVALID:
                password.setValue('');
                Vega.util.Utils.showErrorMsg(result.msg);
                break;
        }

        //Vega.util.Util.showErrorMsg(conn.responseText);
    }
});
