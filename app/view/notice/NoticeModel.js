/**
 * Created by tech on 3/8/2016.
 */
Ext.define('Vega.view.notice.NoticeModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'Vega.model.Post',
        'Vega.model.notice.File',
        'Ext.data.proxy.Rest'
    ],

    alias: 'viewmodel.notice',

    data:{

    },

    formulas:{
        dirty:{
            bind:{
                bindTo: "{thePost}",
                deep:true
            },
            get:function(b){
                return b ? b.dirty : false;
            }
        },

        storeDirty:{
            bind:{
                bindTo: "{thePost}",
                deep:true
            },
            get:function(b){
                return this.getStore("notices").isDirty();
            }
        }
    },

    stores:{
        notices: {
            model: "Post",
            storeId: "notices",
            session: true,
            autoLoad: false,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 99,

            listeners:{
                beforeload: "onBeforeLoad",
                load: "onLoad"
            },

            isDirty:function(){
                var b = this.getModifiedRecords().length;

                b = b||this.getNewRecords().length;
                b = b||this.getRemovedRecords().length;

                return !!b;
            }
        },

        noticesChained:{
            source:"{notices}"
        }
    }
});
