
Ext.define("Vega.view.sales.edit.Detail", {
    extend: "Ext.grid.Panel",

    requires: [
        "Vega.view.sales.edit.DetailController",
        "Vega.view.sales.edit.DetailModel",
        'Ext.ux.grid.plugin.AllRowExpander'
    ],

    /*
    controller: "sales-edit-detail",
    viewModel: {
        type: "sales-edit-detail"
    },
    */

    alias: 'widget.sales-edit-detail',
    //publishes: ['selectedStyle'],

    cls: 'detail-grid',

    minWidth: 1028,
    minHeight: 480,

    //stateful: true,
    //stateId: "detail-grid",
    //stateEvents: ["columnmove", "columnresize", "groupchange", "bodyresize"],

    listeners: {
        afterrender: function(grid){
            //grid.getView().on('expandbody', grid.onRowExpand);

            /*
            var menu = grid.headerCt.getMenu();

            var menuItem = menu.add({
                iconCls: 'x-fa fa-calendar',
                text: 'Set Dates'
            });

            var sub = Ext.create('Ext.menu.Menu', {
                items: [{
                    xtype: 'datepicker',
                    handler: function(picker, date){
                        grid.getStore().each(function(rec){
                            var cIdx = menu.activeHeader.dataIndex;
                            switch(cIdx){
                                case "fabricby":
                                    rec.set('fabricby', date);
                                    break;
                                case "markerby":
                                    rec.set('markerby', date);
                                    break;
                                case "pnsby":
                                    rec.set('pnsby', date);
                                    break;
                            }

                        });
                        sub.hide();
                        menu.hide();
                    }
                }]
            });
            menuItem.setMenu(sub);

            menu.on('beforeshow', function() {
                var currentDataIndex = menu.activeHeader.dataIndex;

                if (currentDataIndex === 'fabricby' || currentDataIndex === 'markerby' || currentDataIndex === 'pnsby') {
                    menuItem.show();
                } else {
                    menuItem.hide();
                }
            });
            */
        },
        reconfigure: function(grid, store){

            store.each(function(rec){
                var data = [];
                //console.log(rec.powms());
                rec.powms().each(function(item){
                    data.push(item.data);
                });
                rec.set('mats', data);
            });

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
                        '<div class="tbleft">',
                            '<img id="powdid-{powdId}-bodyimg" src="{[this.getBodySrc(values)]}" width="128" height="140" />',
                        '</div>',
                        '<div class="tbright">',
                            '<img id="powdid-{powdId}-printimg" src="{[this.getPrintSrc(values)]}" width="128" height="140" />',
                        '</div>',
                    '</div>',

                    '<div class="grid">',
                        '<tpl for="mats">',
                            '<div class="tbrow">',
                                '<div class="col col-2">{matcategory}</div>',
                                '<div class="col col-10">{[this.formatItem(values)]}</div>',
                                /*
                                '<tpl if="this.isStone(mattype)">',
                                    '<div class="col col-10">{matvendor} {matcost}</div>',
                                '<tpl else>',
                                    '<div class="col col-10">{matdesc} {matcode} {matcolor}</div>',
                                '</tpl>',
                                */
                            '</div>',
                        '</tpl>',
                        '<div class="tbrow">',
                            '<div class="col col-2">Body DESC</div>',
                            '<div class="col col-10">{bodydesc}</div>',
                        '</div>',
                        '<div class="tbrow">',
                            '<div class="col col-2">Stitch DESC</div>',
                            '<div class="col col-10">{stitchdesc}</div>',
                        '</div>',
                    '</div>',
                    {
                        getBodySrc: function(a){
                            return a.bodyimg.indexOf('blob:') !== -1 ? a.bodyimg : '../' + encodeURIComponent(a.bodyimgsrc) + '?w=128&h=140';
                        },
                        getPrintSrc: function(a){
                            return a.printimg.indexOf('blob:') !== -1 ? a.printimg : '../' + encodeURIComponent(a.printimgsrc) + '?w=128&h=140';
                        },
                        formatItem: function(a){
                            var stRight = (a.matcode && a.matcolor) ? a.matcode + ' ' + a.matcolor : a.matcode || a.matcolor,
                                stLeft = a.matdesc;

                            if (a.mattype === 'STONE'){
                                stLeft = a.matvendor;
                                stRight = (a.matcost && a.matdesc) ? a.matcost + ' ' + a.matdesc : a.matcost || a.matdesc;
                            }

                            return Ext.String.format('{0} {1}', stLeft, stRight);
                        },
                        isEmpty: function(value){
                            return Ext.isEmpty(value);
                        },
                        isStone: function(mattype){
                            return mattype == 'STONE';
                        }
                    }
                )
            }]
        });

        me.callParent(arguments);

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Copy',
                iconCls: 'x-fa fa-copy',
                tooltip: 'Duplicate Style',
                handler: 'onCopyStyleClick',
                scope: me.up('sales-edit-form').getController()
            },{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Style',
                handler: 'onEditStyleClick',
                scope: me.up('sales-edit-form').getController()
            },{
                text: 'Delete',
                iconCls: 'x-fa fa-remove',
                tooltip: 'Delete Style',
                handler: 'onDeleteStyleClick',
                scope: me.up('sales-edit-form').getController()
            },{
                text: 'T&A',
                iconCls: 'x-fa fa-tasks',
                tooltip: 'Open T&A',
                handler: function(){
                    var rec = this.getSelection()[0];
                    this.fireEvent('opentna', this, rec);
                },
                scope: me
            },{
                text: 'Export To...',
                iconCls: 'x-fa fa-external-link',
                tooltip: 'Export Style',
                handler: 'onExportStyleClick',
                scope: me.up('sales-edit-form').getController()
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
            text: "MERCHANDISE",
            menuDisabled: true,
            columns: [{
                text: "Style",
                dataIndex: "style",
                width: 140,
                menuDisabled: true,
                sortable: false
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
            text: "DESCRIPTION",
            flex: 1,
            dataIndex: "bodyref",
            menuDisabled: true,
            sortable: false,
            hidden: false
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
            xtype: 'numbercolumn',
            text:"Cost",
            dataIndex: "cost",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '0.00',
            editor: {
                xtype: 'numberfield',
                minValue: 0,
                hideTrigger: true
            }
        },
        {
            xtype: 'numbercolumn',
            text: "Selling Price",
            dataIndex: "price",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '0.00',
            hidden: false,
            editor: {
                xtype: 'numberfield',
                minValue: 0,
                hideTrigger: true
            }
        },
        {
            xtype: 'numbercolumn',
            text: "MSRP",
            dataIndex: "msrp",
            //width: 90,
            menuDisabled: true,
            sortable: false,
            format: '0.00',
            editor: {
                xtype: 'numberfield',
                minValue: 0,
                hideTrigger: true
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
                xtype: 'numberfield',
                minValue: 0,
                hideTrigger: true
            }
        },
        {
            text: 'Factory',
            dataIndex: 'factory',
            width: 120,
            menuDisabled: true,
            sortable: false,
            editor: {
                xtype: 'combo',
                name: 'factory',
                //fieldLabel: 'FACTORY',
                hideLabel: true,
                displayField: 'text',
                valueField: 'text',
                editable: false,
                //triggerAction: 'all',
                queryMode: 'local',
                bind: {
                    store: '{factories}'
                },
                plugins: [{
                    ptype: "cleartrigger"
                }]
            }
        },
        {
            xtype: 'checkcolumn',
            text: 'Approve?',
            width: 80,
            dataIndex: 'status',
            menuDisabled: true,
            sortable: false,
            disabled: false,
            hidden: false
        },
        /*
        {
            xtype: 'widgetcolumn',
            text: 'Approve?',
            width: 80,
            dataIndex: 'status',
            menuDisabled: true,
            sortable: false,
            disabled: false,
            widget: {
                xtype: 'checkbox',
                bind: '{record.status}'
            }
        },
        */
        {
            xtype: 'datecolumn',
            text: "Fabric By",
            dataIndex: "fabricby",
            //width: 90,
            menuDisabled: false,
            sortable: false,
            hidden: true,
            format: 'Y-m-d',
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
        },
        {
            xtype: 'datecolumn',
            text: "Marker By",
            dataIndex: "markerby",
            //width: 90,
            menuDisabled: false,
            sortable: false,
            hidden: true,
            format: 'Y-m-d',
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
        },
        {
            xtype: 'datecolumn',
            text: "Print & Stone By",
            dataIndex: "pnsby",
            //width: 90,
            menuDisabled: false,
            sortable: false,
            hidden: true,
            format: 'Y-m-d',
            editor: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
        },
        {
            text: 'Created By',
            dataIndex: 'userId',
            //width: 120,
            menuDisabled: true,
            sortable: false,
            hidden: true
        },
        {
            xtype: 'datecolumn',
            text: "Created on",
            dataIndex: "createdon",
            //width: 90,
            menuDisabled: false,
            sortable: false,
            hidden: true,
            format: 'Y-m-d'
        },
        {
            text: 'Updated By',
            dataIndex: 'updatedby',
            //width: 120,
            menuDisabled: true,
            sortable: false,
            hidden: true
        },
        {
            xtype: 'datecolumn',
            text: "Updated on",
            dataIndex: "updatedon",
            //width: 90,
            menuDisabled: false,
            sortable: false,
            hidden: true,
            format: 'Y-m-d'
        },
        {
            xtype: 'actioncolumn',
            text: 'T&A',
            width: 80,
            align: 'center',
            menuDisabled: true,
            sortable: false,
            hidden: true,
            items: [{
                tooltip: 'T&A',
                iconCls: 'x-fa fa-tasks blue-txt',
                handler: function(grid, rowIndex, colIndex, item, e, rec, row){
                    //console.log(grid, rowIndex, colIndex, item, rec, row)
                    this.fireEvent('opentna', this, rec);
                },
                scope: this
            }]
            /*
            widget: {
                xtype: 'button',
                width: 30,
                iconCls: 'x-fa fa-edit',
                handler: 'onEditClick',
                scope: this
            }
            */
        }];
    }

    /**
     * Open the Style Detail Window for Edit
     * @private
     */
    /*
    onEditClick: function(btn){
        //console.log('Detail', btn.getWidgetRecord())
        this.fireEvent('opendialog', this, btn.getWidgetRecord());
    },

    onRowExpand: function(node, rec, row){
        //console.log('onRowExpand', node, rec, row)
    }
    */

});
