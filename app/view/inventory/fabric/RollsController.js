Ext.define('Vega.view.inventory.fabric.RollsController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.fabricrolls',

    init: function(){
        var me = this;

        me.listen({
            component: {
                'combo': {
                    change: 'onComboChanged'
                },
                'rolls-grid button[action=save]': {
                    click: 'onSaveClicked'
                },
                'rolls-grid button[action=refresh]': {
                    click: 'onRefreshClicked'
                },
                'rolls-grid button[action=showsummary]': {
                    click: 'onShowSummaryClicked'
                }
            }
        })
    },

    onComboChanged: function (combo, newValue, oldValue, eOpts) {
        //console.log(newValue, oldValue);
        if(combo.triggers.clear){
            combo.triggers.clear.el.setDisplayed(combo.getRawValue().toString().length == 0 ? false : true);
        }
    },

    onSaveClicked: function(btn, eOpts) {
        var me = this,
            store = me.getViewModel().getStore('rolls');

        store.sync({
            success : function(batch, opt){

                Ext.Msg.alert('Status', 'Changes saved successfully.');
            },
            failure : function(batch, opt){
                var msg = '';

                if(batch.hasException){

                    for(var i = 0; i < batch.exceptions.length; i ++ ){
                        switch(batch.exceptions[i].action){
                            case "destroy" :
                                msg = msg + batch.exceptions[i].records.length + " Delete, ";
                                break;
                            case "update" :
                                msg = msg + batch.exceptions[i].records.length + " Update, ";
                                break;
                            case "create" :
                                msg = msg + batch.exceptions[i].records.length + " Create, ";
                                break;
                        }
                    }

                    Ext.Msg.alert("Status", msg + " operation failed!");
                }
                else
                    Ext.Msg.alert('Status', 'Changes failed.');
            }
        })
    },

    onPrintBarcodeClicked: function(btn, eOpts) {

        var store = this.getViewModel().getStore('rolls'), query = {}, url = '../Services/BCG.ashx?',
            toolbar = this.getView().down('toolbar'),
            fabric = toolbar.getComponent('cboFabric'),
            color = toolbar.getComponent('cboColor'),
            lotno = toolbar.getComponent('cboLotno');

        if (store.getCount() > 0 && store.getCount() < 100) {
            //console.log(this.getList(), fabric.getValue());
            if (fabric.getValue() != null) {
                //url += 'style='+ fabric.getValue() + '&';
                query.style = fabric.getValue();
            }

            if (color.getValue() != null) {
                //url += 'color=' + color.getValue() + '&';
                query.color = color.getValue()
            }

            query.lotno = lotno.getValue();

            window.open(url + Ext.Object.toQueryString(query));
        }
        else {
            var message = 'Too many barcodes to print. Please select less!';
            if (store.getCount() == 0) message = 'No barcode to print. Please select more!';
            Ext.Msg.alert('Warning!', message);
        }
    },

    onShowSummaryClicked: function(btn, eOpts) {
        var grid = this.lookupReference('grid'),
            groupSummary = grid.getView().getFeature('groupSummary1');

        groupSummary.toggleSummaryRow(!groupSummary.showSummaryRow);
        groupSummary.view.refresh();


    },

    onSyncClicked: function(btn, eOpts) {
        var grid = btn.up('grid'),
            store = grid.getStore();

        store.each(function(record){
            var barcode = record.data.barcode,
                a = barcode.split('*'),
                lotno = a[2];

            //console.log(record.get('lotno').trim(), lotno)
            if (record.data.lotno.trim() != lotno){
                record.set('barcode', record.data.style.trim()+'*'+record.data.color.trim()+'*'+record.data.lotno.trim()+'*'+record.data.rollno);
                record.commit();
                record.setDirty()
                console.log(record.data.barcode);
            }
        });

        //grid.reconfigure(store);
        store.sync({
            success : function (batch, opt) {

                Ext.Msg.alert('Status', 'Changes saved successfully.');
            },
            failure : function(batch, opt){
                var msg = '';

                if(batch.hasException){

                    for(var i = 0; i < batch.exceptions.length; i ++ ){
                        switch(batch.exceptions[i].action){
                            case "destroy" :
                                msg = msg + batch.exceptions[i].records.length + " Delete, ";
                                break;
                            case "update" :
                                msg = msg + batch.exceptions[i].records.length + " Update, ";
                                break;
                            case "create" :
                                msg = msg + batch.exceptions[i].records.length + " Create, ";
                                break;
                        }
                    }

                    Ext.Msg.alert("Status", msg + " operation failed!");
                }
                else
                    Ext.Msg.alert('Status', 'Changes failed.');
            }
        });
    },

    onRefreshClicked: function(btn, eOpts) {
        this.fetchData();
    },

    fetchData: function() {
        var filters = this.getFilterData(),
            store = this.getViewModel().getStore('rolls');

        //console.log('Rolls controller - fetchData', store, filters);
        store.clearFilter(true);

        if (filters.length > 0) {
            store.filter(filters);
        }
        else {
            store.load({
                success: function() {
                    //console.log('Rolls store success.')
                },
                callback: function() {
                    //console.log('Rolls store callback.');
                },
                scope: this
            });
        }
    },

    getFilterData: function() {

        var filters = [], i, len;
        var combos = ['style', 'color', 'lotno'];
        var toolbar = this.getView().down('toolbar');
        var cboFabric = toolbar.getComponent('cboFabric'),
            cboColor = toolbar.getComponent('cboColor'),
            cboLotno = toolbar.getComponent('cboLotno');
        var fields = [cboFabric, cboColor, cboLotno];

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
