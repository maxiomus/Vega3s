
Ext.define('Vega.controller.Progress', {
    extend: 'Vega.controller.Base',

    /**
     * Handy method for checking whether the authenticated user has workflow permissions at a particular status
     * @param {String} status
     */
    hasPermission: function(status){
        var me = this,
            hasPermission = false,
            user = Vega.user;

        switch( status ) {
            case 'review': // in-review
            case 'audit': // in-audit
                hasPermission = user.inRole('cs') || user.inRole('revise') ? true : false;
                break;
            case 'rejected': // rejected
            case 'approved': // approved
                hasPermission = user.inRole('revise') ? true : false;
                break;
            case 'request': // initiated
                hasPermission = user.inRole('sales') || user.inRole('cs') ? true : false;
                break;
        }

        if(user.inRole('administrators')){
            hasPermission = true;
        }

        return hasPermission;
    }
})