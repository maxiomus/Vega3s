Ext.define('Vega.view.reports.transaction.LayoutController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.reports-transaction-layout',

    init: function(p){

    },

    onBox: function(p){
        var keyMap = Ext.create('Ext.util.KeyMap', {
            target: Ext.getBody(),
            binding: [{
                key: 'c',
                ctrl: true,
                fn: this.onEnterKey,
                scope: p.ownerCt
            }]
        });
    },

    onEnterKey: function(){
        var me = this;

        console.log(this.body);
        Ext.Msg.alert('KeyMap', 'You pressed Enter Key.');
        //e.stopEvent();
        //this.remove(this.getActiveTab())

    },

    onRender: function(p){
        //console.log('onRender', p, this);
        var leftDockedItem,
            leftDockedItems = p.getDockedItems('header[dock="left"]');

        if(leftDockedItems.length > 0){
            leftDockedItem = leftDockedItems[0];
            leftDockedItem.on('click', this.onLeftDockedItemClick, p);

            var task = new Ext.util.DelayedTask(function() {
                leftDockedItem.addTool({
                    type: 'left',
                    callback: function(panel, tool, event){
                        var me = panel.ownerCt;

                        me.ownerCt.items.each(function(item){
                            if(me !== item && item.collapse && !item.collapsed){
                                item.collapse();
                            }
                        });

                        me.expand();
                    }
                });
            });
            task.delay(10);
        }
        else {
            p.on('collapse', this.onRender, p, {
                single: true
            });
        }
    },

    onLeftDockedItemClick: function(p){
        //console.log('onLeft', p, this);
        var me = this;

        me.ownerCt.items.each(function(item){
            if(me !== item && item.collapse && !item.collapsed){
                item.collapse();
            }
        });

        me.expand();
    }

});
