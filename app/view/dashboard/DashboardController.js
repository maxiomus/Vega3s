Ext.define('Vega.view.dashboard.DashboardController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.dashboard',

    requires: [
        'Vega.model.City'
    ],

    mixins: [
        'Ext.app.route.Base'
    ],

    init: function (view) {
        // We provide the updater for the activeState config of our View.
        //view.updateActiveState = this.updateActiveState.bind(this);

        //view.down('home-weather').setMyClimates('5368361,5128581');

        var vm = this.getViewModel();
        vm.set('currentUser', Vega.user);

        var greet, hour = new Date().getHours();
        if(hour >= 5 && hour < 12){
            greet = 'Morning'
        }
        else if (hour >= 12 && hour < 17){
            greet = 'Afternoon'
        }
        else if (hour >= 17 && hour < 20){
            greet = 'Evening'
        }
        else {
            greet = 'Night'
        }
        vm.set('greeting',  greet);
    },

    initViewModel: function(viewModel){
        this.fireEvent('viewmodelready', this, viewModel);
    },

    updateActiveState: function (activeState) {
        var viewModel = this.getViewModel();

        //viewModel.set('company', activeState);

        this.fireEvent('changeroute', this, 'dashboard/' + activeState);
    }

    /*
    loadMyBookmarks: function(bookmarks){
        if(bookmarks == null){
            Ext.Ajax.request({
                url: '/api/UserOptions/bookmarks',
                method: 'GET',

                params: {
                    //filters: Ext.encode([{type: 'string', value: record.get('UserName'), field: 'UserName'}])
                    // When sending params with 'POST' method no need to encode...
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
            });
        }
        else {
            return bookmarks;
        }
    }
    */
    
});
