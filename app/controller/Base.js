/**
 * Created by tech on 8/26/2015.
 */
Ext.define('Vega.controller.Base', {
    extend: 'Ext.app.Controller',

    alias: 'controller.base'

    /*
    checkSession: function(){
        var app = Vega.app,
            args = Ext.Array.slice(arguments),
            action = args[args.length - 1];

        if(app.appready){
            if(Vega.user){
                action.resume();
            }
            else {
                action.stop();
                me.redirectTo('!login');
            }
        }
        else {
            app.on(
                'appready',
                Ext.Function.bind(this.checkSession, this, args),
                me,
                {
                    single: true
                }
            )
        }
    }
    */
});

