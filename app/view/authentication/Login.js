Ext.define('Vega.view.authentication.Login', {
    extend: 'Vega.view.authentication.LockingWindow',

    alias: 'widget.login',

    requires: [
        'Vega.view.authentication.AuthenticateModel',
        'Vega.view.authentication.AuthenticateController',
        'Vega.view.authentication.Dialog',
        'Vega.view.authentication.CapsLockTooltip',
        'Vega.model.authentication.User',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],

    controller: 'authenticate',
    viewModel: {
        type: 'authenticate'
    },

    title: 'Let\'s Log In',
    header: false,
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well

    items: [{
        xtype: 'authdialog',
        defaultButton : 'loginButton',
        autoComplete: true,
        bodyPadding: '20 20',
        cls: 'auth-dialog-login',
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
            cls: 'auth-textbox',
            name: 'userid',
            bind: '{userid}',
            height: 55,
            hideLabel: true,
            allowBlank : false,
            minLength: 3,
            emptyText: 'user id',
            triggers: {
                glyphed: {
                    cls: 'trigger-glyph-noop auth-email-trigger'
                }
            }
        },
        {
            xtype: 'textfield',
            cls: 'auth-textbox',
            height: 55,
            hideLabel: true,
            emptyText: 'Password',
            inputType: 'password',
            name: 'password',
            bind: '{password}',
            allowBlank : false,
            minLength: 3,
            id: 'txtPassowrd',
            enableKeyEvents: true,
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
                    flex : 1,
                    cls: 'form-panel-font-color rememberMeCheckbox',
                    height: 30,
                    bind: '{persist}',
                    boxLabel: 'Remember me'
                },
                {
                    xtype: 'box',
                    html: '<a href="#authentication.passwordreset" class="link-forgot-password"> Forgot Password ?</a>'
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
            text: 'Login',
            formBind: true,
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
        {
            xtype: 'button',
            scale: 'large',
            ui: 'soft-blue',
            iconAlign: 'right',
            iconCls: 'x-fa fa-facebook',
            text: 'Login with Facebook',
            hidden: true,
            listeners: {
                click: 'onFaceBookLogin'
            }
        },
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
    }],

    initComponent: function() {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
