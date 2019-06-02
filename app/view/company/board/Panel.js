
Ext.define('Vega.view.company.board.Panel',{
    extend: 'Vega.view.Viewer',

    requires: [
        'Vega.view.company.board.PanelController',
        'Vega.view.company.board.PanelModel'
    ],

    alias: 'widget.board-panel',

    controller: 'board-panel',
    viewModel: {
        type: 'board-panel'
    },

    cls: "shadow-panel",

    header: false,
    //margin: '0 0 0 4',

    style: {
        borderTop: '1px solid #cfcfcf'
        //borderBottom: '1px solid #cfcfcf'
    },

    session: true,

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
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
