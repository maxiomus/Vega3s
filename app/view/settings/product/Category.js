
Ext.define('Vega.view.settings.product.Category',{
    extend: 'Ext.tab.Panel',

    requires: [
        //'Vega.view.settings.product.CategoryController',
        //'Vega.view.settings.product.CategoryModel',
        'Vega.model.Category'
    ],

    alias: 'widget.product-category',

    //controller: 'product-category',
    viewModel: {
        stores: {
            categories: {
                model: 'Category',
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
                title: 'Category',

                bind: {
                    store: '{categories}'
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
            dataIndex: "code",
            width: 140,
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
            dataIndex: "descript",
            flex: 1,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "EDI Selection",
            dataIndex: "EDISelection",
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
            dataIndex: "displayCheck",
            editor: {
                xtype: 'checkbox',
                inputValue: 1,
                uncheckedValue: 0
            }
        }];
    }
});
