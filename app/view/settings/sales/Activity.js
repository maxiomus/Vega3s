
Ext.define("Vega.view.settings.sales.Activity",{
    extend: "Ext.grid.Panel",

    requires: [
        "Vega.view.settings.sales.ActivityController",
        "Vega.view.settings.sales.ActivityModel"
    ],

    alias: 'widget.sales-activity',
    
    controller: "sales-activity",
    viewModel: {
        type: "sales-activity"
    },

    title: 'Activities',

    //cls: "",
    stateful: true,
    stateId: "activity-grid",
    stateEvents: ["columnmove","columnresize","groupchange","bodyresize"],
    columnLines: false,
    border: false,

    bind:{
        store: "{activities}"
    },

    listeners: {

    },

    initComponent: function(){
        var me = this;

        me.tbar = [{
            xtype: 'button',
            text: 'Add',
            width: 70,
            iconCls: 'fa fa-plus'
        },{
            xtype: 'button',
            text: 'Remove',
            iconCls: 'fa fa-remove'
        },{
            xtype: 'button',
            text: 'Refresh',
            iconCls: 'fa fa-refresh'
        }],

        Ext.applyIf(me, {
            selModel:{
                pruneRemoved:false
            },

            viewConfig:{
                //itemId:"view",
                loadMask:true,
                stripeRows:true,
                trackOver:true,
                preserveScrollOnRefresh:true,
                deferInitialRefresh:true,
                emptyText:'<h1 style="margin:20px">No matching results</h1>'
            },

            plugins:[{
                pluginId:"gridfilters",
                ptype:"gridfilters"
            },{
                ptype: 'rowediting',
                clickToEdit: 1
            }]
        });

        me.columns = [{
            text: "Activity Name",
            dataIndex: "activity",
            menuDisabled: true,
            sortable: false,
            width: 200,
            editor: {
                xtype: 'textfield'
            }
        },{
            xtype: 'numbercolumn',
            text: "Duration",
            dataIndex: "duration",
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'numberfield',
                maxValue: 100,
                minValue: 0
            }
        },{
            text: "Description",
            dataIndex:"descript",
            flex: 1,
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'textfield'
            }
        }]

        me.callParent(arguments);
    }
});
