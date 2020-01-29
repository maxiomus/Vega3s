/**
 * Created by tech on 5/28/2019.
 */

Ext.define("Vega.view.company.board.manage.Board", {
    extend: "Vega.view.company.board.manage.Grid",

    alias: 'widget.manage-board',

    viewModel: {
        stores: {
            boards: {
                model: 'company.Board',
                autoLoad: true,
                //autoSync: false,
                session: true,
                pageSize: 0
            }
        }
    },

    title: 'Board',
    iconCls: 'x-fa fa-folder-open-o',

    session: true,

    bind: {
        store: '{boards}'
    },

    initComponent: function() {
        var me = this;

        me.columns = me.buildColumns();

        Ext.applyIf(me, {

        });

        me.callParent();
    },

    buildColumns: function(){
        return [{
            text: "Name",
            dataIndex: "name",
            flex: 1,
            editor: {
                xtype: 'textfield',
                selectOnFocus: true,
                allowBlank: false
                //disabled: rec ? !rec.phantom : false
            },
            filter: {
                type: "string",
                operator: 'st'
            }
        },
        {
            text: "Description",
            dataIndex: "desc",
            flex: 2,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'checkcolumn',
            text: "In Use",
            dataIndex: "status",
            editor: {
                xtype: 'checkbox',
                inputValue: 1,
                uncheckedValue: 0
            }
        },
        {
            xtype: 'actioncolumn',
            text: '<i class="x-fa fa-close"></i>',
            //iconCls: 'x-fa fa-close red-txt',
            width: 50,
            align: 'center',
            menuDisabled: true,
            sortable: false,

            items: [{
                //icon: 'resources/images/shared/icon-error.png',
                //glyph: 45,
                //ui: 'default',
                iconCls: 'x-fa fa-remove red-txt',
                tooltip: 'Remove',
                style: {
                    color: 'red'
                },
                handler: function(view, rowIndex, colIndex) {
                    var rec = view.getStore().getAt(rowIndex);
                    rec.drop();
                }
            }]
        }];
    }
});
