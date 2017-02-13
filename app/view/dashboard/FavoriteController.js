Ext.define('Vega.view.dashboard.FavoriteController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dashboard-favorite',

    init: function(view) {

    },

    /**
     * Listen for the store loading
     * @private
     *
     * @param store
     * @param records
     * @param success
     */
    onBeforeLoad: function(store, operation, eOpts){

        /**
         * remember selection...
         */
        //this.view.grid.setCurrentPost(this.view.grid.getSelectionModel().getSelection());

        //var climates = this.getView().down('home-weather').getMyClimates();
        var recordIds = [];

        /*Ext.each(climates, function(rec){
         recordIds.push(rec.getId());
         });*/
        console.log('FavoriteController - onBeforeStoreLoad', Vega.user);
        store.getProxy().setExtraParams({username:Vega.user.data.Userid});
    },

    /**
     * Listen for the store loading
     * @private
     *
     * @param store
     * @param records
     * @param success
     */
    onLoad: function(store, records, success){
        /*
         var grid = this.getView(),
         store = this.getStore('notices');

         //var searchfield = grid.down('toolbar > searchfield')[0];

         if (store.getCount() && grid.getSelectionModel().hasSelection()) {
         grid.getSelectionModel().select(records[0]);
         }
         */
    },

    onAfterRender: function(panel){

    },

    onItemClick: function(view, record, item, index, e){
        this.redirectTo(record.get('Link'));
    },

    /**
     *  Open the context menu
     * @param view
     * @param rec
     * @param item
     * @param index
     * @param event
     */
    onItemContextMenu: function(view, rec, item, index, event){
        event.stopEvent();

        var sm = view.getSelectionModel();
        if(!sm.isSelected(index)){
            sm.select(index);
        }

        this.view.contextmenu.showAt(event.getXY());
    },

    onContextMenuAddClick: function(record, item){
        console.log(record);
    },

    onContextMenuRefreshClick: function(record, item){
        console.log(record);
        record.store.load();
    },

    onContextMenuRemoveClick: function(record, item){
        var me = this;

        //this.loadDetail(record, this, this.showWindow(record));
        Ext.Msg.show({
            title: 'Remove Bookmark',
            message: 'Do you really want to remove this bookmark?',
            buttons: Ext.Msg.YESNOCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn){
                if(btn === 'yes'){
                    console.log(record);

                    //tells the Proxy to destroy the Model. Performs a DELETE request to /users/123
                    record.store.remove(record);
                    record.store.sync();

                }
                else if(btn === 'no'){

                }
                else {

                }
            }
        })

    },

    /**
     *
     * @param username
     * @param scope
     * @param callbackFn
     * @param extraData
     */
    getBookmarkByUser: function(username, scope, callbackFn, extraData) {

        Ext.Ajax.request({
            url: '/api/Bookmarks',
            method: 'GET',

            params: {
                //filters: Ext.encode([{type: 'string', value: record.get('UserName'), field: 'UserName'}])
                // When sending params with 'POST' method no need to encode...
                username: username
            },
            success: function(response, options) {
                // set "safe mode" so we don't get hammered with giant Ext.Error
                var response = Ext.decode(response.responseText, true);

                /*Ext.Object.each(options, function(key, value, myself){
                 console.log(key, value)
                 sessionStorage.setItem(key, value);
                 });*/

                var bookmarks = [];
                Ext.each(response.data, function(item){
                    bookmarks.push(item.Location);
                });

                console.log('getBookmarkByUser - success', bookmarks);
                callbackFn.call(scope, bookmarks, extraData);
            },
            failure: function(response, options){
                Ext.Msg.alert('Error', response);
            },
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText, true);
            }
        });

    }
    
});
