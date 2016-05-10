Ext.define('Vega.view.TopBar', {
    extend: 'Ext.toolbar.Toolbar',

    requires: [
        'Vega.view.TopBarController',
        'Vega.view.TopBarModel'
    ],

    alias: 'widget.topbar',

    controller: "topbar",
    viewModel:{
        type: "topbar"
    },

    width: "100%",
    enableOverflow: true,

    initComponent:function(){
        var me = this;

        Ext.applyIf(me,{
            items:[{
                text:"New",
                tooltip:"New",
                ui:"default",
                iconCls:"fa fa-plus-circle",
                hidden:false,
                scope:this,
                handler:function(a){
                    this.fireEvent("newclick",this,a)
                }
            },{
                text:"Save",
                tooltip:"Save",
                ui:"default",
                iconCls:"fa fa-save",
                hidden:true,
                scope:this,
                handler:function(a){
                    this.fireEvent("saveclick",this,a)
                }
            },{
                text:"Delete",
                tooltip:"Delete",
                ui:"default",
                iconCls:"fa fa-minus-circle",
                hidden:true,
                scope:this,
                handler:function(a){
                    this.fireEvent("deleteclick",this,a)
                }
            },{
                text:"Refresh",
                tooltip:"Refresh",
                ui:"default",
                iconCls:"fa fa-refresh",
                hidden:false,
                scope:this,
                handler:function(a){
                    this.fireEvent("refreshclick",this,a)
                }
            },"-",{
                text:"Reading Pane",
                tooltip:"Reading Pane",
                ui:"default",
                xtype:"cycle",
                reference:"paneselection",
                prependText:"Preview: ",
                showText:true,
                hidden:false,
                scope:this,
                changeHandler:"readingPaneChange",
                menu:{
                    items:[{
                        text:"Bottom",
                        iconCls:"fa fa-columns"
                    },{
                        text:"Right",
                        iconCls:"fa fa-columns"
                    },{
                        text:"Hide",
                        checked:true,
                        iconCls:"fa fa-columns"
                    }]
                }
            },{
                text:"Summary",
                tooltip:"Summary",
                ui:"default",
                iconCls:"fa fa-compress",
                enableToggle:true,
                pressed:true,
                scope:this,
                hidden:true,
                toggleHandler:"onSummaryToggle"
            },"->",{
                xtype:"segmentedbutton",
                reference:"viewselection",
                hidden:false,
                value:1,
                scope:this,
                items:[{
                    tooltip:"Default",
                    ui:"bootstrap-btn-default",
                    value:0,
                    viewMode:"default",
                    iconCls: "icon-default"
                },{
                    tooltip:"Icons",
                    ui:"bootstrap-btn-default",
                    value:1,
                    viewMode: "medium",
                    iconCls: "icon-medium"
                },{
                    tooltip: "Tiles",
                    ui:"bootstrap-btn-default",
                    value:2,
                    viewMode: "tiles",
                    iconCls: "icon-tile"
                }],

                listeners:{
                    toggle: "onBtnToggle"
                }
            }]
        });

        me.callParent(arguments)
    },

    onSummaryToggle:function(j,h){
        var i=this,
            g=i.up("multiview"),
            f=g.lookupReference("grid");

        f.getView().getPlugin("preview").toggleExpanded(h)
    },

    readingPaneChange:function(g,i){
        var l=this,
            h=l.up("multiview"),
            j=h.lookupReference("preview");

        var k=(i.text!="Bottom")?"east":"south";
        switch(i.text){
            case"Bottom":j.setRegion(k);
                j.show();
                break;
            case"Right":j.setRegion(k);
                j.show();
                break;
            default:j.hide();
                break
        }
    }
});

