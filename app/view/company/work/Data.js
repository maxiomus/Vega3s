
Ext.define('Vega.view.company.work.Data',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.company.work.DataController',
        'Vega.view.company.work.DataModel'
    ],

    alias: 'widget.work-data',

    controller: 'work-data',
    viewModel: {
        type: 'work-data'
    },

    iconCls: 'x-fa fa-file-text-o',

    header: false,
    //hideHeaders: true,

    style: {
        border: '1px solid #cfcfcf'
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        padding: 15,
        items: [{
            xtype: 'displayfield',
            name: 'name',
            fieldStyle: 'font-size: 16px',
            hideLabel: true,
            bind: '{sectionName}'
        }]
    },{
        xtype: 'toolbar',
        dock: 'bottom',
        padding: 15,
        items: [
            '@new'
        ]
    }],

    listeners: {
        afterrender: function(g){
            var d = g.getHeaderContainer();
            d.setHeight(40);
        }
    },

    initComponent: function (c) {
        var me = this;

        me.columns = me.buildColumn();

        me.actions = {
            new: Ext.create('Ext.Action', {
                text: "New field",
                tooltip: "Add new field",
                //ui: "default",
                //reference: 'new',
                scale: 'medium',
                iconCls: "x-fa fa-plus",
                //glyph: 'xf044@FontAwesome',
                /**
                 *
                 * @param btn Button
                 * @param e Event
                 */
                handler: function(btn, e){
                    me.fireEvent('actfield', btn, me);
                },
                scope: me
            })
        };

        Ext.applyIf(me, {
            selModel: {
                //mode: "MULTI",
                pruneRemoved: false
            },
            viewConfig: {
                style: {
                    //height: '40px'
                },
                getRowClass: function(a, g, f, h){
                    return "data-row-style";
                }
            },
            plugins: [{
                ptype: 'cellediting',
                clicksToEdit: 1
            }]
        });

        me.callParent();

        var store = me.getStore(),
            topbar = me.down('toolbar[dock="top"]'),
            botbar = me.down('toolbar[dock="bottom"]');

        me.relayEvents(store, ['add', 'remove', 'datachanged'], 'store');
        me.relayEvents(botbar, ['actfield']);
    },

    buildColumn: function () {
        return [{
            text: "Field name",
            dataIndex: "name",
            menuDisabled: true,
            sortable: false,
            flex: 1,
            renderer: function(val, f, rec){

                var xf = Ext.util.Format;
                f.style = 'cursor: pointer';

                return val;
            },
            editor: {
                xtype: 'textfield',
                name: 'name',
                ui: 'medium',
                //fieldStyle: 'font-size: 15px',
                emptyText: 'Enter new field name...',
                allowBlank: false
            }

        },
        {
            text: 'Type',
            dataIndex: 'type',
            menuDisabled: true,
            sortable: false,
            width: 140,
            editor: {
                xtype: 'combo',
                name: 'type',
                ui: 'medium',
                fieldStyle: 'font-family: Open Sans;font-size: 15px;',
                editable: false,
                allowBlank: false,
                displayField: 'name',
                valueField: 'name',

                store: {
                    field: ['name'],
                    data: [{'name':'Date'}, {'name':'Number'}, {'name':'Text input'}, {'name':'Yes / No'}]
                },
                tpl: new Ext.XTemplate('<tpl for=".">' +
                        '<div style="font-size: 15px;" class="x-boundlist-item">' +
                            '{name}' +
                        '</div>' +
                    '</tpl>')
            }
        },
        {
            text: 'Settings',
            dataIndex: 'property',
            menuDisabled: true,
            sortable: false,
            width: 140,
            editor: {
                xtype: 'combo',
                name: 'property',
                ui: 'medium',
                fieldStyle: 'font-family: Open Sans;font-size: 15px;',
                editable: false,
                allowBlank: false,
                store: {
                    field:['name'],
                    data: [{'name':'Readonly'}, {'name':'Hidden'}, {'name':'Required'}]
                },
                tpl: new Ext.XTemplate('<tpl for=".">' +
                    '<div style="font-size: 15px;" class="x-boundlist-item">' +
                        '{name}' +
                    '</div>' +
                '</tpl>')
            }
        },{
            xtype: 'actioncolumn',
            text: '<i class="x-fa fa-trash fa-lg red-txt"></i>',
            width: 60,
            align: 'center',
            menuDisabled: true,
            sortable: false,
            items: [{
                iconCls: 'x-fa fa-minus-circle red-txt',
                tooltip: 'Remove',
                handler: function(view, rowIndex, colIndex) {
                    var rec = view.getStore().getAt(rowIndex);
                    rec.drop();
                }
            }]
        }];
    }
});
