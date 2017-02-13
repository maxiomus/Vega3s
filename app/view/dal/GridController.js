Ext.define("Vega.view.dal.GridController", {
    extend: 'Ext.app.ViewController',
    
    alias: "controller.dal-grid",

    init: function(b){},

    onSelect: function(g, h, f, e){},

    renderCategoryColumn: function(i, l, g){
        var h=this.getView(),
        k=h.titleTpl;
        if(!k.isTemplate){
            h.titleTpl=k=new Ext.XTemplate(k)
        }

        var j=Ext.Object.chain(g.data);
        return k.apply(this.prepareData(j));
    },

    prepareData: function(d){
        /*
        var c;
        switch(d.F_CATEGORY.toLowerCase()){
            case"body":
                c=d.F_DESC5;
                break;
            case"photos":
                c=(d.F_OWNER!=null?d.F_OWNER: "")+" "+d.F_NAME;
                break;
            default:
                c=d.F_DESC6;
                break
        }

        var b = d.F_CREATED_ON.getFullYear() + '/' + (d.F_CREATED_ON.getMonth() + 1) + '/' + d.F_CREATED_ON.getDate();

        Ext.apply(d, {Title: c, F_PATH: b});
        */
        return d;
    },

    onRefreshView: function(d, c){

    }
});
