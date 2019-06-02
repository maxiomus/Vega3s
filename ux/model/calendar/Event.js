/**
 * Created by tech on 5/3/2019.
 */
Ext.define('Ext.ux.model.calendar.Event', {
    extend: 'Ext.calendar.model.Event',

    fields: [
        /*
        The fields for this model. This is an Array of Ext.data.field.Field definition objects or simply the field name.
        If just a name is given, the field type defaults to auto.  For example:

        { name: 'name',     type: 'string' },
        { name: 'age',      type: 'int' },
        { name: 'phone',    type: 'string' },
        { name: 'gender',   type: 'string' },
        { name: 'username', type: 'string' },
        { name: 'alive',    type: 'boolean', defaultValue: true }
         */
        { name: 'userName', type: 'string' },
        { name: 'hideDesc', type: 'boolean' }
    ],

    /*
    Uncomment to add validation rules
    validators: {
        age: 'presence',
        name: { type: 'length', min: 2 },
        gender: { type: 'inclusion', list: ['Male', 'Female'] },
        username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
        ]
    }
    */

    /*
    Uncomment to add a rest proxy that syncs data with the back end.
    proxy: {
        type: 'rest',
        url : '/users'
    }
    */
    getUserName: function(){
        return this.data.userName;
    },

    setUserName: function(name){
        this.set('userName', name);
    },

    getHideDesc: function(){
        return this.data.hideDesc;
    },

    setHideDesc: function (hide) {
        this.set('hideDesc', hide)
    }
});