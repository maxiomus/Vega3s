Ext.define('Vega.view.development.LineSheetController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.linesheet',

    requires: [
        'Vega.model.Media'
    ],

    init: function () {
        //console.log(this.lookupReference('multiview').refs);
    },

    initViewModel: function(vm) {
        var me = this,
            binding = vm.bind({
            bindTo: '{theLineSheet}',
            deep: true,
            single: true
        }, function(rec){
            //console.log('root binding - callback', rec);

            var store = rec.samplesInLines(),
                proxy = store.getProxy();

            me.getView().setLoading(true);
            store.on('load', function(s){
                me.getView().setLoading(false);
            },{
                single: true
            });

            //rec.samplesInLines().load()
            binding.destroy();

        }, this);
    },

    onItemSelect: function(v){

        this.getView().actRemove.setDisabled(v.getSelection().length == 0);
    },

    onItemContextMenu:function(v, rec, item, idx, e){
        e.stopEvent();

        var view = this.getView(),
            sm = v.getSelectionModel();

        if(!sm.isSelected(rec)){
            sm.select(rec);
        }

        //view.contextmenu.items.items[1].setDisabled(v.getSelection().length == 0);
        view.contextmenu.showAt(e.getXY());
    },

    onItemClickRemove: function(panel, widget){
        //console.log(panel, widget);
        var me = this;

        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to remove this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    var view = me.getView().down('style-view'),
                        line = me.getViewModel().get('theLineSheet'),
                        selected = view.getSelection();

                    Ext.apply(view.getStore().getProxy().extraParams, {
                        lineId: line.data.lineId
                    });

                    Ext.each(selected, function(rec){
                        rec.drop();
                    });

                    me.saveStore(view.getStore(), view);
                }
            }
        });
    },

    onItemClickRefresh: function(panel, widget){
        var store = panel.down('style-view').getStore();

        store.reload();
    },

    onItemClickPrint: function(panel, widget){
        var me = this,
            line = me.getViewModel().get('theLineSheet'),
            store = line.samplesInLines(),
            showCost = me.getView().down('toggleslidefield').getValue(),
            mv = Vega.app.getMainView(),
            xf = Ext.util.Format;

        //console.log(me.getView().down('toggleslidefield').getValue());
        var data = {};
        store.getFilters().each(function(filter){
            if(filter.getProperty() != 'lineId'){
                data[filter.getProperty()] = filter.getValue();
            }
        });
        //console.log(data)

        var url = xf.format('../services/LineSheetPrint.ashx?lineId={0}', line.data.lineId);
        //var url = '../services/LineSheetPrint.ashx?';

        if(Object.keys(data).length > 0){
            url = Ext.String.urlAppend(url, Ext.Object.toQueryString(data));
        }

        if(showCost){
            url = Ext.String.urlAppend(url, xf.format('cost={0}', showCost));
        }

        var pw = panel.add({
            xtype: 'window',

            title: 'Line Sheet # ' + line.data.lineId,
            iconCls: "x-fa fa-th",

            layout: {
                type: 'fit'
            },

            renderTo: Ext.getBody(),

            //maximized: true,
            maximizable: true,
            //alignTarget: '',
            width: panel.getWidth() * 0.98,
            //maxWidth: 1366,
            height: panel.getHeight() * 0.98,

            items: [{
                xtype: 'component',
                itemId: 'contentIframe',
                autoEl: {
                    tag: 'iframe',
                    style: 'height: 100%; width: 100%; border: none',
                    src: url
                }
            }],

            buttons: [{
                text: 'Print',
                handler: function(btn){
                    var iframe = pw.getComponent('contentIframe');

                    if(iframe){
                        var cw = iframe.getEl().dom.contentWindow;
                        //console.log(iframe, cw.document);
                        cw.print();
                    }
                }
            }, {
                text: 'Cancel',
                handler: function(btn){
                    pw.close();
                },
                scope: this
            }]
        });

        pw.on('close', function(p){
            mv.unmask();
        });

        pw.show('', function(){
            mv.mask();
        });
    },

    /**
     *
     * @param {Ext.form.field.ComboBox} c
     * @param {String} v ComboBox Value
     */
    onTriggerSearchClicked: function(c,v){

        var rec = this.getViewModel().get('theLineSheet'),
            store = rec.samplesInLines(),
            filters = store.getFilters();

        store.setRemoteFilter(false);

        var filterSub = new Ext.util.Filter({
            property: 'subcategory',
            value: c.getValue()
        });

        filters.add(filterSub);
    },

    onTriggerClearClicked: function(c,trigger){
        var rec = this.getViewModel().get('theLineSheet'),
            store = rec.samplesInLines(),
            filters = store.getFilters();

        var filterSub = new Ext.util.Filter({
            property: 'subcategory',
            value: c.getValue()
        });

        filters.remove(filterSub);
    },

    saveStore: function(store, target){
        var processMask = Ext.create('Ext.LoadMask', {
            msg: 'Saving... Please wait',
            target: target
        });
        processMask.show();

        store.sync({
            success: function(batch, op){
                Ext.Msg.alert('Status', 'Changes saved successfully.');

            },
            failure: function(batch, op){
                //console.log(op);
                processMask.hide('', function() {

                });
            },
            callback: function(batch, op){
                processMask.hide('', function() {

                });
            }
        });
    }
});
