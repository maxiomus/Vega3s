
Ext.define('Vega.view.development.Line',{
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.development.LineController',
        'Vega.view.development.LineModel',
        'Ext.ux.form.SearchField'
    ],

    alias: "widget.line",

    controller: 'line',
    viewModel: {
        type: 'line'
    },

    cls: "sample-line shadow-panel",

    header: false,
    margin: '0 0 0 4',

    //session: true,

    listeners: {
        actedit: 'onActEditClick',
        actrefresh: 'onActRefreshClick',
        clearall: 'onClearFilters',
        viewitemcontextmenu: 'onItemContextMenu'
    },

    initComponent: function(){
        var me = this;

        //me.dockedItems = me.buildDockedItems();

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Line Samples",
                iconCls: "x-fa fa-question",
                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },

                mainItems: [{

                },{
                    xtype: 'container',
                    layout: 'border',
                    items: [{
                        xtype: "style-view",
                        reference: "tiles",
                        //cls: '',
                        region: 'center',
                        collapsible: false,
                        flex: 1,
                        selectionModel: {
                            mode: 'MULTI'
                        },
                        //publishes: ["selectedSamples"],
                        bind: {
                            store: "{lines}"
                        },
                        listeners: {
                            select: {
                                fn: 'onSelect',
                                scope: this.controller
                            }
                        }
                    },{
                        xtype: 'panel',
                        title: 'Line Sheets',
                        iconCls: 'x-fa fa-th',
                        plain: true,
                        region: 'west',
                        collapsible: true,
                        //collapseMode: 'mini',
                        split: {
                            size: 1
                        },
                        layout: 'fit',
                        width: 326,
                        style: {
                            //borderTop: '1px solid #cfcfcf',
                            //borderBottom: '1px solid #cfcfcf'
                        },
                        header: {
                            //overflowHandler: 'menu',
                            items: [{
                                xtype: 'button',
                                text: 'Markets',
                                ui: 'bootstrap-btn-default',
                                tooltip: 'Market Selection',
                                iconCls: 'x-fa fa-calendar-check-o',
                                menu: {
                                    xtype: 'menu',
                                    plain: true,
                                    items: {
                                        xtype: 'monthpicker',
                                        value: new Date(),
                                        okText: 'Select',
                                        cancelText: 'Clear',
                                        listeners: {
                                            okClick: 'onMonthPickOkClick',
                                            cancelClick: 'onMonthPickCancelClick',
                                            scope: this.controller
                                        }
                                    }
                                }
                            }]
                        },
                        items: [{
                            xtype: 'grid',
                            //title: 'Line Sheets',
                            //iconCls: 'x-fa fa-folder',
                            reference: 'list',
                            cls: 'line-grid',
                            //flex: 1,
                            //width: 300,
                            style: {
                                'borderTop': '1px solid #cfcfcf'
                            },
                            session: true,
                            rowLines: false,
                            //bufferedRenderer: true,
                            leadingBufferZone: 28,
                            trailingBufferZone: 28,
                            /*
                             tools: [{
                             type: 'plus',
                             callback: 'onAddLineSheet',
                             scope: this.controller
                             },{
                             type: 'refresh',
                             callback: 'onRefreshLineSheet',
                             scope: this.controller
                             }],
                             */
                            dockedItems: {
                                //weight: 101,
                                xtype: 'toolbar',
                                dock: 'top',
                                style: {
                                    'background-color': '#E4E5E7'
                                },
                                items: [{
                                    xtype: 'button',
                                    //ui: 'bootstrap-btn-default',
                                    tooltip: 'Market Selection',
                                    //iconCls: 'x-fa fa-calendar-check-o',
                                    bind: {
                                        text: '{selectedValue}'
                                    },
                                    menu: {
                                        xtype: 'menu',
                                        plain: true,
                                        items: {
                                            xtype: 'monthpicker',
                                            //reference: 'mnpkr',
                                            publishes: 'value',
                                            value: new Date(),
                                            showButtons: false,
                                            //okText: 'Select',
                                            //cancelText: 'Clear',
                                            listeners: {
                                                monthclick: function(p,v){

                                                    p.up('button').setText(Ext.Date.getShortMonthName(v[0])+', '+v[1]);
                                                    p.up('menu').hide();
                                                },
                                                yearclick: function(p,v){
                                                    p.up('button').setText(Ext.Date.getShortMonthName(v[0])+', '+v[1]);
                                                    p.up('menu').hide();
                                                }
                                                //okClick: 'onMonthPickOkClick',
                                                //cancelClick: 'onMonthPickCancelClick',
                                                //scope: this.controller
                                            }
                                        }
                                    }
                                },{
                                    xtype: 'textfield',
                                    name: 'title',
                                    width: 180,
                                    emptyText: 'Add a new line sheet',
                                    listeners: {
                                        specialkey: 'handleSpecialKey',
                                        scope: this.controller
                                    }
                                },{
                                    iconCls: 'x-fa fa-plus',
                                    handler: 'onAddLineSheetClick',
                                    scope: this.controller
                                },{
                                    iconCls: 'x-fa fa-refresh',
                                    handler: 'onRefreshLineSheet',
                                    hidden: true,
                                    scope: this.controller
                                }]
                            },
                            bind: {
                                store: '{linesheets}'
                            },
                            features: [{
                                ftype: 'grouping',
                                startCollapsed: true,
                                groupHeaderTpl: [
                                    //'{columnName}: ',
                                    '{name:this.formatName} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                                    {
                                        formatName: function(name){
                                            if(Ext.isEmpty(name)){
                                                return;
                                            }
                                            //return Ext.Date.getShortMonthName(parseInt(name.substring(4,6),10)-1) + ', ' + name.substring(0,4)
                                            return Ext.Date.format(new Date(name.slice(0,4) + '-' + name.slice(4,6) + '-1'), 'F, Y');
                                        }
                                    }
                                ]
                            }],
                            listeners: {
                                render: {
                                    fn: function(g){

                                        g.contextmenu = Ext.create("Ext.menu.Menu", {
                                            items: [{
                                                text: 'Open',
                                                iconCls: 'x-fa fa-plus-square blue-txt',
                                                tooltip: 'Open selected...',
                                                handler: 'onListOpenSheet',
                                                scope: this
                                            },{
                                                text: 'Refresh',
                                                iconCls: 'x-fa fa-refresh',
                                                handler: 'onListRefresh',
                                                scope: this
                                            },{
                                                text: 'Change',
                                                iconCls: 'x-fa fa-calendar',
                                                tooltip: 'Change to...',
                                                menu: {
                                                    xtype: 'menu',
                                                    plain: true,
                                                    items: {
                                                        xtype: 'monthpicker',
                                                        publishes: 'value',
                                                        value: new Date(),
                                                        showButtons: false,
                                                        listeners: {
                                                            monthclick: function(p,v){
                                                                //p.up('button').setText(Ext.Date.getShortMonthName(v[0])+', '+v[1]);
                                                                var rec = g.getSelection()[0];
                                                                rec.set('season', Ext.Date.format(new Date((v[0] + 1) + '/1/' + v[1]), 'Ym'));

                                                                g.getView().refresh();
                                                                g.contextmenu.hide();
                                                            },
                                                            yearclick: function(p,v){
                                                                //p.up('button').setText(Ext.Date.getShortMonthName(v[0])+', '+v[1]);
                                                                g.contextmenu.hide();
                                                            }
                                                        }
                                                    }
                                                }
                                            }]
                                        });
                                    },
                                    scope: this.controller
                                },
                                itemcontextmenu: 'onListItemContextMenu',
                                itemmouseenter: 'showActions',
                                itemmouseleave: 'hideActions',
                                scope: this.controller
                            },
                            columns: [{
                                width: 24,
                                align: 'center',
                                menuDisabled: true,
                                sortable: false
                            },{
                                dataIndex: 'title',
                                //width: 160,
                                flex: 1,
                                editor: {
                                    field: {
                                        xtype: 'textfield',
                                        allowBlank: false
                                    }
                                },
                                renderer: function(value, metaData, rec, rowIndex, colIndex, store, view){
                                    //metaData.tdStyle = 'font-weight:bold;color:' + (value > 0 ? 'green' : 'transparent');
                                    var xf = Ext.util.Format;
                                    if(Ext.isEmpty(value)){
                                        return;
                                    }

                                    metaData.tdCls = 'line-icon';
                                    return value;
                                    //return '<i style="margin-right: 8px;" class="x-fa fa-file-o"></i>'+value;
                                }
                            },{
                                xtype: 'actioncolumn',
                                width: 50,
                                align: 'right',
                                items: [{
                                    iconCls: 'x-hidden x-fa fa-plus-square fa-fw blue-txt',
                                    tooltip: 'Open selected...',
                                    handler: function(grid, rowIdx, colIdx, item, e, rec){
                                        //var rec = grid.getStore().getAt(rowIdx);
                                        //var aIndex = grid.getStore().indexOf(rec);
                                        //console.log(rec);
                                        this.redirectTo('line/tab/' + rec.data.lineId);

                                    },
                                    scope: this.controller
                                },{
                                    iconCls: 'x-hidden x-fa fa-remove fa-fw red-txt',
                                    tooltip: 'Delete the line sheet',
                                    handler: function (grid, rowIndex, colIndex, item, e, rec) {
                                        //var rec = grid.getStore().getAt(rowIndex);

                                        Ext.Msg.show({
                                            title:'Delete!',
                                            message: 'Are you sure you want to delete this?',
                                            buttons: Ext.Msg.OKCANCEL,
                                            icon: Ext.Msg.QUESTION,
                                            fn: function(btn) {
                                                if (btn === 'ok') {
                                                    //grid.getStore().remove(rec);
                                                    rec.drop();
                                                }
                                            }
                                        });
                                    }
                                }]
                            }],
                            plugins: [{
                                ptype: 'cellediting',
                                id: 'ls-cell-edit',
                                clicksToEdit: 2
                            }]
                        }]
                    }]
                }],

                displayItems: [{
                    xtype: "display",
                    reference: "display"
                }],

                bbar: me.buildBottomBar()
            }]
        });

        me.callParent(arguments);

        var g=this.lookupReference("multiview"),
            //j=g.lookupReference("grid"),
            k=g.lookupReference('tiles'),
        //m=g.lookupReference('list'),
            h=g.lookupReference("display"),
            f=g.lookupReference("topbar");

        var segmented = f.lookupReference('viewselection');
        //segmented.items.items[2].setHidden(true);
        segmented.setValue(1);
        segmented.setHidden(true);

        f.actEdit.setHidden(false);
        f.actEdit.setDisabled(true);

        var mnuItems = [f.actEdit, f.actRefresh,
            {
                text: 'Add to line...',
                iconCls: 'x-fa fa-plus',
                action: 'addto',
                disabled: true,
                handler: 'onAddToLineSheet',
                scope: this.controller
            }];

        me.contextmenu = Ext.create("Ext.menu.Menu", {
            items: mnuItems
        });

        f.items.items[0].setHidden(false);

        f.insert(0,
            [{
                xtype: "combo",
                width: 112,
                hideLabel: true,
                valueField: "field",
                displayField: "label",
                value: "Style #",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{categories}"
                },
                listeners: {
                    change: {
                        fn: "onFilterItemChange",
                        scope: this.controller
                    }
                }
            },
            {
                xtype: "combo",
                reference: 'searchcombo',
                width: 300,
                hidden: true,
                hideLabel: true,
                // Use non-breaking space so that labelWidth of null shrinkwraps the unbroken string width
                valueField: 'id',
                displayField: 'id',
                // Over Extjs 5.* configs
                enableKeyEvents: true,
                queryMode: 'local',
                paramName: 'style',
                triggers: {
                    search: {
                        weight: 1,
                        cls: Ext.baseCSSPrefix + 'form-search-trigger',
                        tooltip: 'Search',
                        handler: function(combo){
                            combo.fireEvent('triggersearch', this);
                        }
                    }
                },
                plugins: [{
                    ptype: "cleartrigger"
                }],
                listeners: {
                    render: function(c){
                        c.on('focus', function () {
                            c.expand();
                        });

                        var picker = c.getTrigger('picker');
                        picker.hide();
                    },
                    select: function(c,rec){
                        c.fireEvent('triggersearch', c, c.getValue());
                    },
                    triggersearch: {
                        fn: 'onTgrSearchClick',
                        scope: this.controller
                    },
                    triggerclear: {
                        fn: 'onTgrClearClick',
                        scope: this.controller
                    }
                }
            },
            {
                xtype: "searchfield",
                reference: 'searchfield',
                width: 300,
                bind: {
                    store: '{lines}'
                },
                paramName: 'style'
            }]
        );

        this.relayEvents(f, ["actrefresh", "actedit", "clearall"]);
        this.relayEvents(k, ["itemcontextmenu", "itemdblclick"], 'view');
    },

    buildBottomBar: function(){
        var b = Ext.widget("combo", {
            name: "perpage",
            //reference: 'pageSizer',
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: [["15"], ["25"], ["50"], ["100"], ["300"], ["500"]]
            }),
            //value: "50",
            displayField: "id",
            valueField: "id",
            editable: false,
            forceSelection: true,
            matchFieldWidth: true,
            queryMode: "local"
            //triggerAction: "all",
        });

        b.on('afterrender', function(c, e){
            var store = this.getViewModel().getStore("lines");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("lines");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{lines}"
            },
            //dock: 'bottom',
            displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }
});
