/**
 * Created by tech on 5/6/2015.
 * Abstract Ajax Proxy
 */

Ext.define('Vega.proxy.Rest', {
    extend: 'Ext.data.proxy.Rest',

    alias: 'proxy.baserest',

    directionParam: null,
    //filterParam: null,
    groupDirectionParam: null,
    //groupParam: null,
    limitParam: null,
    pageParam: null,
    //sortParam: null,
    startParam: null,

    /*api: {
        create: '.handler?action=create',
        read: '.handler?action=read',
        update: '.handler?action=update',
        destroy: '.handler?action=destroy'
    },*/

    //url: '/api/',

    reader: {
        type: 'json',
        root: 'data',
        totalProperty: 'total',
        successProperty: 'success'
    },

    writer: {
        type: 'json',
        writeAllFields: true,
        allowSingle: false
    },

    constructor: function() {
        this.callParent(arguments);

        //this.setCategory(this.category);
    },

    /**
     *
     * @param category
     */
    setCategory: function(category) {
       this.setExtraParam('category', category);
    },

    buildRequest: function(operation) {
        var me = this;
        var request = me.callParent(arguments);

        return request;
    },

    /**
     *
     * @param {Ext.data.Request} request
     * @returns {string} Url
     */
    buildUrl: function(request) {
        var url = this.callParent(arguments);
        //console.log(Object.keys(request.params).length, Ext.isEmpty(request.params));

        //var obj = request.params;

        //if (obj) {
        //    if (obj.hasOwnProperty('page') || obj.hasOwnProperty('sort') || obj.hasOwnProperty('filters')) {
        //        return Ext.urlAppend(url + '/paging');
        //    }
        //}
        //return this.replaceTokens(url, request);
        //return Ext.urlAppend(encodeURIComponent(this.category) + url);
        return url;
    },

    replaceTokens: function(str, request) {
        var me = this;

        return str.replace(/{(.*?)}/g, function(full, token) {
            // We read the id from the request params, the category is read from the proxy itself
            return encodeURIComponent(request.params[token] || me[token]);
        });
    },

    afterRequest: function(request, success){
        var me = this;
        // fire requestcomplete event
        me.fireEvent('requestcomplete', request, success);
    }
});
