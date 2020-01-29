
Ext.define('Vega.view.company.work.form.Task',{
    extend: 'Ext.tab.Panel',

    requires: [
        'Vega.view.company.work.form.TaskController',
        'Vega.view.company.work.form.TaskModel'
    ],

    alias: 'widget.work-form-task',

    controller: 'work-form-task',
    viewModel: {
        type: 'work-form-task'
    },

    plain: true,
    //margin: 10,
    maxTabWidth: 120,
    //bodyPadding: 5,

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

    initComponent: function (c) {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                tabConfig: {
                    title: 'Task details',
                    //tooltip: 'Task details',
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
        });

        me.callParent();
    },

    buildItems: function () {
        var me = this;

        return [{
            xtype: 'textfield',
            name: 'title',
            ui: 'medium',
            fieldLabel: 'Task title',
            anchor: '100%',
            allowBlank: false,
            bind: {
                value: '{theTask.title}'
            }
        },{
            xtype: 'radiogroup',
            name: 'type',
            fieldLabel: 'Type',
            columns: 1,
            vertical: true,
            bind: {
                value: '{theTask.type}'
            },
            items: [{
                boxLabel: '<b>Task</b>', name: 'type', inputValue: '1', checked: true
            }, {
                boxLabel: '<b>Approval</b>', name: 'type', inputValue: '2'
            }]
        },{
            xtype: 'tagfield',
            name: 'responders',
            ui: 'medium',
            fieldLabel: 'Assignment candidates',
            itemId: 'responders',
            valueField: 'text',
            displayField: 'text',
            filterPickList: true,
            allowBlank: false,
            queryMode: 'local',
            anchor: '100%',
            bind: {
                value: '{theTask.responders}',
                store: '{users}'
            }
        },{
            xtype: 'textarea',
            name: 'descript',
            fieldLabel: 'Description',
            height: 100,
            anchor: '100%',
            bind: {
                value: '{theTask.descript}'
            }
        },{
            xtype: 'combo',
            name: 'deadline',
            ui: 'medium',
            fieldLabel: 'Due date',
            fieldStyle: 'font-family: Open Sans;font-size: 15px;',
            editable: false,
            allowBlank: false,
            displayField: 'text',
            valueField: 'value',
            anchor: '55%',
            margin: '0 0 8 0',
            bind: {
                value: '{theTask.deadline}'
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
                reference: 'txtLength',
                ui: 'medium',
                width: 50,
                allowBlank: false,
                margin: '0 5 0 205',
                bind: {
                    value: '{theTask.length}',
                    disabled: '{!theTask.deadline}'
                }
            },{
                xtype: 'combo',
                name: 'unit',
                reference: 'cboUnit',
                ui: 'medium',
                editable: false,
                allowBlank: false,
                displayField: 'name',
                valueField: 'name',
                flex: 1,
                bind: {
                    value: '{theTask.unit}',
                    disabled: '{!theTask.deadline}'
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
            fieldLabel: 'Due date',
            hidden: true,
            anchor: '55%',
            bind: {
                value: '{theTask.dueOn}'
            }
        }]
    }
});
