
Ext.define('Vega.view.development.style.edit.CostView',{
    extend: 'Ext.view.View',

    requires: [
        'Vega.view.development.style.edit.CostViewController',
        'Vega.view.development.style.edit.CostViewModel'
    ],

    alias: 'widget.style-edit-view',

    controller: 'style-edit-view',
    viewModel: {
        type: 'style-edit-view'
    },

    style: {
        //borderTop: '1px solid #cfcfcf'
        //borderBottom: '1px solid #cfcfcf'
    },

    loadMask: true,
    overItemCls: "x-item-over",
    itemSelector: "div.note-wrap",
    preserveScrollOnRefresh: true,
    deferInitialRefresh: true,

    publishes: ['selection'],

    config: {
        selection: null
    },

    prepareData: function(f, d, e){
        Ext.apply(f, {
            //viewStatus: localStorage.getItem("pow-seen-" + f.powhId) == "true" ? "visited" : ""
        });

        return f;
    },

    listeners: {
        beforecontainerclick: function(){
            return false;
        }
    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
                '<div class="note-wrap {viewStatus} {progress}" id="mView-{bomhId}">',
                '<div class="note">',
                //'<img src="{linkImage}" title="{Title}" />',
                '</div>',
                '<div class="post-data">',
                '<div class="post-title">Style/Color: {style:capitalize}/{color:capitalize}<i class="x-fa fa-check-square-o fa-lg viewIcon {viewStatus}"></i>  <i class="x-fa fa-thumbs-o-up fa-lg viewIcon {progress}"></i></div>',
                '<div class="post-title"> C.S #: {bomno}</div>',
                '<div class="post-title">Process Type: {processType}</div>',
                '<div class="post-author">Created by {createUser:capitalize} @ {createTime:date("M j,Y g:i A")}</div>',
                '<div class="post-date"></div>',
                '</div>',
                '<div>',
                '<span>Materials Total: {colorCompTotal:usMoney}</span>',
                '<span>Labor Total: {processtotal:usMoney}</span>',
                '<span>Sub Total: {subTotal:usMoney}</span>',
                '<span>Assoc. Total: {assoctotal:usMoney}</span>',
                '<span>Cost Sheet Total: {total:usMoney}</span>',
                '<div style="font-size:11px;padding:4px;">{bommemo:this.formatComment}</div>',
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
            )
        });

        me.callParent(arguments);
    }
});
