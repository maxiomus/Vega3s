Ext.define('Ext.overrides.data.Session', {
    override: 'Ext.data.Session',
    //compatibility: ['6.2.1','6.2.0','6.0.3','6.0.2', '6.0.1'],

    peekRecord: function(type, id, deep) {
        if(this.destroyed){
            return null;
        }

        return this.callParent(arguments);
    },

    privates: {
        add: function (record){
            if(this.destroyed){
                return record;
            }

            return this.callParent(arguments);
        },

        getRefs: function(record, role, includeParent){
            if(this.destroyed){
                return null;
            }

            return this.callParent(arguments);
        },

        recordCreator: function( data, Model ) {
            var me = this,
                id = Model.getIdFromData( data ),
                record = me.peekRecord( Model, id, true ),
                changes;

            // It doesn't exist anywhere, create it
            if( !record ) {
                record = new Model( data, me );
            }
            else {
                record = me.getRecord( Model, id );

                if (!record.erased && !record.dropped) {
                    changes = record.getChanges();
                    record.set(data,{dirty: false, commit: true});
                    record.set(changes);
                }
            }

            return record;
        }
    }
});