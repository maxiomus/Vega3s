Ext.define('Vega.view.reports.inventory.LotActivityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.lotactivity',

    init: function(){
        var me = this;

        me.listen({
            component: {
                'combo': {
                    render: me.onComboRendered,
                    change: me.onComboChanged
                },
                'combo[itemId=cboFabric]': {
                    specialkey: me.onPressEnterKey
                },
                'button[action=search]': {
                    click: me.onSearchClick
                }
            },

            store: {

            }
        })
    },

    onFabricStoreBeforeLoad: function(store){

    },

    onComboRendered: function(combo, eOpts) {
        //console.log('Combo After Rendered.', this, combo)

        //combo.triggerCell.item(0).setDisplayed(false);
    },

    onComboChanged: function (combo, newValue, oldValue, eOpts) {
        console.log(newValue, oldValue);
        if(combo.triggers.clear){
            combo.triggers.clear.el.setDisplayed(combo.getRawValue().toString().length == 0 ? false : true);
        }

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

        var filters = [], i, len,
            combos = ['style', 'color', 'lotno','warehouse', 'damage', 'onhand'],
            toolbar = this.getView().down('toolbar'),
            cboFabric = toolbar.getComponent('cboFabric'),
            cboColor = toolbar.getComponent('cboColor'),
            cboLotno = toolbar.getComponent('cboLotno'),
            cboWH = toolbar.getComponent('cboWH'),
            checkboxes = toolbar.getComponent('checkboxes'),
            chkDamage = checkboxes.getComponent('chkDamage'),
            chkOnHand = checkboxes.getComponent('chkOnHand');

        var fields = [cboFabric, cboColor, cboLotno, cboWH, chkDamage, chkOnHand];
        //console.log(checkboxes, chkDamage, chkOnHand);
        i = 0;

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
