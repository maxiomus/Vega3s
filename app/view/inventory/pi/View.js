
Ext.define('Vega.view.inventory.pi.View',{
    extend: 'Ext.view.View',

    requires: [
        'Vega.view.inventory.pi.ViewController',
        'Vega.view.inventory.pi.ViewModel'
    ],

    alias: 'widget.pi-view',

    controller: 'pi-view',
    viewModel: {
        type: 'pi-view'
    },

    //scrollable: "y",
    //loadMask: true,
    //loadingHeight: 300,
    //trackOver: false,
    //cls: "multi-view",
    loadMask: true,
    overItemCls: "x-item-over",
    itemSelector: "div.item-selector",
    preserveScrollOnRefresh: true,
    deferInitialRefresh: true,
    publishes: ['selection'],

    config: {
        selection: null
    },

    prepareData: function(f, d, e){
        Ext.apply(f, {
            //viewStatus: localStorage.getItem("pow-seen-" + f.powhId) == "true" ? "visited" : ""
        });

        return f;
    },

    listeners: {
        beforecontainerclick: function(){
            return false;
        }
    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
    }
});
