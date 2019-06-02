/**
 * Created by tech on 5/4/2015.
 */
Ext.define('Vega.view.settings.company.users.edit.tab.Detail', {
    extend: 'Ext.form.Panel',

    alias: 'widget.user-edit-detail',

    title: 'Details',

    layout: 'anchor',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                anchor: '95%'
            },

            items: [{
                xtype: 'textfield',
                name: 'FirstName',
                itemId: 'firstname',
                allowBlank: false,
                fieldLabel: 'First Name',
                bind: '{theUser.FirstName}'
            },{
                xtype: 'textfield',
                name: 'LastName',
                itemId: 'lastname',
                allowBlank: false,
                fieldLabel: 'Last Name',
                bind: {
                    value: '{theUser.LastName}'
                }
            },{
                xtype: 'textfield',
                name: 'FullName',
                itemId: 'fullname',
                allowBlank: false,
                fieldLabel: 'Full Name',
                bind: {
                    value: '{theUser.FullName}'
                }
            },
            {
                xtype: 'textfield',
                name: 'UserName',
                itemId: 'username',
                fieldLabel: 'User ID',
                allowBlank: false,
                bind: {
                    value: '{theUser.UserName}'
                }
            },
            {
                xtype: 'textfield',
                name: 'Password',
                itemId: 'password',
                allowBlank: false,
                fieldLabel: 'Password',
                bind: {
                    value: '{theUser.Password}'
                }
            },
            {
                xtype: 'textfield',
                name: 'Email',
                itemId: 'email',
                allowBlank: false,
                vtype: 'email',
                fieldLabel: 'Email',
                fieldStyle: 'text-transform:lowercase',
                bind: {
                    value: '{theUser.Email}'
                }
            },
            {
                xtype: 'textfield',
                name: 'EmailPass',
                itemId: 'emailpass',
                allowBlank: false,
                fieldLabel: 'E Password',
                bind: {
                    value: '{theUser.EmailPass}'
                }
            },
            {
                xtype: 'container',
                layout: 'hbox',
                padding: '0 0 0 105',
                items: [{
                    xtype: 'checkbox',
                    name: 'IsADUser',
                    itemId: 'isaduser',
                    flex: 1,
                    boxLabel: 'AD User?',
                    bind: {
                        value: '{theUser.IsADUser}'
                    }
                },{
                    xtype: 'checkbox',
                    name: 'IsApproved',
                    itemId: 'isapproved',
                    flex: 1,
                    boxLabel: 'Is User Approved?',
                    bind: {
                        value: '{theUser.IsApproved}'
                    }
                },{
                    xtype: 'checkbox',
                    name: 'RemoteAccess',
                    itemId: 'remoteaccess',
                    labelWidth: 120,
                    flex: 1,
                    boxLabel: 'Remote Access?',
                    bind: {
                        value: '{theUser.RemoteAccess}'
                    }
                }]
            },
            {
                xtype: 'tagfield',
                fieldLabel: 'Department',
                name: 'Department',
                itemId: 'department',
                valueField: 'text',
                displayField: 'text',
                //typeAhead: true,
                editable: false,
                //forceSelection: true,
                selectOnFocus: false,
                allowBlank: true,
                //store: ["Accounting", "Customer Service", "Design", "Human Resource", "Import", "IT", "Management", "Pattern", "Pre-Production", "Production", "Sales", "Shipping"],
                queryMode: 'local',
                bind: {
                    value: '{theUser.Department}',
                    hidden: '{!theUser.IsADUser}',
                    store: '{departments}'
                }
                //value: 'Accounting',
                //minChars: 1,
                //matchFieldWidth: true
            },
            {
                xtype: 'radiogroup',
                fieldLabel: 'Office',
                defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                items: [{
                    boxLabel  : 'LA',
                    name      : 'Office',
                    inputValue: 'Bell',
                    itemId    : 'officeLA'
                }, {
                    boxLabel  : 'NY',
                    name      : 'Office',
                    inputValue: 'New York',
                    iitemId   : 'officeNY'
                }],
                bind: {
                    value: {
                        Office: '{theUser.Office}'
                    },
                    hidden: '{!theUser.IsADUser}'
                }
            },
            {
                xtype: 'checkboxfield',
                name: 'Expires',
                boxLabel: 'Password never expires',
                itemId: 'expires',
                padding: '0 0 0 105',
                bind: {
                    value: '{!theUser.Expires}',
                    hidden: '{!theUser.IsADUser}'
                }
            },
            {
                xtype: 'checkboxfield',
                name: 'Changes',
                boxLabel: 'User cannot change password',
                checked: true,
                padding: '0 0 0 105',
                bind: {
                    value: '{!theUser.Changes}',
                    hidden: '{!theUser.IsADUser}'
                }
            }]
        });

        me.callParent(arguments);
    }
});