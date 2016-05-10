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
    displayField: 'text',
    // Over Extjs 5.* configs
    enableKeyEvents: true,
    minChar: 1,
    queryMode: 'local',

    config: {
        hasSearch: false,
        paramName: 'query'
    },

    listeners: {
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

        me.on('specialkey', function(f, e){
            if (e.getKey() == e.ENTER) {
                var task = new Ext.util.DelayedTask(function(){
                    me.fireEvent('triggersearch', me);
                });
                task.delay(100);
            }
        });

    },

    onClearClick: function(combo){

    },

    onSearchClick: function(combo){

    }
});
