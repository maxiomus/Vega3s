
Ext.define('Vega.view.development.style.edit.Cost',{
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.development.style.edit.CostController',
        'Vega.view.development.style.edit.CostModel',
        'Ext.ux.grid.plugin.AllRowExpander'
    ],

    alias: 'widget.style-edit-cost',

    controller: 'style-edit-cost',
    viewModel: {
        type: 'style-edit-cost'
    },

    cls: 'costs-grid',

    minWidth: 1028,
    minHeight: 480,

    //stateful: true,
    //stateId: "costs-grid",
    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

    listeners: {
        reconfigure: function(grid, store){
            /*
            store.each(function(rec){
                var data = [];
                //console.log(rec.powms());
                rec.powms().each(function(item){
                    data.push(item.data);
                });
                rec.set('mats', data);
            });
            */
        },

        itemcontextmenu: function(h, j, k, g, l){
            l.stopEvent();

            var i = h.getSelectionModel();
            if(!i.isSelected(g)){
                i.select(g);
            }

            h.ownerCt.contextmenu.showAt(l.getXY());
        },

        viewready: {
            fn: function(grid){
                //var expander = grid.getPlugin('rowexdetail');
                //expander.expandAll();
            }
        }
    },

    initComponent: function(){
        var me = this;
        me.columns = this.buildColumns();

        Ext.applyIf(me, {
            selModel: {
                //type: 'cellmodel',
                pruneRemoved: false
            },
            viewConfig: {
                loadMask: true,
                stripeRows: true,
                //trackOver: true,
                //preserveScrollOnRefresh: true,
                //deferInitialRefresh: true,
                emptyText: '<h1 style="margin:20px">No matching results</h1>',
                getRowClass: function(a, g, f, h){
                    return "hide-row-expander";
                },
                listeners: {
                    refresh: function(view, e){
                        var expander = view.ownerCt.getPlugin('rowexdetail');
                        expander.expandAll();
                    }
                }
            },

            plugins: [{
                pluginId: 'bomhCellEdit',
                ptype: 'cellediting',
                ui: 'default',
                clicksToEdit: 1
            },{
                ptype: "gridfilters"
            },{
                ptype: 'allrowexpander',
                pluginId: 'rowexdetail',
                expandOnDblClick: false,
                rowBodyTpl: new Ext.XTemplate(
                    //'{%this.owner.grid.prepareValues(value);%}',
                    '<div class="tbcontainer">',
                        '<div class="tbleft" style="width: 128px">',
                            //'<img id="bomhid-{bomhId}-bodyimg" src="{[this.getBodySrc(values)]}" width="128" height="140" />',
                        '</div>',
                        '<div class="tbright" style="width: 128px">',
                            //'<img id="bomhid-{bomhId}-printimg" src="{[this.getPrintSrc(values)]}" width="128" height="140" />',
                        '</div>',
                    '</div>',

                    '<div class="grid">',
                        '<div class="tbrow">',
                            '<div class="col col-4" style="padding: 2px;">C.S #:</div>',
                            '<div class="col col-8">{bomno}</div>',
                            //'<div class="nocol col-2"></div>',
                        '</div>',
                        /*
                        '<div class="tbrow">',
                            '<div class="col col-2" style="padding: 2px;">Proc. Type:</div>',
                            '<div class="col col-10">{processType}</div>',
                            //'<div class="nocol col-2"></div>',
                        '</div>',
                        */
                        '<div class="tbrow">',
                            '<div class="col col-2" style="padding: 2px;">Materials Total:</div>',
                            '<div class="col col-10">{colorCompTotal:usMoney}</div>',
                            //'<div class="nocol col-2"></div>',
                        '</div>',
                        '<div class="tbrow">',
                            '<div class="col col-2" style="padding: 2px;">Labor Total:</div>',
                            '<div class="col col-10">{processtotal:usMoney}</div>',
                            //'<div class="nocol col-2"></div>',
                        '</div>',
                        '<div class="tbrow">',
                            '<div class="col col-2" style="padding: 2px;">Sub Total:</div>',
                            '<div class="col col-10">{subTotal:usMoney}</div>',
                            //'<div class="nocol col-2"></div>',
                        '</div>',
                        '<div class="tbrow">',
                            '<div class="col col-2" style="padding: 2px;">Assoc. Total:</div>',
                            '<div class="col col-10">{assoctotal:usMoney}</div>',
                            //'<div class="nocol col-2"></div>',
                        '</div>',
                        '<div class="tbrow">',
                            '<div class="col col-2" style="padding: 2px;">Cost Sheet Total:</div>',
                            '<div class="col col-10">{total:usMoney}</div>',
                            //'<div class="nocol col-2"></div>',
                        '</div>',
                    '</div>',
                    {
                        /*
                        getBodySrc: function (a) {
                            return a.bodyimg.indexOf('blob:') !== -1 ? a.bodyimg : '../' + a.bodyimgsrc + '?w=128&h=140';
                        },
                        getPrintSrc: function (a) {
                            return a.printimg.indexOf('blob:') !== -1 ? a.printimg : '../' + a.printimgsrc + '?w=128&h=140';
                        }
                        */
                    }
                )
            }]
        });

        me.callParent(arguments);

        var formController = me.up('style-edit-form').getController();

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Copy',
                iconCls: 'x-fa fa-copy',
                tooltip: 'Duplicate Cost Sheet',
                handler: 'onCopyCostClick',
                scope: formController
            },{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Cost Sheet',
                handler: 'onEditCostClick',
                scope: formController
            },{
                text: 'Delete',
                iconCls: 'x-fa fa-remove',
                tooltip: 'Delete Cost Sheet',
                handler: 'onDeleteCostClick',
                scope: formController
            },{
                text: 'Preview',
                iconCls: 'x-fa fa-file-text-o',
                tooltip: 'Preview Cost Sheet',
                handler: 'onPreviewCostClick',
                scope: formController
            }]
        });

        //me.relayEvents(me.getStore(), ['load']);
    },

    buildColumns: function(){
        return[{
            text: "ID",
            dataIndex: "powdId",
            menuDisabled: true,
            sortable: false,
            hidden: true
        },
        {
            text: "",
            menuDisabled: true,
            columns: [{
                text: "Style",
                dataIndex: "style",
                width: 140,
                menuDisabled: true,
                sortable: false,
                renderer: function (value, metaData, record, rowIndex, colIndex) {
                    return value;
                }
            },
            {
                text: "Color",
                dataIndex: "color",
                width: 140,
                menuDisabled: true,
                sortable: false
            }]
        },
        {
            text: "Body Image",
            dataIndex: "bodyimgsrc",
            menuDisabled: true,
            sortable: false,
            hidden: true
        },
        {
            text: "Print Image",
            dataIndex: "printimgsrc",
            menuDisabled: true,
            sortable: false,
            hidden: true
        },
        {
            text: "Description",
            //dataIndex: "bomno",
            flex: 1,
            menuDisabled: true,
            sortable: false,
            hidden: false
        },
        {
            text: "Process Type",
            dataIndex: "processType",
            menuDisabled: true,
            sortable: false,
            hidden: true
        },
        {
            xtype: 'numbercolumn',
            text: "Materials Total",
            dataIndex: "colorCompTotal",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '$0,000.00',
            hidden: true,
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Labor Total",
            dataIndex: "processtotal",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '$0,000.00',
            hidden: true,
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Sub Total",
            dataIndex: "subTotal",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '$0,000.00',
            hidden: true,
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Assoc. Total",
            dataIndex: "assoctotal",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '$0,000.00',
            hidden: true,
            editor: {
                xtype: 'numberfield'
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Cost Sheet Total",
            dataIndex: "total",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            hidden: true,
            format: '$0,000.00',
            editor: {
                xtype: 'numberfield'
            }
        },
        /*
        {
            text: "Customer",
            dataIndex: "customer",
            menuDisabled: true,
            sortable: false,
            hidden: false,
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Selling Price",
            dataIndex: "selling",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '0.00',
            hidden: false,
            editor: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'numbercolumn',
            text: "UNITS",
            dataIndex: "units",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '0,000',
            editor: {
                xtype: 'textfield'
            }
        },
        */
        {
            xtype: 'checkcolumn',
            text: 'Confirm',
            width: 80,
            dataIndex: 'confirm_yn',
            menuDisabled: true,
            sortable: false,
            hidden: false
        },
        {
            xtype: 'datecolumn',
            text: "Eff. Start Date",
            dataIndex: "EffStartDate",
            //width: 90,
            menuDisabled: false,
            sortable: false,
            hidden: false,
            format: 'Y-m-d'
        },{
            xtype: 'datecolumn',
            text: "Eff. End Date",
            dataIndex: "EffEndDate",
            //width: 90,
            menuDisabled: false,
            sortable: false,
            hidden: false,
            format: 'Y-m-d'
        },
        {
            text: 'Created By',
            dataIndex: 'createUser',
            //width: 120,
            menuDisabled: true,
            sortable: false,
            hidden: false
        },
        {
            xtype: 'datecolumn',
            text: "Created on",
            dataIndex: "createTime",
            //width: 90,
            menuDisabled: false,
            sortable: false,
            hidden: false,
            format: 'Y-m-d'
        },
        {
            text: 'Updated By',
            dataIndex: 'updateUser',
            //width: 120,
            menuDisabled: true,
            sortable: false,
            hidden: false
        },
        {
            xtype: 'datecolumn',
            text: "Updated on",
            dataIndex: "updateTime",
            //width: 90,
            menuDisabled: false,
            sortable: false,
            hidden: false,
            format: 'Y-m-d'
        }];
    }
});
