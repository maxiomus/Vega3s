
Ext.define('Vega.view.company.work.form.Template',{
    extend: 'Ext.form.Panel',

    requires: [
        'Vega.view.company.work.form.TemplateController',
        'Vega.view.company.work.form.TemplateModel',
        'Vega.view.company.work.form.Process',
        'Vega.view.company.work.form.Task',
        'Vega.view.company.work.Order',
        'Vega.view.company.work.Data',
        'Vega.view.company.work.DataView'
    ],

    alias: 'widget.work-form-template',

    controller: 'work-form-template',
    viewModel: {
        type: 'work-form-template'
    },

    layout: 'fit',

    listeners: {
        cellclick: {
            fn: 'onOrderGridCellClick'
        },
        rowdblclick: 'onOrderGridRowDblClick',
        actstart: 'onToolbarStartClick',
        acttask: 'onToolbarTaskClick',
        actapproval: 'onToolbarApprovalClick',
        actfield: 'onToolbarFieldClick',
        storedatachanged: function (s) {
            console.log(s)
        },
        storeadd: function (s) {
            console.log('add', s);
        }
    },

    initComponent: function (c) {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'tabpanel',
                plain: true,
                //margin: 10,
                maxTabWidth: 120,
                margin: '0 5 5 5',

                tabBar: {
                    defaults: {
                        flex: 1, // if you want them to stretch all the way
                        height: 32, // set the height,
                        //padding: 6, // set the padding
                        textAlign: 'left',
                        width: '100%', // set the width for text ellipsis works when tab size smaller than text...
                        border: true,
                        style: {
                            //border: '1px solid #ccc'
                        }
                    }
                },

                items: [{
                    //bodyPadding: 5,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },

                    title: 'Tasks',
                    bind: {
                        title: '{taskTotal} Tasks'
                    },

                    tabConfig: {
                        margin: '6 10 6 10'
                    },

                    items: [{
                        xtype: 'work-order',
                        flex: 1,
                        bind: {
                            store: '{theProcess.tasks}'
                        }
                    },{
                        xtype: 'container',
                        reference: 'card-base',
                        layout: 'card',
                        style: {
                            borderTop: '1px solid #cfcfcf',
                            borderRight: '1px solid #cfcfcf',
                            borderBottom: '1px solid #cfcfcf'
                        },
                        padding: '0 0 0 0',
                        flex: 1
                    }]
                },{
                    tabConfig: {
                        title: 'Form',
                        margin: '6 10 6 10'
                    },

                    iconCls: 'x-fa fa-th',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },

                    reference: 'data-form',
                    disabled: true,

                    items: [{
                        xtype: 'work-data',
                        flex: 1,
                        bind: {
                            store: '{theProcess.details}'
                        },
                        listeners: {

                        }
                    },{
                        xtype: 'container',
                        flex: 1
                    }]
                }]
            }]
        });

        me.callParent(arguments);

        var ordergrid = me.down('work-order'),
            datagrid = me.down('work-data');

        me.relayEvents(ordergrid, ['actstart', 'acttask', 'actapproval', 'cellclick', 'rowdblclick', 'itemcontextmenu', 'datachanged']);
        me.relayEvents(datagrid, ['actfield']);
    }
});
