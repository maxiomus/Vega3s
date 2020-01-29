
Ext.define("Vega.view.development.style.View", {
    extend: 'Ext.view.View',

    requires: [
        'Vega.view.development.style.ViewController',
        'Vega.view.development.style.ViewModel'
    ],

    alias: "widget.style-view",

    scrollable: "y",
    //loadMask: true,
    //loadingHeight: 300,
    //trackOver: false,
    enableTextSelection: false,

    cls: "sample-image-view",

    loadMask: true,
    overItemCls: "x-item-over",
    itemSelector: "div.thumb-wrap",

    preserveScrollOnRefresh: true,
    //deferInitialRefresh: true,

    padding: '7 0 0 7',

    style: {
        //borderTop: '1px solid #cfcfcf',
        //borderBottom: '1px solid #cfcfcf'
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

    initComponent:function(){
        var me = this;
        this.tpl = this.buildTemplate();

        me.callParent(arguments);
    },

    buildTemplate: function(){
        var b = new Ext.XTemplate('<tpl for=".">',
            '<div class="thumb-wrap x-unselectable">',
                '<div class="thumb">',
                    //'<tpl if="this.notNull(mp)">',
                    '<tpl if="this.notNull(name)">',
                        '<img class="x-unselectable" src="../{name}?w=174&h=232" />',
                    '</tpl>',
                '</div>',
                /*
                '<div class="post-data x-unselectable">',
                    '<div class="post-title">POW # {powno} <i class="x-fa fa-check-square-o fa-lg viewIcon {viewStatus}"></i></div>',
                    '<div class="post-date">{createdon:date("M j,Y,g:i a")}</div>',
                    '<div class="post-author">Registered by {userId:capitalize}</div>',
                '</div>',
                */
                '<div>',
                    '<span style="float: left;">Style #: {style}</span><span> Color: {color}</span>',
                    '<span style="clear: both;">Desc: {descript:ellipsis(35)}</span>',
                    '<span style="float: left;width:50%;">Body #: {user2}</span><span style="width:50%;"> Cost: {confirmCost:this.formatCost}</span>',
                    '<span style="clear: both;">Self: {fabrics:this.format}</span>',
                    '<div style="font-size:11px;padding:4px;">Memo: {memo:this.formatMemo}</div>',
                '</div>',
            '</div>',
            '</tpl>',
            '<div class="x-clear"></div>',
            {
                format: function(v){
                    var k=Ext.util.Format;
                    if(!Ext.isEmpty(v)){
                        var l=v.split("(#)"),
                            j=k.capitalize(l[2]+" ("+l[1]+")");
                        //h.tdAttr='data-qtip="'+j+'"';
                        return j;
                    }
                }
            },
            {
                formatCost: function(v){
                    var xf = Ext.util.Format;

                    return v ? xf.usMoney(v) : '';
                }
            },
            {
                formatMemo: function(v){
                    var k=Ext.util.Format,
                        j;
                    if(!Ext.isEmpty(v)){
                        j = k.stripTags(v);
                    }

                    return k.ellipsis(j, 30);
                }
            },
            {
                notNull: function(v){

                    return !Ext.isEmpty(v);
                }
            }
        );

        return b;
    }
});
