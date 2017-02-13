
Ext.define("Vega.view.dashboard.Dashboard",{
    extend: "Ext.container.Container",

    //alias: 'widget.dashboard',

    requires: [
        "Vega.view.dashboard.DashboardController",
        "Vega.view.dashboard.DashboardModel",
        'Vega.view.dashboard.Pows',
        'Vega.view.dashboard.Weather',
        'Vega.view.dashboard.Favorite'
    ],

    controller: "dashboard",
    viewModel: {
        type: "dashboard"
    },

    config: {
        //weatherView: null,
        //favoriteView: null,

        activeState: null,
        defaultActiveState: 'default'
    },

    cls: 'shadow-panel',
    margin: 8,
    //layout: 'responsivecolumn',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        //hide: 'onHideView'
    },

    items: [{
        xtype: 'panel',
        bodyPadding: 5,
        height: 80,
        //responsiveCls: 'big-100 small-100',
        bodyStyle: {
            fontFamily: 'Century Gothic,CenturyGothic,AppleGothic,sans-serif',
            fontSize: '22px',
            fontStyle: 'normal',
            fontVariant: 'normal',
            fontWeight: 400,
            lineHeight: '20px'
        },

        bodyPadding: 20,

        bind: {
            html: 'Good {greeting}! {currentUser.FirstName} {currentUser.LastName}'
        }
    },{
        xtype: 'container',
        cls: 'dashboard',
        layout: 'responsivecolumn',
        flex: 1,
        scrollable: 'y',
        //title: 'Dashboard',
        //glyph: 72,
        //iconCls: 'fa fa-dashboard',
        style: {
            background: '#ffffff'
        },

        defaults: {
            frame: true,
            height: 320
        },

        items: [{
            title: "What's New",
            responsiveCls: 'big-33 small-100',
            layout: 'fit',
            collapsible: false,
            closable: true,
            tools: [{
                type: 'refresh',
                callback: function(panel, tool, event){
                    panel.down('dashboard-pows').getStore().load();
                }
            }],
            items: [{
                xtype: 'dashboard-pows'
            }]
        },{
            title: 'Favorites',
            reference: 'dashboard-favorite',
            layout: 'fit',
            responsiveCls: 'big-33 small-100',
            collapsible: false,
            closable: false,
            tools: [{
                type: 'refresh',
                callback: function(panel, tool, event){
                    panel.down('dashboard-favorite').getStore().load();
                }
            }],
            items: [{
                xtype: 'dashboard-favorite'
            }]
        },{
            title: 'Weather in your cities',
            reference: 'dashboard-weather',
            layout: 'fit',
            responsiveCls: 'big-33 small-100',
            collapsible: false,
            closable: false,
            tools: [{
                type: 'plus',
                callback: function(panel, tool, event){
                    var dashboard = panel.up('dashboard'),
                        dataview = panel.down('dashboard-weather');
                    dataview.fireEvent('tooladdclick', dataview, tool);
                }
            },{
                type: 'refresh',
                itemId: 'weatherToolRefresh',
                callback: function(panel, tool, event){
                    panel.down('dashboard-weather').getStore().load();
                }
            }],
            items: [{
                xtype: 'dashboard-weather'
            }]
        },{
            title: "TODO List",
            layout: 'fit',
            responsiveCls: 'big-33 small-100',
            collapsible: false,
            closable: true,
            tools: [{
                type: 'plus'
            },{
                type: 'minus'
            },{
                type: 'refresh'
            }],
            html: "<p></p>"
        }],

        /*
        // Dashboard Part Configuration...
        parts: {
            weather: {
                viewTemplate: {
                    title: 'Weather in your cities',
                    reference: 'dashboard-weather',
                    responsiveCls: 'big-33 small-100',
                    collapsible: false,
                    closable: false,
                    tools: [{
                        type: 'plus',
                        callback: function(panel, tool, event){
                            var dashboard = panel.up('dashboard'),
                                dataview = panel.down('dashboard-weather');
                            dataview.fireEvent('tooladdclick', dataview, tool);
                        }
                    },{
                        type: 'refresh',
                        itemId: 'weatherToolRefresh',
                        callback: function(panel, tool, event){
                            panel.down('dashboard-weather').getStore().load();
                        }
                    }],
                    items: [{
                        xtype: 'dashboard-weather'
                    }]
                }
            },
            favorite: {
                viewTemplate: {
                    title: 'Bookmarks',
                    reference: 'dashboard-favorite',
                    responsiveCls: 'big-33 small-100',
                    collapsible: false,
                    closable: false,
                    tools: [{
                        type: 'refresh',
                        callback: function(panel, tool, event){
                            panel.down('dashboard-favorite').getStore().load();
                        }
                    }],
                    items: [{
                        xtype: 'dashboard-favorite'
                    }]
                }
            },
            new: {
                viewTemplate: {
                    title: "What's New",
                    responsiveCls: 'big-33 small-100',
                    collapsible: false,
                    closable: true,
                    tools: [{
                        type: 'refresh'
                    }],
                    html: "<p>Today's New P.O.W</p>"
                }
            },
            todo: {
                viewTemplate: {
                    title: "TODO List",
                    responsiveCls: 'big-33 small-100',
                    collapsible: false,
                    closable: true,
                    tools: [{
                        type: 'plus'
                    },{
                        type: 'minus'
                    },{
                        type: 'refresh'
                    }],
                    html: "<p></p>"
                }
            }
        },

        //columnWidths: [ 0.35, 0.35, 0.30 ],

        defaultContent:[{
            type: 'new',
            columnIndex: 0,
            height: 320
        },{
            type: 'favorite',
            columnIndex: 1,
            height: 320
        },{
            type: 'todo',
            columnIndex: 2,
            height: 320
        },{
            type: 'weather',
            columnIndex: 1,
            height: 320
        }],
        */

        listeners: {
            //tooladdclick: 'onToolAddClick'
        }
    }],

    initComponent: function(){
        var me = this,
            viewer = me.up('viewer');

        Ext.applyIf(me, {

        });

        // Insert a component...
        /*bar.insert(1, {
            xtype: 'splitbutton',
            text: 'Add',
            //glyphs: '',
            iconCls: 'fa fa-plus-square fa-inverse',
            menu: [{
                text: 'Weathers'
            }, {
                text: 'Favorites'
            }, {
                text: "What's New"
            }],
            handler: function(){

            }
        });*/

        //console.log(viewer);
        me.callParent(arguments);

        //this.relayEvents(this.weatherView, ['tooladdclick']);
        //this.relayEvents(this.favoriteView, ['toolremoveclick'])
    }

    /*
    buildTopBar: function() {
        return [{
            xtype: 'toolbar',
            dock: 'top',
            layout: {
                overflowHandler: 'Menu'
            },
            items: [{
                xtype: 'combo',
                pageSize: 25,
                bind: {
                    store: '{cities}'
                },
                displayField: 'name',
                typeAhead: true,
                hideLabel: true,
                hideTrigger:true
            }]
        }]
    },

    addCity: function(event, toolEl, panelHeader){
        console.log(this, panelHeader);
        this.fireEvent('tooladdclick', this, toolEl);
    },

    refreshCity: function(){
        this.fireEvent('toolrefreshclick', this, toolEl);
    }
    */
});
