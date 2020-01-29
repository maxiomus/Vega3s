
Ext.define('Vega.view.company.work.Templates',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.company.work.TemplatesController',
        'Vega.view.company.work.TemplatesModel',
        'Vega.view.company.work.form.Template'
    ],

    alias: 'widget.work-templates',

    controller: 'work-templates',
    viewModel: {
        type: 'work-templates'
    },

    //cls: "template-grid",

    title: 'TEMPLATES',

    iconCls: 'x-fa fa-share-alt-square',

    header: false,
    hideHeaders: true,
    //bodyPadding: 10,

    session: true,

    style: {
        borderTop: '1px solid #cfcfcf'
        //borderBottom: '1px solid #cfcfcf'
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        padding: 15,
        items: [
            'Templates', '@add', '@gallery'
        ]
    }],

    listeners: {
        //render: 'onRender',

        //cellclick: 'onCellClick',
        actadd: 'onToolbarAddClick',
        //actedit: 'onToolbarEditClick',
        //actremove: 'onToolbarRemoveClick',
        //actcopy: 'onToolbarCopyClick',
        //actrefresh: 'onToolbarRefreshClick'
        //actsave: 'onToolbarSaveClick',
        itemcontextmenu: "onItemContextMenu"
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

        /*
        var topbar = me.down('toolbar[dock="top"]');

        topbar.insert(0, [{
            xtype: 'tbtext',
            border: false,
            text: 'Templates'
        }]);
        */

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
            text: '',
            width: 120,
            xtype: 'widgetcolumn',
            widget: {
                xtype: 'button',
                iconCls: 'x-fa fa-plus-circle',
                text: 'Start process',
                handler: 'onButtonStartClick'
            }
        },
        {
            xtype: 'actioncolumn',
            text: '',
            width: 200,
            items: [{
                iconCls: 'x-fa fa-pencil-square-o',
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
            var store = this.getViewModel().getStore("templates");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("templates");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: '{templates}'
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
                text: "Create Template",
                tooltip: "Create Template",
                scale: 'medium',
                //ui: "default",
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
                },
                scope: me
            }),

            edit: Ext.create('Ext.Action', {
                text: 'Edit',
                tooltip: 'Edit Selected Item',
                //ui: 'default',
                iconCls: 'x-fa fa-edit',
                bind: {
                    //disabled: '{!grid.selection}'
                },
                handler: function(btn, e){
                    me.fireEvent('actedit', btn, me);
                },
                scope: me
            }),

            remove: Ext.create('Ext.Action', {
                text: "Remove",
                tooltip: "Remove Selected Item",
                //ui: "default",
                iconCls: "x-fa fa-remove",
                //glyph: 'xf12d@FontAwesome',
                bind: {
                    //disabled: '{!grid.selection}'
                },
                handler: function(btn, e){
                    me.fireEvent('actremove', btn, me);
                },
                scope: me
            }),

            save: Ext.create('Ext.Action', {
                text: "Save",
                tooltip: "Save",
                //ui: "default",
                iconCls: "x-fa fa-save",
                //glyph: 'xf12d@FontAwesome',
                handler: function(btn, e){
                    me.fireEvent('actsave', btn, me);
                },
                scope: me
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
                },
                scope: me
            }),

            refresh: Ext.create('Ext.Action', {
                text: "Refresh",
                tooltip: "Refresh",
                //ui: "default",
                iconCls: "x-fa fa-refresh",
                //glyph: 'xf01e@FontAwesome',
                handler: function(btn, e){
                    me.fireEvent('actrefresh', btn, me);
                },
                scope: me
            }),

            gallery: Ext.create('Ext.Action', {
                text: 'Add from gallery',
                tooltip: 'Add from gallery',
                scale: 'medium',
                iconCls: 'x-fa fa-th',
                handler: function(btn, e){
                    me.fireEvent('actgallery', btn, me);
                },
                scope: me
            })
        }
    }
});
