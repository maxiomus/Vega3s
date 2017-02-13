
Ext.define('Vega.view.sales.edit.Tagging',{
    extend: 'Ext.panel.Panel',

    requires: [
        'Vega.view.sales.edit.TaggingController',
        'Vega.view.sales.edit.TaggingModel'
    ],

    alias: 'widget.tag-select',

    /*
     controller: 'sales-edit-tagging',
     viewModel: {
     type: 'sales-edit-tagging'
     },
     */

    width: 650,
    height: 300,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initData: [
        { name: 'style' },
        { name: 'color'},
        { name: 'bodyref'},
        { name: 'cost'},
        { name: 'price'},
        { name: 'msrp'},
        { name: 'units'},
        { name: 'factory'},
        { name: 'fabrics'},
        { name: 'prints'},
        { name: 'trims'},
        { name: 'contrast'},
        { name: 'stone'}
    ],

    initComponent: function(){
        var me = this;

        var store = Ext.create('Ext.data.Store', {
            model: 'Vega.model.Powdtag'
        });

        me.items = [{
            xtype: 'checkbox',
            name: 'status',
            bind: '{thePowd.status}',
            boxLabel: 'Approve',
            handler: function(c, checked){
                var selector = me.down('multiselector');
                selector.setDisabled(checked);
            }
        },{
            xtype: 'multiselector',
            title: 'Selected Items for Audit',
            //fieldName: 'name',
            //store: store,
            bind: {
                store: '{thePowd.powdtags}'
            },
            flex: 1,
            margin: '0 0 10 0',
            tools: [{
                type: 'refresh',
                tooltip: 'Reset',
                scope: this,
                callback: function(c, tool, e){
                    //c.getStore().loadData(this.initData);
                    var store = c.getStore();

                    if (c.searchPopup) {
                        c.searchPopup.deselectRecords(store.getRange());
                    }
                }
            }],

            viewConfig: {
                stripeRows: true,
                columnLines: true,
                deferEmptyText: false,
                emptyText: 'No items selected'
            },

            plugins: [{
                ptype: 'cellediting',
                clicksToEdit: 1
            }],

            columns: [{
                text: 'ID',
                sortable: true,
                menuDisabled: true,
                dataIndex: 'powdId',
                hidden: false
            },{
                text: 'Name',
                sortable: true,
                menuDisabled: true,
                dataIndex: 'name'
            },{
                text: 'Value',
                sortable: false,
                menuDisabled: true,
                dataIndex: 'value',
                hidden: true
            },{
                text: 'Notes',
                flex: 1,
                sortable: false,
                menuDisabled: true,
                dataIndex: 'note',
                hidden: false,
                editor: {
                    xtype: 'textfield'
                }
            },{
                width: 35,
                menuDisabled: true,
                sortable: false,
                tdCls: Ext.baseCSSPrefix + 'multiselector-remove',
                renderer: function () {
                    return '<span data-qtip="'+ 'Remove this item' + '" role="button">' +
                        '\u2716' + '</span>';
                },
                processEvent: function (type, view, cell, recordIndex, cellIndex, e, record, row) {
                    var body = Ext.getBody();

                    if (e.type === 'click' || (e.type === 'keydown' && (e.keyCode === e.SPACE || e.keyCode === e.ENTER))) {

                        // Deleting the focused row will momentarily focusLeave
                        // That would dismiss the popup, so disable that.
                        //body.suspendFocusEvents();
                        view.grid.getStore().remove(record);
                        //body.resumeFocusEvents();
                        if (view.grid.searchPopup) {
                            view.grid.searchPopup.deselectRecords(record);
                        }
                    }
                },
                updater: Ext.emptyFn
            }],

            search: {
                field: 'name',
                height: 305,
                store: store,
                /*
                store: {
                    model: 'Vega.model.Powdtag',
                    //fields: ['powdId', 'name'],
                    data: me.initData,
                    autoLoad: false
                },
                */

                listeners: {
                    render: function(p){

                        var searchGrid = p.lookupReference('searchGrid');
                        searchGrid.on('deselect', function(grid, rec, idx, e){
                            rec.reject();
                        })

                    }
                }
            }
        }];

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
    }
});
