
Ext.define('Vega.view.settings.view.dal.Theme',{
    extend: 'Ext.tab.Panel',

    requires: [
        //'Vega.view.settings.product.CategoryController',
        'Vega.view.settings.view.dal.ThemeModel',
        'Vega.model.dal.Theme'
    ],

    alias: 'widget.view-dal-theme',

    //controller: 'product-category',
    viewModel: {
        stores: {
            themes: {
                model: 'dal.Theme',
                autoLoad: true,
                session: true,
                //autoSync: false,
                remoteFilter: true,
                remoteSort: true,
                pageSize: 0
            }
        }
    },

    session: true,

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: 'settings-grid',
                //reference: 'grid',
                title: 'Themes',

                bind: {
                    store: '{themes}'
                },

                columns: me.buildColumns()
            }]
        });

        me.callParent(arguments);
    },

    buildColumns: function(){
        var me = this;

        return [{
            text: "Code",
            dataIndex: "CODE",
            width: 200,
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
            text: "Title",
            dataIndex: "TITLE",
            width: 200,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "Description",
            dataIndex: "DESCRIPTION",
            flex: 1,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        }];
    }
});
