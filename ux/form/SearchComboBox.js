/**
 * Created by tech on 12/2/2015.
 */

Ext.define('Ext.ux.form.SearchComboBox', {
    extend: 'Ext.form.field.ComboBox',

    alias: 'widget.searchcombo',

    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            tooltip: 'Clear',
            hidden: true,
            handler: function(combo){
                combo.fireEvent('triggerclear', this);
            }
        },
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-search-trigger',
            tooltip: 'Search',
            handler: function(combo){
                combo.fireEvent('triggersearch', this);
            }
        }
    },

    hideLabel: true,
    // Use non-breaking space so that labelWidth of null shrinkwraps the unbroken string width
    valueField: 'id',
    displayField: 'id',
    // Over Extjs 5.* configs
    enableKeyEvents: true,
    minChar: 1,
    queryMode: 'local',

    config: {
        hasSearch: false,
        searchAt: null,
        paramName: 'query'
    },

    listeners: {
        render: function(c){
            c.on('focus', function () {
                c.expand();
            });
        },
        triggerclear: {
            fn: 'onClearClick',
            scope: 'this'
        },
        triggersearch: {
            fn: 'onSearchClick',
            scope: 'this'
        }
    },

    initComponent: function () {
        var me = this,
            picker = me.getTrigger('picker');

        picker.hide();

        me.callParent(arguments);

        if(!!typeof(me.searchAt)){
            var view = me.up('panel'),
                grid = view.lookupReference(me.grid);

            if(!grid){
                grid = view.down('grid');
            }

            me.searchAt = grid;
        }

        me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                /*
                var task = new Ext.util.DelayedTask(function(){
                    me.fireEvent('triggersearch', me);
                });
                task.delay(100);
                */
                //me.fireEvent('triggersearch', me);
                me.onSearchClick(f);
            }
        }, me, {
            buffer: 10
        });
    },

    onClearClick: function(g){
        //var f = g.up('viewer').down("grid"),
        var grid = this.searchAt,
            h = grid.getColumns();

        if(g.hasSearch){
            var e;
            Ext.each(h, function(a){
                e = a.filter;
                if(a.dataIndex===g.paramName){
                    return false
                }
            });
            g.setValue("");
            e.setValue("");
            e.setActive(false);
            g.hasSearch = false;
            g.getTrigger("clear").hide();
            g.updateLayout()
        }
    },

    onSearchClick: function(h){
        //var g = h.up('viewer').down("grid"),
        var grid = this.searchAt,
            i = grid.getColumns(),
            j = h.getValue();

        if(!Ext.isEmpty(j)){
            var f;
            Ext.each(i, function(a){
                if(a.dataIndex === h.paramName){
                    f = a.filter;
                    return false
                }
            });
            //console.log("onSearchClick", f, h.paramName);
            f.setValue(j);
            f.setActive(true);
            h.hasSearch = true;
            h.getTrigger("clear").show();
            h.updateLayout()
        }
    }
});
