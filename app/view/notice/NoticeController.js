/**
 * Created by tech on 3/8/2016.
 */
Ext.define('Vega.view.notice.NoticeController', {
    extend: 'Ext.app.ViewController',

    alias: "controller.notice",

    mixins: [
        'Ext.app.route.Base'
    ],

    init:function(b){},

    initViewModel:function(b){
        this.fireEvent("viewmodelready",this,b);
    },

    onBeforeLoad:function(d,e,f){

    },

    onLoad:function(d,e,f){
        console.log("NoticeController - onLoad",d.isLoading(),d.loadCount);
    },

    onProxyException:function(f,d,e){
        Ext.Msg.alert("Error with data from server",e.error);

        this.view.el.update("");
        this.fireViewEvent("select",this,{data:{}})
    },

    onTabOpen:function(d,c){
        this.redirectTo("notice/tab/"+c.get("ArticleID"));
    },

    onRowDblClick:function(d,c){
        this.onTabOpen(d,c)
    },

    onNewPostClick:function(d){
        var rec = new Ext.create("Vega.model.Post",{
            BorderID:1,
            ParentID:0
        });

        this.showWindow(rec)
    },

    onRefreshClick:function(b){
        this.getStore("notices").load();
    },

    onContextMenuBookmarkClick:function(d,c){
        this.addBookmark(d,this.getView());
    },

    onContextMenuEditClick:function(d,c){
        this.loadDetail(d,this,this.showWindow(d));
    },

    onContextMenuPrintClick:function(d,c){

    },

    onContextMenuRefreshClick:function(d,c){
        this.getStore("notices").load()
    },

    showWindow:function(rec){
        var me = this,
            win = me.lookupReference("noticeWindow"),
            f = rec.phantom;

        if(!win){
            win = Ext.create("widget.notice-window", {
                title:f?"Add Post":"Edit Post",
                constrain:true,
                reference:"noticeWindow",
                width:720,
                height:640
            });

            me.getView().add(win);
        }

        win.show();
        win.down("form").loadRecord(rec);
    }
});
