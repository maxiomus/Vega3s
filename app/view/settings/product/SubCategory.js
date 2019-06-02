
Ext.define('Vega.view.settings.product.SubCategory',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.settings.product.SubCategoryController',
        'Vega.view.settings.product.SubCategoryModel',
        'Vega.model.SubCategory'
    ],

    alias: 'widget.product-subcategory',

    controller: 'product-subcategory',
    viewModel: {
        stores: {
            subcategories: {
                model: 'SubCategory',
                autoLoad: true,
                session: true,
                //autoSync: true,
                remoteFilter: true,
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
                title: 'Sub Category',
                //reference: 'grid',

                bind: {
                    store: '{subcategories}'
                },

                columns: me.buildColumns()
            }]
        });

        me.callParent(arguments);
    },

    buildColumns: function(){
        return [{
            text: "Class",
            dataIndex: "class",
            width: 140,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield',
                selectOnFocus: true,
                allowBlank: false
            }
        },{
            text: "Code",
            dataIndex: "code",
            width: 140,
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield',
                selectOnFocus: true,
                allowBlank: false
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
            text: "Category",
            dataIndex: "category",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },
        {
            text: "User1",
            dataIndex: "user1",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },{
            text: "User2",
            dataIndex: "user2",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },{
            text: "User3",
            dataIndex: "user3",
            filter: {
                type: "string",
                operator: 'st'
            },
            editor: {
                xtype: 'textfield'
            }
        },{
            text: "User4",
            dataIndex: "user4",
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
