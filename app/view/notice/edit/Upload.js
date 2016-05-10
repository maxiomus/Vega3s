
Ext.define("Vega.view.notice.edit.Upload",{
    extend: "Ext.grid.Panel",

    alias: 'widget.notice-edit-upload',

    requires: [
        "Vega.view.notice.edit.UploadController",
        "Vega.view.notice.edit.UploadModel",
        'Ext.ux.statusbar.StatusBar'
    ],

    controller: "notice-edit-upload",
    viewModel: {
        type: "notice-edit-upload"
    },

    bind: {
        store: '{fileStore}'
    },

    listeners: {

    },

    initComponent: function(){
        var me = this;

        /*Ext.define('File', {
            extend: 'Ext.data.Model',
            fields: [ 'id', 'name', 'size', 'lastmod' ],
            idProperty: 'id'
        });

        var fileStore = Ext.create('Ext.data.Store', {
            model: 'File'
        });*/

        Ext.applyIf(me, {
            //store: fileStore,
            columns: this.buildColumns(),
            dockedItems: [
                this.buildTopBar(),
                this.buildBottomBar()
            ],
            viewConfig: {
                stripeRows: true,
                plugins: {
                    ddGroup: 'file-group',
                    ptype: 'gridviewdragdrop',
                    enableDrop: true,
                    dragText: 'Drag and drop to reorganize'
                },
                listeners: {
                    itemadd: 'onGridViewItemAdded',
                    itemremove: 'onGridViewItemRemoved',
                    drop: 'onGridViewDrop'
                }
            }
        });

        me.callParent(arguments);
    },

    buildColumns: function(){
        return [{
            dataIndex: 'rowIndex',
            width: 30,
            menuDisabled: true,
            align: 'center',
            sortable: false,
            renderer: function(value, metaData, record, rowIndex, colIndex, store){
                return rowIndex+1;
            }
        },{
            text: 'ID',
            dataIndex: 'id',
            menuDisabled: true,
            fixed: true,
            width: 25,
            hidden: true
        },{
            text: 'File Name',
            dataIndex: 'name',
            menuDisabled: true,
            flex: 1
        },{
            text: 'Last Modified',
            dataIndex: 'lastmod',
            menuDisabled: true,
            xtype: 'datecolumn',
            format: 'MM-dd-yyyy',
            hidden: true
        },{
            text: 'Size',
            dataIndex: 'size',
            menuDisabled: true,
            formatter: 'fileSize'
        },{
            text: 'Delete',
            xtype: 'actioncolumn',
            width: 60,
            align: 'center',
            menuDisabled: true,
            items: [{
                icon: 'resources/images/shared/icon-error.png',
                //glyph: 45,
                tooltip: 'Delete',
                handler: function(gridView, rowIndex, colIndex) {
                    var store = gridView.getStore();
                    store.removeAt(rowIndex);
                    gridView.refresh();
                }
            }]
        }]
    },

    buildTopBar: function() {
        this.tbar = {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'filefield',
                name: 'fileselect',
                buttonText: 'Add files...',
                hideLabel: true,
                allowBlank: false,
                buttonOnly: true,
                listeners: {
                    render: 'onFileFieldRender',
                    change: 'onFileFieldChange'
                }
            },{
                xtype: 'tbfill'
            },{
                xtype: 'button',
                action: 'removeall',
                itemId: 'btnRemoveAll',
                text: 'Delete All',
                //glyph: 43,
                iconCls: 'fa fa-cog',
                handler: function(btn){
                    btn.up('grid').getStore().removeAll();
                }
            }]
        };

        return this.tbar;
    },

    buildBottomBar: function(){
        this.bbar = {
            xtype: 'statusbar',
            dock: 'bottom',
            defaultText: 'Ready',
            items: [{
                xtype: 'tbfill'
            },{
                xtype: 'tbtext',
                name: 'count',
                text: 'Files: 0'
            },{
                xtype: 'tbseparator'
            },{
                xtype: 'tbtext',
                name: 'size',
                text: 'Total Size: 0'
            }]
        };

        return this.bbar;
    }
});
