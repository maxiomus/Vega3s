/**
 * {@link Ext.data.Model} for Security User
 */
Ext.define('Vega.model.auth.User', {
    extend: 'Ext.data.Model',
    fields: [
        // non-relational properties
        {
            name: 'FirstName',
            type: 'string',
            persist: false
        },
        {
            name: 'LastName',
            type: 'string',
            persist: false
        },
        {
            name: 'Email',
            type: 'string',
            persist: false
        },
        {
            name: 'Userid',
            type: 'string',
            persist: false,
            convert: function(value){
                return value.toLowerCase();
            }
        },
        {
            name: 'Roles',
            type: 'auto',
            persist: false
        }
    ],

    inRole: function(RoleID) {
        var me = this;
        return Ext.Array.contains(me.get('Roles'), RoleID );
    },

    userOwn: function(userid){
        var me = this;

        //console.log('userOwn', userid === me.get('Userid'));
        return userid === me.get('Userid');
    }
});
