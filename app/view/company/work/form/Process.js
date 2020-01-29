
Ext.define('Vega.view.company.work.form.Process',{
    extend: 'Ext.form.Panel',

    requires: [
        'Vega.view.company.work.form.ProcessController',
        'Vega.view.company.work.form.ProcessModel',
        'Ext.ux.menu.WideMenu'
    ],

    alias: 'widget.work-form-process',

    controller: 'work-form-process',
    viewModel: {
        type: 'work-form-process'
    },

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    listeners: {
        actprocessstart: function (a,b) {
            console.log(a,b)
        }
    },

    initComponent: function (c) {
        var me = this;

        me.actions = me.buildActions();

        Ext.applyIf(me, {
            items: [{
                xtype: 'tabpanel',
                plain: true,
                //margin: 10,
                maxTabWidth: 120,
                //bodyPadding: 5,
                flex: 1,

                tabBar: {
                    defaults: {
                        flex: 1, // if you want them to stretch all the way
                        height: 32, // set the height,
                        //padding: 6, // set the padding
                        textAlign: 'left',
                        width: '100%', // set the width for text ellipsis works when tab size smaller than text...
                        border: true,
                        style: {
                            //border: '1px solid #ccc'
                        }
                    }
                },

                items: [{
                    tabConfig: {
                        title: 'Process details',
                        tooltip: 'Details of process',
                        margin: '6 10 6 10'
                    },
                    layout: {
                        type: 'anchor'
                    },
                    style: {
                        //border: '1px solid #cfcfcf'
                    },
                    padding: 30,
                    defaults: {
                        labelWidth: 200,
                        fieldStyle: 'font-size: 15px',
                        labelStyle: 'font-weight: bold',
                        margin: '0 0 20 0'
                    },
                    items: me.buildItems()
                }]
            }]
        });

        me.callParent(arguments);
    },

    buildItems: function () {
        var me = this;
        return [{
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'textfield',
                name: 'title',
                ui: 'medium',
                reference: 'txtProcessTitle',
                fieldLabel: 'Process title',
                labelWidth: 200,
                fieldStyle: 'font-size: 15px',
                labelStyle: 'font-weight: bold',
                flex: 1,
                margin: '0 2 0 0',
                allowBlank: false,
                maskRe: /[^%\^\{\}]/,
                bind: '{processTitle}',
                plugins: [{
                    ptype: "cleartrigger"
                }]
            },{
                xtype: 'button',
                reference: 'btnAddMenu',
                iconCls: 'x-fa fa-plus',
                menuAlign: 'tr-br',
                menu: {
                    xtype: 'menu',
                    width: 200,
                    items: [
                        {
                            xtype: 'menuseparator'
                        },
                        '@startdate',
                        '@startmonth',
                        '@startyear',
                        {
                            xtype: 'menuseparator'
                        },
                        '@processstart'
                    ]
                }
            }]
        },{
            xtype: 'radiogroup',
            fieldLabel: 'Tasks can be completed',
            columns: 1,
            vertical: true,
            name: 'type',
            bind: {
                value: '{theProcess.type}'
            },
            items: [{
                boxLabel: '<b>In any order</b>', name: 'type', inputValue: '1', checked: true
            }, {
                boxLabel: '<b>One by one</b>', name: 'type', inputValue: '2'
            }]
        },{
            xtype: 'tagfield',
            name: 'managers',
            ui: 'medium',
            fieldLabel: 'Process managers',
            itemId: 'managers',
            valueField: 'text',
            displayField: 'text',
            filterPickList: true,
            allowBlank: true,
            queryMode: 'local',
            anchor: '100%',
            bind: {
                value: '{theProcess.managers}',
                store: '{users}'
            }
        },{
            xtype: 'tagfield',
            name: 'processors',
            ui: 'medium',
            fieldLabel: 'Process starters',
            itemId: 'processors',
            valueField: 'text',
            displayField: 'text',
            filterPickList: true,
            allowBlank: false,
            queryMode: 'local',
            anchor: '100%',
            bind: {
                value: '{theProcess.processors}',
                store: '{users}'
            }
        },{
            xtype: 'combo',
            name: 'deadline',
            ui: 'medium',
            fieldLabel: 'Process deadline',
            fieldStyle: 'font-family: Open Sans;font-size: 15px;',
            editable: false,
            allowBlank: false,
            displayField: 'text',
            valueField: 'value',
            anchor: '55%',
            margin: '0 0 8 0',
            bind: {
                value: '{theProcess.deadline}'
            },
            store: {
                field: ['text', 'value'],
                data: [{'text':'After process start', 'value': 'after process start'},{'text':'After previous task complete', 'value':'after previous task complete'},{'text':'Not set', 'value':''}]
            },
            tpl: new Ext.XTemplate('<tpl for=".">' +
                '<div style="font-size: 15px;" class="x-boundlist-item">' +
                    '{text}' +
                '</div>' +
                '</tpl>'),
            listeners: {
                select: function (cbo, rec) {
                    var txtLength = me.lookupReference('txtLength');
                    //console.log(rec, txtLength.getValue(), me.getViewModel().getData());
                    if(!rec.get('value')){
                        if(txtLength.getValue()){
                            txtLength.setValue('');
                        }
                    }
                }
            }
        },{
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            anchor: '55%',
            defaults: {
                labelWidth: 200,
                hideLabel: true
            },
            items: [{
                xtype: 'textfield',
                name: 'length',
                ui: 'medium',
                reference: 'txtLength',
                width: 50,
                margin: '0 5 0 205',
                allowBlank: false,
                bind: {
                    value: '{theProcess.length}',
                    disabled: '{!theProcess.deadline}'
                }
            },{
                xtype: 'combo',
                name: 'unit',
                ui: 'medium',
                reference: 'cboUnit',
                editable: false,
                allowBlank: false,
                displayField: 'name',
                valueField: 'name',
                flex: 1,
                bind: {
                    value: '{theProcess.unit}',
                    disabled: '{!theProcess.deadline}'
                },
                store: {
                    field: ['name'],
                    data: [{'name':'Days'}, {'name':'Weeks'}, {'name':'Months'}]
                },
                tpl: new Ext.XTemplate('<tpl for=".">' +
                    '<div style="font-size: 15px;" class="x-boundlist-item">' +
                        '{name}' +
                    '</div>' +
                    '</tpl>')
            }]
        },{
            xtype: 'datefield',
            name: 'dueOn',
            ui: 'medium',
            hidden: true,
            anchor: '55%',
            bind: {
                value: '{theProcess.dueOn}'
            }
        },{
            xtype: 'textarea',
            name: 'descript',
            fieldLabel: 'Process instructions',
            height: 100,
            anchor: '100%',
            bind: {
                value: '{theProcess.descript}'
            }
        }]
    },

    buildActions: function () {
        var me = this;

        return {
            startdate: Ext.create('Ext.Action', {
                text: "Start date",
                //tooltip: "Start date",
                scale: 'medium',
                //ui: "default",
                minHeight: 30,
                //margin: '3 0 0 0',
                handler: function(btn, e){
                    var txtProcessTitle = btn.ownerCt.ownerCmp.previousSibling('textfield'),
                        oValue = txtProcessTitle.getValue();

                    txtProcessTitle.setValue(oValue + '{Start date}');
                    //me.fireEvent('actstartdate', btn, me);
                },
                scope: me
            }),

            startmonth: Ext.create('Ext.Action', {
                text: "Start month",
                //tooltip: "Start month",
                scale: 'medium',
                //ui: "default",
                minHeight: 30,
                handler: function(btn, e){
                    var txtProcessTitle = btn.ownerCt.ownerCmp.previousSibling('textfield'),
                        oValue = txtProcessTitle.getValue();

                    txtProcessTitle.setValue(oValue + '{Start month}');
                    //me.fireEvent('actstartmonth', btn, me);
                },
                scope: me
            }),

            startyear: Ext.create('Ext.Action', {
                text: "Start year",
                //tooltip: "Start year",
                scale: 'medium',
                //ui: "default",
                minHeight: 30,
                handler: function(btn, e){
                    var txtProcessTitle = btn.ownerCt.ownerCmp.previousSibling('textfield'),
                        oValue = txtProcessTitle.getValue();

                    txtProcessTitle.setValue(oValue + '{Start year}');
                    //me.fireEvent('actstartyear', btn, me);
                },
                scope: me
            }),

            processstart: Ext.create('Ext.Action', {
                text: "Process starter",
                //tooltip: "Process starter",
                scale: 'medium',
                //ui: "default",
                minHeight: 30,
                handler: function(btn, e){
                    //console.log(btn.ownerCt.ownerCmp.previousSibling('textfield'));
                    var txtProcessTitle = btn.ownerCt.ownerCmp.previousSibling('textfield'),
                        oValue = txtProcessTitle.getValue();

                    txtProcessTitle.setValue(oValue + '{Process starter}');
                    //me.fireEvent('actprocessstart', btn, me);
                },
                scope: me
            })
        }
    }
});
