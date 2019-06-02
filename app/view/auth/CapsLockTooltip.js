/**
 * Created by tech on 12/10/2015.
 */

Ext.define('Vega.view.auth.CapsLockTooltip', {
    extend: 'Ext.tip.QuickTip',

    alias: 'widget.capslocktooltip',

    target: 'txtPassword',
    anchor: 'top',
    anchorOffset: 60,
    width: 300,
    dismissDelay: 0,
    autoHide: false,
    title: '<div class="x-fa fa-exclamation-triangle"> Caps Lock is On</div>',
    html: '<div>Having Caps Lock on may cause you to enter ' +
            'your password incorrectly.</div><br/>' +
            '<div>You should press Caps Lock to turn it off ' +
            'before entering your password.</div>'

});
