Ext.define('Vega.view.production.WIPController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Vega.model.production.WIP',
        'Vega.model.production.Task',
        'Vega.model.production.ChildPO'
    ],

    alias: 'controller.prod-wip',

    init: function(c){
        var me = this,
            mv = me.getView().lookupReference("multiview"),
            refs = mv.getReferences(),
            grid = refs.grid;

        Ext.each(grid.getColumns(), function(c){
            var filter = c.filter;
            if(filter && filter.type == 'list'){
                filter.createMenu();
                //console.log(filter)
            }
        });
    },

    initViewModel: function(vm){
        //this.fireEvent("viewmodelready", this, vm)
    },

    onBeforeStoreLoad: function(store){
        var multiview = this.getView().lookupReference("multiview"),
            button = multiview.down("cycle[reference=statusSelect]");

        //store.getProxy().setExtraParam('status', 'ship');
        Ext.apply(store.getProxy().extraParams, {
            status: button.getActiveItem().type
        });
    },

    onChildStoreBeforeLoad: function(store, operation){

    },

    onGridRender: function(grid){

    },

    onFilterItemChange: function(combo, q, r, o){

        var toolbar = combo.up("toolbar"),
            m = toolbar.down("gridsearchfield"),
            n = toolbar.down("searchcombo"),
            j = combo.getValue();

        switch(j){
            case "customer":
            case "processType":
            case "poh_status":
                n.paramName = j;
                n.show();
                m.hide();
                break;
            default:
                m.paramName = j;
                m.show();
                n.hide();
        }

        var k = this.getViewModel().getStore(j.toLowerCase());

        if(k != null){
            k.load();
            n.bindStore(k);
        }
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g);
        }

        //console.log(j, j.data.pono, j.data.processType);
        this.view.contextmenu.items.items[1].setDisabled(j.data.pono == 0 || j.data.processType == 'IMPORT');
        this.view.contextmenu.items.items[2].setDisabled(j.tasks().getCount() == 0);
        this.view.contextmenu.showAt(l.getXY());
    },

    onCopyTNAClick: function(item){
        var grid = this.view.lookupReference("multiview").lookupReference("grid"),
            rec = grid.getSelectionModel().getSelection()[0];

        var newData = [];
        rec.tasks().each(function(t){
            newData.push(t.copy(null));
        });

        this.getViewModel().set('cbCache', newData);

        //console.log(this.getViewModel().get('cbCache'))
    },

    onActionRefresh: function(t, w){
        this.getStore("wips").reload();
    },

    onClearFilters: function(b){
        var me = this,
            topbar = me.view.lookupReference("multiview").lookupReference("topbar"),
            searchcombo = topbar.lookupReference('searchcombo'),
            searchfield = topbar.lookupReference('searchfield'),
            grid = me.view.lookupReference("multiview").lookupReference("grid");

        searchcombo.setValue('');
        searchcombo.getTrigger('clear').hide();

        searchfield.setValue('');
        searchfield.getTrigger('clear').hide();

        grid.filters.clearFilters();
    },

    onClearClick: function(g){
        var f = this.getView().down("grid"),
            h = f.getColumns();

        if(g.hasSearch){
            var e;
            Ext.each(h, function(a){
                e = a.filter;
                if(a.dataIndex===g.paramName){
                    return false;
                }
            });
            g.setValue("");
            e.setValue("");
            e.setActive(false);
            g.hasSearch = false;
            g.getTrigger("clear").hide();
            g.updateLayout();
        }
    },

    onSearchClick: function(h){
        /*
        var g = this.getView().down("grid"),
            i = g.getColumns(),
            j = h.getValue();

        if(!Ext.isEmpty(j)){
            var f;
            Ext.each(i, function(a){
                if(a.dataIndex === h.paramName){
                    f = a.filter;
                    return false
                }
            });
            //console.log("onSearchClick", f, h.paramName);
            f.setValue(j);
            f.setActive(true);
            h.hasSearch = true;
            h.getTrigger("clear").show();
            h.updateLayout()
        }
        */
    },

    onSelect: function(sm, rec, idx){

        var me = this,
            multiview = me.lookupReference('multiview'),
            cpogrid = multiview.lookupReference('cpogrid'),
            childStore = me.getViewModel().getStore('cpos');

        childStore.filter('parent_pono', rec.data.pono);
        this.redirectTo('wip/default/' + rec.get('powdId'));
    },

    onStatusChange: function(btn, aItem){
        var me = this,
            multiview = me.getView().lookupReference("multiview"),
            refs = multiview.getReferences(),
            grid = refs.grid;
            //filters = grid.getPlugin("gridfilters"),
            //columns = grid.getColumns(),
            //topbar = refs.topbar;

        /*
        var filter = Ext.create('Ext.util.Filter', {
            filterFn: function(item){
                return item.invQty > 0 && item.invDate != null
            }
        });

        if(aItem.type == null){
            //filters.clearFilters(false);
            grid.getStore().clearFilter();
        }
        else{
            grid.getStore().filter(filter);
            //y.setValue(aItem.type);
            //y.setActive(true);
        }
        */

        grid.getStore().reload({
            callback: function(){
                //console.log('status change')
            }
        });
    },

    onOpenPreviewRequestClick: function(){
        var win,
            view = this.getView(),
            layout = view.lookupReference('multiview'),
            grid = layout.lookupReference('grid'),
            rec = grid.getSelectionModel().selected.items[0];

        if (!win) {

            win = Ext.widget('windows-request-form', {
                width: 960,
                height: view.getHeight() - 80
                //maxHeight: 600
                //width: window.innerWidth * 0.8,
                //height: window.innerHeight * 0.8
            });

            //console.log(window.innerHeight)
            //win.loader.load();
            var request = "../PreviewRequestForm.aspx?CUTNO=" + rec.data.pono;
            win.html = '<iframe src="' + request + '" id="innerFrame" name="innerFrame" width="100%" height="100%" frameborder="0"></iframe>';
        }

        win.show(this, function () {
            //console.log('callback function from window show.');
        });
    },

    onExport: function(b){

        var me = this,
            multiview = me.lookupReference('multiview'),
            grid = multiview.lookupReference('grid');

        var filters = [];
        grid.store.getFilters().each(function(filter){
            filters.push(filter.serialize());
        });

        var sorts = [];
        grid.store.getSorters().each(function(sorter){
            sorts.push(sorter.serialize());
        });

        var headers = {};

        Ext.Array.each(grid.getHeaderContainer().getVisibleGridColumns(), function(column){
            headers[column.dataIndex] = column.text;
        });

        var params = {};

        if(!Ext.isEmpty(filters)){
            params["filters"] = Ext.JSON.encodeValue(filters);
        }

        if(!Ext.isEmpty(sorts)){
            params["sorts"] = Ext.JSON.encodeValue(sorts);
        }


        if(!Ext.isEmpty(headers)){
            params["headers"] = Ext.JSON.encode(headers);
        }

        var processMask = Ext.create('Ext.LoadMask', {
            msg: 'Processing... Please wait',
            target: this.getView()
        });

        //console.log(grid.getHeaderContainer().getVisibleGridColumns(), headers.toString());
        //location.href = '/api/Wips/Export/excel?' + Ext.Object.toQueryString({headers: headers.toString()}) + (!Ext.isEmpty(data) ? '&' + Ext.Object.toQueryString({filters: Ext.JSON.encodeValue(data)}) : '');
        processMask.show();

        Ext.Ajax.request({
            url: '/api/Wips/Export/excel',
            method: 'POST',
            timeout: 900000,
            binary: true,
            //Send the query as the message body
            //jsonData: Ext.JSON.encodeValue({headers: headers}),
            params: params,
            success: function (response, opts) {
                var result = Ext.decode(response.responseText);

                //console.log(response);
                /*
                Ext.DomHelper.append(document.body, {
                    tag: 'iframe',
                    frameBorder: 0,
                    width: 0,
                    height: 0,
                    src: result.data,
                    css: 'display:none;visibility:hidden;height:1px;'
                });
                */

                var myBlob =  new Blob([response.responseBytes] , {type:'application/vnd.ms-excel'});
                var url = window.URL.createObjectURL(myBlob);
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.href = url;
                a.download = "wip.xlsx";
                a.click();
                //adding some delay in removing the dynamically created link solved the problem in FireFox
                setTimeout(function() {window.URL.revokeObjectURL(url);},0);
                processMask.hide();
            }, //success
            failure: function (response, opts) {
                var msg = 'server-side failure with status code: ' + response.status + ' message: ' + response.statusText;
                Ext.Msg.alert('Error Message', msg);
            },
            callback: function(response, opts){
                processMask.hide();
            }
        });
    }

});
