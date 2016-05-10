Ext.define("Vega.view.TopBarController", {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: "controller.topbar",

    onBtnToggle: function(f, j, i){
        var h = Ext.util.History.getToken(),
            g = h ? h.split("/") : [];

        g[1] = j.viewMode;
        this.redirectTo(g.join("/"));
    }
});

