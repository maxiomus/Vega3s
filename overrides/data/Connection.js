/**
 * Created by tech on 7/18/2016.
 */
/*
Ext.define('Ext.overrides.data.Connection', {
    override: 'Ext.data.Connection',

    request: function(options) {
        console.log('Override Connection request');
        options = options || {};
        var me = this,
            scope = options.scope || window,
            username = options.username || me.username,
            password = options.password || me.password || '',
            async,
            requestOptions,
            request,
            headers,
            xhr;

        if (me.fireEvent('beforerequest', me, options) !== false) {
            requestOptions = me.setOptions(options, scope);
            if (this.isFormUpload(options) === true) {
                var formData = new FormData(options.form);
                requestOptions.data = formData;
            }

            // if autoabort is set, cancel the current transactions
            if (options.autoAbort === true || me.autoAbort) {
                me.abort();
            }

            // create a connection object

            if ((options.cors === true || me.cors === true) && Ext.isIE && Ext.ieVersion >= 8) {
                xhr = new XDomainRequest();
            } else {
                xhr = this.getXhrInstance();
                xhr.upload.addEventListener("progress", options.scope.progress, false);
            }

            async = options.async !== false ? (options.async || me.async) : false;

            // open the request
            if (username) {
                xhr.open(requestOptions.method, requestOptions.url, async, username, password);
            } else {
                xhr.open(requestOptions.method, requestOptions.url, async);
            }

            if (options.withCredentials === true || me.withCredentials === true) {
                xhr.withCredentials = true;
            }

            //headers = me.setupHeaders(xhr, options, requestOptions.data, requestOptions.params);
            headers = null;
            // create the transaction object
            request = {
                id: ++Ext.data.Connection.requestId,
                xhr: xhr,
                headers: headers,
                options: options,
                async: async,
                timeout: setTimeout(function() {
                    request.timedout = true;
                    me.abort(request);
                }, options.timeout || me.timeout)
            };
            me.requests[request.id] = request;
            me.latestId = request.id;
            // bind our statechange listener
            if (async) {
                xhr.onreadystatechange = Ext.Function.bind(me.onStateChange, me, [request]);
            }

            if ((options.cors === true || me.cors === true) && Ext.isIE && Ext.ieVersion >= 8) {
                xhr.onload = function() {
                    me.onComplete(request);
                }
            }

            // start the request!
            xhr.send(requestOptions.data);
            if (!async) {
                return this.onComplete(request);
            }
            return request;
        } else {
            Ext.callback(options.callback, options.scope, [options, undefined, undefined]);
            return null;
        }
    }
});
*/
