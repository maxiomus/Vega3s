/**
 * Created by tech on 9/8/2015.
 */

Ext.define('Ext.app.route.Base', {
    extend: 'Ext.app.route.Mixin',

    requires: [
        //'Ext.ux.FileDownload'
    ],

    mixinConfig: {
        id: 'base',
        after: {
            initViewModel: 'afterInitViewModel'
        }
    },

    afterInitViewModel: function(viewModel){
        var me = this;
        //console.log('afterInitViewModel', viewModel);
        //viewModel.bind('{tab}', me.onTabChange, me)
    },

    onBeforeTabChange: function(tabs, newTab, oldTab){

        if(oldTab != null && oldTab.isXType("form")){
            //console.log(newTab, oldTab)
            //return false;
        }
    },

    onTabChange: function(tabpanel, newTab, oldTab, eOpts){
        //console.log('Base - onTabChange', tabpanel, newTab);
        this.redirectTo(this.getTabRoute(tabpanel, newTab));
        //var route = this.getTabRoute(tabpanel, newTab);
        //this.changeRoute(this, route);
    },

    changeRoute: function (controller, route) {
        //console.log('Base - changeRoute', route);
        if (route.substring(0, 1) !== '!') {
            route = '!' + route;
        }

        this.redirectTo(route);
    },

    /*getTabRoute: function(main, tab){

        var route = tab.reference;

        if(tab.xtype != 'viewer') {
            var route = tab.xtype;

            if (tab.getActiveState) {
                route += '/' + (tab.getActiveState() || tab.getDefaultActiveState());
            }

        }

        console.log('Base - getTabRoute', route);
        return route;
    },*/

    /*createHash: function(tab, id){
        var hash = Ext.util.History.getToken(),
            ha = hash ? hash.split('/') : [],
            tab = tab && tab.reference ? tab.getReference() : tab,
            id = id && id.getId ? id.getId() : id;

        ha[0] = tab ? '!' + tab : (ha[0] ? ha[0] : Vega.app.getDefaultToken());

        if(id){
            ha[1] = id;
        }

        console.log('createHash', id, hash, ha);
        return ha.join('/');
    },*/
    getTabRoute:function(view, tab){
        var route = [];
            route[0] = view.routeId;

        if(tab){
            //console.log('Base', tab.getXType());
            var tvm = tab.getViewModel();

            if(tab.isXType("multiview")){
                var mode = "",
                    ctn = tab.lookupReference("center"),
                    grid = ctn.getLayout().getActiveItem(),
                    index = ctn.getLayout().getActiveIndex();

                switch(index){
                    case 0:
                        mode = "default";
                        break;
                    case 1:
                        mode = "medium";
                        break;
                    case 2:
                        mode = "tiles";
                        break
                }

                route[1] = mode;

                var xtypes = ['grid', 'gridpanel', 'dataview'];
                //console.log(grid, grid.getXType(), grid.superclass.getXType())
                if(xtypes.indexOf(grid.superclass.getXType()) == -1) {
                    if(xtypes.indexOf(grid.getXType()) == -1){
                        grid = grid.down();
                    }
                }
                //console.log(grid, grid.getXType())
                if(grid && grid.getSelectionModel().getSelection().length > 0){
                    var p = grid.getSelectionModel().getSelection();

                    route[2] = p[0].id;
                }

                //console.log('getTabRoute - multiview', p);
            }
            else if (tab.isXType("sales-edit-form")){
                route[1] = tab.opMode;

                if(tvm.get('srcPowhId') != null){
                    route[2] = tvm.get('srcPowhId');
                }

            }
            else if (tab.isXType("style-edit-form")){
                route[1] = tab.opMode;

                if(tvm.get('theSample').id > 0) {
                    route[2] = tvm.get('theSample').id;
                }
                else {
                    if(tab.opMode == 'import'){
                        if(tvm.get('srcId') != null){
                            route[2] = tvm.get('srcId');
                        }
                    }
                }

            }
            else if (tab.isXType("pi-form")){
                route[1] = tab.opMode;
                if(tvm.get('thePhysical').id > 0) {
                    route[2] = tvm.get('thePhysical').id;
                }
            }
            else if(tab.inTab){
                route[1] = "tab";
                if(tab.active) {
                    route[2] = tab.active.id;
                }
                else {
                    route[2] = tab.reference;
                }
            }
        }

        return route.join("/");
    },

    /*getTabRoute: function(view, tab){
        var route = [], idx,
            view = view && view.reference ? view : tab,
            //main = view.items.first(),
            active = view.activeTab;
            //ha = route ? route.split('/') : [],
            //id = id && id.getId ? id.getId() : id;

        switch(view.reference){
            case 'notice':
                idx = 'ArticleID';
                break;
            case 'pow':
                idx = 'PID';
                break;
            case 'dal':
                idx = 'ID';
                break;
        }

        route[0] = view.reference;

        if(active){

            if(active.grid){
                //console.log(active.down('container[region=center]').getLayout().getActiveIndex());
                var mode,
                    index = active.down('container[region=center]').getLayout().getActiveIndex();

                switch (index){
                    case 0:
                        mode = 'default';
                        break;
                    case 1:
                        mode = 'medium';
                        break;
                    case 2:
                        mode = 'tiles'
                        break;
                }
                route[1] = mode;
            }

            if(active.grid && active.grid.getSelectionModel().getSelection().length > 0){
                var selected = active.grid.getSelectionModel().getSelection();
                route[2] = selected[0].get(idx);
            }

            if(active.inTab){
                route[1] = 'tab';
                route[2] = active.active.get(idx);
            }
        }

        return '!' + route.join('/');
    },*/

    addBookmark: function(record, scope, extraData){
        var xf = Ext.util.Format,
            hash = Ext.util.History.getToken();

        var bookmark = Ext.create('Vega.model.Bookmark', {
            //Module: xf.uppercase(hash.split('/')[0].replace('#', '')),
            //Title: record.data.Title,
            //Location: hash
        });
        /*
        store.add(bookmark);
        store.sync({
            success: function(){

            }
        });*/

        var fieldname = record.getIdProperty();
        console.log(record.getFields())
        Ext.Ajax.request({
            //url: Ext.urlAppend(proxy.url + '.' + proxy.format + encodeURIComponent('')),
            url: '/api/Bookmarks',
            method: 'POST',
            params: {
                //filters: Ext.encode([{type: 'string', value: record.get('UserName'), field: 'UserName'}])
                UserName: Vega.user.data.Userid,
                Title: record.data.Title || record.data.powno,
                Module: xf.uppercase(hash.split('/')[0].replace('!', '')),
                Location: xf.capitalize(hash.split('/')[1]),
                Link: hash
            },
            success: function(response, options) {
                // set "safe mode" so we don't get hammered with giant Ext.Error
                var responseData = Ext.decode(response.responseText, true);
                //console.log(record);
                var bookmarkStore = Ext.StoreManager.lookup('bookmarks');
                if (bookmarkStore){
                    bookmarkStore.load();
                }

                Ext.Msg.alert('Bookmark', 'Bookmark has been successfully added!');
                //record.set(responseData);
                // call callback method
                //callbackFn.call(scope, record, extraData);
            },
            failure: function(response, options){

            },
            callback: function( options, success, response ) {

            }
        });
    },

    /**
     * Common way to retrieve full data record from the server before performing another action
     * @param {Ext.data.Record} record
     * @param {String} scope
     * @param {Function} callbackFn
     * @param {Object} extraData
     */
    loadDetail: function(record, scope, callbackFn, extraData) {
        // first, reject any changes currently in the store so we don't build up an array of records to save by viewing the records
        record.store.rejectChanges();
        // make request for detail record

        var proxy = record.store.getProxy();

        //console.log('loadDetail', record.getId());
        Ext.Ajax.request({
            //url: Ext.urlAppend(proxy.url + '.' + proxy.format + encodeURIComponent('')),
            url: Ext.String.urlAppend(proxy.url + '/' + encodeURIComponent(record.getId())),
            method: 'GET',
            params: {
                //filters: Ext.encode([{type: 'string', value: record.get('UserName'), field: 'UserName'}])
                //UserName: record.get('UserName')
            },
            success: function(response, options) {
                // set "safe mode" so we don't get hammered with giant Ext.Error
                var responseData = Ext.decode(response.responseText, true);

                //console.log('server data', responseText);
                record.set(responseData);
                // call callback method
                callbackFn.call(scope, record, extraData);
            },
            callback: function( options, success, response ) {

            }
        });
    },

    /**
     * Common way to retrieve full data record from the server before performing another action
     * @param {Ext.data.Model[]} selected
     */
    downloadItems: function(selected) {
        // make request for download files...
        var recordIds = [];

        Ext.each(selected, function(rec){
            recordIds.push(rec.getId());
        });

        //console.log('downloadItems', recordIds);

        location.href = '/api/FileStreams/download?' + Ext.Object.toQueryString({ids: recordIds});

        // No need to use Ajax request for download files...
        /*Ext.Ajax.request({
            //url: '/api/Files/download',
            url: '/WebService.asmx/downloadFiles',
            method: 'GET',

            params: {
                //filters: Ext.encode([{type: 'string', value: record.get('UserName'), field: 'UserName'}])
                // When sending params with 'POST' method no need to encode...
                items: Ext.encode(recordIds)
            },
            success: function(response, options) {
                // set "safe mode" so we don't get hammered with giant Ext.Error
                var responseData = Ext.decode(response.responseText, true);

            },
            failure: function(response, options){
                Ext.Msg.alert('Error', response);
            },
            callback: function(options, success, response) {

            }
        });*/

    }
});
