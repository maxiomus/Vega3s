
Ext.define('Vega.view.settings.product.Size',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.settings.product.SizeController',
        'Vega.view.settings.product.SizeModel',
        'Vega.model.Size'
    ],

    alias: 'widget.product-size',

    controller: 'product-size',
    viewModel: {
        stores: {
            sizes: {
                model: 'Size',
                autoLoad: true,
                session: true,
                //autoSync: true,
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
                title: 'Size',
                //reference: 'grid',
                bind: {
                    store: '{sizes}'
                },

                columns: me.buildColumns()
            }]
        });

        me.callParent(arguments);
    },

    buildColumns: function(){
        return [{
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
            text: 'Size 1',
            dataIndex: 'size1',
            width: 65,
            editor: {
                xtype: 'textfield'
            }
        },
        { text: 'Size 2', dataIndex: 'size2', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 3', dataIndex: 'size3', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 4', dataIndex: 'size4', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 5', dataIndex: 'size5', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 6', dataIndex: 'size6', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 7', dataIndex: 'size7', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 8', dataIndex: 'size8', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 9', dataIndex: 'size9', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 10', dataIndex: 'size10', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 11', dataIndex: 'size11', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 12', dataIndex: 'size12', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 13', dataIndex: 'size13', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 14', dataIndex: 'size14', width: 65, editor: { xtype: 'textfield' } },
        { text: 'Size 15', dataIndex: 'size15', width: 65, editor: { xtype: 'textfield' } },
        {
            text: 'Size Count',
            dataIndex: 'sizeCount',
            width: 65,
            editor: {
                xtype: 'textfield'
            }
        },
        { text: 'NRF 1', dataIndex: 'nrf1', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 2', dataIndex: 'nrf2', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 3', dataIndex: 'nrf3', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 4', dataIndex: 'nrf4', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 5', dataIndex: 'nrf5', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 6', dataIndex: 'nrf6', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 7', dataIndex: 'nrf7', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 8', dataIndex: 'nrf8', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 9', dataIndex: 'nrf9', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 10', dataIndex: 'nrf10', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 11', dataIndex: 'nrf11', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 12', dataIndex: 'nrf12', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 13', dataIndex: 'nrf13', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 14', dataIndex: 'nrf14', width: 65, editor: { xtype: 'textfield' } },
        { text: 'NRF 15', dataIndex: 'nrf15', width: 65, editor: { xtype: 'textfield' } },
        {
            text: 'sample_size',
            dataIndex: 'sample_size',
            width: 65,
            hidden: true,
            editor: {
                xtype: 'textfield'
            }
        }];
    }
});
