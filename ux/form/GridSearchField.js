/**
 * Created by tech on 8/18/2015.
 */
Ext.define('Ext.ux.form.GridSearchField', {
    extend: 'Ext.form.field.Text',

    alias: 'widget.gridsearchfield',

    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            tooltip: 'Clear',
            hidden: true,
            scope: 'this',
            handler: 'onClearClick'
        },
        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-search-trigger',
            tooltip: 'Search',
            scope: 'this',
            handler: 'onSearchClick'
        }
    },

    // Over Extjs 5.* configs
    enableKeyEvents: true,

    config: {
        hasSearch: false,
        paramName: 'query',
        grid: null
    },

    initComponent: function () {
        var me = this;

        me.callParent(arguments);

        me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                me.onSearchClick();
            }
        });

        if(!!typeof(me.grid)){
            var view = me.up('panel'),
                grid = view.lookupReference(me.grid);

            if(!grid){
                grid = view.down('grid');
            }

            me.grid = grid;
        }

        //        if(!!typeof(me.store.isStore)){
        //            me.store = Ext.data.StoreManager.get(me.store);
        //        }

        //        // We're going to use filtering
        //        me.store.remoteFilter = true;

        //        // Set up the proxy to encode the filter in the simplest way as a name/value pair
        //        if (!me.store.proxy.hasOwnProperty('encodeFilters')) {
        //            me.store.proxy.encodeFilters = function (filters) {
        //                return filters[0].value;
        //            }
        //        }

        //        // If the Store has not been *configured* with a filterParam property, then use our filter parameter name

        //        if (!me.store.proxy.hasOwnProperty('filterParam')) {
        //            me.store.proxy.filterParam = me.paramName;
        //        }

    },

    onClearClick: function () {

        var me = this,
            cols = me.grid.getColumns();
        //grid.filters.createFilters();

        if (me.hasSearch) {
            var filter;
            Ext.each(cols, function(col){
                filter = col.filter;
                if(col.dataIndex === me.paramName){
                    return false;
                }
            });
            me.setValue('');
            filter.setValue('');
            filter.setActive(false);
            //grid.filters.clearFilters();
            me.hasSearch = false;
            me.getTrigger('clear').hide();
            me.updateLayout();
        }
    },

    onSearchClick: function () {

        var me = this,
            cols = me.grid.getColumns(),
            value = me.getValue();

        if (value.length > 0) {
            var filter;
            Ext.each(cols, function(col){
                if(col.dataIndex === me.paramName){
                    filter = col.filter;
                    //filter.options = ['Avenue', 'Cjbanks'];
                    //filter.menu = filter.createMenu();
                    return false;
                }
            });

            filter.setValue(value);
            filter.setActive(true);
            me.hasSearch = true;
            me.getTrigger('clear').show();
            me.updateLayout();
        }
    }
});