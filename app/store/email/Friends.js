Ext.define('Vega.store.email.Friends', {
    extend: 'Ext.data.Store',

    alias: 'store.emailfriends',

    model: 'Vega.model.email.Friend',

    proxy: {
        type: 'ajax',
        url: '~api/email/friends',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    sorters: {
        direction: 'DESC',
        property: 'online'
    }
});
