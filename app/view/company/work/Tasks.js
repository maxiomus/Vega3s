
Ext.define('Vega.view.company.work.Tasks',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.company.work.TasksController',
        'Vega.view.company.work.TasksModel'
    ],

    alias: 'widget.work-tasks',

    controller: 'work-tasks',
    viewModel: {
        type: 'work-tasks'
    },

    title: 'TASKS',

    iconCls: 'x-fa fa-tasks',

    header: false,
    hideHeaders: true,
    //bodyPadding: 10,

    style: {
        borderTop: '1px solid #cfcfcf'
        //borderBottom: '1px solid #cfcfcf'
    },

    bind: {
        store: '{tasks}'
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        padding: 15,
        items: [
            'Tasks', '@add'
        ]
    }],

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

        me.actions = me.buildActions();

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

        var topbar = me.down('toolbar[dock="top"]');

        topbar.insert(2, ['->', {
            xtype: "cycle",
            //ui: "default",
            scale: 'medium',
            //prependText: "Active ",
            //iconCls: "x-fa fa-filter",
            showText: true,
            reference: "filterButton",
            changeHandler: "onTypeChange",
            scope: this.controller,
            menu: {
                items: [{
                    text: "Active",
                    //iconCls: "x-fa fa-filter",
                    itemId: "active",
                    checked: true
                },{
                    text: "Done",
                    //iconCls: "x-fa fa-filter",
                    itemId: "done"
                }]
            }
        }]);

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: [
                //topbar.actions.edit,
                //topbar.actions.copy,
                //topbar.actions.remove,
                //topbar.actions.refresh
            ]
        });

        //me.relayEvents(topbar, ['actadd', 'actedit', 'actremove', 'actcopy', 'actrefresh', 'actsave']);
    },

    buildColumns: function(){
        return [{
            text: "Title",
            dataIndex: "title",
            flex: 1,
            renderer: function(value, f, rec){

                var xf = Ext.util.Format;
                return Ext.String.format(
                    '<div class="topic">' +
                    '<span class="title">{0}</span>' +
                    '<span class="author">Posted by {2}, last updated {3}</span>' +
                    '</div>',
                    value, rec.get("creator")|| "Unknown", xf.date(rec.get('created'), 'M j, Y, g:i a'))
            }

        },
        {
            text: 'User',
            dataIndex: 'creator',
            hidden: true
        },
        {
            text: "Activity",
            dataIndex: 'created',
            width: 200,
            renderer: function(val, meta, rec){
                //console.log(f);
                return Ext.util.Format.date(val, 'M j, Y, g:i a');
            }
        },
        {
            xtype: 'actioncolumn',
            text: ' ',
            width: 200,
            items: [{
                iconCls: 'x-fa fa-calendar-o',
                tooltip: 'Edit this process',
                handler: function(view, rowIndex, colIndex) {

                }
            },' ',{
                iconCls: 'x-fa fa-trash-o',
                tooltip: 'Delete this process',
                handler: function(view, rowIndex, colIndex) {

                }
            }]
        }];
    },

    buildBottomBar: function(){

        var b = Ext.widget("combo", {
            name: "perpage",
            //reference: 'pageSizer',
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: [["15"], ["25"], ["50"], ["100"], ["300"], ["500"]]
            }),
            //value: "50",
            displayField: "id",
            valueField: "id",
            editable: false,
            forceSelection: true,
            matchFieldWidth: true,
            queryMode: "local"
            //triggerAction: "all",
        });

        b.on('afterrender', function(c, e){
            var store = this.getViewModel().getStore("tasks");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("tasks");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{tasks}"
            },
            //dock: 'bottom',
            displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    },

    buildActions: function () {
        var me = this;
        return {
            add: Ext.create('Ext.Action', {
                text: "Add private task",
                tooltip: "Add private task",
                scale: 'medium',
                //reference: 'new',
                iconCls: "x-fa fa-plus",
                //glyph: 'xf044@FontAwesome',
                /**
                 *
                 * @param btn Button
                 * @param e Event
                 */
                handler: function(btn, e){
                    me.fireEvent('actadd', btn, me);
                }
            }),

            edit: Ext.create('Ext.Action', {
                text: 'Edit',
                tooltip: 'Edit Selected Item',
                //ui: 'default',
                iconCls: 'x-fa fa-edit',
                bind: {
                    disabled: '{!grid.selection}'
                },
                handler: function(btn, e){
                    me.fireEvent('actedit', btn, me);
                }
            }),

            remove: Ext.create('Ext.Action', {
                text: "Remove",
                tooltip: "Remove Selected Item",
                //ui: "default",
                iconCls: "x-fa fa-remove",
                //glyph: 'xf12d@FontAwesome',
                bind: {
                    disabled: '{!grid.selection}'
                },
                handler: function(btn, e){
                    me.fireEvent('actremove', btn, me);
                }
            }),

            save: Ext.create('Ext.Action', {
                text: "Save",
                tooltip: "Save",
                //ui: "default",
                iconCls: "x-fa fa-save",
                //glyph: 'xf12d@FontAwesome',
                handler: function(btn, e){
                    me.fireEvent('actsave', btn, me);
                }
            }),

            copy: Ext.create('Ext.Action', {
                text: "Copy",
                tooltip: "Copy selected Item",
                //ui: "default",
                iconCls: "x-fa fa-copy",
                //glyph: 'xf01e@FontAwesome',
                bind: {
                    disabled: '{!grid.selection}'
                },
                handler: function(btn, e){
                    me.fireEvent('actcopy', btn, me);
                }
            }),

            refresh: Ext.create('Ext.Action', {
                text: "Refresh",
                tooltip: "Refresh",
                //ui: "default",
                iconCls: "x-fa fa-refresh",
                //glyph: 'xf01e@FontAwesome',
                handler: function(btn, e){
                    me.fireEvent('actrefresh', btn, me);
                }
            })
        }
    }
});
