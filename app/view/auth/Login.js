Ext.define('Vega.view.auth.Login', {
    extend: 'Vega.view.auth.LockingWindow',

    alias: 'widget.authlogin',

    requires: [
        'Vega.view.auth.LoginController',
        'Vega.view.auth.Dialog',
        'Vega.view.auth.CapsLockTooltip',
        'Vega.model.auth.User'
    ],

    controller: 'authlogin',

    //title: 'Let\'s Log In',
    header: false,
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'container',
                cls: 'auth-header',
                html:
                '<span class="logo fa fa-vega-logo"></span>'+
                //'<div class="title">Vega</div>'+
                '<div class="caption">bluprint</div>'
            },{
                xtype: 'authdialog',
                defaultButton : 'loginButton',
                autoComplete: true,
                bodyPadding: '20 20',
                ui: 'auth',
                //cls: 'auth-dialog',
                defaultFocus : 'textfield:first',
                header: false,
                width: 415,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },

                defaults : {
                    margin : '5 0'
                },

                items: [{
                    xtype: 'label',
                    text: 'Sign into your account'
                },
                {
                    xtype: 'textfield',
                    //cls: 'auth-textbox',
                    name: 'userid',
                    //bind: '{userid}',
                    hideLabel: true,
                    allowBlank : false,
                    height: 55,
                    minLength: 3,
                    emptyText: 'User ID',
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-email-trigger'
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    id: 'txtPassowrd',
                    name: 'password',
                    //cls: 'auth-textbox',
                    hideLabel: true,
                    enableKeyEvents: true,
                    emptyText: 'Password',
                    inputType: 'password',
                    //bind: '{password}',
                    allowBlank : false,
                    height: 55,
                    minLength: 3,
                    triggers: {
                        glyphed: {
                            cls: 'trigger-glyph-noop auth-password-trigger'
                        }
                    },
                    listeners: {
                        specialkey: 'onTextFieldSpecialKey',
                        keypress: 'onTextFieldKeyPressed'
                    }
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'checkboxfield',
                            //bind: '{persist}',
                            flex : 1,
                            height: 30,
                            disabled: false,
                            //boxLabelCls: 'checkbox-remember-me',
                            boxLabel: 'Remember me'
                        },
                        {
                            xtype: 'box',
                            html: '<a href="#auth.passwordreset" class="link-forgot-password">Forgot Password?</a>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    reference: 'loginButton',
                    scale: 'large',
                    //ui: 'soft-green',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-angle-right',
                    text: 'LOG IN',
                    //formBind: true,
                    listeners: {
                        click: 'onLoginButton'
                    }
                },
                {
                    xtype: 'box',
                    hidden: true,
                    html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                    margin: '10 0'
                },
                /*
                {
                    xtype: 'button',
                    scale: 'large',
                    ui: 'soft-blue',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-facebook',
                    text: 'Login with Facebook',
                    hidden: true,
                    tabIndex: 5,
                    listeners: {
                        click: 'onFaceBookLogin'
                    }
                },
                */
                {
                    xtype: 'box',
                    hidden: true,
                    html: '<div class="outer-div"><div class="seperator">OR</div></div>',
                    margin: '10 0'
                },
                {
                    xtype: 'button',
                    scale: 'large',
                    ui: 'gray',
                    iconAlign: 'right',
                    iconCls: 'x-fa fa-user-plus',
                    text: 'Create Account',
                    hidden: true,
                    listeners: {
                        click: 'onNewAccount'
                    }
                }]
            }]
        });

        this.addCls('user-login-register-container');

        this.callParent(arguments);
    },

    afterLayout: function(layout){
        //console.log(layout)

    }
});
