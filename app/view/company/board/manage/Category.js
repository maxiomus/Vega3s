/**
 * Created by tech on 5/28/2019.
 */
Ext.define('Vega.view.company.board.manage.Category', {
    extend: 'Ext.form.Panel',

    requires: [
        'Vega.model.company.BoardCategory'
    ],

    alias: 'widget.manage-category',

    viewModel: {
        stores: {
            categories: {
                model: 'Vega.model.company.BoardCategory',
                autoLoad: true,
                //autoSync: false,
                pageSize: 0
            }
        }
    },

    //margin: '0 8 8 8',

    style: {
        borderTop: '1px solid #cfcfcf'
    },

    initComponent: function() {
        var me = this;

        me.items = [{
            xtype: 'grid',
            bind: {
                store: '{categories}'
            },
            columns: me.buildColumns()
        }];

        Ext.applyIf(me, {

        });

        me.callParent();
    },

    buildColumns: function(){
        return [{
            text: "Name",
            dataIndex: "name",
            flex: 1
        },
        {
            text: "Description",
            dataIndex: "desc",
            flex: 2
        },{
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