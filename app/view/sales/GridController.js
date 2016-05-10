Ext.define("Vega.view.sales.GridController", {
    extend: 'Ext.app.ViewController',

    alias: "controller.pow-grid",

    init:function(b){

    },

    onAfterRender:function(b){

    },

    onSelect:function(g,h,f,e){

    },

    onRefreshView:function(d,c){

    },

    renderPowNoColumn:function(g,e,f){
        var h="";
        if(localStorage.getItem("pow-seen-"+f.data.PID)){
            e.tdCls+="visited";
            h=' <i class="fa fa-check-square-o fa-lg"></i>'
        }
        return g+h;
    }
});