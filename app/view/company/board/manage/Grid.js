
Ext.define('Vega.view.company.board.manage.Grid',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.company.board.manage.GridController',
        'Vega.view.company.board.manage.GridModel'
    ],

    alias: 'widget.board-manage-grid',

    controller: 'board-manage-grid',
    viewModel: {
        type: 'board-manage-grid'
    },

    style: {
        borderTop: '1px solid #cfcfcf'
        //borderBottom: '1px solid #cfcfcf'
    },

    tbar: {
        xtype: "board-topbar",
        reference: "topbar"
    },

    listeners: {
        //render: 'onRender',
        select: {
            fn: 'onRowSelect'
        },
        itemcontextmenu: "onItemContextMenu",
        //cellclick: 'onGridCellClick',
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
        topbar.insert(1, [
            topbar.actions.edit,
            topbar.actions.copy,
            topbar.actions.remove,
            topbar.actions.save
        ]);

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: [
                topbar.actions.edit,
                topbar.actions.copy,
                topbar.actions.remove,
                topbar.actions.refresh
            ]
        });

        me.relayEvents(topbar, ['actadd', 'actedit', 'actremove', 'actcopy', 'actrefresh', 'actsave']);
    }
});
