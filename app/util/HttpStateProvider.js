Ext.define('Vega.util.HttpStateProvider', {
    extend: 'Ext.state.Provider',

    requires: [
        'Ext.state.Provider',
        'Ext.Ajax'
    ],

    alias: 'state.httpstorage',

    config: {
        userId : null,
        url: null,
        stateCallBack: null
    },

    constructor: function(config) {
        this.initConfig(config);
        var me = this;

        me.restoreState();
        me.callParent(arguments);
    },

    set: function(name, value) {
        var me = this;

        if( typeof value == "undefined" || value === null) {
            me.clear(name);
            return;
        }

        me.saveState(name, value);
        me.callParent(arguments);
    },

    /**
     * @private
     */
    restoreState: function() {
        var me = this,
        callback = me.getStateCallBack();

        Ext.Ajax.request({
            url : me.getUrl(),
            method : 'GET',
            params : {
                userId : me.getUserId()
            },
            //disableCaching : true,
            success : function(response, options) {
                this.state = {};

                var results = JSON.parse(response.responseText);
                //console.log(results.data)
                for(var prop in results.data) {
                    if(results.data.hasOwnProperty(prop)){
                        this.state[prop] = this.decodeValue(results.data[prop]);
                        //console.log(this.state)
                    }
                }

                if(callback){
                    callback();
                }
            },
            failure : function() {
                console.log('failed! - restoreState', arguments);
                if(callback){
                    callback();
                }
            },
            scope : this
        });
    },

    /**
     * @private
     * @param name
     */
    clear: function(name) {
        this.clearState(name);
        this.callParent(arguments);
    },

    /**
     * @private
     * @param name
     * @param value
     */
    saveState: function(name, value) {
        var me = this;
        Ext.Ajax.request({
            url : me.getUrl(),
            method : 'POST',
            params : {
                userId : me.getUserId(),
                name : name,
                value : me.encodeValue(value)
            },
            //disableCaching : true,
            success : function() {
                //console.log('success');
            },
            failure : function() {
                console.log('failed! - saveState', arguments);
            }
        });
    },

    /**
     * @private
     * @param name
     */
    clearState: function(name) {
        var me = this;
        Ext.Ajax.request({
            url : me.getUrl(),
            method : 'DELETE',
            params : {
                userId : me.getUserId(),
                name : name
            },
            disableCaching : true,
            success : function() {
                console.log('success');
            },
            failure : function() {
                console.log('failed! - clearState', arguments);
            }
        });
    }
});