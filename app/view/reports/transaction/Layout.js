
Ext.define("Vega.view.reports.transaction.Layout",{
    extend: "Ext.tab.Panel",

    requires: [
        "Vega.view.reports.transaction.LayoutModel",
        "Vega.view.reports.transaction.LayoutController"
    ],

    alias: 'widget.halayout',

    viewModel: {
        type: 'reports-transaction-layout'
    },
    controller: "reports-transaction-layout",

    cls: "shadow-panel",

    border: false,
    margin: 8,

    layout: {
        //type: 'hbox',
        //align: 'stretch'
    },

    defaultType: 'panel',
    defaults: {
        //flex: 1,
        focusable: true,
        closable: true,
        collapseDirection: 'left',
        hideCollapeTool: true,
        animCollapse: false,
        headerPosition: 'left',

        keyHandlers: {
            Q: 'onEnterKey'
        },

        listeners: {
            //render: 'onRender'
        },

        onEnterKey: function(event){
            console.log(this);
            //Ext.Msg.alert('KeyMap', 'You pressed ENTER.');
            event.preventDefault();
            event.stopEvent();

            var tabpanel = this.ownerCt;
            if(event.ctrlKey && this.closable){
                tabpanel.remove(this);
            }
        },

        onCloseKey: function(key, e){
            console.log(this, e);
            //Ext.Msg.alert('KeyMap', 'You pressed ENTER.');
            e.preventDefault();
            e.stopEvent();

            var tabpanel = this.ownerCt;
            if(this.closable){
                tabpanel.remove(this);
            }
        }
    },

    listeners: {
        tabchange: function(p, n, o, e){
            n.focus();
        }
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                title: 'Panel 1',
                tabIndex : 1,
                closable: false,
                tabConfig: {
                    title: 'Panel 1-1'
                },
                items:[]
            }, {
                title: 'Panel 2',
                tabIndex : 2
                //collapsed: true
            }, {
                title: 'Panel 3',
                tabIndex : 3
                //collapsed: true
            }]
        });

        me.callParent(arguments);
    }
});
