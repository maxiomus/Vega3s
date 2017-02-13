
Ext.define('Vega.view.settings.development.Default', {
    extend: 'Ext.form.Panel',

    requires: [
        'Vega.view.settings.development.DefaultController',
        'Vega.view.settings.development.DefaultModel'
    ],

    alias: 'widget.development-default',

    controller: 'development-default',
    viewModel: {
        type: 'development-default'
    },

    title: 'Development',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyPadding: 5,
    scrollable: true,

    defaults: {
        margin: '0 0 10 0'
    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'grid',
                title: 'Supervising',
                iconCls: 'fa fa-file-text-o',
                flex: 1,
                bind: {
                    store: '{supervises}'
                },

                viewConfig: {
                    loadMask:true,
                    stripeRows:true,
                    trackOver:true,
                    preserveScrollOnRefresh:true,
                    deferInitialRefresh:true,
                    emptyText:'<h1 style="margin:20px">No matching results</h1>',

                    listeners:{

                    }
                },

                selModel: {
                    pruneRemoved: false
                },

                plugins: [{
                    ptype: 'cellediting',
                    ui: 'default',
                    clicksToEdit: 2
                }],

                columns: [{
                    text: 'Module',
                    dataIndex: 'Module',
                    flex: 1
                },{
                    text: 'Window',
                    dataIndex: 'Property',
                    flex: 3
                },{
                    text: 'User ID',
                    dataIndex: 'Value',
                    flex: 1,
                    renderer: function(value, metaData, rec, rowIndex, colIndex){
                        /*
                        var comboStore = me.up('settings-default').getViewModel().getStore('coordinator'),
                            comboRec = comboStore.getById(value);

                        //this.columns[1].getEditor().bindStore(comboStore)
                        console.log(comboStore, comboStore.isLoading())
                        */
                        return value;
                    },
                    editor: {
                        xtype: "combo",
                        name: 'fabricrequest',
                        width: 420,
                        fieldLabel: "Managing By",
                        hideLabel: true,
                        hideTrigger: true,
                        bind: {
                            store: '{coordinator}'
                        },
                        valueField: "id",
                        displayField: "text",
                        //forceSelection: false,
                        //selectOnFocus: true,
                        queryMode: 'local',
                        //queryParam: "filter",
                        //triggerAction: 'all',
                        //lastQuery: '',
                        //filterPickList: true,
                        minChars: 0,
                        //matchFieldWidth: false,
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }
                }]

            }]
        });

        me.callParent(arguments);
    }
});
