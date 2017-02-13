
Ext.define("Vega.view.sales.edit.Form",{
    extend: "Ext.form.Panel",

    requires: [
        "Vega.view.sales.edit.FormController",
        "Vega.view.sales.edit.FormModel",
        'Vega.view.sales.edit.Detail',
        'Vega.model.sales.File',
        'Ext.container.ButtonGroup',
        'Ext.data.proxy.Memory',
        'Ext.ux.form.field.MemoryCombo',
        'Ext.ux.panel.HAccordion',
        'Ext.ux.layout.ResponsiveColumn',
        'Ext.ux.form.CheckboxStoreGroup',
        //'Ext.ux.form.ImageUploadField',
        'Ext.ux.form.DDFileUpload',
        'Ext.ux.form.MultiImageUpload'
    ],

    alias: 'widget.sales-edit-form',

    controller: "sales-edit-form",
    viewModel: {
        type: "sales-edit-form"
    },

    bind: {
        title: '{title}'
    },

    session: true,
    trackResetOnLoad: true,

    layout: {
        type: 'fit'
    },

    minWidth: 1024,
    //bodyPadding: 5,

    listeners: {
        //afterrender: 'onAfterRender',
        //added: 'onAdded',
        openwin: 'onEditStyleClick',
        opentna: 'onGridWidgetClick'
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        reference: 'topbar',
        defaults: {
            ui: 'default'
        },
        items: [{
            iconCls: 'fa fa-arrow-circle-o-up',
            //reference: 'submit',
            text: '',
            tooltip: 'Submit Current Form',
            handler: 'onHandleAction'
        },{
            iconCls: 'fa fa-arrow-circle-o-left ',
            //reference: 'audit',
            text: 'To Audit',
            hidden: true,
            nextStep: 'audit',
            tooltip: 'Sent back to Review',
            handler: 'onHandleAction'
        },{
            iconCls: 'fa fa-save',
            //reference: 'save',
            text: 'Save',
            hidden: true,
            nextStep: 'save',
            tooltip: 'Save Only',
            handler: 'onHandleAction'
        },{
            iconCls: 'fa fa-close',
            text: 'Close',
            //glyph:'xf0c7@FontAwesome',
            tooltip: 'Close View',
            handler: 'onClose'
        },'-',{
            text: 'T&A',
            iconCls: 'fa fa-tasks',
            tooltip: 'T&A',
            //reference: 'tna',
            hidden: true,
            handler: 'onTNAClick'
        },{
            xtype: 'buttongroup',
            reference: 'groupCrud',
            margin: -8,
            padding: 0,
            hidden: true,
            items: [{
                text: 'New',
                iconCls: 'fa fa-plus-circle',
                //glyph:'xf0c7@FontAwesome',
                tooltip: 'Add Style',
                reference: 'add',
                //ui: 'default',
                handler: 'onAddStyleClick'
            },{
                text: 'Copy',
                iconCls: 'fa fa-copy',
                tooltip: 'Duplicate Style',
                reference: 'copy',
                bind: {
                    disabled: '{!details.selection}'
                },
                handler: 'onCopyStyleClick'
            },{
                text: 'Edit',
                iconCls: 'fa fa-edit',
                tooltip: 'Edit Style',
                reference: 'edit',
                bind: {
                    disabled: '{!details.selection}'
                },
                handler: 'onEditStyleClick'
            },{
                text: 'Delete',
                iconCls: 'fa fa-remove',
                tooltip: 'Delete Style',
                reference: 'remove',
                bind: {
                    disabled: '{!details.selection}'
                },
                handler: 'onDeleteStyleClick'
            },{
                text: 'Attach',
                iconCls: 'fa fa-paperclip',
                tooltip: 'Attachment',
                reference: 'attach',
                hidden: true
            }]
        },'->',{
            xtype: "cycle",
            //ui: "default",
            ui: 'bootstrap-btn-default',
            //cls:"delete-focus-bg",
            prependText: "Header: ",
            iconCls: "fa fa-chevron-left",
            //iconAlign: 'right',
            showText: true,
            reference: "positionBtn",
            changeHandler: "onPositionChange",
            //scope: this.controller,
            menu: {
                items: [{
                    text: "Top",
                    iconCls: "fa fa-chevron-up",
                    //reference: 'top',
                    itemId: "top",
                    checked: false
                },{
                    text: "Right",
                    iconCls: "fa fa-chevron-right",
                    //reference: 'right',
                    itemId: "right",
                    checked: false
                },{
                    text: "Bottom",
                    iconCls: "fa fa-chevron-down",
                    //reference: 'bottom',
                    itemId: "bottom",
                    checked: false
                },{
                    text: "Left",
                    iconCls: "fa fa-chevron-left",
                    //reference: 'left',
                    itemId: "left",
                    checked: true
                }]
            }
        },{
            iconCls: 'fa fa-toggle-off',
            reference: 'toggleattach',
            ui: 'bootstrap-btn-default',
            //cls:"delete-focus-bg",
            tooltip: 'Toggle Attachments',
            enableToggle: true,
            hidden: false,
            toggleHandler: function(btn, pressed){
                var tabs = btn.up('form').lookupReference('panels'),
                    attachTab = btn.up('form').lookupReference('attachments'),
                    idx = tabs.items.indexOf(attachTab);

                if(pressed){
                    tabs.previousTab = tabs.getActiveTab();
                }

                tabs.getTabBar().items.getAt(idx).setHidden(!pressed);
                tabs.setActiveTab(pressed ? attachTab : tabs.previousTab);

                btn.setIconCls(pressed ? 'fa fa-toggle-on' : 'fa fa-toggle-off');

            }
        }]
    }],

    initComponent: function(){
        var me = this,
            padding = 0,
            fieldHeight = 17,
            remainingHeight = padding + fieldHeight * 3;

        //var vm = this.getViewModel();

        var memComponents = Ext.create('Ext.data.Store', {
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

        var remoteComponents = Ext.create('Vega.store.Components', {
            autoLoad: true,

            listeners: {
                load: function(s){
                    memComponents.getProxy().setData(s.getRange());
                    memComponents.load();
                }
            }
        });

        Ext.apply(remoteComponents.getProxy().extraParams, {
            type: 'FABRICS'
        });

        Ext.applyIf(me, {
            items:[{
                //xtype: 'horizontalaccordion',
                xtype: 'tabpanel',
                //anchor: '100% 100%',
                //padding: '0 0 0 0',
                previousTab: null,
                reference: 'panels',
                border: false,
                defaults: {
                    scrollable: true,
                    border: false
                },
                tabPosition: 'left',
                tabBar: {
                    defaults: {
                        //height: 28, // set the height,
                        border: true,
                        style: {
                            border: '2px solid #ccc'
                        }
                    }
                },
                listeners: {
                    tabchange: 'onTabChange'
                },
                items: [{
                    title: 'Basic Information',
                    itemId: 'information',
                    reference: 'information',
                    layout: {
                        type: 'hbox',
                        align: 'stretch',
                        pack: 'start'
                    },
                    defaultType: 'container',
                    defaults: {
                        //flex: 1,
                        minHeight: 720,
                        padding: '10 5 0 5'
                    },
                    //padding: '0 0 0 0',
                    items: [{
                        //responsiveCls: 'big-50 small-100',
                        defaultType: 'textfield',
                        defaults: {
                            width: 340,
                            labelWidth: 140
                        },
                        items: [{
                            name: 'powno',
                            fieldLabel: 'P.O.W #',
                            bind: {
                                value: '{header.powno}'
                            },
                            hidden: false,
                            disabled: true,
                            editable: false
                        },{
                            xtype: 'combo',
                            name: 'status',
                            //value: 'PRE-ADVISE',
                            fieldLabel: 'STATUS',
                            displayField: 'text',
                            valueField: 'text',
                            editable: false,
                            //disabled: false,
                            //store: ['PRE-ADVISE', 'REVISED'],
                            bind: {
                                store: '{status}',
                                value: '{header.status}'
                            }
                            //store: 'powStatus'
                        },{
                            xtype: 'combo',
                            name: 'customer',
                            fieldLabel: 'CUSTOMER NAME',
                            displayField: 'text',
                            valueField: 'text',
                            editable: true,
                            selectOnFocus: true,
                            allowBlank: false,
                            forceSelection: true,
                            //msgTarget: 'side',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{customers}',
                                value: '{header.customer}'
                            }
                        },{
                            xtype: 'combo',
                            name: 'division',
                            fieldLabel: 'DIVISION',
                            displayField: 'text',
                            valueField: 'text',
                            //selectOnFocus: false,
                            editable: false,
                            allowBlank: false,
                            queryMode: 'local',
                            //triggerAction: 'all',
                            bind: {
                                store: '{divisions}',
                                value: '{header.division}'
                            }
                            //store: 'division'
                        },{
                            xtype: 'combo',
                            name: 'ordertype',
                            fieldLabel: 'ORDER TYPE',
                            displayField: 'text',
                            valueField: 'text',
                            selectOnFocus: true,
                            editable: true,
                            allowBlank: false,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{types}',
                                value: '{header.ordertype}'
                            }
                            //store: 'type'
                        },{
                            name: 'custpo',
                            fieldLabel: 'CUSTOMER P.O #',
                            bind: {
                                value: '{header.custpo}'
                            },
                            allowBlank: true
                        },{
                            name: 'dept',
                            fieldLabel: 'CUSTOMER DEPT #',
                            bind: {
                                value: '{header.custdept}'
                            },
                            allowBlank: true
                        },{
                            xtype: 'combo',
                            name: 'label',
                            fieldLabel: 'LABEL',
                            displayField: 'text',
                            valueField: 'text',
                            editable: true,
                            selectOnFocus: true,
                            allowBlank: true,
                            forceSelection: true,
                            //msgTarget: 'side',
                            matchFieldWidth: false,
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{labels}',
                                value: '{header.label}'
                            },
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 300
                            }
                        },{
                            xtype: 'radiogroup',
                            fieldLabel: 'PRETICKET',
                            defaults: {
                                name: 'preticket'
                            },
                            bind: {
                                value: '{preticketValue}'
                            },
                            items: [{
                                boxLabel: 'YES',
                                checked: true,
                                inputValue: true
                            },{
                                boxLabel: 'NO',
                                inputValue: false
                            }]
                        },{
                            xtype: 'combo',
                            name: 'pack',
                            fieldLabel: 'PACK',
                            allowBlank: false,
                            value: 'HANGING',
                            editable: false,
                            bind: {
                                value: '{header.pack}'
                            },
                            store: ['FLAT', 'HANGING']
                        },{
                            xtype: 'radiogroup',
                            fieldLabel: 'EDI',
                            defaults: {
                                name: 'edi'
                            },
                            bind: {
                                value: '{ediValue}'
                            },
                            items: [{
                                boxLabel: 'YES',
                                checked: true,
                                inputValue: true
                            },{
                                boxLabel: 'NO',
                                inputValue: false
                            }]
                        },{
                            xtype: 'combo',
                            name: 'terms',
                            fieldLabel: 'TERMS',
                            displayField: 'text',
                            valueField: 'text',
                            editable: true,
                            selectOnFocus: true,
                            allowBlank: true,
                            forceSelection: true,
                            //msgTarget: 'side',
                            minChars: 1,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //triggerAction: 'all',
                            bind: {
                                store: '{terms}',
                                value: '{header.terms}'
                            }
                        },{
                            name: 'buyer',
                            fieldLabel: 'BUYER',
                            bind: {
                                value: '{header.buyer}'
                            },
                            allowBlank: true
                        },{
                            name: 'totalqty',
                            fieldLabel: 'TOTAL QTY',
                            bind: {
                                value: '{header.totalqty}'
                            },
                            allowBlank: false
                        },{
                            xtype: "memorycombo",
                            name: 'mainfabric',
                            //itemId: "Prints",
                            fieldLabel: 'FABRIC',
                            //fieldStyle: 'text-transform:uppercase',
                            //labelWidth: 50,
                            //width: 160,
                            //autoSelect: false,
                            hideTrigger: true,
                            //publishes: 'value',
                            valueField: 'label',
                            displayField: 'label',
                            bind: {
                                value: '{header.mainfabric}'
                            },
                            store: memComponents,
                            matchFieldWidth: false,
                            autoLoadOnValue: true,
                            //forceSelection: false,
                            //selectOnFocus: true,
                            pageSize: 50,
                            //minChars: 0,
                            queryMode: 'local',
                            //queryParam: 'filter',
                            //queryDelay: 800,
                            //triggerAction: 'all',
                            lastQuery: '',
                            listConfig: {
                                loadindText: 'Searching...',
                                emptyText: 'No matching items found.',
                                width: 340
                            },
                            plugins: [{
                                ptype: "cleartrigger"
                            }],
                            listeners: {
                                triggerClear: function(combo){
                                    //var txtDesc = this.ownerCt.ownerCt.query('textfield[name="content"]')[0];
                                    //txtDesc.setValue('');
                                },
                                beforequery: {
                                    fn: function(qe){
                                        //delete qe.combo.lastQuery;
                                    }
                                },
                                render: {
                                    fn: function(combo){

                                    },
                                    scope: this
                                },
                                select: {
                                    fn: function(combo, rec, e){
                                        //var me = this,
                                        //    txtDesc = me.ownerCt.ownerCt.query('textfield[name="content"]')[0];
                                        //txtDesc.setValue(me.getSelection().data.text);
                                    }
                                }
                            }
                        },{
                            name: 'content',
                            bind: {
                                value: '{header.content}'
                            },
                            fieldLabel: 'CONTENT'
                        },{
                            xtype: 'combo',
                            name: 'sizes',
                            fieldLabel: 'SIZES',
                            displayField: 'text',
                            valueField: 'text',
                            editable: true,
                            selectOnFocus: true,
                            forceSelection: true,
                            minChars: 1,
                            queryMode: 'local',
                            //triggerAction: 'all',
                            bind: {
                                store: '{sizeCats}',
                                value: '{header.sizes}'
                            }
                            //store: 'sizeCat'
                        },{
                            name: 'ratio',
                            bind: {
                                value: '{header.ratio}'
                            },
                            fieldLabel: 'RATIO'
                        },{
                            xtype: 'combo',
                            name: 'factory',
                            fieldLabel: 'FACTORY',
                            displayField: 'text',
                            valueField: 'text',
                            editable: false,
                            //triggerAction: 'all',
                            bind: {
                                store: '{factories}',
                                value: '{header.factory}'
                            }
                        },{
                            name: 'incidentals',
                            fieldLabel: 'TRADE ALLOWANCE',
                            bind: {
                                value: '{header.incidentals}'
                            },
                            allowBlank: true
                        },{
                            xtype: 'datefield',
                            name: 'cxldate',
                            bind: {
                                value: '{header.cxldate}'
                            },
                            fieldLabel: 'CXL DATE'
                        },{
                            xtype: 'datefield',
                            name: 'dcdate',
                            bind: {
                                value: '{header.dcdate}'
                            },
                            fieldLabel: 'In DC'
                        }]
                    },{
                        //responsiveCls: 'big-50 small-100',
                        defaultType: 'fieldset',
                        defaults: {
                            width: 440,
                            collapsible: false,
                            style: {borderColor:'#dedede', borderStyle:'solid', borderWidth:'1px'}
                        },
                        //minWidth: 400,
                        items:[{
                            title: 'Sales',
                            items:[{
                                xtype: 'checkboxstoregroup',
                                name: 'sales',
                                bind: {
                                    //store: '{sales}',
                                    value: '{salesValue}'
                                },
                                //publishes: ['value'],
                                store: 'sales',
                                hideLabel: true,
                                columns: 3,
                                padding: '0 0 0 0',
                                listeners:
                                {
                                    change: function(field, newValue, oldValue, eOpts)
                                    {

                                    }
                                }
                            }]
                        },{
                            title: 'Sales Contact',
                            items:[{
                                xtype: 'checkboxstoregroup',
                                name: 'salescontact',
                                bind: {
                                    //store: '{sales}',
                                    value: '{contactValue}'
                                },
                                store: 'sales',
                                hideLabel: true,
                                columns: 3,
                                padding: '0 0 0 0'
                            }]
                        },{
                            title: 'Sample Requirements',
                            layout: 'anchor',
                            items: [{
                                xtype: 'checkboxstoregroup',
                                name: 'submissions',
                                bind: {
                                    //store: '{submissions}',
                                    value: '{submissionValue}'
                                },
                                store: 'submissions',
                                hideLabel: true,
                                columns: 2
                            }]
                        },{
                            title: 'Special Comment',
                            padding: '0 10 5 10',
                            items: [{
                                xtype: 'htmleditor',
                                bind: {
                                    value: '{header.comments}'
                                },
                                name: 'comments'
                            }]
                        },{
                            title: '',
                            padding: '5 5 0 10',
                            items: [{
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Created by',
                                labelWidth: 80,
                                layout: 'hbox',
                                items: [{
                                    xtype: 'displayfield',
                                    name: 'userId',
                                    fieldLabel: 'User ID',
                                    hideLabel: true,
                                    margin: '0 5 0 0',
                                    flex: 1,
                                    bind: {
                                        value: '{header.userId}'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    name: 'createdon',
                                    fieldLabel: '@',
                                    labelWidth: 10,
                                    labelSeparator: '',
                                    flex: 2,
                                    bind: {
                                        value: '{header.createdon}',
                                        hidden: '{!header.createdon}'
                                    },
                                    renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                }]
                            },{
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Updated by',
                                labelWidth: 80,
                                layout: 'hbox',
                                bind: {
                                    hidden: '{!header.updatedby}'
                                },
                                items: [{
                                    xtype: 'displayfield',
                                    name: 'updatedby',
                                    fieldLabel: 'By',
                                    hideLabel: true,
                                    margin: '0 5 0 0',
                                    flex: 1,
                                    bind: {
                                        value: '{header.updatedby}'
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    name: 'updatedon',
                                    fieldLabel: '@',
                                    labelWidth: 10,
                                    labelSeparator: '',
                                    flex: 2,
                                    bind: {
                                        value: '{header.updatedon}',
                                        hidden: '{!header.updatedon}'
                                    },
                                    renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                }]
                            },{
                                xtype: 'fieldcontainer',
                                fieldLabel: 'Approved',
                                reference: 'approved',
                                labelWidth: 80,
                                hidden: true,
                                layout: 'hbox',
                                items: [{
                                    xtype: 'displayfield',
                                    name: 'approvedby',
                                    fieldLabel: 'By',
                                    hideLabel: true,
                                    margin: '0 5 0 0',
                                    flex: 1
                                },
                                {
                                    xtype: 'displayfield',
                                    name: 'approvedon',
                                    fieldLabel: '@',
                                    labelWidth: 10,
                                    labelSeparator: '',
                                    flex: 2,
                                    renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                                }]
                            }]
                        }]
                    },{
                        title: 'Remarks',
                        reference: 'logview',
                        flex: 1,
                        style: {
                            //border: '1px solid black'
                        },
                        layout: {
                            type: 'anchor'
                        },
                        //defaultType: 'container',
                        defaults: {
                            //flex: 1,
                            //margin: '0 5 5 0',
                            //padding: '5 0 0 5'
                        },
                        //scrollable: true,
                        items: [{
                            xtype: 'textarea',
                            //height: 50,
                            minWidth: 300,
                            anchor: '100%',
                            preventScrollbars: true,
                            grow: true,
                            growMax: 100,
                            emptyText: 'Type to add...',
                            labelAlign: 'top',
                            fieldLabel: 'Remarks',
                            listeners: {
                                /*
                                focus: function(field, event){
                                    field.getEl().setHeight(160, true);
                                },
                                blur: function(field, event){
                                    field.getEl().setHeight(50, true);
                                }
                                */
                            }
                        },{
                            xtype: 'container',
                            layout: {
                                type: 'hbox'
                            },
                            items: [{
                                xtype: 'button',
                                text: 'Add',
                                iconCls: 'fa fa-plus-circle',
                                handler: 'onAddLogClick',
                                margin: '0 5 0 0'
                            },{
                                xtype: 'button',
                                text: 'Remove',
                                bind: {
                                    disabled: '{!logs.selection}'
                                },
                                iconCls: 'fa fa-minus-circle',
                                handler: 'onRemoveLogClick'
                            }]
                        },{
                            xtype: "dataview",
                            reference: 'logs',
                            anchor: '100%',
                            minWidth: 440,
                            margin: '5 0 5 0',
                            cls: "comment-view",
                            //session: true,
                            overItemCls: "x-item-over",
                            itemSelector: "div.thumb-wrap",
                            preserveScrollOnRefresh: true,
                            deferInitialRefresh: true,
                            style: {
                                //border: '1px solid black'
                            },
                            bind: {
                                store: "{header.powlogs}"
                            },
                            tpl: new Ext.XTemplate(
                                //'<div>',
                                '<tpl for=".">',
                                '<div class="thumb-wrap" id="{powlogId}">',
                                '<div class="thumb">',
                                '<div class="post-data">',
                                '<h3 class="post-content">{content}</h3>',
                                '</div>',
                                '<div>',
                                //'<div class="{status}">On WIP</div><span>Posted by {userId:capitalize} {logdate:date("M j, Y, g:i a")}</span>',
                                '<div class="{status}"></div><span>Posted by {userId:capitalize} @ {logdate:date("M j, Y, g:i a")}</span>',
                                '</div>',
                                '</div>',
                                '</div>',
                                '</tpl>')
                        }]
                    }]
                },{
                    title: 'Merchandise',
                    //itemId: 'merchandise',
                    reference: 'merchandise',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    //defaultType: 'container',
                    defaults: {
                        //flex: 1,
                        //minHeight: 400,
                        margin: '0 5 5 0',
                        padding: '5 0 0 5'
                    },
                    //padding: 5,
                    //collapsed: true,
                    scrollable: true,
                    items: [{
                        xtype: 'sales-edit-detail',
                        reference: 'details',
                        bind: {
                            store: '{header.powds}'
                        },
                        listeners: {
                            //selectionchange: 'onGridSelectionChange',
                            //afterrender: 'onAfterRender',
                            rowdblclick: 'onGridRowDblclick'
                        }
                    }],
                    listeners: {
                        /*
                        render: {
                            fn: 'onMerchandRender'
                        },
                        expand: {
                            fn: 'onMerchandExpand'
                        },
                        collapse: {
                            fn: 'onMerchandCollapse'
                        }
                        */
                    }
                },{
                    title: 'Attachments',
                    itemId: 'attachments',
                    reference: 'attachments',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    hidden: true,
                    //collapsed: true,

                    bind: {
                        hidden: '{!toggleattach.pressed}'
                    },
                    items:[{
                        xtype: 'multiupload',
                        enableEdit: false,
                        flex: 1,
                        margin: 5,
                        viewModel: {
                            stores: {
                                fileStore: {
                                    model: 'Vega.model.sales.File'
                                }
                            }
                        },
                        columns: [{
                            header: 'File Name',
                            dataIndex: 'name',
                            menuDisabled: true,
                            sortable: false,
                            flex: 4,
                            renderer: Ext.util.Format.uppercase
                        },{
                            header: 'Size',
                            dataIndex: 'size',
                            flex: 1,
                            renderer: Ext.util.Format.fileSize
                        },{
                            header: 'Type',
                            dataIndex: 'type',
                            menuDisabled: true,
                            sortable: false,
                            flex: 1,
                            renderer: function(value, metaData, rec){
                                metaData.tdAttr = 'valign=top';

                                return value;
                            }
                        },{
                            xtype: 'actioncolumn',
                            text: '',
                            iconCls: 'fa fa-close red-txt',
                            width: 50,
                            align: 'center',
                            menuDisabled: true,
                            sortable: false,
                            items: [{
                                iconCls: 'fa fa-remove',
                                tooltip: 'Remove',
                                handler: function(view, rowIndex, colIndex) {
                                    //var store = grid.getStore();
                                    //store.removeAt(rowIndex);
                                    var field = view.grid.up('multiupload').fileUpload,
                                        rec = view.getStore().getAt(rowIndex);
                                    rec.drop();
                                    //view.grid.getSelectionModel().deselectAll();
                                    //console.log(gridview, rec.id * -1 - 1)
                                    if(rec.phantom){
                                        field.removeFileFromQueue(rec.id * -1 - 1)
                                    }
                                }
                            }]
                        }]
                    }]
                }]
            }]
        });

        me.callParent(arguments);

        var grid = me.lookupReference('details');
        me.relayEvents(grid, ['openwin', 'opentna']);
        //grid.relayEvents(grid.getStore(), ['datachanged']);

        //var vm = this.getViewModel();
        //console.log(vm, vm.get('header'))
    },

    /**
     * Sends request
     */
    send: function(options, extraData) {
        var url = options.url,
            method = options.method || 'POST',
            success = options.success,
            failure = options.failure,
            params = options.params,
            waitMsg = options.waitMsg,
            formData = new FormData(this);

        for (var attr in params) {
            formData.append(attr, params[attr]);
        }

        if(extraData){
            for (var item in extraData) {
                formData.append(item, extraData[item]);
                //console.log(item, extraData[item]);
            }
        }

        Ext.each(this.imagesQueue, function (image) {
            // syntax
            // formData.append(name, value, filename);
            // filename optional
            formData.append(image['imageKey'], image['imageFile'], image['imageFile'].name);
        });

        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);

        xhr.addEventListener('loadstart', function (e) {
            Ext.MessageBox.show({
                msg: waitMsg,
                progressText: 'Saving...',
                width: 300,
                wait: true,
                waitConfig: {
                    interval: 200
                }
            });
        }, false);

        xhr.addEventListener('loadend', function (evt) {
            Ext.MessageBox.hide();
            /*
             if (evt.target.status === 200) {
             var obj = Ext.decode(evt.target.responseText);
             if (obj.success) {
             success(obj);
             } else {
             failure(obj);
             }
             } else {
             failure(obj);
             }
             */

        }, false);

        // notice that the event handler is on xhr and not xhr.upload
        xhr.addEventListener('readystatechange', function(evt) {
            if(this.readyState === 4 && this.status === 200 ) {
                // the transfer has completed and the server closed the connection.
                var obj = Ext.decode(evt.target.responseText);
                if(obj.success){
                    success(obj);
                }
                else {
                    failure(obje);
                }
            }

        }, false);

        xhr.send(formData);

        //this.imagesQueue = []; Array empty not working
        //this.imagesQueue.length = 0;
        //formData = new FormData();
    }
});
