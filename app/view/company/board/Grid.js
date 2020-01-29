
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

    bind: {
        title: '{title}',
        store: '{topics}'
    },

    cls: "board-grid",

    iconCls: 'x-fa fa-folder-open-o',

    header: false,
    hideHeaders: true,

    //bodyPadding: 10,

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
        itemcontextmenu: "onItemContextMenu"
        //cellclick: 'onCellClick',
        //actadd: 'onToolbarAddClick',
        //actedit: 'onToolbarEditClick',
        //actremove: 'onToolbarRemoveClick',
        //actcopy: 'onToolbarCopyClick',
        //actrefresh: 'onToolbarRefreshClick'
        //actsave: 'onToolbarSaveClick'
    },

    initComponent: function(c){
        var me = this;

        me.columns = me.buildColumns();

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

        me.callParent();

        var topbar = me.lookupReference('topbar');

        topbar.insert(0, {
            xtype: "searchfield",
            reference: 'searchfield',
            width: 300,
            //grid: me,
            bind: {
                store: '{topics}'
            },
            paramName: ["subject","content"]
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
    },

    buildColumns: function(){
        return [{
            text: "Title",
            dataIndex: "subject",
            flex: 1,
            renderer: function(value, f, rec){

                var xf = Ext.util.Format;
                return Ext.String.format(
                    '<div class="topic">' +
                    '<span class="title">{0}</span>' +
                    '<span class="author">Posted by {2}, last updated {3}</span>' +
                    '</div>',
                    value, rec.get("userId")|| "Unknown", xf.date(rec.get('created'), 'M j, Y, g:i a'))
            }

        },
        {
            text: 'User',
            dataIndex: 'userId',
            hidden: true
        },
        {
            text: '<i style="text-align: center;" class="x-fa fa-paperclip fa-lg"></i>',
            dataIndex: "files",
            width: 80,
            align: 'center',
            renderer: function(value, metaData, rec, rowIndex, colIndex, store, view){

                if(Ext.isEmpty(value)){
                    return;
                }

                var strValue = '',
                    icon = '<i class="x-fa fa-paperclip fa-lg fa-fw"></i>';
                //metaData.tdStyle = 'font-weight:bold;color:' + (rec.data.mp ? 'green' : 'transparent');
                strValue = Ext.String.format('<span style="color: #6593cf;">{0} {1}</span>', value.length, icon);
                return strValue;
            }
        },
        {
            text: "Replies",
            dataIndex: "postTotal",
            width: 200,
            renderer: function(val, meta, rec){

                return Ext.String.format('<div style="font-size: 14px; color: #6593cf;">{0}</div>', Ext.util.Format.plural(val, 'Reply', 'Replies'));

            }
        }];
    }
});
