/**
 * Created by tech on 5/28/2019.
 */

Ext.define("Vega.view.company.board.manage.Board", {
    extend: "Ext.form.Panel",

    alias: 'widget.manage-board',

    viewModel: {
        stores: {
            boards: {
                fields: ['id', 'text'],
                autoLoad: true,
                //remoteFilter: true,
                proxy: {
                    type: 'ajax',
                    url: '/api/Combos/boards',

                    pageParam: '',
                    startParam: '',
                    limitParam: '',

                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }
        }
    },

    margin: '8 8 8 8',

    initComponent: function() {
        var me = this;

        me.items = [{
            xtype: 'itemselector',
            name: 'boards',
            anchor: '100% 95%',
            displayField: 'text',
            valueField: 'id',
            bind: {
                store: '{boards}',
                value: '{}'
            },
            allowBlank: false,
            //msgTarget: 'side',
            fromTitle: 'Available Boards',
            toTitle: 'Disabled Boards',
            buttons: ['add', 'remove'],
            delimiter: null
        }];

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
    }
});
