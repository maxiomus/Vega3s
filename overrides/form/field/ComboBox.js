/**
 * Created by tech on 3/9/2016.
 */
Ext.define('Ext.overrides.form.field.ComboBox', {
    override: 'Ext.form.field.ComboBox',

    beforeRender: function(){
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

                refresh.on('click', function(b){
                    if(me.remoteStore){
                        picker.setLoading(true);

                        me.remoteStore.load({
                            callback: function(r,o,s){

                                picker.setLoading(false);
                                var task = new Ext.util.DelayedTask(function(){
                                    me.collapse();
                                });
                                task.delay(10);
                            }
                        });
                    }

                }, me)
            }
        }
    },

    afterQuery: function(qe){
        var me = this;

        me.callParent(arguments);

        if(!Ext.isEmpty(me.remoteStore)){

            me.loadPage(1, {
                rawQuery: qe.rawQuery
            });
        }
    }
});
