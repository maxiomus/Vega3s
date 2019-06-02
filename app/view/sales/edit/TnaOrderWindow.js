Ext.define('Vega.view.sales.edit.TnaOrderWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Vega.view.sales.edit.TnaOrder'
    ],

    alias: 'widget.edit-tnaorder',

    controller: 'edit-tnaorder',
    viewModel: {
        type: 'edit-tnaorder'
    },

    bind: {
        title: '{title}'
    },

    layout: 'fit',
    //modal: true,
    monitorResize: true,
    maximizable: true,
    //alwaysOnTop: true,
    constrain: true,
    //maximized: true,
    closable: true,
    scrollable: true,
    padding: 10,

    tbar: [{
        xtype: 'combo',
        labelWidth: 30,
        fieldLabel: 'Plan',
        width: 120,
        //value: 1,
        hidden: true,
        displayField: 'name',
        valueField: 'roleId',
        editable: false,
        bind: {
            store: '{planTypes}'
        },
        listeners: {
            select: {
                fn: 'onPlanTypeChange'
            }
        }
    },{
        xtype: "cycle",
        //ui: "default",
        prependText: "T&A: ",
        iconCls: "x-fa fa-gear",
        showText: true,
        //reference: "filterButton",
        changeHandler: "onTypeChange",
        //scope: this.controller,
        menu: {
            items: [{
                text: "A",
                iconCls: "x-fa fa-gear",
                type: 1,
                itemId: "a",
                checked: true
            },{
                text: "B",
                iconCls: "x-fa fa-gear",
                type: 2,
                itemId: "b",
                checked: false
            }]
        }
    },{
        xtype: 'button',
        text: 'Add',
        reference: 'add',
        width: 70,
        iconCls: 'x-fa fa-plus',
        handler: 'onAddClick'
    },{
        xtype: 'button',
        text: 'Remove',
        reference: 'remove',
        iconCls: 'x-fa fa-remove',
        bind: {
            disabled: '{!orders.selection}'
        },
        handler: 'onRemoveClick'
    }],

    items: [{
        xtype: 'tna-grid',
        //title: 'T & A',
        reference: 'orders',
        bind: {
            store: '{tnaOrders}'
        }
    }],

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {

        });

        me.callParent();
    }
})