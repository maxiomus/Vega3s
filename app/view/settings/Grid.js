
Ext.define('Vega.view.settings.Grid',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.settings.GridController',
        'Vega.view.settings.GridModel'
    ],

    alias: 'widget.settings-grid',

    controller: 'settings-grid',
    /*
    viewModel: {
        type: 'settings-grid'
    },
    */
    iconCls: 'x-fa fa-folder-open-o',
    style: {
        borderTop: '1px solid #cfcfcf'
        //borderBottom: '1px solid #cfcfcf'
    },

    tbar: {
        xtype: "settings-topbar",
        reference: "topbar"
    },

    listeners: {
        //render: 'onRender',
        select: {
            fn: 'onRowSelect'
        },
        itemcontextmenu: "onItemContextMenu",
        cellclick: 'onGridCellClick',
        actadd: 'onToolbarAddClick',
        actedit: 'onToolbarEditClick',
        actremove: 'onToolbarRemoveClick',
        actcopy: 'onToolbarCopyClick',
        actrefresh: 'onToolbarRefreshClick',
        actsave: 'onToolbarSaveClick'
    },

    initComponent: function(c){
        var me = this;

        //me.columns = me.buildColumns();

        Ext.applyIf(me, {

            selModel: {
                selType: 'rowmodel',
                pruneRemoved: false
            },

            viewConfig: {
                stripeRows: true,
                trackOver: true,

                plugins: {
                    ddGroup: 'category-group',
                    ptype: 'gridviewdragdrop',
                    enableDrop: true,
                    dragText: 'Drag and drop to reorganize'
                }
            },

            plugins:[{
                ptype: 'rowediting',
                clicksToMoveEditor: 1
            },{
                ptype:"gridfilters"
            }]
        });

        me.callParent(arguments);

        var topbar = me.lookupReference('topbar');
        topbar.insert(0, {
            xtype: "gridsearchfield",
            reference: 'searchfield',
            width: 300,
            grid: me,
            paramName: "code"
        });

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: [
                topbar.actions.edit,
                topbar.actions.copy,
                topbar.actions.remove,
                topbar.actions.refresh
            ]
        });

        me.relayEvents(topbar, ['actadd', 'actedit', 'actremove', 'actcopy', 'actrefresh', 'actsave']);
    },

    buildColumns: function(){
        return [];
    }
});
