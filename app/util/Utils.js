/**
 * Created by tech on 12/10/2015.
 */
Ext.define('Vega.util.Utils', {
    statics : {

        getOrdinal: function (n) {
            var s=["th","st","nd","rd"],
            v=n%100;
            return n+(s[(v-20)%10]||s[v]||s[0]);
        },
        decodeJSON : function (text) {
            var result = Ext.JSON.decode(text, true);
            if (!result){
                result = {};
                result.success = false;
                result.msg = text;
            }
            return result;
        },
        showErrorMsg: function (text) {
            Ext.Msg.show({
                title:'Error!',
                msg: text,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
        },
        showNotification: function(text){
            Ext.create('Ext.ux.window.Notification', {
                position: 'br',
                useXAxis: true,
                cls: 'ux-notification-light',
                iconCls: 'x-fa fa-warning',
                closable: false,
                title: 'Warning!',
                padding: '8',
                html: '<p>'+text+'</p>',
                slideInDuration: 800,
                slideBackDuration: 1500,
                autoCloseDelay: 4000,
                slideInAnimation: 'elasticIn',
                slideBackAnimation: 'elasticIn'
            }).show();
        },
        generateGUID : function() {
            return ((typeof(window.crypto) != 'undefined' && typeof(window.crypto.getRandomValues) != 'undefined') ? function() { // If we have a cryptographically secure PRNG
                    var buf = new Uint16Array(8);
                    window.crypto.getRandomValues(buf);
                    var S4 = function(num) {
                        var ret = num.toString(16);
                        while(ret.length < 4){ ret = "0"+ret; }
                        return ret;
                    };
                    return (S4(buf[0])+S4(buf[1])+"-" +S4(buf[2])+"-"+S4(buf[3])+"-"+S4(buf[4])+"-"+S4(buf[5])+S4(buf[6])+S4(buf[7]));
                }
                    : function() { // Otherwise, just use Math.random
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                        .replace(
                        /[xy]/g,
                        function(c) {
                            var r = Math.random()*16|0,
                                v = c == 'x' ? r : (r&0x3|0x8);
                            return v.toString(16);
                        }
                    ); // replace
                }
            )();
        }// generateGUID
    }
});
