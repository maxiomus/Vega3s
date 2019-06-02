/**
 * Created by tech on 10/9/2015.
 */

Ext.define('Ext.ux.FileDownload', {
    extend: 'Ext.Component',
    alias: 'widget.FileDownloader',

    height: 0,
    width: 0,

    autoEl: {
        tag: 'iframe',
        cls: 'x-hidden',
        src: Ext.SSL_SECURE_URL
    },

    load: function(config){
        var e = this.getEl();
        e.dom.src = config.url +
            (config.params ? '?' + Ext.urlEncode(config.params) : '');
        e.dom.onload = function() {
            if(e.dom.contentDocument.body != null) {
                Ext.Msg.show({
                    title: 'File missing',
                    msg: 'The file you are after can not be found on the server.',
                    buttons: Ext.Msg.OK,
                    icon: Ext.MessageBox.ERROR
                })
            }
        }
    }
});
