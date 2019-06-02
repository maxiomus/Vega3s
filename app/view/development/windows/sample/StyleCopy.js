/**
 * Created by tech on 10/9/2014.
 */
Ext.define('Vega.view.development.windows.sample.StyleCopy', {
    extend: 'Ext.window.Window',

    requires: [
        'Vega.view.development.windows.sample.StyleCopyController',
        'Vega.view.development.windows.sample.StyleCopyModel',
        'Ext.view.MultiSelector',
        'Ext.ux.form.ItemSelector'
    ],

    alias: 'widget.windows-sample-stylecopy',

    controller: "windows-sample-stylecopy",
    viewModel: {
        type: "windows-sample-stylecopy"
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Copy Style',
        iconCls: 'x-fa fa-copy',
        titlePosition: 0,
        titleAlign: 'left'
    },

    padding: 10,

    bind: {
        title: '{title}'
    },

    width: 720,
    height: 480,
    minWidth: 720,
    minHeight: 480,

    //modal: true,
    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,

    tools: [{
        type: 'pin'
    }],

    initComponent: function() {
        var me = this;

        // Calculating the textfield height...
        var field = new Ext.form.field.Text({
                renderTo: document.body
            }), fieldHeight = field.getHeight(),
            padding = 5,
            remainingHeight;

        field.destroy();
        remainingHeight = padding + fieldHeight * 5;

        /*
        var colors = Ext.create('Ext.data.Store', {
            //storeId: 'memMyColors',
            pageSize: 50,
            remoteFilter: true,
            proxy: {
                type: 'memory',
                enablePaging: true,
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        });

        var remoteColors = Ext.create('Ext.data.Store', {
            model: 'Color',

            pageSize: 0,
            autoLoad: true,

            remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/api/Options/colors',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },

            listeners: {
                load: function(s){

                    colors.getProxy().setData(s.getRange());
                    colors.load();

                }
            }
        });
        */

        Ext.applyIf(me, {

            items: [{
                xtype: 'form',
                layout: {
                    type: 'anchor'
                },
                defaults: {
                    margin: '0 0 10 0'
                },
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldDefaults: {
                        margin: '0 15 0 0'
                    },
                    items:[{
                        xtype: 'combo',
                        name: 'style',
                        fieldLabel: 'Style #',
                        labelWidth: 50,
                        hideTrigger: true,
                        allowBlank: false,
                        readOnly: true,
                        tabIndex: 0,
                        bind: {
                            value: '{selected.style}'
                        },
                        store: 'memStyles',
                        remoteStore: 'Styles',
                        valueField: 'id',
                        displayField: 'id',
                        editable: false,
                        selectOnFocus: false,
                        selectOnTab: false,
                        //typeAhead: true,
                        //forceSelection: true,
                        //minChars: 1,
                        matchFieldWidth: true,
                        queryMode: 'local',
                        //queryParam: "filter",
                        pageSize: 50,
                        listConfig: {
                            width: 320,
                            loadingText: 'Searching....',
                            emptyText: '<p style="padding-left: 5px;">No match found.</p>'

                            // Custom rendering template for each item
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    },{
                        xtype: 'combo',
                        name: 'color',
                        fieldLabel: 'Color',
                        labelWidth: 40,
                        hideTrigger: true,
                        allowBlank: true,
                        readOnly: true,
                        tabIndex: 1,
                        bind: {
                            //store: '{bodies}',
                            value: '{selected.color}'
                        },
                        store: 'memColors',
                        remoteStore: 'Colors',
                        queryMode: 'local',
                        valueField: 'id',
                        displayField: 'id',
                        editable: false,
                        selectOnFocus: false,
                        selectOnTab: false,
                        //typeAhead: true,
                        //forceSelection: true,
                        //minChars: 1,
                        matchFieldWidth: true,
                        pageSize: 50,
                        listConfig: {
                            width: 340,
                            loadingText: 'Searching....',
                            emptyText: '<p style="padding-left: 5px;">No match found.</p>'

                            // Custom rendering template for each item
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }]
                },{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [{
                        xtype: 'checkbox',
                        name: 'copyCS',
                        fieldLabel: '',
                        //labelWidth: 60,
                        inputValue: true,
                        boxLabel: 'Copy C.S',
                        reference: 'chkCopyCS',
                        tabIndex: 2,
                        listeners: {
                            change: function(c, n, o){

                                var previous = c.ownerCt.previousSibling('fieldcontainer'),
                                    cboStyle = previous.down('combo[name="style"]'),
                                    cboColor = previous.down('combo[name="color"]'),
                                    cboBomno = c.ownerCt.down('combo[name="bomno"]'),
                                    store = cboBomno.getStore();


                                Ext.apply(store.getProxy().extraParams, {
                                    style: cboStyle.getValue().trim(),
                                    color: cboColor.getValue().trim()
                                });

                                store.load({
                                    callback: function(){
                                        //qe.combo.select(store.first());
                                        //colorCombo.fireEvent('select', combo, [store.first()]);
                                    }
                                });
                            }
                        }
                    },{
                        xtype: 'combo',
                        name: 'bomno',
                        reference: 'numCS',
                        fieldLabel: 'C.S #',
                        labelWidth: 40,
                        width: 95,
                        margin: '0 15 0 15',
                        tabIndex: 3,
                        store: 'Bomnos',
                        bind: {
                            disabled: '{!chkCopyCS.checked}'
                        },
                        displayField: 'id',
                        valueField: 'id',

                        editable: false,
                        forceSelection: true,
                        //minChars: 1,
                        matchFieldWidth: true,
                        queryMode: 'local',
                        //pageSize: 15,
                        //queryDelay: 500,
                        allowBlank: false,
                        listeners: {
                            beforequery: {
                                fn: function(qe){
                                    //console.log(qe.combo, qe.combo.ownerCt, qe.combo.ownerCt.previousSibling('fieldcontainer'))

                                    //delete qe.combo.lastQuery;
                                }
                            }
                        }
                    },{
                        xtype: 'checkbox',
                        name: 'copyImages',
                        fieldLabel: '',
                        //labelWidth: 60,
                        inputValue: true,
                        hidden: true,
                        tabIndex: 4,
                        boxLabel: 'Copy Images',
                        reference: 'chkCopyImages'
                    }]
                },{
                    xtype: 'fieldset',
                    title: 'New Style Info',
                    defaultType: 'textfield',
                    checkboxToggle: true,
                    padding: 10,
                    items: [{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        reference: 'divisionSize',
                        items:[{
                            xtype: 'combo',
                            name: 'division',
                            fieldLabel: 'Division',
                            labelWidth: 55,
                            margin: '0 15 0 0',
                            displayField: 'text',
                            valueField: 'text',
                            //selectOnFocus: false,
                            tabIndex: 5,
                            editable: false,
                            allowBlank: false,
                            queryMode: 'local',
                            autoLoadOnValue: true,
                            //triggerAction: 'all',
                            bind: {
                                store: '{divisions}',
                                value: '{selected.division}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        },{
                            xtype: 'combo',
                            name: 'sizeCat',
                            fieldLabel: 'Sizes',
                            labelWidth: 40,
                            displayField: 'text',
                            valueField: 'text',
                            editable: false,
                            allowBlank: false,
                            tabIndex: 6,
                            //selectOnFocus: true,
                            //forceSelection: true,
                            autoLoadOnValue: true,
                            //minChars: 1,
                            queryMode: 'local',
                            //triggerAction: 'all',
                            bind: {
                                store: '{sizeCats}',
                                value: '{selected.sizeCat}'
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }]
                        }]
                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'checkbox',
                            name: 'newColors',
                            fieldLabel: '',
                            //labelWidth: 85,
                            tabIndex: 7,
                            inputValue: true,
                            boxLabel: 'New Colors:',
                            reference: 'chkNewColor'
                        }]
                    },{
                        xtype: "tagfield",
                        name: 'colors',
                        fieldLabel: "",
                        reference: 'colors',
                        //hideLabel: true,
                        tabIndex: 8,
                        hideTrigger: false,
                        width: 460,
                        bind: {
                            disabled: '{!chkNewColor.checked}'
                        },
                        store: 'memColors',
                        remoteStore: 'Colors',
                        valueField: "id",
                        displayField: "id",
                        forceSelection: false,
                        selectOnFocus: true,
                        autoLoadOnValue: true,
                        queryMode: 'local',
                        //queryParam: "filter",
                        //triggerAction: 'all',
                        //lastQuery: '',
                        //filterPickList: true,
                        pageSize: 50, // only works with queryMode = 'remote'
                        //minChars: 1,
                        matchFieldWidth: false,
                        listConfig: {
                            loadindText: 'Searching...',
                            emptyText: 'No matching items found.',
                            width: 340
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }]
                    }
                        /*
                         {
                         xtype: 'multiselector',
                         title: 'Select Colors',
                         reference: 'color-grid',
                         //flex: 1,
                         anchor: '56% 62%',
                         //frame: true,
                         border: true,
                         bind: {
                         disabled: '{!chkNewColor.checked}'
                         },
                         //margin: '0 0 10 0',
                         //hideHeaders: true,
                         //columnLines: true,
                         tools: [{
                         type: 'reset',
                         tooltip: 'Reset',
                         scope: this,
                         callback: function(c, tool, e){
                         //c.getStore().loadData(this.initData);

                         if (c.searchPopup) {
                         //c.searchPopup.deselectRecords(store.getRange());
                         c.searchPopup.refs.searchGrid.getSelectionModel().deselectAll();
                         }
                         }
                         }],

                         fieldName: 'code',

                         viewConfig: {
                         deferEmptyText: false,
                         emptyText: 'No colors selected'
                         },

                         search: {
                         field: 'code',
                         width: 290,
                         height: 240,
                         store: colors,
                         bbar: {
                         xtype: "pagingtoolbar",
                         //itemId: "pagingtb",
                         store: colors,
                         style: {
                         borderTop: '1px solid #cfcfcf'
                         //borderBottom: '1px solid #cfcfcf',
                         //'background-color': '#E4E5E7'
                         }
                         //dock: 'bottom'
                         }
                         },

                         listeners: {
                         disable: function(c){
                         if (c.searchPopup) {
                         //c.searchPopup.deselectRecords(store.getRange());
                         c.searchPopup.refs.searchGrid.getSelectionModel().deselectAll();
                         }
                         }
                         }
                         }*/
                    ]
                }],

                buttons: [{
                    action: 'save',
                    text: 'Save',
                    formBind: true,
                    //glyph: 86,
                    iconCls: 'x-fa fa-save',
                    handler: function(btn){
                        me.fireEvent('saveclick', btn, me);
                    }
                },{
                    action: 'close',
                    text: 'Close',
                    //glyph: 88,
                    iconCls: 'x-fa fa-close',
                    handler: function(btn){
                        me.close();
                    }
                }]

            }]
            /*
            items: [{
                xtype: 'grid',
                //title: 'Line Sheets',
                //iconCls: 'x-fa fa-folder',
                reference: 'color-grid',
                anchor: '60% 100%',
                //session: true,

                tools: [{
                    type: 'plus',
                    callback: 'onAddLineSheet',
                    scope: this.controller
                },{
                    type: 'refresh',
                    callback: 'onRefreshLineSheet',
                    scope: this.controller
                }],

                style: {
                    //borderTop: '1px solid #cfcfcf'
                    //borderBottom: '1px solid #cfcfcf'
                },
                tbar: {
                    //weight: 101,
                    style: {
                        //'background-color': '#E4E5E7'
                    },
                    items: [{
                        xtype: 'textfield',
                        fieldLabel: 'Search',
                        name: 'search',
                        width: 300,
                        labelWidth: 50,
                        emptyText: 'Color to add',
                        plugins: [{
                            ptype: "cleartrigger"
                        }],

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
                        listeners: {
                            specialkey: 'handleSpecialKey',
                            triggersearch: 'onTriggerSearchClick',
                            triggerclear: 'onTriggerClearClick',
                            scope: this.controller
                        }
                    }]
                },

                bbar: {
                    xtype: "pagingtoolbar",
                    //itemId: "pagingtb",
                    bind: {
                        store: "{colors}"
                    },
                    //dock: 'bottom',
                    displayInfo: true
                },

                viewConfig: {

                },

                bind: {
                    store: '{colors}'
                },

                selModel: {
                    type: 'checkboxmodel',
                    checkOnly: true,
                    injectCheckbox: 0
                },

                columns: [{
                    width: '50',
                    align: 'center',
                    menuDisabled: true,
                    hidden: true,
                    sortable: false
                },{
                    text: 'Color',
                    dataIndex: 'code',
                    flex: 1
                },{
                    text: 'Description',
                    dataIndex: 'descript',
                    flex: 4
                },{
                    text: 'EDI Description',
                    dataIndex: 'edi_descript',
                    flex: 4
                }]
            }]
            */
        });

        me.callParent(arguments);

    }
})


