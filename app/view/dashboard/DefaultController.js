Ext.define('Vega.view.dashboard.DefaultController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.dashboard-default',

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

        Ext.TaskManager.start({
            run: function(){
                Vega.model.weather.Climate.load(5327298, {
                    success: function(rec, op){
                        vm.set('cityWeather', rec);
                    }
                })
            },
            interval: 300000
        });

        //console.log(vm)
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

        vm.set('currentUser', Vega.user);
        vm.set('greeting', greet);

    },

    initViewModel: function(viewModel){
        this.fireEvent('viewmodelready', this, viewModel);
    },

    updateActiveState: function (activeState) {
        var viewModel = this.getViewModel();

        //viewModel.set('company', activeState);

        this.fireEvent('changeroute', this, 'dashboard/' + activeState);
    },

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

    onEventTap: function(monthview, event){
        //console.log('eventtap', event.hasOwnProperty('data'), monthview.getEditForm());
    },

    onBeforeEventEdit: function(monthview, event){
        //console.log('beforeeventedit', event)
    },

    onSelect: function(monthview, ctx){
        //console.log('select', ctx)
    },

    onClockRender: function(c){
        var runner = new Ext.util.TaskRunner(), task;

        task = runner.start({
            run: function(){
                c.update({
                    today: new Date()
                })
            },
            interval: 60000
        });
    },

    onAddPartsClick:function(op, b, e){
        var me = this,
            dash = me.lookup('dashboard');

        //Ext.state.Manager.clear('dashboard-dashboard');

        var found = false, cType, cHeight;
        dash.query('dashboard-column').forEach(function(col){
            col.items.getRange().forEach(function(item){
                if(item.part.config.id == op){
                    found = true;
                }
            })
        });

        if(!found){
            dash.addView({
                type: op,
                height: 364
            }, 1);
        }
    },

    onResetDashboardClick: function(b){
        var me = this,
            dash = me.lookup('dashboard');

        Ext.state.Manager.clear('dashboard-dashboard');

        Ext.Msg.alert('Status', 'Changes saved successfully');

        //console.log(dash.getPart('pows'), dash.query('dashboard-column'));
    }
});
