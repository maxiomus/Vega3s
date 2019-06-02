Ext.define('Vega.view.pages.Error404Window', {
    extend: 'Ext.window.Window',
    alias: 'widget.pageserror404window',

    requires: [
        'Ext.container.Container',
        'Ext.toolbar.Spacer',
        'Ext.form.Label'
    ],

    autoShow: true,
    cls: 'error-page-container',
    closable: false,
    //title: 'Vega III',
    titleAlign: 'center',
    maximized: true,
    modal: true,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    width: 400,
                    cls:'error-page-inner-container',
                    layout: {
                        type: 'vbox',
                        align: 'center',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'label',
                            cls: 'error-page-top-text',
                            text: '404'
                            //html: '<div style="text-align: center;">404</div><div>Seems you\'ve hit a wall!</div><div>Try going back to our </div>'
                        },
                        {
                            xtype: 'label',
                            cls: 'error-page-desc',
                            html: '<div>Seems you\'ve hit a wall!</div><div>Try going back to our <a href="#dashboard"> Home page </a></div>',

                            listeners: {
                                el: {
                                    click: function(ev){
                                        me.close();
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'tbspacer',
                            flex: 1
                        }
                    ]
                }
            ]
        });

        me.callParent();

        var ctn = me.down('container'),
            label = ctn.down('label[cls=error-page-desc]');

        console.log(ctn, label)

    }
});
