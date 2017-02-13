Ext.define('Vega.view.development.sample.SampleController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.sample',

    requires: [
        'Vega.model.Media'
    ],

    init: function(){

    },

    onAfterGridRender: function(p){

    },

    onActionNew: function(b){
        this.redirectTo("sample/edit");
    },

    onActionEdit: function(b, c){
        //console.log(b, c);

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('sample-grid'),
            rec = grid.getSelection()[0];

        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("sample/edit/" + rec.data.id);
    },

    onActionRefresh: function(b, c){
        this.getStore("samples").reload();
    },

    onActionDelete: function(b, c){
        var me = this;
        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to delete this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    var layout = me.lookupReference('multiview'),
                        grid = layout.lookupReference('sample-grid'),
                        rec = grid.getSelection()[0];

                    //rec.drop();
                    //me.saveStore(grid, me.getView());
                }
            }
        });
    },

    onContextMenuEditClick: function(d, c){

    },

    onContextMenuBookmarkClick: function(d, c){
        this.addBookmark(d, this.getView())
    },

    onClearFilters: function(b){
        var me = this,
            layout = me.view.lookupReference("multiview"),
            topbar = layout.lookupReference("topbar"),
            searchcombo = topbar.lookupReference('searchcombo'),
            searchfield = topbar.down('gridsearchfield'),
            grid = layout.lookupReference("sample-grid");

        searchcombo.setValue('');
        searchcombo.getTrigger('clear').hide();
        searchfield.setValue('');
        searchfield.getTrigger('clear').hide();
        grid.filters.clearFilters();
    },


    /**
     *
     * @param sm
     * @param rec
     * @param index
     * @param eOpts
     */
    onSelect: function(sm, rec, index, eOpts){
        //onSelectionChange: function(sm, selected, eOpts) {

        var layout = this.getView().lookupReference('multiview'),
            refs = layout.getReferences(),
            topbar = refs.topbar,
            display = refs.display;

        display.setActive(rec);

        //console.log(rec);
        this.redirectTo('sample/default/' + rec.get('id'));
    },

    onFilterItemChange: function(combo, j, g, l){
        /*
        var topbar = combo.up("topbar"),
            k = topbar.down("gridsearchfield");
        k.paramName = combo.getValue();

        k.setValue('');
        */
        var toolbar = combo.up("toolbar"),
            m = toolbar.down("gridsearchfield"),
            n = toolbar.down("searchcombo"),
            j = combo.getValue(),
            st = '';

        switch(j){
            case "designer":
                if(st === ''){
                    st = 'designers';
                }
            case "stone":
                if(st === ''){
                    st = 'vendors';
                }
                n.paramName = j;
                n.show();
                m.hide()
                break;
            default:
                m.paramName = j;
                m.show();
                n.hide();
        }

        //console.log(st);
        var view = this.getView(),
            k = view.getViewModel().getStore(st);

        if(k != null){
            k.load();
            n.bindStore(k)
        }
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g)
        }
        this.view.contextmenu.showAt(l.getXY())
    },

    showWindow: function(rec, xtype){
        var me = this,
            view = me.getView(),
            multiview = view.lookupReference('multiview');

        me.isEdit = !!rec;

        me.win = multiview.add({
            xtype: xtype,
            width: view.getWidth() - 560,
            height: view.getHeight() - 320,
            viewModel: {
                stores: {
                    fileStore: {
                        model: 'Media',
                        listeners: {
                            beforesync: function(options, e){
                                /*
                                me.fileStoreMask = new Ext.LoadMask({
                                    msg    : 'Please wait...',
                                    target : view
                                });

                                me.fileStoreMask.show();
                                */
                            }
                        }
                    }
                },

                data: {
                    theSample: rec
                },

                formulas: {
                    thePrint: function(get) {
                        return get('theSample').data.prints.split('(#)')[0];
                    }
                }
            },
            // Create a child session that will spawn from the current session of this view
            session: true,

            buttons: [{
                action: 'save',
                text: 'Save',
                formBind: true,
                //glyph: 86,
                iconCls: 'fa fa-save',
                handler: function(btn){
                    me.win.fireEvent('saveclick', btn, me.win);
                }
            },{
                action: 'close',
                text: 'Close',
                //glyph: 88,
                iconCls: 'fa fa-close',
                handler: function(btn){
                    btn.up('window').close();
                }
            }]
        });

        var items = [];

        me.win.getViewModel().getStore('fileStore').on('add', function(store, records, index){

            records.forEach(function(mediaRec){

                mediaRec.set('FID', '3');
                mediaRec.set('F_NAME', rec.data.style.trim() + '_' + rec.data.user2.trim() + '_' + rec.data.prints.split('(#)')[0] + '_' + mediaRec.id * -1 - 1 + '.' + mediaRec.data.name.split('.').pop());
                mediaRec.set('F_TYPE', mediaRec.data.type);
                mediaRec.set('F_SIZE', mediaRec.data.size);
                mediaRec.set('F_EXT', '.' + mediaRec.data.name.split('.').pop());
                mediaRec.set('F_STYLE', rec.data.style.trim());
                mediaRec.set('F_DESC5', rec.data.user2);
                mediaRec.set('F_DESC6', rec.data.prints.split('(#)')[0]);
                mediaRec.set('F_DESC3', rec.data.prints.split('(#)')[1]);
                mediaRec.set('F_LINK', 'DLIB/BLU-PHOTOS/');
                mediaRec.set('F_LOCATION', mediaRec.data.name + '_' + mediaRec.data.size);
                mediaRec.set('F_APPLICATION', 'DAL');
                mediaRec.set('F_CATEGORY', 'Photos');
                //mediaRec.set('F_OWNER', rec.data.style.trim());
                mediaRec.set('F_BFLAG', true);
                mediaRec.set('F_USERID', Vega.user.data.Userid);
                mediaRec.set('F_CREATED_ON', new Date());

            });
        });

        me.win.on('close', function(w){
            //view.setActiveTab(0);
            view.up('maincontainerwrap').unmask();
        });

        me.win.show('', function(){
            view.up('maincontainerwrap').mask();
        });
    },

    onOpenUploadClick: function(){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('sample-grid'),
            rec = grid.getSelectionModel().selected.items[0];

        this.showWindow(rec, 'sample-windows-upload');

        this.win.on('saveclick', this.onSaveUpload, this);
    },

    onSaveUpload: function(b, c){

        var me = this,
            form = c.down('form').getForm(),
            vm = c.getViewModel(),
            sampleRec = vm.get('theSample'),
            fileStore = vm.getStore('fileStore'),
            field = c.down('form').down('multiupload').getDockedItems('toolbar[dock="top"] > uploadfiles')[0];

        if(!form.isValid()){
            Ext.create('Ext.ux.window.Notification', {
                position: 'br',
                useXAxis: true,
                cls: 'ux-notification-light',
                iconCls: 'ux-notification-icon-information',
                closable: false,
                title: 'Error',
                padding: '0 5px 5px 5px',
                html: '<p>Form is invalid. Please check all the fields.</p>',
                slideInDuration: 800,
                slideBackDuration: 1500,
                autoCloseDelay: 4000,
                slideInAnimation: 'elasticIn',
                slideBackAnimation: 'elasticIn'
            }).show();
        }

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });

        fileStore.sync({
            //url: '/form-upload.aspx',
            //headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
            //waitMsg: 'Uploading files...',
            success: function(batch, opt) {

                /*
                var res = Ext.JSON.decode(response.responseText, true);
                var win = form.owner.up('window');
                if(win){
                    win.close();
                }
                */

                var operations = batch.getOperations();

                for(var i in operations){
                    var operation = operations[i];
                    //console.log(operation);
                    if(operation.getResponse()){
                        var response = JSON.parse(operation.getResponse().responseText);
                        if(field && field.getFilesQueue().length > 0){
                            field.send({
                                url: '/api/Files/Photos/upload',
                                success: function(resp){
                                    console.log(resp);
                                    processMask.hide('', function() {
                                        Ext.Msg.alert('Status', JSON.stringify(resp.data.Media, null, 4));
                                    });
                                    //Ext.Msg.alert('Status', 'Changes saved successfully.');
                                },
                                failure: function(resp) {
                                    processMask.hide('', function() {
                                        Ext.Msg.alert('Failure', resp);
                                    });
                                }
                            }, {
                                Media: JSON.stringify(response.data)
                            });
                        }
                    }
                }

            },
            failure: function(batch, options) {

                if(batch.hasException) {
                    for (var i = 0; i < batch.exceptions.length; i++) {
                        switch (batch.exceptions[i].action) {
                            case "destroy" :
                                msg = msg + batch.exceptions[i].records.length + " Delete, ";
                                break;
                            case "update" :
                                msg = msg + batch.exceptions[i].records.length + " Update, ";
                                break;
                            case "create" :
                                msg = msg + batch.exceptions[i].records.length + " Create, ";
                                break;
                        }
                    }

                    Ext.Msg.alert("Status", msg + " operation failed!");
                }
                else
                {
                    Ext.Msg.alert('Status', 'Changes failed.');
                }

            },
            callback: function (batch, options) {
                //console.log(options);
            }
        });

        me.win.close();
        processMask.show();
    },

    onOpenLabeltagClick: function(btn){

        var win,
            view = this.getView(),
            layout = this.getView().lookupReference('multiview'),
            grid = layout.lookupReference('sample-grid'),
            record = grid.getSelectionModel().selected.items[0];

        if (!win) {

            win = Ext.create('Vega.view.development.sample.windows.Labeltag', {
                width: 400,
                height: view.getHeight() - 80
                //maxHeight: 600
                //width: window.innerWidth * 0.8,
                //height: window.innerHeight * 0.8
            });

            console.log(window.innerHeight)
            //win.loader.load();
            var request = "../PrintTag.aspx?style=" + record.get('style').trim() + "&color=" + record.get('color').trim();
            win.html = '<iframe src="' + request + '" id="innerFrame" name="innerFrame" width="100%" height="100%" frameborder="0"></iframe>'
        }

        win.show(this, function () {
            //console.log('callback function from window show.');
        })
    }
    
});
