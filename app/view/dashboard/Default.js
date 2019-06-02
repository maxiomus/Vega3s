
Ext.define("Vega.view.dashboard.Default",{
    extend: "Ext.container.Container",

    alias: 'widget.dashboard-default',

    requires: [
        "Vega.view.dashboard.DefaultController",
        "Vega.view.dashboard.DefaultModel",
        'Vega.view.dashboard.Pows',
        'Vega.view.dashboard.Weather',
        'Vega.view.dashboard.Favorite',
        'Ext.ux.model.calendar.Event',
        'Ext.ux.calendar.form.Add',
        'Ext.ux.calendar.form.Edit',
        'Ext.calendar.*'
    ],

    controller: "dashboard-default",
    viewModel: {
        type: "dashboard-default"
    },

    config: {
        activeState: null,
        defaultActiveState: 'default'
    },

    cls: 'shadow-panel',

    //margin: '0 0 0 4',
    //layout: 'responsivecolumn',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        //hide: 'onHideView'
        /**
         *
         * @param mv - monthview
         * @param ctx - context: event
         */
        beforeeventedit: 'onBeforeEventEdit',
        eventtap: 'onEventTap',
        select: 'onSelect'
    },

    initComponent: function(){
        var me = this,
            viewer = me.up('viewer');

        Date.prototype.stdTimezoneOffset = function() {
            var jan = new Date(this.getFullYear(), 0, 1);
            var jul = new Date(this.getFullYear(), 6, 1);
            return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        }

        Date.prototype.dst = function() {
            return this.getTimezoneOffset() < this.stdTimezoneOffset();
        }

        Ext.applyIf(me, {
            items: [{
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    align: 'middle'
                },
                //height: 120,
                cls: 'default-top',

                defaultType: 'component',
                //responsiveCls: 'big-100 small-100',
                items: [{
                    xtype: 'component',
                    cls: 'user-info',
                    flex: 1,
                    //height: 60,
                    //width: 300,
                    tpl: 'Good {greeting} <span class="blue-box">{name}</span>',
                    bind: {
                        data: {
                            greeting: '{greeting}',
                            name: '{currentUser.FirstName} {currentUser.LastName}'
                        }
                    }
                },{
                    width: 150,
                    cls: 'time-info',

                    tpl: [
                        '{today:date("l, F j, Y")}',
                        '<div style="background-color: #157fcc; color: #ffffff;"><i class="x-fa fa-clock-o white-txt"></i> {today:date("g:i a")}</div>'
                    ],

                    bind: {
                        data: {
                            today: '{today}'
                        }
                    },
                    listeners: {
                        render: 'onClockRender'
                    }
                },{
                    //width: 150,
                    cls: 'city-climate',

                    tpl: [
                        '<div class="thumb-wrap">',
                            '<div class="location">{name}, {sys.country}</div>',
                            '<tpl for="weather">',
                                '<tpl if="xindex === 1">',
                                '<div class="thumb">',
                                    '<img src="http://openweathermap.org/img/w/{icon}.png" alt="{description}">',
                                '</div>',
                                '</tpl>',
                            '</tpl>',
                            '<h2 style="width: 90px;">{main.temp:round} &#8457</h2>',
                            '<tpl for="weather">',
                                '<tpl if="xindex === 0">',
                                    '<div class="description">{description}</div>',
                                '</tpl>',
                            '</tpl>',
                        '</div>'
                    ],
                    bind: '{cityWeather}'
                }]
            },{
                xtype: 'dashboard',

                dockedItems: [{
                    xtype: 'toolbar',

                    items: [{
                        xtype: 'button',
                        iconCls: 'x-fa fa-cog',
                        text: 'Configure',
                        menu: [{
                            iconCls: 'x-fa fa-th',
                            text: 'Reset',
                            handler: 'onResetDashboardClick'
                        },{
                            text: "Add ",
                            iconCls: 'x-fa fa-plus',
                            menu: {
                                items:[{
                                    text: 'What\'s New',
                                    iconCls: 'x-fa fa-file',
                                    listeners: {
                                        click: {
                                            fn: 'onAddPartsClick',
                                            args: ['pows']
                                        }
                                    }
                                },{
                                    text: 'Weather',
                                    iconCls: 'x-fa fa-cloud',
                                    listeners: {
                                        click: {
                                            fn: 'onAddPartsClick',
                                            args: ['weather']
                                        }
                                    }
                                },{
                                    text: 'Events',
                                    iconCls: 'x-fa fa-calendar',
                                    listeners: {
                                        click: {
                                            fn: 'onAddPartsClick',
                                            args: ['calendar']
                                        }
                                    }
                                }]
                            }
                        }]
                    }]
                }],

                reference: 'dashboard',
                flex: 1,
                scrollable: 'y',

                columnWidths: [ 0.65, 0.35 ],

                stateful: true,
                stateId: 'dashboard-dashboard',

                parts: {
                    calendar: {
                        viewTemplate: {
                            layout: 'fit',
                            title: 'Bluprint Events',
                            closable: false,

                            style: {
                                borderRight: '0px'
                            },

                            items: [{
                                xtype: 'calendar',
                                reference: 'calendar',
                                createButton: null,

                                titleBar: {
                                    width: 200
                                },

                                sideBar: {
                                    bodyPadding: '0 0 0 3',
                                    width: 140
                                },

                                calendarList: {
                                    margin: '0 0 0 7'
                                },

                                //defaultView: 'month',
                                bind: {
                                    timezoneOffset: '{tzoffset}'
                                    //value: new Date(),
                                },

                                store: {
                                    //type: 'calendar-calendars',
                                    autoLoad: true,
                                    proxy: {
                                        type: 'ajax',
                                        url: '/api/Calendars',
                                        pageParam: '',
                                        startParam: '',
                                        limitParam: ''
                                    },
                                    eventStoreDefaults: {
                                        model: 'Ext.ux.model.calendar.Event',
                                        autoSync: true,
                                        proxy: {
                                            type: 'ajax',
                                            url: '/api/Events',
                                            actionMethods: {
                                                create: 'POST',
                                                read: 'GET',
                                                update: 'PUT',
                                                destroy: 'DELETE'
                                            },
                                            reader: {
                                                type: 'json',
                                                rootProperty: 'data'
                                            }
                                        }
                                    }
                                },

                                views: {
                                    month: {
                                        visibleDays: 6, // and displays it and the 5 days after
                                        firstDayOfWeek: 1,
                                        addForm: {
                                            xtype: 'ux-calendar-form-add',
                                            user: {
                                                name: Vega.user.get('Userid'),
                                                isManager: Vega.user.inRole('managers')
                                            }
                                        },
                                        editForm: {
                                            xtype: 'ux-calendar-form-edit',
                                            user: {
                                                name: Vega.user.get('Userid'),
                                                isManager: Vega.user.inRole('managers')
                                            }
                                        }
                                    },
                                    week: {
                                        visibleDays: 6,
                                        firstDayOfWeek: 1
                                    }
                                }
                            }]
                        }
                    },
                    pows: {
                        viewTemplate: {
                            title: "What's New",
                            layout: 'fit',
                            collapsible: false,
                            tools: [{
                                type: 'refresh',
                                callback: function(panel, tool, event){
                                    panel.down('dashboard-pows').getStore().load();
                                }
                            }],
                            items: [{
                                xtype: 'dashboard-pows'
                            }]
                        }
                    },
                    weather: {
                        viewTemplate: {
                            title: 'Weather in your cities',
                            layout: 'fit',
                            collapsible: false,
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
                    }
                },

                defaultContent: [{
                    type: 'calendar',
                    columnIndex: 0,
                    height: 734
                },{
                    type: 'pows',
                    columnIndex: 1,
                    height: 364
                },{
                    type: 'weather',
                    columnIndex: 1,
                    height: 364
                }]
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

            }
            /*
            {
                xtype: 'container',
                cls: 'dashboard',
                layout: 'responsivecolumn',
                flex: 1,
                scrollable: 'y',
                //title: 'Dashboard',
                //glyph: 72,
                //iconCls: 'x-fa fa-dashboard',
                style: {
                    background: '#ffffff'
                },

                items: this.buildTabs()
            }
            */]
        });

        me.callParent(arguments);

        var refs = this.lookupReference('calendar').getReferences(),
            monthView = refs.view.activeView;

        this.relayEvents(monthView, ["beforeeventedit", "eventtap", "select"]);
        //console.log(monthView, monthView.getEditForm(), monthView.getView());
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
    },
    */

    /*
    buildTabs: function(){
        return [{
            title: "Bluprint Events",
            responsiveCls: 'big-50 small-100',
            layout: 'fit',
            //padding: '0 6 4 0',
            collapsible: false,

            items: [{
                xtype: 'calendar',
                reference: 'calendar',
                height: 730,

                createButton: null,

                titleBar: {
                    width: 100
                },

                sideBar: {
                    bodyPadding: '0 0 0 3',
                    width: 140

                },

                calendarList: {
                    margin: '0 0 0 7'
                },

                //defaultView: 'month',
                bind: {
                    timezoneOffset: '{tzoffset}'
                    //value: new Date(),
                },

                store: {
                    //type: 'calendar-calendars',
                    autoLoad: true,
                    proxy: {
                        type: 'ajax',
                        url: '/api/Calendars',
                        pageParam: '',
                        startParam: '',
                        limitParam: ''
                    },
                    eventStoreDefaults: {
                        model: 'Ext.ux.model.calendar.Event',
                        autoSync: true,
                        proxy: {
                            type: 'ajax',
                            url: '/api/Events',
                            actionMethods: {
                                create: 'POST',
                                read: 'GET',
                                update: 'PUT',
                                destroy: 'DELETE'
                            },
                            reader: {
                                type: 'json',
                                rootProperty: 'data'
                            }
                        }
                    }
                },
                views: {
                    month: {
                        visibleDays: 6, // and displays it and the 5 days after
                        firstDayOfWeek: 1,
                        addForm: {
                            xtype: 'ux-calendar-form-add',
                            user: {
                                name: Vega.user.get('Userid'),
                                isManager: Vega.user.inRole('managers')
                            }
                        },
                        editForm: {
                            xtype: 'ux-calendar-form-edit',
                            user: {
                                name: Vega.user.get('Userid'),
                                isManager: Vega.user.inRole('managers')
                            }
                        }
                    },
                    week: {
                        visibleDays: 6,
                        firstDayOfWeek: 1
                    }
                },

                listeners: {

                }
            }]
        },
        {
            title: "What's New",
            responsiveCls: 'big-50 small-100',
            layout: 'fit',
            height: 365,
            collapsible: false,
            tools: [{
                type: 'refresh',
                callback: function(panel, tool, event){
                    panel.down('dashboard-pows').getStore().load();
                }
            }],
            items: [{
                xtype: 'dashboard-pows'
            }]
        },
        {
            title: 'Favorites',
            reference: 'dashboard-favorite',
            layout: 'fit',
            responsiveCls: 'big-66 small-100',
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
        },
        {
            title: 'Weather in your cities',
            reference: 'dashboard-weather',
            responsiveCls: 'big-50 small-100',
            layout: 'fit',
            height: 365,
            collapsible: false,
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
        }]
    }
    */
});
