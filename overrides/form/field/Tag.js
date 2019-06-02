/**
 * Created by tech on 3/9/2016.
 */
Ext.define('Ext.overrides.form.field.Tag', {
    override: 'Ext.form.field.Tag',

    afterQuery: function(qe){
        var me = this;

        me.callParent(arguments);

        if(!Ext.isEmpty(me.remoteStore)){

            if(Ext.isString(me.remoteStore)){
                var rs = Ext.getStore(me.remoteStore);

                if(rs){
                    me.remoteStore = rs;
                }
            }

            if(me.pageSize){
                var picker = me.getPicker(),
                    refresh = picker.pagingToolbar.queryById('refresh');

                me.store.on('load', function(s){
                    var task = new Ext.util.DelayedTask(function(){
                        picker.setLoading(false);
                    });
                    task.delay(100);

                }, me);

                refresh.on('click', function(b){
                    if(me.remoteStore){
                        picker.setLoading(true);
                        me.remoteStore.load();
                    }

                }, me)
            }

            me.loadPage(1, {
                rawQuery: qe.rawQuery
            });
        }
    }
});
