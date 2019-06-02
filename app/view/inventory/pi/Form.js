
Ext.define('Vega.view.inventory.pi.Form',{
    extend: 'Ext.form.Panel',

    requires: [
        'Vega.view.inventory.pi.FormController',
        'Vega.view.inventory.pi.FormModel'
    ],

    alias: 'widget.pi-form',

    controller: 'pi-form',
    viewModel: {
        type: 'pi-form'
    },

    bind: {
        title: '{title}'
    },

    session: true,
    trackResetOnLoad: true,
    //scrollable: 'y',
    style: {
        borderTop: '1px solid #cfcfcf'
    },

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },

    listeners: {

    },

    initComponent: function() {
        var me = this;

        var tpl = new Ext.ux.CTemplate(
            '<tpl for=".">',
            '<div class="item">{button}</div>',
            '</tpl>'
        );

        /*
         var actNew = Ext.create('Ext.Action', {
         text: "New",
         tooltip: "Add New Item",
         //reference: 'new',
         iconCls: "x-fa fa-plus-circle",
         handler: function(item, e){
         this.fireEvent("actnew", this, item);
         },
         scope: this
         }),
         actEdit = Ext.create('Ext.Action', {
         text: 'Edit',
         tooltip: 'Edit Selected Item',
         //reference: 'edit',
         iconCls: 'x-fa fa-edit',
         handler: function(item, e){
         this.fireEvent("actedit", this, item);
         },
         scope: this
         }),
         actDelete = Ext.create('Ext.Action', {
         text: "Delete",
         tooltip: "Delete Selected Item",
         //reference: 'delete',
         iconCls: "x-fa fa-minus-circle",
         //disabled: true,
         handler: function(item, e){
         this.fireEvent("actdelete", this, item);
         },
         scope: this
         }),
         actCopy = Ext.create('Ext.Action', {
         text: 'Copy',
         tooltip: 'Copy Selected Item',
         //reference: 'edit',
         iconCls: 'x-fa fa-copy',
         handler: function(item, e){
         this.fireEvent("actcopy", this, item);
         },
         scope: this
         });
         */

        var btnNew = {
            text: 'New',
            iconCls: 'x-fa fa-plus-circle',
            //glyph:'xf0c7@FontAwesome',
            tooltip: 'Add Item',
            //reference: 'add',
            //ui: 'default',
            handler: 'onAddItemClick',
            scope: this.controller
        },
        btnCopy = {
            text: 'Copy',
            iconCls: 'x-fa fa-copy',
            tooltip: 'Copy Item',
            //reference: 'copy',
            bind: {
                disabled: '{!selection}'
            },
            handler: 'onCopyItemClick',
            scope: this.controller
        },
        btnEdit = {
            text: 'Edit',
            iconCls: 'x-fa fa-edit',
            tooltip: 'Edit Item',
            //reference: 'edit',
            bind: {
                disabled: '{!selection}'
            },
            handler: 'onEditItemClick',
            scope: this.controller
        },
        btnDelete = {
            text: 'Delete',
            iconCls: 'x-fa fa-remove',
            tooltip: 'Delete Item',
            //reference: 'remove',
            bind: {
                disabled: '{!selection}'
            },
            handler: 'onDeleteItemClick',
            scope: this.controller
        };
        var btnsConfig = [btnNew, btnCopy, btnEdit, btnDelete];

        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            //reference: 'topbar',
            defaults: {
                ui: 'default'
            },
            items: [{
                iconCls: 'x-fa fa-save',
                //reference: 'save',
                text: 'Save',
                nextStep: 'save',
                tooltip: 'Save the Data',
                bind: {

                },
                handler: 'onSave'
            },{
                iconCls: 'x-fa fa-close',
                text: 'Close',
                //glyph:'xf0c7@FontAwesome',
                tooltip: 'Close View',
                handler: 'onClose'
            },'-', {
                xtype: 'buttongroup',
                reference: 'groupCrud',
                margin: -8,
                hidden: false,
                items: btnsConfig
            }]
        }],

        Ext.applyIf(me, {
            items: [{
                xtype: "container",
                //title: "P.I",
                reference: "piheader",
                //iconCls: "x-fa fa-calculator",
                layout: {
                    type: 'responsivecolumn',
                    states: {
                        /*
                         small: 800,
                         medium: 1200,
                         large: 0
                         */
                    }
                },
                //margin: "0 0 5 0",
                //bodyPadding: 8,
                defaultType: 'container',
                defaults: {
                    //margin: "5 0 0 0"
                },
                fieldDefaults: {
                    labelAlign: "left",
                    margin: 0
                },
                items: [{
                    responsiveCls: 'small-100',
                    //width: '30%',
                    layout: {
                        type: 'table',
                        columns: 2,
                        tableAttrs: {
                            style: {}
                        }
                    },
                    defaultType: 'textfield',
                    defaults: {
                        constrain: true,
                        margin: '0 10 3 0',
                        labelWidth: 80
                        //minHeight: 720,
                        //padding: '10 10 0 10'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'pino',
                        fieldLabel: 'P.I #',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{thePhysical.pino}'
                        },
                        allowBlank: true
                    },{
                        xtype: 'combo',
                        name: 'warehouse',
                        fieldLabel: 'Warehouse',
                        displayField: 'id',
                        valueField: 'id',
                        editable: false,
                        //selectOnFocus: true,
                        allowBlank: false,
                        forceSelection: true,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        //store: ['00', 'OS', 'SA'],
                        bind: {
                            store: '{warehouses}',
                            value: '{thePhysical.warehouse}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'pidate',
                        format: 'Y-m-d',
                        fieldLabel: 'P.I Date',
                        //editable: false,
                        bind: {
                            value: '{thePhysical.pidate}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'textfield',
                        name: 'tagnumber',
                        fieldLabel: 'Tag Number',
                        allowBlank: true,
                        //flex: 1,
                        bind: {
                            value: '{thePhysical.tagnumber}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'status',
                        fieldLabel: 'Status',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{thePhysical.status}'
                        }
                    },{
                        xtype: 'combo',
                        name: 'pireason',
                        fieldLabel: 'P.I Reason',
                        displayField: 'id',
                        valueField: 'id',
                        editable: false,
                        //selectOnFocus: true,
                        //allowBlank: false,
                        forceSelection: true,
                        //msgTarget: 'side',
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        bind: {
                            store: '{pireasons}',
                            value: '{thePhysical.pireason}'
                        }
                    },{
                        xtype: 'textfield',
                        name: 'createUser',
                        fieldLabel: 'Create User',
                        readOnly: true,
                        selectOnFocus: false,
                        //editable: false,
                        bind: {
                            value: '{thePhysical.createUser}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'datefield',
                        name: 'createTime',
                        fieldLabel: 'Create Time',
                        readOnly: true,
                        selectOnFocus: false,
                        //editable: false,
                        format: 'Y-m-d h:i a',
                        bind: {
                            value: '{thePhysical.createTime}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    }]
                }, {
                    responsiveCls: 'small-100',
                    //width: '30%',
                    layout: {
                        type: 'table',
                        columns: 2,
                        tableAttrs: {
                            style: {}
                        }
                    },
                    defaultType: 'textfield',
                    defaults: {
                        constrain: true,
                        margin: '0 10 3 0',
                        labelWidth: 80
                        //minHeight: 720,
                        //padding: '10 10 0 10'
                    },
                    items: [{
                        xtype: 'checkbox',
                        name: 'chk_onhand_by_wh',
                        fieldLabel: 'On-Hand By WH',
                        labelWidth: 105,
                        colspan: 2
                    },{
                        xtype: 'textarea',
                        name: 'memo',
                        emptyText: 'Memo:',
                        colspan: 2,
                        width: 525,
                        bind: {
                            value: '{thePhysical.memo}'
                        }
                        //fieldLabel: 'Memo'
                    },{
                        xtype: 'textfield',
                        name: 'updateUser',
                        fieldLabel: 'Update User',
                        readOnly: true,
                        selectOnFocus: false,
                        //editable: false,
                        bind: {
                            value: '{thePhysical.updateUser}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'datefield',
                        name: 'updateTime',
                        fieldLabel: 'Update Time',
                        labelWidth: 85,
                        readOnly: true,
                        selectOnFocus: false,
                        //editable: false,
                        format: 'Y-m-d h:i a',
                        bind: {
                            value: '{thePhysical.updateTime}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    }]
                }]
            },
            {
                xtype: 'panel',
                title: 'Items',
                iconCls: 'x-fa fa-list',
                //height: '100%',
                flex: 1,

                layout: {
                    type: 'fit'
                },
                items: [{
                    xtype: 'pi-view',
                    reference: "piview",
                    //width: '80%',
                    scrollable: true,
                    margin: 5,
                    cls: 'pi-view',
                    bind: {
                        selection: '{selection}',
                        store: "{thePhysical.pis}"
                    },
                    listeners: {
                        select: 'onItemSelect',
                        itemcontextmenu: 'onItemContextMenu',
                        itemdblclick: {
                            fn: 'onItemDblClick'
                        }
                    },
                    tpl: new Ext.XTemplate(
                        '<div class="item-boxer" style="width:1400px;margin: 1px;">',
                            '<div class="box-row">',
                                '<div class="box ab center" style="width:30px;">Line</div>',
                                '<div class="box ab center" style="width:160px;">Style</div>',
                                '<div class="box">',
                                    '<div class="item-boxer">',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:82px;"></div>',
                                    '</div>',
                                '</div>',
                                '<div class="box ab center" style="width:70px;">UOM</div>',
                                '<div class="box ab center" style="width:120px;">WH/Lot#</div>',
                                '<div class="box ab center" style="width:120px;">P.I Date</div>',
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb center" style="width:100px;">Lot Memo</div>',
                                        '<div class="box rb center" style="width:110px;">PO #</div>',
                                        '<div class="box nb" style="width:120px;"></div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                            '<div class="box-row">',
                                '<div class="box nb" style="width:30px;"></div>',
                                '<div class="box ab center" style="width:160px;">Color</div>',
                                '<div class="box">',
                                    '<div class="item-boxer">',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:82px;"></div>',
                                    '</div>',
                                '</div>',
                                '<div class="box ab center" style="width:70px;">Total Qty</div>',
                                '<div class="box ab center" style="width:120px;">Price</div>',
                                '<div class="box ab center" style="width:120px;">User/Update</div>',
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb center" style="width:100px;">Status/Loc</div>',
                                        '<div class="box rb center" style="width:110px;">ID</div>',
                                        '<div class="box nb" style="width:120px;"></div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                        '</div>',
                        '<tpl for=".">',
                            '<div class="item-selector">',
                                '<div class="item-boxer" style="width:1400px;">',
                                '<div class="box-row">',
                                    '<div class="box ab" style="width:30px;">{lineseq}</div>',
                                    '<div class="box ab" style="width:160px;">{style:trim}</div>',
                                        '<div class="box ab">',
                                            '<div class="item-boxer">',
                                            '<div class="box rb center" style="width:70px;">{sz1}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz2}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz3}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz4}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz5}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz6}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz7}</div>',
                                            '<div class="box nb center" style="width:70px;">{sz8}</div>',
                                            '</div>',
                                        '</div>',
                                    '<div class="box ab center" style="width:70px;">{uom:trim}</div>',
                                    '<div class="box ab" style="width:120px;">{wareHouse:trim}</div>',
                                    '<div class="box ab" style="width:120px;">{logdate:date("Y-m-d")}</div>',
                                    '<div class="box ab" style="width:330px;">{memo}</div>',
                                '</div>',
                                '<div class="box-row">',
                                    '<div class="box ab" style="width:30px;"></div>',
                                    '<div class="box ab" style="width:160px;">{color:trim}</div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb right" style="width:70px;">{unit1}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit2}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit3}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit4}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit5}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit6}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit7}</div>',
                                            '<div class="box nb right" style="width:70px;">{unit8}</div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="box ab right" style="width:70px;">{totalUnit}</div>',
                                    '<div class="box ab" style="width:120px;">{lotno:trim}</div>',
                                    '<div class="box ab" style="width:120px;">{userName:trim}</div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb" style="width:100px;">{status:trim}</div>',
                                            '<div class="box rb" style="width:110px;">{pono}</div>',
                                            '<div class="box nb" style="width:120px;">{updateDate:date("Y-m-d h:i")}</div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                                '<div class="box-row">',
                                    '<div class="box" style="width:30px;"></div>',
                                    '<div class="box" style="width:160px;"></div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb right" style="width:70px;">{oh1}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh2}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh3}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh4}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh5}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh6}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh7}</div>',
                                            '<div class="box nb right" style="width:70px;">{oh8}</div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="box ab right" style="width:70px;">{ohs}</div>',
                                    '<div class="box ab" style="width:120px;">{price:usMoney}</div>',
                                    '<div class="box ab" style="width:120px;">{userTime:date("Y-m-d h:i")}</div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb" style="width:100px;">{location}</div>',
                                            '<div class="box rb" style="width:110px;">{inventoryId}</div>',
                                            '<div class="box nb" style="width:120px;">{ref:trim}</div>',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                        '</tpl>'
                    )
                    /*
                     itemSelector: 'item',
                     prepareData: function(data){
                     //this.callParent(arguments);
                     data.button = new Ext.button.Button({text: data.text});

                     return data;
                     },
                     store: {
                     autoLoad: true,
                     data: [{text: 'Red'}, {text: 'Green'}, {text: 'Blue'}],
                     fields: ['text']
                     }
                     */
                }]
            }]
        });

        me.callParent(arguments);

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                btnEdit, btnCopy, btnDelete
            ]
        });
    }
});
