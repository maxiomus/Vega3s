
Ext.define('Ext.overrides.calendar.panel.Panel', {
    override: 'Ext.calendar.panel.Panel',

    privates: {
        getSwitcherItems: function() {
            var views = this.getViews(),
                items = [],
                key, o;

            for (key in views) {
                o = views[key];
                //Overrides... check if view object exist
                if(o){
                    items.push({
                        text: o.label,
                        value: key,
                        weight: o.weight
                    });
                }
            }

            items.sort(this.weightSorter);
            return items;
        }
    }
})