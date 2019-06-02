
Ext.define('Vega.view.development.style.edit.Request',{
    extend: 'Ext.view.View',

    alias: "widget.style-edit-request",

    requires: [
        'Vega.view.development.style.edit.RequestController',
        'Vega.view.development.style.edit.RequestModel'
    ],

    controller: 'style-edit-request',
    viewModel: {
        type: 'style-edit-request'
    },

    cls: "request-view",

    overItemCls: "x-item-over",
    itemSelector: "div.thumb-wrap",

    preserveScrollOnRefresh: true,
    deferInitialRefresh: true,
    enableTextSelection: false,

    scrollable: true,
    padding: 10,
    flex: 1,

    prepareData: function(f, d, e){
        Ext.apply(f, {
            //viewStatus: localStorage.getItem("pow-seen-" + f.powhId) == "true" ? "visited" : ""
        });
        return f;
    },

    listeners: {
        beforecontainerclick: function(){
            return false;
        },

        itemcontextmenu: function(h, j, k, g, l){
            l.stopEvent();

            var i = h.getSelectionModel();
            if(!i.isSelected(g)){
                i.select(g);
            }

            h.contextmenu.showAt(l.getXY());
        }
    },

    initComponent: function(p){
        var me = this;

        me.tpl = me.buildTemplate();

        Ext.applyIf(me, {

        });

        me.callParent(arguments);

        var formController = me.up('style-edit-form').getController();

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Copy',
                iconCls: 'x-fa fa-copy',
                tooltip: 'Copy Request',
                handler: 'onCopyReqClick',
                scope: formController
            },{
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Cost Sheet',
                handler: 'onEditReqClick',
                scope: formController
            },{
                text: 'Delete',
                iconCls: 'x-fa fa-remove',
                tooltip: 'Delete Cost Sheet',
                handler: 'onDeleteReqClick',
                scope: formController
            },{
                text: 'Preview',
                iconCls: 'x-fa fa-file-text-o',
                tooltip: 'Preview Cost Sheet',
                handler: 'onPreviewReqClick',
                scope: formController
            }]
        });
    },

    buildTemplate: function(){

        return new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="thumb-wrap x-unselectable">',
                    '<div class="thumb">',
                    //'<img src="{linkImage}" title="{title}" />',
                    //'<div class="{F_BFLAG}">Rejected</div>',
                    '</div>',
                    '<tpl if="attachs &gt; 0">',
                        //'<div class="post-attach"></div>',
                    '</tpl>',
                    '<div class="post-data">',
                        '<div class="post-title">RFQ # {reqhId} <i class="x-fa fa-check-square-o fa-lg viewIcon"></i></div>',
                        '<div class="post-date">{userTime:date("M j,Y,g:i a")}</div>',
                        '<div class="post-author">Registered by {userId:capitalize}</div>',
                    '</div>',
                    '<div>',
                        '<span>Body Ref #: {bodyref:uppercase}</span>',
                        //'<span>Color: {color:uppercase}</span>',
                        '<span>Customer: {customer:uppercase}</span>',
                        '<span>PO Qty: {[values.poqty1+values.poqty2+values.poqty3]}</span>',
                        '<div style="font-size:11px;padding:4px;">Memo: {memo:this.formatComment}</div>',
                    '</div>',
                '</div>',
            '</tpl>',
            '<div class="x-clear"></div>',
            {
                formatComment: function(v){
                    var ev = Ext.util.Format.stripTags(v);
                    return Ext.String.ellipsis(ev,30);
                }
            }
        );
    }
});
