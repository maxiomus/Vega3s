
Ext.define('Vega.view.settings.sales.Default',{
    extend: 'Ext.form.Panel',

    requires: [
        'Vega.view.settings.sales.DefaultController',
        'Vega.view.settings.sales.DefaultModel'
    ],

    alias: 'widget.sales-default',

    controller: 'sales-default',
    viewModel: {
        type: 'sales-default'
    },

    title: 'Sales',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 5,
    scrollable: true,

    defaults: {
        frame: true,
        margin: '0 0 10 0',
        bodyPadding: 10
    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                title: 'P.O.W',
                iconCls: 'fa fa-file-text-o',

                items: [{
                    xtype: "tagfield",
                    name: '',
                    width: 420,
                    fieldLabel: "Managing By",
                    //hideLabel: true,
                    hideTrigger: true,
                    bind: {
                        store: '{coordinator}'
                    },
                    valueField: "text",
                    displayField: "text",
                    //forceSelection: false,
                    //selectOnFocus: true,
                    queryMode: 'local',
                    //queryParam: "filter",
                    //triggerAction: 'all',
                    //lastQuery: '',
                    //filterPickList: true,
                    minChars: 0,
                    autoLoadOnValue: true,
                    //matchFieldWidth: false,
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                }]
            },{
                title: 'REQUEST',

                items: [{
                    xtype: "tagfield",
                    width: 420,
                    fieldLabel: "Managing By",
                    //hideLabel: true,
                    hideTrigger: true,
                    bind: {
                        store: '{coordinator}'
                    },
                    valueField: "text",
                    displayField: "text",
                    //forceSelection: false,
                    //selectOnFocus: true,
                    queryMode: 'local',
                    //queryParam: "filter",
                    //triggerAction: 'all',
                    //lastQuery: '',
                    //filterPickList: true,
                    minChars: 0,
                    autoLoadOnValue: true,
                    //matchFieldWidth: false,
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                }]
            },{
                title: 'REVIEW',


                items: [{
                    xtype: "tagfield",
                    width: 420,
                    fieldLabel: "Managing By",
                    //hideLabel: true,
                    hideTrigger: true,
                    bind: {
                        store: '{coordinator}'
                    },
                    valueField: "text",
                    displayField: "text",
                    //forceSelection: false,
                    //selectOnFocus: true,
                    queryMode: 'local',
                    //queryParam: "filter",
                    //triggerAction: 'all',
                    //lastQuery: '',
                    //filterPickList: true,
                    minChars: 0,
                    autoLoadOnValue: true,
                    //matchFieldWidth: false,
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                }]
            },{
                title: 'PENDING',

                items: [{
                    xtype: "tagfield",
                    width: 420,
                    fieldLabel: "Managing By",
                    //hideLabel: true,
                    hideTrigger: true,
                    bind: {
                        store: '{coordinator}'
                    },
                    valueField: "text",
                    displayField: "text",
                    //forceSelection: false,
                    //selectOnFocus: true,
                    queryMode: 'local',
                    //queryParam: "filter",
                    //triggerAction: 'all',
                    //lastQuery: '',
                    //filterPickList: true,
                    minChars: 0,
                    autoLoadOnValue: true,
                    //matchFieldWidth: false,
                    plugins: [{
                        ptype: "cleartrigger"
                    }]
                }]
            }]
        });

        me.callParent(arguments);
    }
});
