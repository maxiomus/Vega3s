Ext.define('Vega.view.production.TaskController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.prod-task',

    requires: [
        'Vega.model.Tnap',
        'Vega.model.TnaOrder'
    ],

    init: function(c){
        //console.log(this.getReferences())
    },

    onStoreDataChanged: function(s){
        var factor = 10;

        s.each(function(rec){
            rec.set('priority', (s.indexOf(rec) + 1) * factor);
        });
    },

    /**
     *
     * @param c tableview
     * @param e
     */
    onContainerContextMenu:function(c, e){
        //console.log(c.grid.getStore().getCount(), this.getViewModel().get('cbCache'));
        var clipboard = this.getViewModel().get('cbCache');

        e.stopEvent();

        this.view.contextmenu.items.items[0].setDisabled(clipboard == null);

        this.view.contextmenu.showAt(e.getXY());
    },

    onPasteTNAClick: function(item){
        var clipboard = this.getViewModel().get('cbCache');

        //console.log(clipboard);
        this.view.getStore().add(clipboard);
    },

    onAddClick: function(btn){
        //console.log(this.getReferences())
        var store = btn.up('prod-task').getStore();

        store.add({

        });

        store.each(function(rec,idx){
            rec.set('priority', (idx+1) * 10);
        });

        console.log(store);
    },

    onAddPlanClick: function(menu, item){
        var me = this,
            grid = menu.up('prod-task'),
            rec = grid.up('multiview').lookup('grid').getSelection()[0],
            store = grid.getStore(),
            orders = me.getViewModel().getStore('tnaOrders');

        orders.on('load', function(s){
            //console.log(store, style);
            if(store.getCount() > 0){
                store.removeAll();
            }

            orders.sort('priority', 'ASC');

            orders.each(function(r){
                var dx = new Date(rec.data.cxldate);
                r.data.due = new Date(dx.getTime() - (1000 * 60 * 60 * 24 * r.data.duration));

                store.add(r.data);
            });

        }, this, {
            single: true
        });

        orders.filter({
            operator: "eq",
            value: item.type,
            property: "roleId"
        });
    },

    onPlansRefresh: function(store){

        var button = this.lookupReference('planSelector'),
            menu = button.getMenu();

        var items = [];
        store.each(function(rec){
            var idx = 0;
            items.push({
                xtype: 'menuitem',
                iconCls: Ext.baseCSSPrefix + 'menu-item-indent-right-icon x-fa fa-minus-square',
                group: button.id,
                //itemIndex: ++idx,
                type: parseInt(rec.data.id,10),
                //checked: idx === 0,
                text: 'T&A - ' + rec.data.text,
                //itemId: rec.data.label,
                //checkHandler: button.checkHandler,
                scope: button
            });
        });

        menu.add(items);
    },

    onRemoveClick: function(btn){
        //console.log(btn.up('grid'))
        var grid = btn.up('prod-task'),
            sm = grid.getSelectionModel(),
            selected = sm.getSelection();

        Ext.Array.each(selected, function(rec, idx, a){
            rec.drop(false);
        });

    },

    onRemoveAllClick: function(btn){
        //console.log(this.getReferences())
        var grid = btn.up('prod-task');

        grid.getStore().removeAll();
    },

    onRejectClick: function(btn){
        var grid = btn.up('prod-task');

        grid.getStore().rejectChanges();
    },

    onSaveClick: function(btn){
        var grid = btn.up('prod-task');

        var processMask = Ext.create('Ext.LoadMask', {
            msg: 'Saving... Please wait',
            target: this.view
        });
        //processMask.show();
        //console.log(this.getViewModel().getSession().getChanges())

        grid.getStore().sync({
            success: function(batch, op){
                Ext.Msg.alert('Status', 'Changes saved successfully.');

            },
            failure: function(batch, op){
                //console.log(op);
                rec.drop(false);
            },
            callback: function(batch, op){
                processMask.hide('', function() {

                });
            }
        });
    },

    onActivitySelect: function(c, rec){
        var grid = c.up('prod-task'),
            sm = grid.getSelectionModel(),
            selected = sm.getSelection();

        Ext.Array.each(selected, function(record, index, self){
            record.set('descript', rec.data.text);
        });
    },

    onActivityRenderer: function(val, metaData, rec, rowIndex, colIndex, store, view){
        var me = this,
            activities = me.getViewModel().getStore('activities');

        //console.log(activities, me.getViewModel().getParent())
        var idx = activities.findExact('id', val);
        if(idx != -1){
            var rs = activities.getAt(idx).data;
            return rs.text;
        }
    }

});
