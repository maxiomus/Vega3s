Ext.define('Vega.view.reports.inventory.InventoryByLotController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.inventorybylot',

    init: function(){
        var me = this;

        me.listen({
            component: {
                'combo': {
                    render: this.onComboRendered,
                    change: this.onComboChanged
                },
                'combo[itemId=cboFabric]': {
                    specialkey: me.onPressEnterKey
                },
                'button[action=search]': {
                    click: me.onSearchClick
                }
            }
        })
    },

    onBeforeStoreLoad: function(store, operations, eOpts){
        /*var toolbar = this.getView().down('toolbar'),
            checkbox = toolbar.getComponent('chkOnHand');

        Ext.apply(store.getProxy().extraParams, {
            onhand: checkbox.getValue()
            //filters: this.buildQuery(this.getFilterData())
        });*/
    },

    onComboRendered: function(combo, eOpts) {
        //console.log('Combo After Rendered.', this, combo)

        //combo.triggerCell.item(0).setDisplayed(false);
    },

    onComboChanged: function (combo, newValue, oldValue, eOpts) {
        //console.log(newValue, oldValue);
        /*
        if(combo.triggers.clear){
            combo.triggers.clear.el.setDisplayed(combo.getRawValue().toString().length == 0 ? false : true);
        }
        */
    },

    onPressEnterKey: function(field, e) {
        if (e.getKey() == e.ENTER) {
            this.fetchData();
        }
    },

    onSearchClick: function(btn){
        this.fetchData();
    },

    fetchData: function() {
        var filters = this.getFilterData(),
            view = this.lookupReference('maindataview'),
            store = view.getStore();

        store.clearFilter(true);

        if (filters.length > 0) {
            console.log('fetchData', store);
            store.filter(filters);
        }
        else {
            store.load({
                //filters: [
                //    {"property":"rawMatType","value":"FABRICS"},
                //    {"property":"lotno","value":"108-93R"}
                //],
                callback: function() {
                    console.log('Rolls store callback.');
                },
                scope: this
            });
        }
    },

    getFilterData: function() {

        var filters = [], i = 0, len,
            combos = ['style', 'color', 'lotno', 'warehouse', 'rawMatType', 'onHand'],
            toolbar = this.getView().down('toolbar'),
            cboComp = toolbar.getComponent('cboComp'),
            cboColor = toolbar.getComponent('cboColor'),
            cboLotno = toolbar.getComponent('cboLotno'),
            cboWH = toolbar.getComponent('cboWH'),
            cboRawMat = toolbar.getComponent('cboRawMat'),
            chkOnHand = toolbar.getComponent('chkOnHand');

        var fields = [cboComp, cboColor, cboLotno, cboWH, cboRawMat, chkOnHand];

        // default filter...
        Ext.each(combos, function(combo) {
            var query = fields[i].getValue();
            if(query != null) {
                filters.push({
                    property: combo,
                    value: query
                });
            }
            i++;
        });

        return filters;
    }
    
});
