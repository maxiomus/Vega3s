Ext.define('Vega.view.settings.company.users.List', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Vega.view.settings.company.users.ListModel',
        'Vega.view.settings.company.users.ListController',
        'Vega.view.settings.company.users.Window',
        'Ext.grid.plugin.Exporter'
    ],

    alias: 'widget.users-list',

    controller: 'users-list',
    viewModel: {
        type: 'users-list'
    },

    title: 'Users',

    border: false,
    // Create a session for this view
    session: true,
    //store: 'settings.user.Users',

    //stateful: true,
    //stateId: 'stateUserGrid',
    //stateEvents: [ 'columnmove' ],
    columnLines: false,

    bind:{
        store: "{users}"
    },

    columns: [
        {
            text: 'User Name', dataIndex: 'FullName', width: 140, locked: false,
            /*editor: {
                xtype: 'textfield',
                allowBlank: true
            },*/
            filter: {
                type: 'string'
            },
            renderer : function(value, meta, record) {
                return value;
            },
            summaryRenderer: function(value, summaryData, dataIndex) {
                return 'Total:';
            }
        },
        {
            text: 'ID', dataIndex: 'UserName', width: 140,
            summaryType: 'count',
            /*editor: {
                xtype: 'textfield',
                allowBlank: true
            },*/
            filter: {
                type: 'string'
            },
            renderer : function(value, meta, record) {
                return value;
            }
        },
        /*{
            text: 'Pass', dataIndex: 'Password', width: 120, hidden: false,
            /!*editor: {
                xtype: 'textfield',
                allowBlank: true
            },*!/
            renderer: function(value, meta, record) {
                return Vega.view.settings.users.List.renderTip(value, meta);
            }
        },*/
        {
            text: 'Email',
            dataIndex: 'Email',
            width: 240,
            /*editor: {
                xtype: 'textfield',
                allowBlank: true
            },*/
            renderer: function(value, meta, record) {
                //meta.tdAttr = 'data-qtip="' + value + '"';

                return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
            }
        },
        /*{
            text: 'Email Pass', dataIndex: 'EmailPass', width: 120, hidden: false,
            /!*editor: {
                xtype: 'textfield',
                allowBlank: true
            },*!/
            renderer: function(value, meta, record) {
                return Vega.view.settings.users.List.renderTip(value, meta);
            }
        },*/
        {
            text: 'Department',
            dataIndex: 'Department',
            width: 240
        },
        {
            text: 'Online',
            dataIndex: 'IsOnline', width: 120,
            renderer: function(value, meta, record) {
                return value;
            }
        },
        {
            text: 'Active',
            dataIndex: 'IsApproved', width: 120,
            renderer: function(value, meta, record) {
                if(!value){
                    meta.tdAttr = 'bgcolor="#ffe2e2"';
                    meta.tdStyle = 'color: #e44959;font-weight: bolder';
                }
                return value;
            }
        },
        {
            text: 'Lock Out',
            dataIndex: 'IsLockedOut', width: 120,
            renderer: function(value, meta, record) {
                return value;
            }
        },
        /*{
            text: 'AD User',
            dataIndex: 'IsADUser', width: 120,
            renderer: function(value, meta, record) {
                return Vega.view.settings.users.List.renderTip(value, meta);
            }
        },*/
        {
            xtype: 'datecolumn', text: 'Last Activity',
            dataIndex: 'LastActivityDate',
            format: 'm-d-Y'
        },
        {
            xtype: 'datecolumn', text: 'Last Login',
            dataIndex: 'LastLoginDate',
            format: 'm-d-Y'
        },
        {
            xtype: 'datecolumn', text: 'Create On',
            dataIndex: 'CreateDate',
            format: 'm-d-Y'
            /*
            renderer: function(value, meta, record) {
                if (value != undefined) {
                    var d = new Date(value);

                    function pad(n){return n<10 ? '0'+n : n}

                    var fvalue = pad(d.getUTCMonth()+1)+'-'
                        + pad(d.getUTCDate())+'-'
                        + d.getUTCFullYear();

                    //meta.tdAttr = 'data-qtip="' + fvalue + '"';
                    return fvalue;
                }
            }
            */
        },
        {
            xtype: 'actioncolumn',
            text: '<i class="x-fa fa-cog fa-lg blue-txt"></i>',
            width: 120,
            items: [{
                iconCls: 'x-fa fa-undo',
                tooltip: 'Reset User Password'
            },' ',{
                iconCls: 'x-fa fa-envelope-o',
                tooltip: 'Reset Email Password',
                handler: function(view, rowIndex, colIndex) {
                    //var store = grid.getStore();
                    //store.removeAt(rowIndex);
                    var rec = view.getStore().getAt(rowIndex);

                    console.log(rec);
                    var processMask = Ext.create('Ext.LoadMask', {
                        msg: 'Processing... Please wait',
                        target: view
                    });

                    //console.log(grid.getHeaderContainer().getVisibleGridColumns(), headers.toString());
                    //location.href = '/api/Wips/Export/excel?' + Ext.Object.toQueryString({headers: headers.toString()}) + (!Ext.isEmpty(data) ? '&' + Ext.Object.toQueryString({filters: Ext.JSON.encodeValue(data)}) : '');
                    processMask.show();

                    Ext.Ajax.request({
                        url: '/api/Email/' + rec.id,
                        method: 'PUT',
                        timeout: 900000,
                        jsonData: rec.data,
                        success: function (response, opts) {
                            var result = Ext.decode(response.responseText);

                            console.log(result);
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
            }]
        }
    ],

    listeners: {
        render: function() {
            //console.log('User render', this);
        },
        select:{
            fn: "onSelect"
        },
        itemcontextmenu: {
            fn: "onItemContextMenu"
        },
        itemdblclick: 'onActEdit',

        actnew: 'onActNew',
        actedit: 'onActEdit',
        actrefresh: 'onActRefresh',
        actdelete: 'onActDelete'
    },

    statics: {
        renderTip: function(value, meta) {
            //meta.tdCls = 'cell-icon';
            if (value != undefined) {
                meta.tdAttr = 'data-qtip="' + value + '"';
            }
            return value;
        },

        myRenderer: function(value, meta, record) {
            return value;
        }
    },

    initComponent: function() {
        //console.log(this);
        var me = this;

        me.actions = {
            actAdd: Ext.create('Ext.Action', {
                text: "Add User",
                tooltip: "Add a New User",
                ui: "default",
                //reference: 'new',
                iconCls: "x-fa fa-plus-circle",
                //glyph: 'xf044@FontAwesome',
                handler: function(item, e){
                    //console.log(this, item)
                    this.fireEvent("actnew", this, item);
                },
                scope: me
            }),

            actEdit: Ext.create('Ext.Action', {
                text: 'Edit User',
                tooltip: 'Edit Selected User',
                ui: 'default',
                //reference: 'edit',
                iconCls: 'x-fa fa-edit',
                handler: function(item, e){
                    this.fireEvent("actedit", this, item);
                },
                scope: me
            }),

            actDelete: Ext.create('Ext.Action', {
                text: "Delete User",
                tooltip: "Delete Selected User",
                ui: "default",
                //reference: 'delete',
                iconCls: "x-fa fa-minus-circle",
                //glyph: 'xf12d@FontAwesome',
                //disabled: true,
                handler: function(item, e){
                    this.fireEvent("actdelete", this, item);
                },
                scope: me
            }),

            actRefresh: Ext.create('Ext.Action', {
                text: "Refresh",
                tooltip: "Refresh",
                ui: "default",
                //reference: 'refresh',
                iconCls: "x-fa fa-refresh",
                //glyph: 'xf01e@FontAwesome',
                handler: function(item, e){
                    this.fireEvent("actrefresh", this, item);
                },
                scope: me
            }),

            actUnlock: Ext.create('Ext.Action', {
                text: 'Unlock',
                tooltip: 'Unlock User',
                ui: 'default',
                iconCls: 'x-fa fa-unlock',
                handler: 'onUnlockUser',
                scope: me.controller
            })
        },

        // inline buttons
        me.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                xtype: "gridsearchfield",
                width: 300,
                grid: me,
                paramName: "FullName"
            },
            me.actions.actRefresh,
            me.actions.actAdd,
            {
                text:'Save',
                action: 'save',
                tooltip:'Save current changes',
                glyph: 'xf0c7@FontAwesome',
                hidden: true
            },{
                text:'Sync',
                action: 'autosync',
                enableToggle: true,
                pressed: false,
                tooltip:'Synchronze',
                glyph: 'xf021@FontAwesome',
                hidden: true,
                toggleHandler: function(btn, pressed) {
                    //console.log(this);
                    this.up('grid').store.autoSync = pressed;
                }
            },{
                xtype: 'button',
                iconCls: 'x-fa fa-external-link-square',
                text: 'Export',
                handler: function(b){
                    me.saveDocumentAs({
                        type: 'excel',
                        title: 'User List',
                        fileName: 'user list ' + Ext.Date.format(new Date(), 'Y-m-d') + '.xlsx'
                    });
                }
            }]
        }],

        Ext.applyIf(me, {
            selModel: {
                //mode: 'MULTI',
                pruneRemoved: false
            },

            viewConfig: {
                stripeRows: true,
                plugins: {
                    ddGroup: 'user-group',
                    ptype: 'gridviewdragdrop',
                    enableDrop: true,
                    dragText: 'Drag and drop to reorganize'
                },
                listeners: {
                    render: function (view) {
                        view.tip = Ext.create('Ext.tip.ToolTip', {
                            // The overall target element.
                            target: view.el,
                            // Each grid row causes its own separate show and hide.
                            //delegate: view.itemSelector,
                            delegate: view.cellSelector,
                            // Moving within the row should not hide the tip.
                            trackMouse: true,
                            // Render immediately so that tip.body can be referenced prior to the first show.
                            renderTo: Ext.getBody(),
                            listeners: {
                                // Change content dynamically depending on which element triggered the show.
                                beforeshow: function updateTipBody(tip) {
                                    var trigger = tip.triggerElement,
                                        parent = tip.triggerElement.parentElement,
                                        columnTitle = view.getHeaderByCell(trigger).text,
                                        columnDataIndex = view.getHeaderByCell(trigger).dataIndex,
                                        columnText = view.getRecord(parent).get(columnDataIndex);

                                    if(!Ext.isEmpty(columnText)){

                                        tip.update(columnText);
                                    }
                                    else {
                                        return false;
                                    }

                                }
                            }
                        });
                    }
                }
            },

            plugins: [{
                ptype: "gridfilters"
            },{
                ptype: 'gridexporter'
            }],

            features: [
                {
                    ftype: 'summary',
                    dock: 'bottom'
                }
            ]
        });

        me.callParent(arguments);
        // setup the state provider, all state information will be saved to a cookie
        //Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                me.actions.actRefresh,
                me.actions.actEdit,
                me.actions.actDelete,
                me.actions.actUnlock
            ]
        });
    },

    onDestroy:function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    }
});
