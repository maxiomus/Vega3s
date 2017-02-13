Ext.define('Vega.view.dashboard.WeatherController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.dashboard-weather',

    init: function(view){

        //view.applyMyClimates = this.applyMyClimates.bind(this);
        //view.applyMyBookmarks = this.applyMyBookmarks.bind(this);

        //view.updateMyClimate = this.updateMyClimtes.bind(this);
        //view.updateMyBookmarks = this.updateMyBookmarks.bind(this);
        var vm = this.getViewModel(),
            rec = Ext.create('Vega.model.City', {
                id: 5368361,
                name: 'Los Angeles',
                country: 'US',
                coord: {"lon":-84.11908,"lat":34.421211}
            });

        vm.set('defaultClimates', rec.getId());

        this.getOptionsByUser('Climates', view, this.loadMyClimates, rec.getId());
    },

    /**
     *
     * @param category
     * @param scope
     * @param callbackFn
     * @param extraData
     */
    getOptionsByUser: function(category, scope, callbackFn, extraData){

        Ext.Ajax.request({
            url: '/api/UserOptions/' + category,
            method: 'GET',

            params: {
                //filters: Ext.encode([{type: 'string', value: record.get('UserName'), field: 'UserName'}])
                // When sending params with 'POST' method no need to encode...
                //username: username
            },
            success: function(response, options) {
                // set "safe mode" so we don't get hammered with giant Ext.Error

                var response = Ext.decode(response.responseText, true),
                    options = response.data;

                /*Ext.Object.each(options, function(key, value, myself){
                 console.log(key, value)
                 sessionStorage.setItem(key, value);
                 });*/

                var cities = [];
                Ext.each(options, function(item){
                    cities.push(item.DataValue);
                });

                sessionStorage.setItem(category, cities);

                console.log('getCityIdsByUser - success', cities);

                callbackFn.call(scope, cities, extraData);
            },
            failure: function(response, options){
                Ext.Msg.alert('Error', response);
            },
            callback: function(options, success, response) {
                var responseData = Ext.decode(response.responseText, true);
            }
        });

    },

    /*loadClimates: function(ids, scope, callbackFn, extraData){

     var proxy = this.getViewModel().getStore('climates').getProxy();

     //console.log('loadDetail', record.getId());
     Ext.data.JsonP.request({
     //url: Ext.urlAppend(proxy.url + '.' + proxy.format + encodeURIComponent('')),
     url: proxy.url + ids.toString(),
     extraParams: {
     //filters: Ext.encode([{type: 'string', value: record.get('UserName'), field: 'UserName'}])
     //UserName: record.get('UserName')
     },
     success: function(response, options) {
     // set "safe mode" so we don't get hammered with giant Ext.Error
     var responseData = Ext.decode(response.responseText, true);

     //console.log('server data', responseText);
     // call callback method
     callbackFn.call( scope, record, extraData );
     },
     callback: function( options, success, response ) {

     }
     });
     },*/

    loadMyClimates: function(cities, extraData) {
        var me = this;
        console.log('callback - loadMyClimate', this, cities);

        me.setMyClimates(!Ext.isEmpty(cities) ? cities : extraData);

        console.log(me.getViewModel());
        var store = me.getViewModel().getStore('climates');

        Ext.TaskManager.start({
            run: function(){
                store.load();
            },
            interval: 600000,
            args: [
                store
            ]
        });
        //var store = this.getViewModel().getStore('climates');
        //store.load();
    },

    onAfterRender: function(panel){
        //console.log('Weather - afterrender', panel, panel.ownerCt);
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

        var climates = this.getView().getMyClimates();
        var recordIds = [];

        /*Ext.each(climates, function(rec){
         recordIds.push(rec.getId());
         });*/
        console.log('WeatherController - onBeforeStoreLoad', climates);
        store.getProxy().setExtraParams({id:climates.toString()});
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

        Ext.Msg.show({
            title: 'Remove City',
            message: 'Do you really want to remove this city?',
            buttons: Ext.Msg.YESNOCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn){
                if(btn === 'yes'){

                    var climateOption = Ext.create('Vega.model.UserOption', {
                        DataValue: record.data.id,
                        Description: record.data.name + ',' + record.data.sys.country
                    });

                    var proxy = climateOption.getProxy();
                    proxy.setUrl(proxy.url + '/Climates');

                    //tells the Proxy to destroy the Model. Performs a DELETE request to /users/123
                    climateOption.erase({
                        success: function(){
                            var cities = [];
                            record.store.remove(record);
                            record.store.each(function(rec){
                                cities.push(rec.data.id);
                            });

                            me.view.setMyClimates(cities);
                        }
                    });
                }
                else if(btn === 'no'){

                }
                else {

                }
            }
        })
    },

    onToolAddClick: function(view, tool){
        //console.log(view, view.getViewModel());
        var me = this,
            cities = me.getViewModel().getStore('cities'),
            climates = me.getViewModel().getStore('climates');

        var window = Ext.widget('window', {
            title: 'Add City',
            iconCls: 'fa fa-cloud',
            //glyph: 79,
            width: 500,
            plain: true,
            modal: true,
            animateTarget: tool.el,

            items: [{
                xtype: 'form',
                bodyPadding: '12 10 10',
                border: false,
                url: '/api/UserOptions/Climates',
                method: 'POST',
                items: [{
                    xtype: 'hidden',
                    name: 'city',
                    bind: '{selected.name},{selected.country}'
                },{
                    anchor: '100%',
                    fieldLabel: 'Select the City',
                    labelAlign: 'top',
                    msgTarget: 'under',
                    xtype: 'combo',
                    name: 'cityId',
                    reference: 'cboCities',
                    store: cities,
                    bind: {
                        //store: '{cities}',
                        selection: '{selected}'
                    },
                    pageSize: 25,
                    valueField: 'id',
                    queryParam: 'filter',
                    queryMode: 'remote',
                    tpl: Ext.create('Ext.XTemplate',
                        '<ul class="x-list-plain">',
                        '<tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{name}, {country}</li>',
                        '</tpl>',
                        '</ul>'
                    ),
                    displayTpl: Ext.create('Ext.XTemplate',
                        '<tpl for=".">',
                            '{name}, {country}',
                        '</tpl>'
                    )
                }]
            }],

            buttons: [{
                text: 'Add City',
                handler: function(){
                    // The getForm() method returns the Ext.form.Basic instance:
                    var window = this.up('window'),
                        form = window.down('form').getForm();

                    if(form.isValid()){
                        console.log(form.getValues().cityId);
                        // Submit the Ajax request and handler the response

                        Vega.model.weather.Climate.load(form.getValues().cityId, {
                            success: function(record, operation){
                                var cities = [];
                                climates.add(record);
                                climates.each(function(record){
                                    cities.push(record.data.id);
                                });

                                me.view.setMyClimates(cities);
                                //console.log('Add City', me.view.getMyClimates(), cities);
                                form.submit({
                                    success: function(form, action){

                                        window.close();
                                        //Ext.Msg.alert('Success', action.result.message);
                                    },
                                    failure: function(form, action){
                                        Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                                    }
                                });
                            },
                            failure: function(record, operation){

                            },
                            callback: function(){

                            }
                        });
                    }
                }
            }, {
                text: 'Cancel',
                listeners: {
                    click: function(btn){
                        btn.up('window').close();
                    }
                }
            }]
        });

        window.show();
    },

    onToolRefreshClick: function(event, toolEl, panelHeader){
        var view = this.getView().down('dashboard-weather');
        view.store.load();
    },

    addClimate: function(cityId){

    },

    removeClimate: function(){

    }
});
