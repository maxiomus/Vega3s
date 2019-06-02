
Ext.define("Vega.view.settings.task.Activity",{
    extend: "Ext.grid.Panel",

    requires: [
        "Vega.view.settings.task.ActivityController",
        "Vega.view.settings.task.ActivityModel"
    ],

    alias: 'widget.task-activity',

    controller: "task-activity",
    viewModel: {
        type: "task-activity"
    },

    title: 'Activities',

    //cls: "",
    //stateful: true,
    //stateId: "activity-grid",
    //stateEvents: ["columnmove","columnresize","groupchange","bodyresize"],
    columnLines: false,
    border: false,

    bind:{
        store: "{activities}"
    },

    initComponent: function(){
        var me = this;

        me.tbar = [{
            xtype: 'button',
            text: 'Add',
            width: 70,
            iconCls: 'x-fa fa-plus'
        },{
            xtype: 'button',
            text: 'Remove',
            iconCls: 'x-fa fa-remove'
        },{
            xtype: 'button',
            text: 'Refresh',
            iconCls: 'x-fa fa-refresh'
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
                deferInitialRefresh: true,
                deferEmptyText: false,
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
            text: "Activity ID",
            dataIndex: "activity",
            menuDisabled: true,
            sortable: false,
            width: 200,
            editor: {
                xtype: 'textfield'
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
            xtype: 'checkcolumn',
            text: 'Active',
            dataIndex: 'active'
        }];

        me.callParent(arguments);
    }
});
