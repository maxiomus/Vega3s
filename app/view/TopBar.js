Ext.define('Vega.view.TopBar', {
    extend: 'Ext.toolbar.Toolbar',

    requires: [
        'Vega.view.TopBarController',
        'Vega.view.TopBarModel'
    ],

    alias: 'widget.topbar',

    controller: "topbar",
    viewModel: {
        type: "topbar"
    },

    width: "100%",
    enableOverflow: true,

    initComponent: function(c){
        var me = this;

        me.actClear = Ext.create('Ext.Action', {
            tooltip: 'Clear All Filters',
            ui: 'bootstrap-btn-default',
            reference: 'clear',
            cls: 'delete-focus-bg',
            iconCls: 'fa fa-filter-clear',
            hidden: true,
            handler: function(a){
                this.fireEvent('clearall',this,a);
            },
            scope: this
        }),
        me.actNew = Ext.create('Ext.Action', {
            text: "New",
            tooltip: "New",
            ui: "default",
            //reference: 'new',
            iconCls: "x-fa fa-plus-circle",
            hidden: true,
            handler: function(item, e){
                this.fireEvent("actnew", this, item);
            },
            scope: this
        }),
        me.actEdit = Ext.create('Ext.Action', {
            text: 'Edit',
            tooltip: 'Edit',
            ui: 'default',
            //reference: 'edit',
            iconCls: 'x-fa fa-edit',
            hidden: true,
            handler: function(item, e){
                this.fireEvent("actedit", this, item);
            },
            scope: this
        }),
        me.actDelete = Ext.create('Ext.Action', {
            text: "Delete",
            tooltip: "Delete",
            ui: "default",
            //reference: 'delete',
            iconCls: "x-fa fa-minus-circle",
            hidden: true,
            //disabled: true,
            handler: function(item, e){
                this.fireEvent("actdelete", this, item);
            },
            scope: this
        }),
        me.actSave = Ext.create('Ext.Action', {
            text: "Save",
            tooltip: "Save",
            ui: "default",
            //reference: 'save',
            iconCls: "x-fa fa-save",
            hidden: true,
            handler: function(item, e){
                this.fireEvent("actsave", this, item);
            },
            scope: this
        }),
        me.actRefresh = Ext.create('Ext.Action', {
            text: "Refresh",
            tooltip: "Refresh",
            ui: "default",
            //reference: 'refresh',
            iconCls: "x-fa fa-refresh",
            hidden: false,
            handler: function(item, e){
                this.fireEvent("actrefresh", this, item);
            },
            scope: this
        }),
        me.actView = Ext.create('Ext.Action', {
            text: 'View',
            tooltop: 'View',
            iconCls: 'x-fa fa-file-o',
            handler: function(item, e){
                this.fireEvent("actview", this, item);
            },
            scope: this
        }),
        me.actCopy = Ext.create('Ext.Action', {
            text: 'Copy',
            tooltip: 'Copy',
            ui: 'default',
            //reference: 'edit',
            hidden: true,
            iconCls: 'x-fa fa-copy',
            handler: function(item, e){
                this.fireEvent("actcopy", this, item);
            },
            scope: this
        }),
        me.actComplete = Ext.create('Ext.Action', {
            text: "Mark Complete",
            tooltip: "Mark Complete",
            ui: "default",
            //reference: 'refresh',
            iconCls: "x-fa fa-check-square-o",
            hidden: true,
            handler: function(item, e){
                this.fireEvent("actcomplete", this, item);
            },
            scope: this
        }),
        me.actActive = Ext.create('Ext.Action', {
            text: "Mark Active",
            tooltip: "Mark Active",
            ui: "default",
            //reference: 'refresh',
            iconCls: "x-fa fa-pencil-square-o",
            hidden: true,
            handler: function(item, e){
                this.fireEvent("actactive", this, item);
            },
            scope: this
        });

        me.items = this.buildItems();

        me.callParent(arguments);
    },

    buildItems: function(){
        var me = this;

        return [
            me.actClear, me.actNew, me.actEdit, me.actSave ,me.actDelete, me.actRefresh, "-",
            {
                xtype: "cycle",
                text: "Reading Pane",
                tooltip: "Reading Pane",
                ui: "default",
                reference: "paneselection",
                prependText: "Preview: ",
                showText: true,
                hidden: false,
                changeHandler: "readingPaneChange",
                scope: this,
                menu: {
                    items:[{
                        text: "Right",
                        iconCls: "x-fa fa-columns"
                    },{
                        text: "Bottom",
                        iconCls: "x-fa fa-columns"
                    },{
                        text: "Hide",
                        checked:true,
                        iconCls: "x-fa fa-columns"
                    }]
                }
            },{
                text: "Summary",
                tooltip: "Summary",
                ui: "default",
                iconCls: "x-fa fa-compress",
                enableToggle: true,
                pressed: true,
                hidden: true,
                toggleHandler: "onSummaryToggle",
                scope: this
            },"->",{
                xtype: "segmentedbutton",
                reference: "viewselection",
                hidden: false,
                value: 1,
                items: [{
                    tooltip: "Default",
                    ui: "bootstrap-btn-default",
                    value: 0,
                    viewMode: "default",
                    iconCls: "icon-default"
                },{
                    tooltip: "Icons",
                    ui: "bootstrap-btn-default",
                    value: 1,
                    viewMode: "medium",
                    iconCls: "icon-medium"
                },{
                    tooltip: "Tiles",
                    ui: "bootstrap-btn-default",
                    value: 2,
                    viewMode: "tiles",
                    iconCls: "icon-tile"
                }],

                listeners:{
                    toggle: "onBtnToggle",
                    scope: this
                }
            }];
    },

    onBtnToggle: function(f, j, i){
        var h = Ext.util.History.getToken(),
            g = h ? h.split("/") : [];

        g[1] = j.viewMode;

        this.getController().redirectTo(g.join("/"));
    },

    onSummaryToggle:function(j,h){
        var i=this,
            g=i.up("multiview"),
            f=g.lookupReference("grid");

        f.getView().getPlugin("preview").toggleExpanded(h);
    },

    readingPaneChange:function(g,i){
        var l=this,
            h=l.up("multiview"),
            j=h.lookupReference("preview");

        var k=(i.text!="Bottom") ? "east" : "south";
        switch(i.text){
            case"Bottom":j.setRegion(k);
                j.show();
                break;
            case"Right":j.setRegion(k);
                j.show();
                break;
            default:
                j.hide();
                //j.down('display').removeAll();
                break;
        }
    }
});
