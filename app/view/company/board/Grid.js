
Ext.define('Vega.view.company.board.Grid',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.company.board.GridController',
        'Vega.view.company.board.GridModel',
        'Vega.view.company.board.TopBar'
    ],

    alias: 'widget.board-grid',

    controller: 'board-grid',
    /*
    viewModel: {
        type: 'board-grid'
    },
    */

    cls: "board-grid",
    iconCls: 'x-fa fa-folder-open-o',

    style: {
        borderTop: '1px solid #cfcfcf'
        //borderBottom: '1px solid #cfcfcf'
    },

    tbar: {
        xtype: "company-board-topbar",
        reference: "topbar"
    },

    listeners: {
        //render: 'onRender',
        select: {
            fn: 'onRowSelect'
        },
        itemcontextmenu: "onItemContextMenu",
        cellclick: 'onCellClick',
        rowdblclick: 'onRowDblClick',
        actadd: 'onToolbarAddClick',
        actedit: 'onToolbarEditClick',
        actremove: 'onToolbarRemoveClick',
        //actcopy: 'onToolbarCopyClick',
        actrefresh: 'onToolbarRefreshClick'
        //actsave: 'onToolbarSaveClick'
    },

    initComponent: function(c){
        var me = this;

        //me.columns = me.buildColumns();

        Ext.applyIf(me, {

            selModel: {
                //selType: 'rowmodel',
                pruneRemoved: false
            },

            viewConfig: {
                stripeRows: true,
                trackOver: true,

                preserveScrollOnRefresh:true,
                deferInitialRefresh:true,
                emptyText:'<h1 style="margin:20px">No matching results</h1>',

                plugins: [{
                    pluginId:"preview",
                    ptype:"preview",
                    bodyField:"Description",
                    previewExpanded: true
                },{
                    ddGroup: 'category-group',
                    ptype: 'gridviewdragdrop',
                    enableDrop: true,
                    dragText: 'Drag and drop to reorganize'
                }]
            },

            plugins:[{
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
                //topbar.actions.copy,
                topbar.actions.remove,
                topbar.actions.refresh
            ]
        });

        me.relayEvents(topbar, ['actadd', 'actedit', 'actremove', 'actcopy', 'actrefresh', 'actsave']);
    }
});
