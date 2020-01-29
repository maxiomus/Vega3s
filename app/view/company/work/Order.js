
Ext.define('Vega.view.company.work.Order',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.company.work.OrderController',
        'Vega.view.company.work.OrderModel'
    ],

    alias: 'widget.work-order',

    controller: 'work-order',
    viewModel: {
        type: 'work-order'
    },

    bind: {
        selection: '{theTask}'
    },

    iconCls: 'x-fa fa-tasks',

    header: false,
    hideHeaders: true,

    style: {
        borderLeftWidth: '3px',
        borderRightWidth: '1px',
        borderTopWidth: '1px',
        borderBottomWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#cfcfcf'
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        padding: 15,
        items: [
            '@start'
        ]
    },{
        xtype: 'toolbar',
        dock: 'bottom',
        padding: 15,
        items: [
            '@task',
            //{ xtype: 'tbspacer', width: 100 },
            '@approval'
        ]
    }],

    initComponent: function (c) {
        var me = this;

        me.columns = me.buildColumns();

        me.actions = me.buildActions();

        Ext.applyIf(me, {
            selModel: {
                //selType: 'rowmodel',
                pruneRemoved: false
            },

            viewConfig: {
                trackOver: true,

                preserveScrollOnRefresh:true,
                deferInitialRefresh:true,

                plugins: [{
                    pluginId:"preview",
                    ptype:"preview",
                    bodyField:"descript",
                    previewExpanded: true
                },{
                    ddGroup: 'category-group',
                    ptype: 'gridviewdragdrop',
                    enableDrop: true,
                    dragText: 'Drag and drop to reorganize'
                }]
            }
        });

        me.callParent();

        var topbar = me.down('toolbar[dock="top"]'),
            botbar = me.down('toolbar[dock="bottom"]');

        me.relayEvents(topbar, ['actstart']);
        me.relayEvents(botbar, ['acttask', 'actapproval']);
    },

    buildColumns: function () {
        return [{
            text: "Title",
            dataIndex: "title",
            flex: 1,
            renderer: function(value, f, rec){

                var xf = Ext.util.Format;

                f.style = 'cursor: pointer';

                return Ext.String.format(
                    '<div style="display: flex">' +
                    '<div style="margin: 5px 10px 0 0; padding-top: 10px; width:36px; height: 36px; background-color: #ececec; border-radius: 9px; text-align: center; font-weight: bolder"><i class="x-fa fa-square-o fa-lg gray-txt"></i></div>' +
                    '<div style="margin: 7px 0 0 0; font-weight: bold;">' +
                        '<div style="margin-bottom: 3px;font-size: 14px; color: #333;">{0}</div>' +
                        '<div style="font-size: 11px; color: #878ea2;">{1}</div>' +
                    '</div>'+
                    '</div>',
                    value || "New task", rec.get("responders") || "No assignees");
            }

        },
        {
            text: 'User',
            dataIndex: 'creator',
            hidden: true
        },
        {
            text: 'Due on',
            dataIndex: 'dueOn',
            width: 140,
            hidden: true,
            renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
        },
        {
            text: '',
            dataIndex: 'deadline',
            width: 180,
            renderer: function(value, f, rec){

                var xf = Ext.util.Format,
                    num = rec.get('length') || '';

                if (!value){
                    return;
                }

                return Ext.String.format(
                    '<div style="margin: 7px 0 0 0; color: #878ea2; font-weight: bold;">' +
                        '<div style="font-size: 12px;">{0}</div>' +
                        '<div style="font-size: 11px;">{1}</div>' +
                    '</div>',
                    num + ' ' + rec.get("unit"), value);
            }
        },
        {
            text: '<i class="x-fa fa-trash-o"></i>',
            width: 60,
            align: 'center',
            menuDisabled: true,
            sortable: false,
            renderer: function(val, f, rec){
                f.style = 'cursor: pointer';
                return '<div style="height:10px;"></div><div style="width: 35px; height:35px; border:1px solid #ADB3B8; border-radius:22px; text-align:center; line-height:32px;"><i style="color: #ADB3B8" class="x-fa fa-trash fa-lg"></i></div>';
            }
        },
        {
            xtype: 'actioncolumn',
            text: '<i class="x-fa fa-trash-o"></i>',
            //iconCls: 'x-fa fa-close red-txt',
            width: 80,
            align: 'center',
            menuDisabled: true,
            sortable: false,
            hidden: true,
            items: [{
                //icon: 'resources/images/shared/icon-error.png',
                //glyph: 45,
                //ui: 'default',
                iconCls: 'x-fa fa-trash-o',
                tooltip: 'Remove',
                handler: function(view, rowIndex, colIndex, item, e, rec, row) {
                    var sm = view.getSelectionModel();
                        //rec = view.getStore().getAt(rowIndex);

                    rec.drop();

                    if(sm.selected){
                        sm.deselectAll();
                    }
                }
            }]
        }];
    },

    buildActions: function () {
        var me = this;

        return {
            start: Ext.create('Ext.Action', {
                text: "Process start",
                tooltip: "Process initiation",
                //ui: "default",
                //reference: 'new',
                aType: 'process',
                scale: 'medium',
                iconCls: "x-fa fa-youtube-play",
                //glyph: 'xf044@FontAwesome',
                /**
                 *
                 * @param btn Button
                 * @param e Event
                 */
                handler: function(btn, e){
                    me.fireEvent('actstart', btn, me);
                },
                scope: me
            }),

            add: Ext.create('Ext.Action', {
                text: "Create Template",
                tooltip: "Create Template",
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

            task: Ext.create('Ext.Action', {
                text: "Task",
                tooltip: "Add New Task",
                textAlign: 'left',
                width: 140,
                //ui: "default",
                //reference: 'new',
                aType: 'task',
                scale: 'medium',
                iconCls: "x-fa fa-plus",
                disabled: true,
                //glyph: 'xf044@FontAwesome',
                /**
                 *
                 * @param btn Button
                 * @param e Event
                 */
                handler: function(btn, e){
                    me.fireEvent('acttask', btn, me);
                },
                scope: me
            }),

            approval: Ext.create('Ext.Action', {
                text: 'Approval',
                tooltip: 'Add New Approval',
                textAlign: 'left',
                width: 140,
                aType: 'task',
                scale: 'medium',
                iconCls: 'x-fa fa-plus',
                disabled: true,
                handler: function(btn, e){
                    me.fireEvent('actapproval', btn, me);
                },
                scope: me
            })
        }
    }
});
