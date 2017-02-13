Ext.define('Vega.view.sales.edit.Window', {
    extend: 'Ext.window.Window',

    requires: [
        //'Vega.model.Powm',
        'Vega.model.sales.File',
        'Ext.grid.plugin.RowEditing',
        //'Ext.data.validator.Presence',
        //'Ext.data.validator.Range',
        'Ext.data.proxy.Memory',
        'Ext.ux.form.field.MemoryCombo'
    ],

    alias: 'widget.edit-window',

    /*
    controller: 'edit-window',
    viewModel: {
        type: 'edit-window'
    },
     */

    bind: {
        title: '{title}'
    },

    //minWidth: 480,
    //minHeight: 320,

    layout: 'fit',
    //modal: true,
    monitorResize: true,
    maximizable: true,
    //alwaysOnTop: true,
    constrain: true,
    //maximized: true,
    //scrollable: true,
    closable: true,
    padding: 4,

    //referenceHolder: true,
    listeners: {
        reconfigure: {
            fn: function(grid, store){
                /*
                if(store.getCount() == 0){
                    var initData = [], categories = ['SELF', 'PRINTS', 'STONE', 'TRIMS', 'CONTRAST1'],
                        types = ['FABRICS', 'PRINTS', 'STONE', 'TRIMS', 'FABRICS'];

                    for(var i = 0; i < 5; i++){
                        var rec = new Ext.create('Vega.model.Powm',{
                            powmId: 'Powm-' + (i + 1),
                            matcategory: categories[i],
                            mattype: types[i],
                            lineseq: i + 1
                        })

                        //initData.push(rec);
                        store.add(rec);
                    }
                    //store.loadData(initData, false);
                }
                */
            }
        },
        drop: {
            element: 'el',
            fn: 'drop',
            scope: 'this'
        },

        dragstart: {
            element: 'el',
            fn: 'addDropZone',
            scope: 'this'
        },

        dragenter: {
            element: 'el',
            fn: 'addDropZone',
            scope: 'this'
        },

        dragover: {
            element: 'el',
            fn: 'addDropZone',
            scope: 'this'
        },

        dragleave: {
            element: 'el',
            fn: 'removeDropZone',
            scope: 'this'
        },

        dragexit: {
            element: 'el',
            fn: 'removeDropZone',
            scope: 'this'
        }
    },

    initComponent: function () {
        var me = this;

        /*
        var bodyStore = Ext.create('Ext.data.Store', {
                fields: ['id', 'text'],
                pageSize: 100,
                remoteFilter: true,
                autoLoad: false,

                proxy: {
                    type: 'ajax',
                    url: '/api/Combos/body',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }),

            styleStore = Ext.create('Ext.data.Store', {
                fields: ['id', 'text'],
                pageSize: 100,
                remoteFilter: true,
                autoLoad: false,

                proxy: {
                    type: 'ajax',
                    url: '/api/Combos/styles',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }),

            stColorStore = Ext.create('Ext.data.Store', {
                fields: ['id', 'text'],
                pageSize: 100,
                remoteFilter: true,
                autoLoad: false,

                proxy: {
                    type: 'ajax',
                    url: '/api/Combos/stycolors',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }),

            categoryStore = Ext.create('Ext.data.Store', {
                fields: ['id', 'name'],
                proxy: {
                    type: 'ajax',
                    url: 'data/categories.json'
                }
            });

            compStore = Ext.create('Vega.store.Components'),
            rawcolorStore = Ext.create('Ext.data.Store', {
                fields: ['id', 'text'],
                //pageSize: 100,
                //remoteFilter: true,
                autoLoad: false,

                proxy: {
                    type: 'ajax',
                    url: '/api/Combos/rawcolors',
                    pageParam: '',
                    startParam: '',
                    limitParam: '',
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            });
            */

        //vendorStore = Ext.create('Vega.store.Vendors'),
        //var compStore = me.up('form').getViewModel().getStore('components'),

        var memStyles = Ext.create('Ext.data.Store', {
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

        var remoteStyles = Ext.create('Vega.store.Styles', {
            autoLoad: true,

            listeners: {
                load: function(s){
                    memStyles.getProxy().setData(s.getRange());
                    memStyles.load();
                }
            }
        });

        var memStColors = Ext.create('Ext.data.Store', {
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

        var remoteStColors = Ext.create('Vega.store.StyleColors', {
            autoLoad: true,
            remoteFilter: true,
            listeners: {
                load: function(s){
                    memStColors.getProxy().setData(s.getRange());
                    memStColors.load();
                }
            }
        });

        var memBodies = Ext.create('Ext.data.Store', {
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

        var remoteBodies = Ext.create('Ext.data.Store', {
            fields: [{
                name: 'id',
                sortType: 'asUCString'
            },{
                name: 'text',
                sortType: 'asUCString'
            }],

            pageSize: 0,
            remoteFilter: true,
            autoLoad: true,

            proxy: {
                type: 'ajax',
                url: '/api/Combos/bodies',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                load: function(s){
                    memBodies.getProxy().setData(s.getRange());
                    memBodies.load();
                }
            }
        });

        var memMaterials = Ext.create('Ext.data.Store', {
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

        var remoteMaterials = Ext.create('Vega.store.Components', {
            autoLoad: true,

            listeners: {
                load: function(s){
                    memMaterials.getProxy().setData(s.getRange());
                    memMaterials.load();
                }
            }
        });

        var memColors = Ext.create('Ext.data.Store', {
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
            autoLoad: true,
            remoteFilter: true,
            proxy: {
                type: 'ajax',
                url: '/api/Combos/rawcolors',

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                load: function(s){
                    memColors.getProxy().setData(s.getRange());
                    memColors.load();
                }
            }
        });

        //var compStore = Ext.create('Vega.store.Components'),
        //    compProxyUrl = compStore.getProxy().getUrl();

        console.log('padding')
        Ext.applyIf(me, {
            items: [{
                xtype: 'form',
                reference: 'form-edit',
                // use the Model's validations for displaying form errors
                modelValidation: true,
                layout: 'fit',
                scrollable: true,
                items: [{
                    xtype: 'tabpanel',
                    maxTabWidth: 230,
                    minTabWidth: 160,

                    defaults: {
                        //bodyPadding: 10,
                        scrollable: true,
                        border: false
                    },

                    tabBar: {
                        defaults: {
                            //flex: 1, // if you want them to stretch all the way
                            height: 28, // set the height,
                            //padding: 6, // set the padding
                            //margin: '0 4 0 0',
                            //textAlign: 'left',
                            border: true,
                            style: {
                                border: '2px solid #ccc'
                            }
                        }
                    },

                    items: [{
                        title: 'Details',
                        layout: {
                            /*
                            type: 'responsivecolumn',
                            states: {
                                //small: 800,
                                //medium: 1200,
                                //large: 0
                            }
                            */
                            type: 'hbox',
                            align: 'begin',
                            pack: 'start'
                        },
                        margin: 0,
                        padding: 4,
                        defaultType: 'container',
                        defaults: {
                            /*
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            }
                            */
                            //margin: '0 10 0 0'
                        },
                        items: [{
                            //responsiveCls: 'small-100',
                            layout: {
                                type: 'vbox'
                            },
                            margin: '0 10 0 0',
                            items: [{
                                xtype: 'fieldcontainer',
                                referenceHolder: true,
                                layout: 'hbox',
                                defaultType: 'textfield',
                                defaults: {
                                    labelAlign: 'top',
                                    padding: '0 0 1 0'
                                },
                                items: [{
                                    xtype: "memorycombo",
                                    name: 'style',
                                    reference: 'style',
                                    //itemId: "cboPrint",
                                    fieldLabel: "Style",
                                    //labelWidth: 50,
                                    width: 168,
                                    hideTrigger: true,
                                    //publishes: 'value',
                                    bind: {
                                        value: '{theStyle.style}'
                                    },
                                    store: memStyles,
                                    valueField: 'id',
                                    displayField: 'id',
                                    //forceSelection: false,
                                    //selectOnFocus: true,
                                    matchFieldWidth: false,
                                    autoLoadOnValue: true,
                                    //minChars: 0,
                                    pageSize: 50,

                                    queryMode: "local",
                                    //queryParam: "filter",
                                    //queryDelay: 800,
                                    //triggerAction: 'last',
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
                                        beforequery: {
                                            fn: function(qe){
                                                //delete qe.combo.lastQuery;
                                            }
                                        },
                                        select: function(combo, record, e){
                                            var colorCombo = combo.ownerCt.lookupReference('stylecolor'),
                                                colorStore = colorCombo.getStore();

                                            Ext.apply(colorStore.getProxy().extraParams, {
                                                style: combo.getValue().trim()
                                            });

                                            colorStore.reload({
                                                callback: function(){
                                                    colorCombo.select(colorStore.first());
                                                    //colorCombo.fireEvent('select', combo, [store.first()]);
                                                }
                                            });
                                        }
                                    }
                                },{
                                    xtype: 'box',
                                    width: 10
                                },{
                                    xtype: "memorycombo",
                                    name: 'stylecolor',
                                    reference: 'stylecolor',
                                    //itemId: "cboPrint",
                                    fieldLabel: "Color",
                                    //labelWidth: 50,
                                    width: 168,
                                    hideTrigger: true,
                                    bind: {
                                        value: '{theStyle.color}'
                                    },
                                    store: memStColors,
                                    valueField: "id",
                                    displayField: "id",
                                    //forceSelection: false,
                                    //selectOnFocus: true,
                                    pageSize: 50,
                                    autoLoadOnValue: true,
                                    matchFieldWidth: false,
                                    //minChars: 0,
                                    queryMode: "local",
                                    //queryParam: "filter",
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
                                        beforequery: {
                                            fn: function(qe){
                                                //delete qe.combo.lastQuery;
                                            }
                                        }
                                    }
                                }]
                            },{
                                xtype: 'textfield',
                                width: 346,
                                hideLabel: true,
                                bind: '{theStyle.descirpt}'
                            },{
                                xtype: 'multiimageupload',
                                reference: 'fileupload',
                                //previewImageSrc: ['resources/images/default.png', 'resources/images/default.png'],
                                previewNames: ["Body", "Print"],
                                previewImageSrc: [{
                                    xtype: 'image',
                                    name: 'bodyimg',
                                    //canvas: me.id + '-canvas-' + name.toLowerCase(),
                                    width: 128,
                                    height: 140,
                                    bind: {
                                        src: '{bodyimg}'
                                    },
                                    scope: this
                                },{
                                    xtype: 'image',
                                    name: 'printimg',
                                    //canvas: me.id + '-canvas-' + name.toLowerCase(),
                                    width: 128,
                                    height: 140,
                                    bind: {
                                        src: '{printimg}'
                                    },
                                    scope: this
                                }]
                            }]
                        },{
                            //responsiveCls: 'small-100',
                            defaults: {
                                //hideLabel: true,
                                //margin: '0 0 5 0'
                            },
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            //flex: 1,
                            items: [{
                                xtype: 'container',
                                layout: {
                                    type: 'hbox'
                                },
                                margin: '0 0 5 0',
                                items: [{
                                    xtype: 'fieldcontainer',
                                    //width: 480,
                                    //fieldLabel: 'Pattern #',
                                    //responsiveCls: 'small-100',
                                    layout: 'hbox',
                                    defaults: {
                                        labelAlign: 'top',
                                        padding: '0 0 1 0'
                                    },
                                    items: [{
                                        xtype: "memorycombo",
                                        name: 'body',
                                        //itemId: "Body",
                                        fieldLabel: 'Pattern #',
                                        //labelWidth: 50,
                                        width: 140,
                                        hideTrigger: true,
                                        bind: {
                                            value: '{theStyle.bodyref}'
                                        },
                                        store: memBodies,
                                        valueField: "id",
                                        displayField: "id",
                                        //forceSelection: false,
                                        //selectOnFocus: true,
                                        pageSize: 50,
                                        matchFieldWidth: false,
                                        autoLoadOnValue: true,
                                        queryMode: "local",
                                        //queryParam: "filter",
                                        //triggerAction: 'last',
                                        minChars: 1,
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
                                            select: {
                                                fn: function (combo, rec, eOpts) {
                                                    me.getImageSrc(combo, 'body');
                                                }
                                            }
                                            /*
                                             change: {
                                             fn: function (combo, newValue, oldValue, eOpts) {
                                             me.getImageSrc(combo, 'body');
                                             },
                                             buffer: 100
                                             }
                                             */
                                        }
                                    },{
                                        xtype: 'hidden',
                                        name: 'bodyimgsrc',
                                        bind: {
                                            value: '{theStyle.bodyimgsrc}'
                                        }
                                    },{
                                        xtype: 'hidden',
                                        name: 'printimgsrc',
                                        bind: {
                                            value: '{theStyle.printimgsrc}'
                                        }
                                    },{
                                        xtype: 'displayfield',
                                        name: 'prevBody'
                                        //minWidth: 110
                                        //flex: 1
                                    }]
                                },{
                                    xtype: 'fieldcontainer',
                                    //width: 640,
                                    //responsiveCls: 'small-100',
                                    layout: 'hbox',
                                    defaultType: 'textfield',
                                    defaults: {
                                        width: 120,
                                        margin: '0 0 1 5',
                                        labelAlign: 'top'
                                    },
                                    items: [{
                                        fieldLabel: 'Cost',
                                        hideLabel: false,
                                        name: 'cost',
                                        bind: '{theStyle.cost}'
                                    },{
                                        fieldLabel: 'Selling Price',
                                        hideLabel: false,
                                        name: 'price',
                                        bind: '{theStyle.price}'
                                    },{
                                        fieldLabel: 'MSRP',
                                        hideLabel: false,
                                        name: 'msrp',
                                        bind: '{theStyle.msrp}'
                                    },{
                                        fieldLabel: 'Units',
                                        hideLabel: false,
                                        name: 'units',
                                        bind: '{theStyle.units}'
                                    },{
                                        xtype: 'combo',
                                        name: 'factory',
                                        width: 135,
                                        fieldLabel: 'Factory',
                                        //hideLabel: true,
                                        displayField: 'text',
                                        valueField: 'text',
                                        editable: false,
                                        //triggerAction: 'all',
                                        bind: {
                                            store: '{factories}',
                                            value: '{theStyle.factory}'
                                        }
                                    },{
                                        xtype: 'checkbox',
                                        name: 'status',
                                        fieldLabel: 'Status',
                                        //labelStyle: 'color:transparent',
                                        //labelSeparator: '',
                                        //hideEmptyLabel: false,
                                        //hideLabel: true,
                                        width: 88,
                                        labelAlign: 'top',
                                        boxLabel: 'Approved',
                                        //boxLabelAlign: 'before',
                                        hidden: false,
                                        bind: '{theStyle.status}'
                                    },{
                                        xtype: 'datefield',
                                        name: 'fabricby',
                                        fieldLabel: 'Fabric by',
                                        format: 'Y-m-d',
                                        hidden: true,
                                        bind: '{theStyle.fabricby}'
                                    },{
                                        xtype: 'datefield',
                                        name: 'markerby',
                                        fieldLabel: 'Marker by',
                                        format: 'Y-m-d',
                                        hidden: true,
                                        bind: '{theStyle.markerby}'
                                    },{
                                        xtype: 'datefield',
                                        name: 'pnsby',
                                        fieldLabel: 'Print & Stone by',
                                        format: 'Y-m-d',
                                        hidden: true,
                                        bind: '{theStyle.pnsby}'
                                    }]
                                }]
                            },{
                                layout: {
                                    type: 'hbox',
                                    align: 'stretch',
                                    pack: 'start'
                                },
                                margin: '0 0 5 0',
                                defaults: {

                                },
                                items:[{
                                    xtype: 'grid',
                                    reference: 'materials',
                                    minWidth: 320,
                                    width: 320,
                                    margin: '0 5 0 0',
                                    flex: 3,
                                    header: {
                                        //title: 'DESCRIPTION',
                                        //titleAlign: 'center',
                                        itemPosition: 0,
                                        items: [{
                                            xtype: 'button',
                                            text: 'Add',
                                            width: 70,
                                            iconCls: 'fa fa-plus',
                                            handler: 'onAddMaterialClick'
                                        }, {
                                            xtype: 'tbspacer',
                                            width: 5
                                        }, {
                                            xtype: 'button',
                                            text: 'Remove',
                                            iconCls: 'fa fa-remove',
                                            bind: {
                                                disabled: '{!materials.selection}'
                                            },
                                            handler: 'onRemoveMaterialClick'
                                        }]
                                    },
                                    //hideHeaders: true,
                                    //columnLines: true,
                                    //bodyBorder: true,
                                    bind: {
                                        store: '{theStyle.powms}'
                                    },

                                    columns: [{
                                        text: 'ID',
                                        dataIndex: 'powmId',
                                        menuDisabled: true,
                                        sortable: false,
                                        hidden: true
                                    },{
                                        text: 'No.',
                                        dataIndex: 'lineseq',
                                        width: 50,
                                        menuDisabled: true,
                                        hidden: false
                                    },{
                                        text: '',
                                        dataIndex: 'matcategory',
                                        menuDisabled: true,
                                        sortable: false
                                    },{
                                        text: 'Type',
                                        dataIndex: 'mattype',
                                        menuDisabled: true,
                                        sortable: false,
                                        hidden: true
                                    },{
                                        text: 'Desc',
                                        dataIndex: 'matdesc',
                                        menuDisabled: true,
                                        sortable: false,
                                        hidden: true
                                        //renderer: 'renderDesc',
                                        //scope: this
                                    },{
                                        text: '',
                                        dataIndex: 'descript',
                                        sortable: false,
                                        menuDisabled: true,
                                        flex: 1
                                    },{
                                        text: 'Code',
                                        dataIndex: 'matcode',
                                        menuDisabled: true,
                                        sortable: false,
                                        hidden: true
                                    },{
                                        text: 'Color',
                                        dataIndex: 'matcolor',
                                        menuDisabled: true,
                                        sortable: false,
                                        hidden: true
                                    },{
                                        text: 'Vendor',
                                        dataIndex: 'matvendor',
                                        menuDisabled: true,
                                        sortable: false,
                                        hidden: true
                                    },{
                                        text: 'Cost',
                                        dataIndex: 'matcost',
                                        menuDisabled: true,
                                        sortable: false,
                                        hidden: true
                                    }],

                                    viewConfig: {
                                        stripeRows: true,
                                        trackOver: true,
                                        plugins: [{
                                            ddGroup: 'mat-group',
                                            ptype: 'gridviewdragdrop',
                                            enableDrop: true,
                                            dragText: 'Drag and drop to reorganize'
                                        }],
                                        listeners: {
                                            drop: function(node, data, overModel, dropPosition, e){

                                                this.getStore().each(function(rec,idx){
                                                    rec.set('lineseq', idx+1);
                                                })
                                            },
                                            afterrender: {
                                                fn: function(){

                                                },
                                                delay: 100
                                            }
                                        }
                                    },

                                    listeners: {
                                        select: function(sm, rec, index, eOpts){
                                            if(sm && rec){
                                                //var editForm = me.down('container[reference=matEditForm]'),
                                                //    categoryCombo = me.down('combo[name=matcategory]'),
                                                var codeCombo = me.down('combo[name=matcode]'),
                                                    colorCombo = me.down('combo[name=matcolor]'),
                                                    vendorCombo = me.down('combo[name=matvendor]'),
                                                    costCombo = me.down('textfield[name=matcost]'),
                                                    colorStore = colorCombo.getStore();

                                                //compStore.getProxy().setUrl(compProxyUrl + '/' + rec.data.mattype.toString().toLowerCase());
                                                /*
                                                Ext.apply(remoteMaterials.getProxy().extraParams, {
                                                    type: rec.data.mattype
                                                });
                                                remoteMaterials.load();

                                                colorStore.clearFilter();
                                                Ext.apply(colorStore.getProxy().extraParams, {
                                                    type: rec.data.mattype,
                                                    style: rec.data.matcode
                                                });
                                                */

                                                var isStone = true;
                                                switch(rec.data.mattype){
                                                    case 'STONE':
                                                        break;
                                                    default:
                                                        isStone = false;
                                                }

                                                //editForm.setVisible(true);
                                                vendorCombo.setVisible(isStone);
                                                costCombo.setVisible(isStone);
                                                codeCombo.setVisible(!isStone);
                                                colorCombo.setVisible(!isStone);
                                            }
                                        }
                                    }
                                },{
                                    iconCls: 'fa fa-edit fa-lg',
                                    header: {
                                        title: 'Edit:',
                                        height: 44
                                    },
                                    bind: {
                                        title: 'Edit: {materials.selection.matcategory}'
                                    },
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch',
                                        pack: 'start'
                                    },
                                    reference: 'matEditForm',
                                    flex: 2,
                                    width: 240,
                                    minWidth: 240,
                                    bodyPadding: '5 0 0 5',
                                    //hidden: true,
                                    items:[{
                                        xtype: "combo",
                                        name: 'matcategory',
                                        reference: 'material_category',
                                        //itemId: "cboPrint",
                                        fieldLabel: "",
                                        hideEmptyLabel: false,
                                        //labelWidth: 50,
                                        //width: 160,
                                        hideTrigger: true,
                                        bind: {
                                            store: '{categories}',
                                            value: '{materials.selection.matcategory}',
                                            disabled: '{!materials.selection}'
                                        },
                                        //store: categoryStore,
                                        publishes: 'value',
                                        valueField: 'name',
                                        displayField: 'name',
                                        //forceSelection: true,
                                        //selectOnFocus: true,
                                        editable: false,
                                        //queryMode: "remote",
                                        //queryParam: "filter",
                                        //triggerAction: 'last',
                                        //minChars: 1,
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
                                                var txtDesc = this.ownerCt.ownerCt.query('textfield[name="matdesc"]')[0];
                                                txtDesc.setValue('');
                                            },

                                            select: function(combo, rec, e){
                                                var txtType = combo.ownerCt.query('textfield[name="mattype"]')[0];
                                                txtType.setValue(rec.data.type);

                                                /*
                                                Ext.apply(remoteMaterials.getProxy().extraParams, {
                                                    type: rec.data.type
                                                });

                                                remoteMaterials.load();
                                                */
                                            }
                                        }
                                    },{
                                        xtype: 'textfield',
                                        name: 'mattype',
                                        fieldLabel: 'Type',
                                        hidden: true,
                                        bind: {
                                            value: '{materials.selection.mattype}'
                                        }
                                    },{
                                        xtype: "memorycombo",
                                        name: 'matcode',
                                        reference: 'material_code',
                                        //itemId: "Prints",
                                        fieldLabel: "Code #",
                                        //labelWidth: 50,
                                        //width: 160,
                                        //autoSelect: false,
                                        hideTrigger: true,
                                        //publishes: 'value',
                                        valueField: 'label',
                                        displayField: 'label',
                                        bind: {
                                            //store: '{components}',
                                            value: '{materials.selection.matcode}',
                                            disabled: '{!materials.selection}'
                                        },
                                        store: memMaterials,
                                        autoLoadOnValue: true,
                                        //forceSelection: false,
                                        //selectOnFocus: true,
                                        pageSize: 50,
                                        //minChars: 0,
                                        queryMode: 'local',
                                        //queryParam: "filter",
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
                                                if(combo.isExpanded){
                                                    combo.collapse();
                                                }
                                                var cboColor = this.ownerCt.ownerCt.query('combo[name="matcolor"]')[0],
                                                    txtDesc = this.ownerCt.ownerCt.query('textfield[name="matdesc"]')[0];

                                                cboColor.getStore().clearFilter();
                                                cboColor.setValue('');
                                                txtDesc.setValue('');
                                            },
                                            /*
                                            beforequery: {
                                                fn: function(qe){
                                                    delete qe.combo.lastQuery;
                                                }
                                            },
                                            */
                                            select: {
                                                fn: function(combo, rec, e){

                                                    var cboColor = combo.ownerCt.query('combo[name="matcolor"]')[0],
                                                        store = cboColor.getStore();

                                                    store.clearFilter();
                                                    if(!Ext.isEmpty(combo.getValue())){

                                                        store.filter([{
                                                            property: 'descript',
                                                            value: combo.getValue().toUpperCase(),
                                                            operator: '='
                                                        }]);

                                                        cboColor.select(store.first());
                                                        cboColor.fireEvent('select', combo, [store.first()]);
                                                    }

                                                    /*
                                                    Ext.apply(store.getProxy().extraParams, {
                                                        type: rec.data.text.trim(),
                                                        style: rec.data.id.trim()
                                                    });

                                                    store.reload({
                                                        callback: function(){
                                                            cboColor.select(store.first());
                                                            cboColor.fireEvent('select', combo, [store.first()]);
                                                        }
                                                    });
                                                    */
                                                    if(rec.data.text === 'PRINTS'){
                                                        me.getImageSrc(combo, 'prints');
                                                    }

                                                }
                                            }
                                        }
                                    },{
                                        xtype: "memorycombo",
                                        name: 'matcolor',
                                        //itemId: "cboColor",
                                        fieldLabel: "Color",
                                        //labelWidth: 50,
                                        //width: 160,
                                        //autoSelect: false,
                                        hideTrigger: true,
                                        bind: {
                                            value: '{materials.selection.matcolor}',
                                            disabled: '{!materials.selection}'
                                        },
                                        store: memColors,
                                        valueField: 'label',
                                        displayField: 'label',
                                        //forceSelection: false,
                                        //selectOnFocus: true,
                                        pageSize: 50,
                                        minChars: 0,
                                        queryMode: "local",
                                        //queryParam: "filter",
                                        //triggerAction: 'last',
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
                                                var txtDesc = this.ownerCt.ownerCt.query('textfield[name="matdesc"]')[0];
                                                txtDesc.setValue('');
                                            },
                                            beforequery: {
                                                fn: function(qe){
                                                    var cboCode = qe.combo.ownerCt.query('combo[name="matcode"]')[0],
                                                        store = qe.combo.getStore();

                                                    //console.log(cboStyle, cboStyle.getValue())

                                                    if(!Ext.isEmpty(cboCode.getValue())){
                                                        store.clearFilter();

                                                        store.filter([{
                                                            property: 'descript',
                                                            value: cboCode.getValue().toUpperCase(),
                                                            operator: '='
                                                        }]);
                                                    }
                                                    //delete qe.combo.lastQuery;
                                                }
                                            },
                                            select: {
                                                fn: function(combo, record, e){
                                                    // Error
                                                    //console.log('color select', this.getSelection());
                                                    var me = this,
                                                        txtDesc = me.ownerCt.ownerCt.query('textfield[name="matdesc"]')[0];
                                                    txtDesc.setValue(me.getSelection().data.text);
                                                },
                                                buffer: 10
                                            },
                                            change: function(combo, newValue, oldValue){

                                            }
                                        }
                                    },{
                                        xtype: 'textfield',
                                        name: 'matdesc',
                                        fieldLabel: 'Description',
                                        bind: {
                                            value: '{materials.selection.matdesc}',
                                            disabled: '{!materials.selection}'
                                        }
                                    },{
                                        xtype: "combo",
                                        name: 'matvendor',
                                        //itemId: "cboStones",
                                        fieldLabel: "Vendor",
                                        //labelWidth: 50,
                                        //width: 160,
                                        hidden: true,
                                        hideTrigger: true,
                                        bind: {
                                            store: '{vendors}',
                                            value: '{materials.selection.matvendor}',
                                            disabled: '{!materials.selection}'
                                        },
                                        //store: vendorStore,
                                        valueField: "id",
                                        displayField: "id",
                                        //forceSelection: false,
                                        //selectOnFocus: true,
                                        queryMode: 'local',
                                        //queryParam: "filter",
                                        //triggerAction: 'all',
                                        //lastQuery: '',
                                        minChars: 0,
                                        listConfig: {
                                            loadindText: 'Searching...',
                                            emptyText: 'No matching items found.',
                                            width: 340
                                        },
                                        plugins: [{
                                            ptype: "cleartrigger"
                                        }]
                                    },{
                                        xtype: 'textfield',
                                        name: 'matcost',
                                        fieldLabel: 'Cost',
                                        hidden: true,
                                        bind: {
                                            value: '{materials.selection.matcost}',
                                            disabled: '{!materials.selection}'
                                        }
                                    }]
                                }]
                            },{
                                defaults: {
                                    //hideLabel: true,
                                },
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch',
                                    pack: 'start'
                                },
                                //flex: 1,
                                items: [{
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaultType: 'textareafield',
                                    defaults: {
                                        margin: '0 5 0 0',
                                        labelAlign: 'top'
                                    },
                                    style: {

                                    },
                                    items:[{
                                        name: 'bodydesc',
                                        fieldLabel: 'Body Desc',
                                        //hideLabel: true,
                                        flex: 1,
                                        grow: true,
                                        bind: '{theStyle.bodydesc}'
                                    },{
                                        name: 'stitchdesc',
                                        fieldLabel: 'Stitch Desc',
                                        //hideLabel: true,
                                        flex: 1,
                                        grow: true,
                                        bind: '{theStyle.stitchdesc}'
                                    }]
                                },{
                                    xtype: 'fieldcontainer',
                                    layout: {
                                        type: 'hbox'
                                    },
                                    defaultType: 'textareafield',
                                    defaults: {
                                        margin: '0 5 0 0',
                                        labelAlign: 'top'
                                    },
                                    style: {

                                    },
                                    items:[{
                                        name: 'remarks',
                                        fieldLabel: 'Remarks',
                                        //hideLabel: true,
                                        flex: 1,
                                        grow: true,
                                        bind: '{theStyle.remarks}'
                                    },{
                                        name: 'memo',
                                        fieldLabel: 'House Memo',
                                        //hideLabel: true,
                                        flex: 1,
                                        grow: true,
                                        bind: '{theStyle.memo}'
                                    }]
                                }]
                            }]
                        }]
                    },{
                        xtype: 'tna-grid',
                        reference: 'planactivities',
                        title: 'T & A',
                        bind: '{theStyle.tnaps}',
                        layout: {
                            type: 'fit'
                        },
                        tbar: [{
                            xtype: 'button',
                            text: 'Add',
                            width: 70,
                            iconCls: 'fa fa-plus',
                            handler: 'onAddActivityClick'
                        },{
                            xtype: "button",
                            //ui: "default",
                            text: 'Add All',
                            iconCls: "fa fa-gear",
                            //scope: this.controller,
                            menu: {
                                items: [{
                                    text: "T&A - A",
                                    iconCls: "fa fa-gear",
                                    type: '1',
                                    itemId: "a"
                                },{
                                    text: "T&A - B",
                                    iconCls: "fa fa-gear",
                                    type: '2',
                                    itemId: "b"
                                }],
                                listeners: {
                                    click: {
                                        fn: 'onAddAllMenuClick'
                                    }
                                }
                            }
                        },{
                            xtype: 'button',
                            text: 'Remove',
                            iconCls: 'fa fa-remove',
                            bind: {
                                disabled: '{!planactivities.selection}'
                            },
                            handler: 'onRemoveActivityClick'
                        },{
                            xtype: 'button',
                            text: 'Remove All',
                            iconCls: 'fa fa-remove',
                            handler: 'onRemoveAllActivityClick'
                        }]

                    }]
                }]
            }]
        });

        me.callParent(arguments);

        me.relayEvents(this.down('grid'), ['reconfigure']);
        //me.relayEvents(this.down('grid').getStore(), ['add'], 'store');
    },

    renderDesc: function(value, metaData, record){
        var stRight = record.get('matcode') + '-' + record.get('matcolor'),
            stLeft = record.get('matdesc');

        if (record.get('mattype') === 'STONE'){
            stLeft = record.get('matvendor');
            stRight = record.get('matcost') + ' ' + record.get('matdesc');
        }

        return Ext.String.format('{0} {1}', stLeft, stRight);
    },

    getImageSrc: function(combo, category){
        var me = this,
            rec = me.getViewModel().get('theStyle'),
            preview = me.down('multiimageupload');

        Ext.Ajax.request({
            // FID 2 prints
            url: Ext.String.urlAppend('/api/Dals/' + category + '/' + combo.getValue()),
            method: 'GET',
            success: function(response, opts){
                var path = '',
                    result = Ext.decode(response.responseText);
                if (result.success){
                    //console.log('success', result.data);
                    //printImage.title = result.data.F_DESC1;
                    if(result.data != null){
                        //path = '../../' + result.data.F_LINK + result.data.F_PATH + '/' + result.data.F_LOCATION + result.data.F_EXT;
                        if(result.data.F_CREATED_ON != null){
                            var d = new Date(result.data.F_CREATED_ON);
                            path = result.data.F_LINK + d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
                            if(!Ext.isEmpty(result.data.F_NAME) && !Ext.isEmpty(result.data.F_TYPE)) {
                                path = path + '/' + result.data.ID + '/' + result.data.F_NAME;
                            }
                            else {
                                path = path + '/' + result.data.F_LOCATION + result.data.F_EXT;
                            }
                        }
                    }

                    if(category === 'prints'){
                        category = category.substring(0,5);
                    }

                    var previewImage = preview.query('image[name="' + category + 'img"]')[0];
                    //previewImage = preview.query('image[canvas="' + preview.id + '-canvas-' + category + '"]')[0];

                    //previewImage.setSrc(path);
                    rec.set(category+'imgsrc', path);
                    //rec.set(category+'img', path);
                    //me.down('hidden[name='+category+'imgsrc]').setValue(path);
                }
            },
            failure: function(response, opts){
                Ext.Msg.alert(response.status.toString(), response.statusText + ', an error occurred during your request. Please try again.' );
            },
            callback: function(response, opts){

            }
        });
    },

    noop: function(e) {
        e.stopEvent();
    },

    addDropZone: function(e) {
        //console.log('add', this);
        if (!e.browserEvent.dataTransfer || Ext.Array.from(e.browserEvent.dataTransfer.types).indexOf('Files') === -1) {
            return;
        }

        e.stopEvent();

        this.addCls('drag-over');
    },

    removeDropZone: function(e) {

        var el = e.getTarget(),
            thisEl = this.getEl();

        e.stopEvent();

        if (el === thisEl.dom) {
            this.removeCls('drag-over');
            return;
        }

        while (el !== thisEl.dom && el && el.parentNode) {
            el = el.parentNode;
        }

        if (el !== thisEl.dom) {
            this.removeCls('drag-over');
        }

    },

    drop: function(e) {
        window.URL = window.URL || window.webkitURL;
        e.stopEvent();

        var me = this,
            imageType = /^image\//,
            form = me.up('sales-edit-form'),
            rec = me.getViewModel().get('theStyle'),
            ctn = me.down('multiimageupload'),
            btn = ctn.query('button[pressed=true]')[0];

        if(!Ext.isEmpty(btn)){
            var category = btn.ownerCt.ownerCt.title.toLowerCase(),
                dropTarget = btn.ownerCt.ownerCt.down('box[targetId="' + category + '-droptarget-' + ctn.id + '"]'),
                previewImage = btn.ownerCt.ownerCt.down('image[name="' + category  + 'img"]'),
            //hidden = me.down('hidden[name="' + category + 'imgsrc' + '"]'),
                files = e.browserEvent.dataTransfer.files;

            /*
             var bodyImg = Ext.get('powdid-1-bodyimg').dom;
             bodyImg.src = window.URL.createObjectURL(file);
             bodyImg.onload = function(){
             window.URL.revokeObjectURL(this.src);
             };

             console.log(Ext.get('powdid-1-bodyimg').dom.src, Ext.get('powdid-1-printimg'));
             */

            if(imageType.test(files[0].type))
            {
                var found = false;
                if (!form.imagesQueue) {
                    form.imagesQueue = [];
                }
                else {
                    Ext.each(form.imagesQueue, function(item, index, self){
                        if(item.imageFile.name == files[0].name){
                            found = true;
                            return !found;
                        }
                    });
                }

                if(!found){
                    var existings = [];
                    Ext.each(form.imagesQueue, function(item, index, self){
                        if(item.imageKey == previewImage.name + '-' + rec.id){
                            existings.push(index);
                        }
                    });

                    Ext.each(existings, function(item){
                        Ext.Array.removeAt(form.imagesQueue, item);
                    });

                    form.imagesQueue.push({imageKey: previewImage.name + '-' + rec.id, imageFile: files[0]});
                    //me.addFiles(files[0], form, previewImage);

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        //previewImage.setSrc(e.target.result);
                        rec.set(category+'img', window.URL.createObjectURL(files[0]));
                        //rec.set(category+'imgsrc', files[0].name);
                        //previewImage.setSrc(window.URL.createObjectURL(files[0]));
                    };

                    reader.readAsDataURL(files[0]);
                    previewImage.show();

                    window.URL.revokeObjectURL(files[0]);
                    //console.log(file, form.uploadableImages);
                }
                else {
                    Ext.Msg.alert('Error', 'Same file name already used, differenct images name please');
                }

            }
            else {
                Ext.Msg.alert('Error', 'Only images please, supported files are jpeg,jpg,png,gif,ico');
            }

            dropTarget.hide(null, function () {
                var btn = this.ownerCt.down('button');
                btn.setPressed(false);
            });
        }

        //console.log(Ext.get('powdid-1-bodyimg').dom.src, Ext.get('powdid-1-printimg'));
        this.removeCls('drag-over');
    }
});