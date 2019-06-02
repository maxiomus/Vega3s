Ext.define('Ext.overrides.list.TreeList', {
    override: 'Ext.list.Tree',

    privates:{
        floatItem: function(item, byHover) {
            var me = this,
                floater;

            if (item.getFloated()) {
                return;
            }
            // Cancel any mouseout timer,
            if (me.toolMouseListeners) {
                me.toolMouseListeners.destroy();
                me.floaterMouseListeners.destroy();
            }
            me.unfloatAll();

            me.activeFloater = floater = item;
            me.floatedByHover = byHover;

            item.setFloated(true);

            if (byHover) {
                //6.0.2
                item.getToolElement().on('mouseleave', 'checkForMouseLeave', me);
                floater.element.on({
                    scope: me,
                    mouseleave: 'checkForMouseLeave',
                    mouseover: 'onMouseOver'
                });
            //6.2
            // monitorMouseLeave allows straying out for the specified short time
            //me.toolMouseListeners = item.getToolElement().monitorMouseLeave(300, me.checkForMouseLeave, me);
            //me.floaterMouseListeners = (item.floater || item).el.monitorMouseLeave(300, me.checkForMouseLeave, me);
            } else {
                Ext.on('mousedown', 'checkForOutsideClick', me);
            }
        }
    }

});