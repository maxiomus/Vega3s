Ext.define("Ext.ux.panel.HAccordion",{
    extend: "Ext.container.Container",

    alias: 'widget.horizontalaccordion',

    layout: {
        type: 'hbox',
        align: 'stretch',
        pack: 'center'
    },

    defaultType: 'form',
    defaults: {
        flex: 1,
        margin: 1,
        frame: true,
        collapseDirection: 'left',
        scrollable: true,
        hideCollapeTool: true,
        animCollapse: false,
        headerPosition: 'left'
    },

    initComponent: function(){
        var me = this;

        me.on('render', function(p){
            Ext.each(me.items.items, function(item){
                //console.log('items', item);
                item.on('render', this.onItemRender, item);
            }, this);
        });

        me.callParent(arguments);
    },

    onItemRender: function(p){
        var me = this,
            layout = me.ownerCt,
            leftDockedItem,
            leftDockedItems = p.getDockedItems('header[dock="left"]');

        if(leftDockedItems.length > 0){
            leftDockedItem = leftDockedItems[0];
            leftDockedItem.on('click', layout.onLeftDockedItemClick, p);

            var task = new Ext.util.DelayedTask(function() {
                leftDockedItem.addTool({
                    type: 'left',
                    listeners: {
                        click: {
                            fn: layout.onLeftDockedItemClick,
                            scope: p
                        }
                    }
                })
            });
            task.delay(100);
        }
        else {
            p.on('collapse', layout.onItemRender, p, {
                single: true
            });
        }
    },

    onLeftDockedItemClick: function(){

        var me = this;

        me.ownerCt.items.each(function(item){
            if(me !== item && item.collapse && !item.collapsed){
                item.collapse();
            }
        });

        me.expand();
    }
});