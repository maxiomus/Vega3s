
Ext.define('Vega.view.settings.vendors.VendorType',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.settings.vendors.VendorTypeController',
        'Vega.view.settings.vendors.VendorTypeModel',
        'Vega.model.VendorType'
    ],

    alias: 'widget.vendors-vendortype',

    controller: 'vendors-vendortype',
    viewModel: {
        stores: {
            types: {
                model: 'VendorType',
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
                title: 'Vendor Type',

                bind: {
                    store: '{types}'
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
            xtype: 'checkcolumn',
            text: "Kind",
            dataIndex: "typekind",
            editor: {
                xtype: 'checkbox',
                inputValue: 1,
                uncheckedValue: 0
            }
        }];
    }
});
