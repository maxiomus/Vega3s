Ext.define('Vega.view.development.style.edit.FormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.style-edit-form',

    requires: [
        'Vega.model.ProcessOrder',
        'Vega.model.sample.Product',
        'Vega.model.sample.Bomh',
        'Vega.model.sample.Bom',
        'Vega.model.sample.Bolh',
        'Vega.model.sample.Bol',
        'Vega.model.sample.Smph',
        'Vega.model.sample.File',
        'Vega.model.sample.Reqh',
        'Vega.model.sample.Reqd',
        'Vega.model.sample.Reqe'
    ],

    listen: {
        component: {
            'style-edit-form > window': {
                close: function(p){
                    this.mv.unmask();
                }
            }
        }
    },

    init: function(){
        var me = this;

        me.mv = Vega.app.getMainView();

        Ext.Ajax.request({
            url: 'resources/data/development/sample/stores.json',
            scope: me,
            success: function(response){
                var o = {};

                try {
                    o = Ext.decode(response.responseText);
                }
                catch(e){
                    alert(e.message);
                    return;
                }

                if(!o.success){
                    // @todo error handling
                    alert("Unknow error occurs!");
                    return;
                }

                Ext.Object.each(o.stores, function(key, value, itself){
                    var store = me.getViewModel().getStore(key);
                    //console.log(store, key, value)
                    if(store && value){
                        store.loadData(value);
                    }
                });
            },
            failure: function(response){

            }
        });

    },

    initViewModel: function(vm) {
        //var rec = vm.linkData.theSample;
        //console.log('initViewModel', rec, vm.get('theSample'))
    },

    /*
    onViewUploadRender: function(c){
        var refs = this.getReferences(),
            view = refs.attachment.down('viewupload'),
            toolbar = c.previousSibling('toolbar');

        toolbar.add(view.fileUpload);
    },

    onAttachBtnRemoveAll: function(btn){
        var refs = this.getReferences(),
            view = refs.attachment.down('viewupload');

        view.getStore().removeAll();
        view.fileUpload.filesQueue.length = 0;
    },

    onBtnReject: function(btn){
        var me = this,
            refs = this.getReferences(),
            view = refs.attachment.down('viewupload'),
            vm = me.getViewModel(),
            changes = me.getSession().getChanges();

        view.getStore().rejectChanges();

        console.log(me.getSession())

        changes=Ext.JSON.encodeValue(changes, '<br>');
        Ext.Msg.alert('proxy', '<pre>' + changes + '</pre>');
    },

    onToggleSlideChange: function(btn, pressed){
        var refs = this.getReferences(),
            photos = refs.photos,
            attach = refs.attachment,

            detail = attach.getComponent('attach-detail');

        btn.setIconCls(pressed ? 'x-fa fa-toggle-on' : 'x-fa fa-toggle-off');

        detail.setHidden(!pressed);
    },
    */

    onPositionChange: function(btn, active){
        var tabpanel = this.lookupReference('editsampletabs'),
            tabBar = tabpanel.tabBar,
            vertical = active.itemId == 'left' || active.itemId == 'right';

        tabpanel.setBind({
            tabPosition: active.itemId
        });

    },

    onTabChange: function(t, n, o, e){
        var refs = this.getView().getReferences();

        refs.costCrud.setHidden(n.reference != 'costslist');
        refs.reqCrud.setHidden(n.reference != 'reqs');
        //refs.toggledetail.setHidden(n.reference != 'attachment' && n.reference != 'photos');

    },

    // Cost Sheets...
    onAddCostClick: function(btn){
        this.showCosting(null);
    },

    onCopyCostClick: function(btn){
        var me = this,
            session = me.getSession(),
            grid = me.lookupReference('costslist'),
            d = grid.getSelection()[0];

        var lbo = grid.getStore().getData().last();

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', nd);

        nd.data.processtotal = null;
        nd.data.subTotal = null;
        nd.data.assoctotal = null;
        nd.data.total = null;

        nd.data.confirm_yn = null;
        nd.data.updateUser = null;
        nd.data.updateTime = null;

        nd.set('bomno', lbo.data.bomno + 1);
        nd.set('createUser', Vega.user.data.Userid);
        nd.set('createTime', new Date());

        d.boms().each(function(rec){
            var cr = rec.copy(null, session);
            cr.set('bomno', nd.data.bomno);
            nd.boms().add(cr);
        });
        /*
        Ext.Object.each(session.data['sample.Bom'], function(key, value, self){
            var rec = value.record;
            if(rec.get('bomhId') == d.id){
                var cr = rec.copy(null, session);
                cr.set('bomno', nd.data.bomno)
                nd.boms().add(cr);
            }
        });
        */

        if(false){
            var bolh = d.bolhs().first();
            if(bolh){
                var nb = bolh.copy(null, session);
                nb.set('bomno', nd.data.bomno);
                nb.set('createUser', Vega.user.data.Userid);
                nb.set('createTime', new Date());
                nb.set('updateUser', null);
                nb.set('updateTime', null);

                nd.bolhs().add(nb);

                bolh.bols().each(function(rec){
                    var cr = rec.copy(null, session);
                    cr.set('bomno', nd.data.bomno);
                    nb.bols().add(cr);
                });
                /*
                 Ext.Object.each(session.data['sample.Bol'], function(key, value, self){
                 var rec = value.record;
                 if(rec.get('bomhId') == d.id){
                 var cr = rec.copy(null, session);
                 cr.set('bomno', nd.data.bomno)
                 nd.bols().add(cr);
                 }
                 });
                 */
            }
        }

        nd.set('subTotal', (nd.data.colorCompTotal * 100 + nd.data.processtotal * 100) / 100);
        nd.set('total', nd.get('subTotal') + nd.get('assoctotal'));

        grid.getStore().add(nd);
        grid.getView().refresh();
    },

    onEditCostClick: function(btn){
        var me = this,
            view = me.lookupReference('costslist'),
            selection = view.getSelection()[0];

        this.showCosting(selection);
    },

    onDeleteCostClick: function(btn){
        var me = this,
            grid = me.lookupReference('costslist'),
            store = grid.getStore(),
            bomhCellEdit = grid.getPlugin("bomhCellEdit"),
            selection = grid.getSelectionModel().getSelection()[0];

        bomhCellEdit.cancelEdit();

        grid.getSelectionModel().deselectAll();
        //store.remove(grid.getSelection()[0]);

        //delete this.getSession().data['sample.Bolh'][selection.getBolh().id];
        /**
         * By setting record property dropped as  true,
         * This will remove record from session.
         */
        //console.log(selection.getBolh(), this.getSession().data['sample.Bolh'])
        /*
        var bolhId = '';
        if(selection.getBolh() != null){
            //selection.getBolh().dropped = true;
            bolhId = selection.getBolh().id;
            selection.setBolh(null);
            //console.log('not null', selection, this.getSession().peekRecord('sample.Bolh', bolhId))
        }

        if(bolhId.split('-').length < 3 && this.getSession().peekRecord('sample.Bolh', bolhId) != null){
            delete this.getSession().data['sample.Bolh'][bolhId];
        }
        */
        selection.drop();
        //console.log(this.getSession().data['sample.Bolh'])
        //console.log(this.getSession())
    },

    onCopyFromClick: function(btn){
        var me = this,
            view = me.getView();

        me.win = view.add({
            xtype: 'window',

            layout: {
                type: 'fit'
            },

            header: {
                title: 'Copy From Other Style',
                iconCls: 'x-fa fa-clone',
                titlePosition: 0,
                titleAlign: 'left'
            },

            padding: 10,

            width: 720,
            height: 240,
            minWidth: 720,
            minHeight: 240,

            //modal: true,
            monitorResize: true,
            maximizable: true,
            constrain: true,
            closable: true,

            tools: [{
                type: 'pin'
            }],

            items: [{
                xtype: 'form',
                layout: {
                    type: 'anchor'
                },
                defaults: {
                    margin: '0 0 10 0'
                },
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldDefaults: {
                        margin: '0 15 0 0'
                    },
                    items:[{
                        xtype: 'combo',
                        name: 'style',
                        fieldLabel: 'Style #',
                        labelWidth: 50,
                        //hideTrigger: true,
                        tabIndex: 0,
                        allowBlank: false,

                        store: 'memStyles',
                        remoteStore: 'Styles',
                        valueField: 'id',
                        displayField: 'id',

                        selectOnFocus: false,
                        selectOnTab: false,
                        //typeAhead: true,
                        //forceSelection: true,
                        //minChars: 1,
                        matchFieldWidth: false,
                        queryMode: 'local',
                        //queryParam: "filter",
                        pageSize: 50,
                        listConfig: {
                            width: 340,
                            loadingText: 'Searching....',
                            emptyText: '<p style="padding-left: 5px;">No match found.</p>'

                            // Custom rendering template for each item
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            triggerClear: function(combo){

                                var cboColor = combo.ownerCt.query('combo[name="color"]')[0],
                                    cboBomno = combo.ownerCt.query('combo[name="bomno"]')[0];

                                cboColor.getStore().clearFilter();
                                cboColor.setValue('');

                                cboBomno.setValue('');
                            },
                            select: function(combo){
                                var cboColor = combo.ownerCt.down('combo[name="color"]'),
                                    store = cboColor.getStore();

                                store.clearFilter();

                                if(!Ext.isEmpty(combo.getValue())){

                                    store.filter([{
                                        property: 'text',
                                        value: combo.getValue().toUpperCase(),
                                        operator: '='
                                    }]);

                                    //cboColor.select(store.first());
                                }
                            }
                        }
                    },{
                        xtype: 'combo',
                        name: 'color',
                        fieldLabel: 'Color',
                        labelWidth: 40,
                        //hideTrigger: true,
                        tabIndex: 1,
                        allowBlank: false,

                        store: 'memStColors',
                        remoteStore: 'stColors',

                        valueField: 'label',
                        displayField: 'label',

                        selectOnFocus: false,
                        selectOnTab: false,
                        //typeAhead: true,
                        //forceSelection: true,
                        //minChars: 1,
                        autoLoadOnValue: true,
                        matchFieldWidth: false,
                        queryMode: 'local',
                        pageSize: 50,
                        tpl: new Ext.XTemplate('<tpl for=".">' +
                            '<tpl if="[xindex] == 1">' +
                            '<table class="cbo-list">' +
                            '<tr>' +
                            '<th width="55%">Color</th>' +
                            '<th width="45%">Code #</th>' +
                            '</tr>' +
                            '</tpl>' +
                            '<tr class="x-boundlist-item">' +
                            '<td>{label}</td>' +
                            '<td>{text}</td>' +
                            '</tr>' +
                            '<tpl if="[xcount-xindex]==0">' +
                            '</table>' +
                            '</tpl>' +
                            '</tpl>'),
                        listConfig: {
                            width: 340,
                            loadingText: 'Searching....',
                            emptyText: '<p style="padding-left: 5px;">No match found.</p>'

                            // Custom rendering template for each item
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            triggerClear: function(combo){

                                var cboBomno = combo.ownerCt.query('combo[name="bomno"]')[0];

                                cboBomno.setValue('');
                            },
                            beforequery: {
                                fn: function(qe){

                                }
                            },
                            select: function (combo, rec) {
                                var cboStyle = combo.ownerCt.query('combo[name="style"]')[0],
                                    cboBomno = combo.ownerCt.query('combo[name="bomno"]')[0],
                                    store = cboBomno.getStore();

                                Ext.apply(store.getProxy().extraParams, {
                                    style: cboStyle.getValue().trim(),
                                    color: combo.getValue().trim()
                                });

                                store.load({
                                    callback: function(){
                                        //qe.combo.select(store.first());
                                        //colorCombo.fireEvent('select', combo, [store.first()]);
                                    }
                                });
                            }

                        }
                    },{
                        xtype: 'combo',
                        name: 'bomno',
                        fieldLabel: 'C.S #',
                        labelWidth: 40,
                        width: 95,
                        store: 'Bomnos',
                        displayField: 'id',
                        valueField: 'id',

                        editable: false,
                        forceSelection: true,
                        //minChars: 1,
                        tabIndex: 2,
                        matchFieldWidth: true,
                        queryMode: 'local',
                        //pageSize: 15,
                        //queryDelay: 500,
                        allowBlank: false,
                        listeners: {
                            beforequery: {
                                fn: function(qe){

                                    //delete qe.combo.lastQuery;
                                }
                            }
                        }
                    }]
                }],

                buttons: [{
                    action: 'save',
                    text: 'Save',
                    formBind: true,
                    //glyph: 86,
                    iconCls: 'x-fa fa-save',
                    handler: function(btn){
                        var form = me.win.down('form').getForm(),
                            data = form.getValues();

                        me.copyCostSheet(data);
                    }
                },{
                    action: 'close',
                    text: 'Close',
                    //glyph: 88,
                    iconCls: 'x-fa fa-close',
                    handler: function(btn){
                        me.win.close();
                    }
                }]
            }]
            // Create a child session that will spawn from the current session of this view
            //session: true,
        });

        me.win.show('', function(){
            me.mv.mask();
        });
    },

    copyCostSheet: function(data){
        var me = this,
            theSample = me.getViewModel().get('theSample'),
            grid = me.lookupReference('costslist'),
            lbo = grid.getStore().getData().last(),
            id = data.style+'-'+data.color+'-'+data.bomno;


        var processMask = new Ext.LoadMask({
            msg: 'Processing... Please wait',
            target: me.mv
        });

        processMask.show('', function(){
            me.win.close();
        });

        Vega.model.sample.Bomh.load(id, {
            success: function (d, ope) {

                var nd = d.copy(null);
                //console.log('onCopyStyleClick - before', nd);
                nd.set('style', theSample.data.style);
                nd.set('color', theSample.data.color);
                nd.set('bomno', lbo ? lbo.data.bomno + 1 : 1);

                nd.data.subTotal = null;
                nd.data.assoctotal = null;
                nd.data.total = null;

                nd.data.confirm_yn = null;
                nd.data.updateUser = null;
                nd.data.updateTime = null;

                nd.set('createUser', Vega.user.data.Userid);
                nd.set('createTime', new Date());

                d.boms().each(function(rec){
                    var cr = rec.copy(null);
                    cr.set('style', nd.data.style);
                    cr.set('color', nd.data.color);
                    cr.set('bomno', nd.data.bomno);
                    nd.boms().add(cr);
                });

                var bolh = d.bolhs().first();
                if(bolh){
                    var nb = bolh.copy(null);
                    nb.set('style', nd.data.style);
                    nb.set('color', nd.data.color);
                    nb.set('bomno', nd.data.bomno);

                    nb.set('createUser', Vega.user.data.Userid);
                    nb.set('createTime', new Date());
                    nb.set('updateUser', null);
                    nb.set('updateTime', null);

                    nd.bolhs().add(nb);

                    bolh.bols().each(function(rec){
                        var cr = rec.copy(null);
                        cr.set('style', nd.data.style);
                        cr.set('color', nd.data.color);
                        cr.set('bomno', nd.data.bomno);
                        nb.bols().add(cr);
                    });
                }

                nd.set('subTotal', (nd.data.colorCompTotal * 100 + nd.data.processtotal * 100) / 100);
                nd.set('total', nd.get('subTotal') + nd.get('assoctotal'));

                grid.getStore().add(nd);
                grid.getView().refresh();

            },
            failure: function(rec, ope) {

            },
            callback: function(rec, ope){
                processMask.hide();
            }
        });
    },

    onSaveCostClick: function(){
        // Save the changes pending in the win's child session back to the
        // parent session.
        var me = this,
            session = me.getSession(),
            win = me.win,
            view = me.getView(),
            form = me.lookupReference('detail'),
            grid = me.lookupReference('costslist'),
            isEdit = this.isEdit,
            id;

        var bomh = win.getViewModel().get('theCosting');

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = win.getViewModel().get('theCosting').id;
            }

            win.getSession().save();

            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store

                grid.getStore().add(session.getRecord('sample.Bomh', id));
            }
            /*
             else {
             rec = session.peekRecord('sample.Bomh', id);
             }
             */

            //console.log(win.getViewModel(),session);
            grid.getView().refresh();

            win.close();
        }
    },

    onPreviewCostClick: function(item, e){
        var me = this,
            grid = me.lookupReference('costslist'),
            rec = grid.getSelection()[0],
            view = me.getView(),
            //mv = Vega.app.getMainView(),
            xf = Ext.util.Format;

        var srcPath = xf.format('../services/CostSheetPrint.ashx?ID={0}&bomno={1}', rec.getProduct().getId() ,rec.data.bomno);

        me.win = view.add({
            xtype: 'window',

            title: 'Cost Sheet #' + rec.data.bomno,
            iconCls: "x-fa fa-calculator",

            layout: {
                type: 'fit'
            },

            renderTo: Ext.getBody(),
            //maximized: true,
            maximizable: true,
            //alignTarget: '',
            width: view.getWidth() * 0.98,
            //maxWidth: 1366,
            height: view.getHeight() * 0.98,

            items: [{
                xtype: 'component',
                itemId: 'contentIframe',
                autoEl: {
                    tag: 'iframe',
                    style: 'height: 100%; width: 100%; border: none',
                    src: srcPath
                }
            }],

            buttons: [{
                text: 'Print',
                handler: function(btn){
                    var iframe = me.win.getComponent('contentIframe');

                    if(iframe){
                        var cw = iframe.getEl().dom.contentWindow;
                        //console.log(iframe, cw.document);
                        cw.print();
                    }
                }
            }, {
                text: 'Cancel',
                handler: function(btn){
                    me.win.close();
                },
                scope: this
            }]
        });

        me.win.show('', function(){
            me.mv.mask();
        });

    },

    onAddReqClick: function(btn){
        this.showRequest(null);
    },

    onCopyReqClick: function(btn){
        var me = this,
            session = me.getSession(),
            grid = me.lookupReference('reqs').down('dataview'),
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', nd);

        nd.set('userId', Vega.user.data.Userid);
        nd.set('userTime', new Date());

        d.reqds().each(function(rec){
            var cr = rec.copy(null, session);

            nd.reqds().add(cr);
        });

        grid.getStore().add(nd);
        grid.refresh();
    },

    onEditReqClick: function(btn){
        var me = this,
            view = me.lookupReference('reqs').down('dataview'),
            selection = view.getSelection()[0];

        this.showRequest(selection);
    },

    onDeleteReqClick: function(btn){
        var me = this,
            view = me.lookupReference('reqs').down('dataview'),
            store = view.getStore(),
            selection = view.getSelectionModel().getSelection()[0];

        view.getSelectionModel().deselectAll();

        selection.drop();
    },

    onSaveReqClick: function(){
        // Save the changes pending in the win's child session back to the
        // parent session.
        var me = this,
            session = me.getSession(),
            win = me.win,
            view = me.getView(),
            form = me.lookupReference('req-form'),
            dataview = me.lookupReference('reqs').down('dataview'),
            isEdit = this.isEdit,
            id, rec;

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = win.getViewModel().get('theRequest').id;
            }

            win.getSession().save();

            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store
                rec = session.getRecord('sample.Reqh', id);
                view.getStore().add(rec);
            }

            dataview.refresh();
            win.close();
        }
    },

    onPreviewReqClick: function(item, e){
        var me = this,
            grid = me.lookupReference('reqs').down('dataview'),
            rec = grid.getSelection()[0],
            view = me.getView(),
            //mv = Vega.app.getMainView(),
            xf = Ext.util.Format;

        var da = [], ea = [], jo = rec.data;

        if(rec.getId() > 0){
            rec.reqds().each(function(item){
                da.push(item.data);
            });

            rec.reqes().each(function(item){
                ea.push(item.data);
            });

            jo.reqds = da;
            jo.reqes = ea;
        }
        else {
            var to = me.getSession().getChanges();

            jo = to["sample.Reqh"]["C"][0];

            jo.reqds = to["sample.Reqd"] ? to["sample.Reqd"]["C"] : [];
            jo.reqes = to["sample.Reqe"] ? to["sample.Reqe"]["C"] : [];
        }

        //console.log(jo)
        Ext.Ajax.request({
            url: '../api/Reqh/pdf',
            method: 'POST',
            binary: true,
            jsonData: [jo],
            success: function(response, options) {
                // decode response
                //console.log(response);
                var pdf = new Blob([response.responseBytes], {type: 'application/pdf'}),
                    fileurl = window.URL.createObjectURL(pdf);

                me.win = view.add({
                    xtype: 'window',

                    title: 'Request For Quote',
                    iconCls: "x-fa fa-print",

                    layout: {
                        type: 'fit'
                    },

                    renderTo: Ext.getBody(),
                    //maximized: true,
                    maximizable: true,
                    //alignTarget: '',
                    width: view.getWidth() * 0.98,
                    //maxWidth: 1366,
                    height: view.getHeight() * 0.98,

                    items: [{
                        xtype: 'component',
                        itemId: 'contentIframe',
                        autoEl: {
                            tag: 'iframe',
                            style: 'height: 100%; width: 100%; border: none',
                            //src: xf.format('../services/RFQHandler.ashx?ID={0}&bomno={1}', rec.getId() ,rec.data.bomno)
                            src: fileurl
                        }
                    }],

                    buttons: [{
                        text: 'Print',
                        handler: function(btn){
                            var iframe = me.win.getComponent('contentIframe');

                            if(iframe){
                                var cw = iframe.getEl().dom.contentWindow;
                                //console.log(iframe, cw.document);
                                cw.print();
                            }
                        }
                    }, {
                        text: 'Cancel',
                        handler: function(btn){
                            me.win.close();
                        },
                        scope: this
                    }]
                });

                me.win.show('', function(){
                    me.mv.mask();
                });
            },
            failure: function(response, options) {
                Ext.Msg.alert(response.statusText, response.status + ' - ' + response.responseText );
            },
            callback: function(response, opotions) {

            }
        });

    },

    onGridRowDblclick: function(grid, rec, tr, idx, e){
        this.showCosting(rec);
        //console.log(rec)
    },

    onGridRowSelect: function(sm, selected, idx){

    },

    showCosting: function(rec){
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            //mv = Vega.app.getMainView(),
            theSample = vm.get('theSample'),
            theBomh = theSample.bomhs().last();

        this.isEdit = !!rec;

        var mStyle = theSample.data.style.trim(),
            mColor = theSample.data.color.trim(),
            mBomno =  theBomh ? theBomh.data.bomno + 1 : 1;

        me.win = view.add({
            xtype: 'window',
            iconCls: "x-fa fa-calculator",
            reference: 'costing-window',

            bind: {
                title: '{title}'
            },

            layout: {
                type: 'fit'
            },

            renderTo: Ext.getBody(),
            //maximized: true,
            maximizable: true,
            //alignTarget: '',
            width: view.getWidth() * 0.98,
            height: view.getHeight() * 0.98,

            minHeight: 320,

            viewModel: {
                data: {
                    title: !rec ? 'Add New Costing' : ('Edit Costing: ' + (rec.get('style') && rec.get('color') ? rec.get('style') + ' / ' + rec.get('color') + '  - Cost Sheet #' + rec.get('bomno') : '')),
                    bomsValid: true
                },

                links: {
                    // If we are passed a record, a copy of it will be created in the newly spawned session.
                    // Otherwise, create a new phantom customer in the child.
                    theCosting: rec || {
                        type: 'sample.Bomh',
                        create: {
                            style: mStyle,
                            color: mColor,
                            bomno: mBomno,
                            //processType: theSample.data.processtype.trim(),
                            EffStartDate: '2000-01-01 00:00:00',
                            EffEndDate: '2099-12-31 12:59:59',
                            createUser: Vega.user.data.Userid
                        }
                    }
                },

                formulas: {

                    costValid: {
                        get: function(get){
                            return get('bomsValid') && get('theCosting').isValid();
                        }
                    },

                    isCostPhantom: {
                        bind: {
                            bindTo: '{theCosting}',
                            deep: true
                        },
                        get: function (bomh) {
                            return bomh.phantom;
                        }
                    }

                    /*
                    theProcessType: {
                        bind: {
                            bindTo: '{theProcessH}',
                            deep: true
                        },
                        get: function(bolh){
                            if(bolh){
                                console.log(bolh)
                                return bolh.data.ProcessType;
                            }
                        },
                        set: function(value){
                            console.log(this, value);
                            //this.set('theProcessH.ProcessType', value)
                        }
                    }
                    */
                    /*
                    materialsTotal: {
                        bind: {
                            bindTo: '{theCosting.boms}',
                            deep: true
                        },
                        get: function(boms){
                            var total = 0;
                            boms.each(function(r, idx){
                                total += r.get('cost') * r.get('qty');
                            })
                            return total;
                        },
                        set: function(value){
                            //console.log(value)
                            //this.set('materialsTotal', value);
                        }
                    },

                    laborTotal: {
                        bind: {
                            bindTo: '{theCosting.bolhs}',
                            deep: true
                        },
                        get: function(bolhs){
                            var total = 0,
                                bolh = bolhs.first();

                            if(bolh){
                                bolh.bols().each(function(r, idx){
                                    total += r.get('price');
                                });
                            }
                            return total;
                        },
                        set: function(value){
                            //console.log(value)
                            //this.set('laborTotal', value);
                        }
                    },

                    subTotal: {
                        get: function(data){
                            return (data('materialsTotal')*100 + data('laborTotal')*100)/100;
                        },
                        set: function(value){
                            //console.log(value)
                            //this.set('subTotal', value);
                        }
                    },

                    associateTotal: {
                        bind: {
                            bindTo: '{theCosting.assoctotal}',
                            deep: true
                        },
                        get: function(data){
                            return data;
                        }
                    },

                    grandTotal: {
                        get: function(data){
                            return (data('subTotal')*100 + data('associateTotal')*100) / 100;
                        },
                        set: function(value){
                            //console.log(value)
                            //this.set('subTotal', value);
                        }
                    }
                    */
                }
            },

            // Creates a child session that will spawn from the current session
            // of this view.
            session: true,

            items: [{
                xtype: 'style-edit-detail',
                reference: 'detail'
            }],

            buttons: [{
                text: 'Save',
                bind: {
                    disabled: '{!costValid}'
                },
                handler: 'onSaveCostClick'
            }, {
                text: 'Cancel',
                handler: function(btn){
                    me.win.close();
                },
                scope: this
            }]
        });


        var wvm = me.win.getViewModel(),
            //cId = wvm.get('theCosting'),
            cRec = wvm.get('theCosting');
            //rec = rec != null ? rec : cRec,

        var detail = me.lookupReference('detail'),
            costSelect = detail.lookupReference('costSelect'),
            processSelect = detail.lookupReference('processSelect'),
            changes = this.getSession().getChanges();

        costSelect.setReadOnly(rec && !rec.phantom);

        if(changes && changes['sample.Bolh']){
            if(changes['sample.Bolh'].D && changes['sample.Bolh'].D.indexOf(cRec.id) != -1)
            {
                //console.log(changes)
                processSelect.setDisabled(true);
            }
        }

        var boms = cRec.boms();
        boms.setGroupField('rawMatType');

        boms.on('update', function(store, record, op, mod, dt) {
            //console.log('update', record, op, mod)
            var flag = true,
                bomtotal = 0;

            store.each(function(r, idx){
                if(r.data.rawStyle && r.data.rawColor){
                    bomtotal += r.data.cost * r.data.qty;
                }
                else {
                    flag = false;
                }

            });

            wvm.set('bomsValid', flag);

            //me.win.getViewModel().get('theCosting').set('colorCompTotal', bomtotal)
            cRec.set('colorCompTotal', bomtotal);
            cRec.set('total', cRec.get('subTotal') + cRec.get('assoctotal'));

        }, this);

        boms.on('datachanged', function(store){
            console.log('datachanged', store.getCount());

            var flag = true,
                bomtotal = 0;

            store.each(function(r, idx){
                if(r.data.rawStyle && r.data.rawColor){
                    bomtotal += r.data.cost * r.data.qty;
                }
                else {
                    flag = false;
                }

            });

            wvm.set('bomsValid', flag);

            //me.win.getViewModel().get('theCosting').set('colorCompTotal', bomtotal)
            cRec.set('colorCompTotal', bomtotal);
            cRec.set('total', cRec.get('subTotal') + cRec.get('assoctotal'));
        }, this);

        boms.on('remove', function(store , records , index , isMove){

        }, this);

        if(!this.isEdit){

            boms.add({
                line_seq: 0,
                style: mStyle,
                color: mColor,
                bomno: mBomno,
                memo: 'SELF',
                rawMatType: 'FABRICS'
            },{
                line_seq: 1,
                style: mStyle,
                color: mColor,
                bomno: mBomno,
                memo: 'CONT #1',
                rawMatType: 'FABRICS'
            },{
                style: mStyle,
                color: mColor,
                bomno: mBomno,
                memo: 'SUB PAPER',
                rawMatType: 'SUBLIMATION PAPER'
            },{
                style: mStyle,
                color: mColor,
                bomno: mBomno,
                memo: 'STONES',
                rawMatType: 'STONE SHEETS'
            },{
                style: mStyle,
                color: mColor,
                bomno: mBomno,
                memo: 'TRIMS',
                rawMatType: 'TRIMS'
            });

        }

        //console.log('theProcessH', rec, bolh, wvm.get('theProcessH'))
        var bolh = cRec.bolhs().first();

        if(bolh){
            //console.log(rec.bolhs().first(), bolh)
            //processSelect.setDisabled(rec && !rec.phantom);
            //processSelect.setReadOnly(rec && !rec.phantom);

            var bols = bolh.bols();

            bols.on('update', function(store, record, op, mod, dt) {
                //console.log('bols update', store, cRec)

                var boltotal = 0;
                store.each(function(r, idx){
                    boltotal += r.data.price;
                });

                bolh.set('TotalCost', boltotal);

                cRec.set('processtotal', boltotal);
                cRec.set('total', cRec.get('subTotal') + cRec.get('assoctotal'));

            }, this);

            bols.on('datachanged', function(store){
                //console.log('datachanged', store, rec, cRec)

                //vm.get('theProcessH').set('ProcessType', me.lookupReference('detail').lookupReference('processSelect').getValue())
                var boltotal = 0;
                store.each(function(r, idx){
                    boltotal += r.data.price;
                });

                bolh.set('TotalCost', boltotal);

                cRec.set('processtotal', boltotal);
                cRec.set('total', cRec.get('subTotal') + cRec.get('assoctotal'));

            }, this);

            bols.on('remove', function(store , records , index , isMove){

            }, this);
        }

        wvm.set('theProcessH', bolh);

        me.win.show('', function(){
            me.mv.mask();
        });
    },

    showRequest: function(rec){
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
        //mv = Vega.app.getMainView(),
            smp = vm.get('theSample');

        if(smp){
            var style = smp.data.style.trim(),
                color = smp.data.color.trim(),
                bodyref = smp.data.user2.trim();

            me.isEdit = !!rec;

            me.win = view.add({
                xtype: 'window',
                iconCls: "x-fa fa-calculator",
                reference: 'request-window',

                bind: {
                    title: '{title}'
                },

                layout: {
                    type: 'fit'
                },

                renderTo: Ext.getBody(),
                //maximized: true,
                maximizable: true,
                //alignTarget: '',

                width: view.getWidth() * 0.98,
                height: view.getHeight() * 0.98,

                viewModel: {
                    data: {
                        title: 'Request For Quote: '
                    },

                    links: {
                        // If we are passed a record, a copy of it will be created in the newly spawned session.
                        // Otherwise, create a new phantom customer in the child.
                        theRequest: rec || {
                            type: 'sample.Reqh',
                            create: {
                                style: style,
                                color: color,
                                bomno: 1,
                                bodyref: bodyref,
                                userId: Vega.user.data.Userid,
                                userTime: new Date()
                            }
                        }
                    },

                    formulas: {
                        testValue: {
                            bind: '{theRequest.testing}',
                            get: function(value) {
                                return {
                                    testing: value
                                };
                            },
                            set: function(value) {
                                this.set('theRequest.testing', value.testing);
                            }
                        },

                        inspectValue: {
                            bind: '{theRequest.inspection}',
                            get: function(value) {
                                return {
                                    inspection: value
                                };
                            },
                            set: function(value) {
                                this.set('theRequest.inspection', value.inspection);
                            }
                        }
                    }
                },

                // Creates a child session that will spawn from the current session
                // of this view.
                session: true,

                items: [{
                    xtype: 'style-edit-requestForm',
                    reference: 'req-form'
                }],

                buttons: [{
                    text: 'Save',
                    bind: {
                        //disabled: '{!isCostValid}'
                    },
                    handler: 'onSaveReqClick'
                }, {
                    text: 'Cancel',
                    handler: function(btn){
                        me.win.close();
                    },
                    scope: this
                }]
            });

            var wvm = me.win.getViewModel(),
                request = wvm.get('theRequest'),
            //mats = request.reqds(),
                strLabel = '', seq = 0, printCtn = 0, stoneCtn = 0, trimCtn = 0, paperCtn = 0;

            wvm.setStores({
                fabrics: {
                    //model: 'sample.Reqd',
                    source: request.reqds(),
                    groupField: 'rawmattype',
                    filters: [{
                        property: 'rawmattype',
                        value: 'FABRICS'
                    }]
                },
                others: {
                    //model: 'sample.Reqd',
                    source: request.reqds(),
                    groupField: 'rawmattype'
                },
                emails: {
                    source: request.reqes()
                }
            });

            var fabrics = wvm.get('fabrics'),
                others = wvm.get('others'),
                emails = wvm.get('emails'),
                nda = [];

            others.filterBy(function(rec){
                return rec.data.rawmattype != 'FABRICS';
            });

            //fabrics.setGroupField('rawmattype');
            //others.setGroupField('rawmattype');

            if(!me.isEdit){
                smp.bomhs().getAt(0).boms().each(function (m) {

                    if(m.data.rawMatType == 'FABRICS'){
                        switch(m.data.line_seq){
                            case 0:
                                strLabel = 'SELF';
                                break;
                            default:
                                strLabel = 'CONTRAST ' + m.data.line_seq;
                        }

                        nda = fabrics.add({
                            lineseq: m.data.line_seq,
                            style: m.data.rawStyle,
                            color: m.data.rawColor,
                            label: strLabel,
                            description: m.data.descript + (Ext.isEmpty(m.data.fabcontent) ? '' : ' (' + m.data.fabcontent + ')'),
                            rawmattype: m.data.rawMatType,
                            qty1: m.data.qty,
                            width: m.data.width,
                            weight: m.data.weight
                        });

                        request.reqds().add(nda);
                    }
                    else {
                        switch(m.data.rawMatType){
                            case 'PRINTS':
                                seq = printCtn += 1;
                                strLabel = m.data.grp;
                                break;
                            case 'SUBLIMATION PAPER':
                                seq = paperCtn += 1;
                                strLabel = m.data.rawMatType;
                                break;
                            case 'STONE':
                            case 'STONE SHEETS':
                                seq = stoneCtn += 1;
                                strLabel = 'STONE ' + stoneCtn;
                                break;
                            case 'TRIMS':
                                seq = trimCtn += 1;
                                strLabel = 'TRIM ' + trimCtn;
                                break;
                            default:
                                break;
                        }

                        nda = others.add({
                            lineseq: seq - 1,
                            style: m.data.rawStyle,
                            color: m.data.rawColor,
                            label: strLabel,
                            description: m.data.descript,
                            rawmattype: m.data.rawMatType,
                            qty1: m.data.qty,
                            width: m.data.width,
                            weight: m.data.weight
                        });

                        request.reqds().add(nda);
                    }
                });
            }

            fabrics.on('datachanged', function(s){

                s.each(function(rec,idx){
                    rec.set('lineseq', idx);
                });

            });

            others.on('datachanged', function(s){
                var seq = 0, print = 0, paper = 0, stone = 0, trim = 0;

                s.each(function(rec,idx){
                    switch(rec.data.rawmattype){
                        case 'PRINTS':
                            seq = print;
                            print += 1;
                            break;
                        case 'SUBLIMATION PAPER':
                            seq = paper;
                            paper += 1;
                            break;
                        case 'STONE':
                        case 'STONE SHEETS':
                            seq = stone;
                            stone += 1;
                            break;
                        case 'TRIMS':
                            seq = trim;
                            trim += 1;
                            break;
                        default:
                            break;
                    }

                    rec.set('lineseq', seq);
                });
            });
        }
        else {
            Ext.Msg.show({
                title: 'Error!',
                msg: 'Unable to read the record(the Sample)',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        }

        me.win.show('', function(){
            me.mv.mask();
        });
    },

    onItemContextMenu: function(h, j, k, g, l){
        /*
        l.stopEvent();

        var i = h.getSelectionModel();

        if(!i.isSelected(g)){
            i.select(g)
        }

        this.view.contextmenu.showAt(l.getXY())
        */
    },

    onPhotoDropped: function(view, recs){
        var me = this,
            form = me.getView(),
            sData = me.getViewModel().get('theSample').data,
            mv = form.previousSibling('multiview'),
            grid = mv.refs.grid,
            sample = grid.getStore().getById(sData.id),
            total = view.getStore().getCount(),
            routeId = form.ownerCt.routeId;

        //console.log(routeId, grid.getStore(), sData.id)
        var idx = 1,
            sub = total - recs.length;

        recs.forEach(function(rec){

            rec.set('FID', '3');
            rec.set('F_APPLICATION', routeId == 'product' ? 'PROD': 'DAL');
            rec.set('F_LINK', 'DLIB/BLU-PHOTOS/');
            rec.set('F_BFLAG', true);
            rec.set('F_STYLE', sample.data.style.trim());
            rec.set('F_DESC5', sample.data.user2);
            rec.set('F_DESC6', sample.data.prints.split('(#)')[0]);
            rec.set('F_DESC3', sample.data.prints.split('(#)')[1]);
            rec.set('F_EXT', '.' + rec.data.name.split('.').pop());
            rec.set('F_NAME', sample.data.style.trim() + (!Ext.isEmpty(sample.data.user2) ? '_' + sample.data.user2.trim() : '') + (!Ext.isEmpty(sample.data.prints) ? '_' +  sample.data.prints.split('(#)')[0] : '') + rec.data.F_EXT);
            rec.set('F_TYPE', rec.data.type);
            rec.set('F_SIZE', rec.data.size);
            rec.set('F_OWNER', sample.id);
            rec.set('F_LOCATION', rec.data.name + '_' + rec.data.size);
            rec.set('F_CATEGORY', 'Photos');
            rec.set('F_USERID', Vega.user.data.Userid);
            rec.set('F_CREATED_ON', new Date());
            idx = idx + 1;
            //rec.set('F_NAME', routeId == 'product' ? sample.data.style.trim() + '_' + sample.data.color.trim() + (!Ext.isEmpty(rec.get('F_MFLAG')) ? '_' + rec.get('F_MFLAG').toLowerCase() : '') + rec.data.F_EXT : sample.data.style.trim() + (!Ext.isEmpty(sample.data.user2) ? '_' + sample.data.user2.trim() : '') + (!Ext.isEmpty(sample.data.prints) ? '_' +  sample.data.prints.split('(#)')[0] : '') + '_' + rec.data.RORDER + rec.data.F_EXT);
            //rec.set('RORDER', routeId == 'product' ? (sub + idx > 2 ? null : sub + idx) : null);
            //rec.set('F_LINK', routeId == 'product' ? (sub + idx > 2 ? 'DLIB/BLU-PHOTOS/' : 'N41IMG/200xImages/') : 'DLIB/BLU-PHOTOS/');
            //rec.set('F_BFLAG', routeId == 'product' ? (sub + idx > 2 ? true : false) : true);
            //rec.set('F_MFLAG', sub + idx > 2 ? null : (sub + idx == 1 ? 'FRONT' : 'BACK'));
        });

    },

    onFileDropped: function(view, recs){

    },

    onAttachItemDblClick: function(view, rec, item, index){
        var me = this,
            form = me.getView(),
            viewer = form.up('sample'),
            reference = 'sample-'+rec.getId().toString(),
            aw = viewer.lookupReference(reference),
            //title = rec.data.Title,
            //mv = Vega.app.getMainView(),
            xf = Ext.util.Format;

        //prefix = 'nDisplay-';

        var srcPath = xf.format('../services/PDFHandler.ashx?path={0}&name={1}', xf.format('SAMPLE-ATTACHMENTS/{0}/{1}', xf.date(rec.data.created, 'Y/n/j'), rec.data.fileId), rec.data.name);

        if(rec.data.hasOwnProperty('path') && !Ext.isEmpty(rec.data.path)){
            srcPath = rec.data.path;
        }

        if (!aw) {
            aw = form.add({
                xtype: 'window',
                reference: reference,
                iconCls: 'x-fa fa-print',
                title: rec.data.name,

                width: form.getWidth() * 0.98,
                height: form.getHeight() * 0.98,

                renderTo: Ext.getBody(),

                modal: true,
                maximizable: true,
                //draggable: false,
                //resizable: false,

                layout: 'fit',

                /*
                tbar: {
                    padding: '5 0 5 0',
                    items: {
                        xtype: 'tbtext',
                        html: '<i class="x-fa fa-times-circle-o fa-2x fa-fw red-txt"></i>',
                        style: {
                            cursor: 'pointer'
                        },
                        listeners: {
                            render: function (c) {
                                //var panel = img.ownerCt.body;
                                c.getEl().on({
                                    click: function (event, element) {
                                        aw.close();
                                    }
                                });
                            }
                        }
                    }
                },
                */
                //active: rec,
                items: [{
                    xtype: 'component',
                    itemId: 'contentIframe',
                    autoEl: {
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%; border: none',
                        //src: 'QuickGuideforIllustratorCS6-Basics.pdf'
                        src: srcPath
                    }
                }],

                buttons: [{
                    text: 'Print',
                    handler: function(btn){
                        var iframe = aw.getComponent('contentIframe');

                        if(iframe){
                            var cw = iframe.getEl().dom.contentWindow;
                            //console.log(iframe, cw.document);
                            cw.print();
                        }
                    }
                }, {
                    text: 'Cancel',
                    handler: function(btn){
                        aw.close();
                    },
                    scope: this
                }]
            });
        }

        aw.show('', function(){
            me.mv.mask();
        });
    },

    onPhotoItemDblClick: function(view, rec, item, index){

        var me = this,
            form = me.getView(),
            viewer = form.up('sample') || form.up('product'),
            reference = viewer.routeId + '-photo-' + rec.getId().toString(),
            pw = viewer.lookupReference(reference),
            //mv = Vega.app.getMainView(),
            title = rec.data.Title;

        if(Ext.isEmpty(rec.data.Title)){
            title = (rec.data.F_OWNER != null ? rec.data.F_OWNER + ' ' : '') + rec.data.F_STYLE;
        }

        var srcPath = '';

        if(!Ext.isEmpty(rec.data.F_NAME) && !Ext.isEmpty(rec.data.F_TYPE)){
            srcPath = '../' + rec.data.F_LINK + rec.data.F_PATH + '/' + rec.data.ID + '/' + rec.data.F_NAME;
            if(rec.data.ID < 0){
                srcPath = '../' + rec.data.F_LINK + rec.data.F_NAME;
            }
        }
        else {
            srcPath = '../' + rec.data.F_LINK + rec.data.F_PATH + '/' + rec.data.F_LOCATION + rec.data.F_EXT;
        }

        if(rec.data.hasOwnProperty('path') && !Ext.isEmpty(rec.data.path)){
            srcPath = rec.data.path;
        }

        if (!pw) {
            pw = form.add({
                xtype: 'window',
                reference: reference,
                title: 'No. ' + title,

                width: form.getWidth() * 0.98,
                height: form.getHeight() * 0.98,

                renderTo: Ext.getBody(),

                //header: false,
                //headerPosition: 'right',

                modal: true,
                //draggable: false,
                //resizable: false,
                //constrain: true,
                //closable: true,
                maximizable: true,
                //scrollable: true,

                lbar: {
                    padding: '5 0 0 0',
                    items: {
                        xtype: 'tbtext',
                        html: '<i class="x-fa fa-times-circle-o fa-2x fa-fw red-txt"></i>',
                        style: {
                            cursor: 'pointer'
                        },
                        listeners: {
                            render: function (c) {
                                //var panel = img.ownerCt.body;
                                c.getEl().on({
                                    click: function (event, element) {
                                        pw.close();
                                    }
                                });
                            }
                        }
                    }
                },

                layout: 'fit',
                //active: rec,
                items: [{
                    xtype: 'container',
                    itemId: 'innerPnl',
                    scrollable: true,
                    items:[{
                        xtype: 'image',
                        src: srcPath,
                        maxHeight: 1040,
                        margin: '10 0 5 10',
                        style: {
                            position: 'absolute',
                            cursor: 'zoom-in',
                            //width: '99%',
                            height: '98%',
                            top: 0,
                            left: 0
                        },
                        listeners: {
                            render: function (img) {
                                //var panel = img.ownerCt.body;
                                img.getEl().on({
                                    click: function (event, element) {

                                        var position = img.getEl().dom.style.position,
                                            cursor = img.getEl().dom.style.cursor;

                                        position = position == 'absolute' ? 'relative' : 'absolute';
                                        cursor = cursor == 'zoom-in' ? 'zoom-out' : 'zoom-in';
                                        img.setStyle({
                                            'position': position,
                                            'cursor': cursor
                                        });

                                    }
                                });
                            }
                        }
                    }]
                }],

                buttons: [{
                    text: 'Print',
                    handler: function(btn){
                        var iframe = pw.getComponent('contentIframe');

                        if(iframe){
                            var cw = iframe.getEl().dom.contentWindow;
                            //console.log(iframe, cw.document);
                            cw.print();
                        }
                        else{
                            //var innerPnl = this.view.items.items[0].ownerCt;
                            //var img = innerPnl.down('image');

                            var innerPnl = pw.getComponent('innerPnl');
                            innerPnl.print();
                            //console.log(innerPnl)
                        }
                    }
                }, {
                    text: 'Cancel',
                    handler: function(btn){
                        pw.close();
                    },
                    scope: this
                }]
            });
        }

        pw.show('', function(){
            me.mv.mask();
        });
    },

    onItemSelectionChange: function(sm, rec){
        var me = this,
            refs = this.getReferences(),
            attach = refs.attachment,
            detail = attach.getComponent('attach-detail');

        //view.setSelection(rec);
        if(rec.length){

            if(detail.items.length == 0){
                detail.add([{
                    xtype: 'box',
                    itemId: 'detail-header',
                    style: {
                        borderBottom: '1px solid #cfcfcf'
                    },
                    padding: '10 0 10 0',
                    tpl: new Ext.XTemplate(
                        '<div style="font-weight: bold; font-size: 1.2em; color: #888;">ATTACHMENT DETAILS</div>',
                        '<div><i class="fa fa-file-{type:this.getFileType}-o fa-4x" style="padding-top:14px;padding-bottom: 5px;"></i></div>',
                        '<div style="font-weight: bold;">{name}</div>',
                        '<div>{created:this.getFileDate}</div>',
                        {
                            getFileType: function(v){
                                var a = ['image', 'pdf', 'excel', 'word', 'powerpoint'];

                                for(var i = 0; i < a.length; i++){
                                    if(v.indexOf(a[i]) != -1) {
                                        return a[i];
                                    }
                                }

                                return 'code';
                            },
                            getFileDate: function(v){
                                if(Ext.isEmpty(v)){
                                    v = new Date();
                                }

                                return Ext.util.Format.date(v, 'F j, Y');
                            }
                        }
                    )
                },{
                    xtype: 'fieldcontainer',
                    layout: 'anchor',

                    style: {
                        borderTop: '1px solid #ffffff'
                    },

                    defaultType: 'textfield',

                    defaults: {
                        anchor: '100%'
                    },

                    fieldDefaults: {
                        msgTarget: 'under',
                        labelAlign: 'top'
                    },

                    items: this.buildAttchFields()
                }]);
            }

            //detail.updateLayout();
            if(detail.down('#detail-header')){
                detail.down('#detail-header').update(rec[rec.length-1].data);
                detail.getViewModel().set('theFile', rec[rec.length-1]);
            }

        }
        else {
            detail.removeAll();
        }

    },

    onPhotoSelectionChange: function(sm, rec){
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            photos = refs.photos,
            detail = photos.getComponent('photo-detail'),
            dvm = detail.getViewModel();

        //console.log(me.getView().ownerCt)
        //view.setSelection(rec);
        if(rec.length > 0){

            //console.log(rec[0])
            if(detail.items.length == 0){
                detail.add([{
                    xtype: 'box',
                    itemId: 'detail-header',
                    cls: 'sample-detail-header',
                    style: {
                        borderBottom: '1px solid #cfcfcf'
                    },
                    padding: '10 0 10 0',
                    tpl: new Ext.XTemplate(
                        '<div style="font-weight: bold; font-size: 1.2em; color: #888;">PHOTO DETAILS</div>',
                        //'<a class="link" href="{linkUrl}">',
                        '<div class="thumb">',
                        //'<div><i class="fa fa-file-{type:this.getFileType}-o fa-4x" style="padding-top:14px;padding-bottom: 5px;"></i></div>',
                            '<img src="{[this.getSrcPath(values, xcount)]}" width="96" title="{F_NAME}" style="border:1px solid #888;" />',
                            '<div style="font-weight: bold;padding: 5px;">{F_NAME}</div>',
                        '</div>',
                        '<div>{F_CREATED_ON:date("F j, Y")}</div>',
                        {
                            getSrcPath: function(a,b){
                                var str;
                                if(a.path){
                                    str = a.path;
                                }
                                else {
                                    if(!Ext.isEmpty(a.F_NAME) && !Ext.isEmpty(a.F_TYPE)) {
                                        //str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME.replace(/(\.[^.]+)$/, "_medium$1");
                                        str = '../' + a.F_LINK + a.F_PATH + '/' + a.ID + '/' + a.F_NAME + '?w=174&h=232';
                                        if(a.ID < 0){
                                            str = '../' + a.F_LINK + a.F_NAME + '?w=174&h=232';
                                        }
                                    }
                                    else {
                                        str = '../' + a.F_LINK + a.F_PATH + '/' + a.F_LOCATION + a.F_EXT + '?w=174&h=232';
                                    }
                                }

                                return str;
                                //return a.replace(/(\.[^.]+)$/, "_medium$1");
                            }
                        }
                    )
                },{
                    xtype: 'fieldcontainer',
                    layout: 'anchor',

                    style: {
                        borderTop: '1px solid #ffffff'
                    },

                    defaultType: 'textfield',

                    defaults: {
                        anchor: '100%'
                    },

                    fieldDefaults: {
                        msgTarget: 'under',
                        labelAlign: 'top'
                    },

                    items: me.buildPhotoFields()
                }]);
            }

            //detail.updateLayout();
            var selected = rec[rec.length-1];
            if(detail.down('#detail-header')){
                detail.down('#detail-header').update(selected.data);

                dvm.set('thePhoto', selected);

                if(view.ownerCt.routeId == 'sample'){
                    dvm.set('fieldLabel', 'For RFQ');
                    dvm.set('readOnly', false);
                }

                if(view.ownerCt.routeId == 'product'){
                    dvm.set('fieldLabel', 'For VEGA');
                    dvm.set('readOnly', true);
                    //dvm.set('readOnly', !selected.phantom);
                }
            }

        }
        else {
            detail.removeAll();
        }

    },

    /**
     *
     * @param dv {Ext.view.View}
     * @param rec {Ext.data.Model}
     * @param item {HTMLElement}
     * @param idx {Number}
     * @param e {Ext.event.Event}
     */
    onItemDblClick: function(dv, rec, item, idx, e){
        this.showRequest(rec);
    },

    buildAttchFields: function(){
        return [{
            xtype: 'checkboxfield',
            name: 'active',
            fieldLabel: 'For RFQ',
            labelWidth: 60,
            labelAlign: 'left',

            bind: {
                value: '{theFile.active}'
            }
        },{
            xtype: 'tagfield',
            fieldLabel: 'Tag',
            name: 'tag',
            //store: 'memBodies',
            //remoteStore: 'Bodies',
            bind: {
                value: '{theFile.tag}',
                store: '{tags}'
            },
            hideTrigger: true,
            valueField: 'field',
            displayField: 'label',
            //forceSelection: false,
            //selectOnFocus: true,
            //pageSize: 50,
            queryMode: 'local',
            autoLoadOnValue: true,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            fieldLabel: 'Label',
            name: 'label',
            bind: '{theFile.label}'
        },{
            xtype: 'textarea',
            fieldLabel: 'Description',
            name: 'description',
            //height: 120,
            grow: true,
            growMax: 300,
            bind: '{theFile.description}'
        }];
    },

    buildPhotoFields: function(){

        return [{
            xtype: 'hiddenfield',
            name: 'name',
            bind: {
                value: '{thePhoto.name}'
            }
        },{
            xtype: 'hiddenfield',
            name: 'type'
        },{
            xtype: 'hiddenfield',
            name: 'size'
        },{
            xtype: 'textfield',
            name: 'F_NAME',
            hidden: true,
            bind: {
                value: '{thePhoto.F_NAME}'
            }
        },{
            xtype: 'textfield',
            name: 'F_TYPE',
            hidden: true,
            bind: {
                value: '{thePhoto.F_TYPE}'
            }
        },{
            xtype: 'textfield',
            name: 'F_SIZE',
            hidden: true,
            bind: {
                value: '{thePhoto.F_SIZE}'
            }
        },{
            xtype: 'combo',
            name: 'F_CATEGORY',
            //reference: 'cboCategory',
            fieldLabel: 'Category',
            fieldCls: 'emphasized',
            //hideLabel: true,
            hideEmptyLabel: false,
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            bind: {
                value: '{thePhoto.F_CATEGORY}'
            },
            valueField: "text",
            displayField: "text",
            publishes: '{value}',
            //forceSelection: true,
            //selectOnFocus: true,
            editable: false,
            readOnly: true,
            //autoLoadOnValue: true,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'all',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                select: function(combo, rec, e){
                    var cboCode = combo.ownerCt.query('combo[name="F_DESC6"]')[0],
                        store = cboCode.getStore();
                }
            }
        },{
            xtype: "combo",
            name: 'F_STYLE',
            fieldLabel: "Style #",
            fieldCls: 'emphasized',
            //hideLabel: true,
            //labelWidth: 50,
            //width: 160,
            readOnly: true,
            hideTrigger: true,
            bind: {
                //store: '{styles}',
                value: '{thePhoto.F_STYLE}'
            },
            store: 'memStyles',
            remoteStore: 'Styles',
            valueField: "id",
            displayField: "id",
            //forceSelection: false,
            //selectOnFocus: true,
            pageSize: 99999,
            //minChars: 1,
            matchFieldWidth: false,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'last',
            //lastQuery: '',

            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                beforequery: function(qe){
                    //delete qe.combo.lastQuery;
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC5',
            fieldLabel: "Body #",
            fieldCls: 'emphasized',
            //hideLabel: true,
            //labelWidth: 50,
            //width: 160,
            readOnly: true,
            hideTrigger: true,
            bind: {
                //store: '{bodies}',
                value: '{thePhoto.F_DESC5}'
            },
            store: 'memBodies',
            remoteStore: 'Bodies',
            valueField: "id",
            displayField: "id",
            //forceSelection: false,
            //selectOnFocus: true,
            pageSize: 99999,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'last',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                beforequery: function(qe){
                    //delete qe.combo.lastQuery;
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC6',
            //reference: 'cboPrints',
            fieldLabel: "Print #",
            fieldCls: 'emphasized',
            //hideLabel: true,
            hideTrigger: true,
            readOnly: true,
            bind: {
                //store: '{components}',
                value: '{thePhoto.F_DESC6}'
            },
            store: 'memComponents',
            remoteStore: 'Components',
            valueField: "label",
            displayField: "label",
            //forceSelection: false,
            //selectOnFocus: true,
            //autoLoadOnValue: true,
            pageSize: 99999,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            tpl: [
                '<tpl for=".">',
                //'<tpl if="[xindex] == 1">',
                '<table class="cbStyles-list" width="100%">',
                //'<tr>',
                //'<th>Style</th>',
                //'<th>Description</th>',
                //'</tr>',
                //'</tpl>',
                '<tr class="x-boundlist-item">',
                '<td style="padding:0px 0px;" width="60%">{label}</td>',
                '<td width="40%">{text}</td>',
                '</tr>',
                '<tpl if="[xcount-xindex]==0">',
                '</table>',
                '</tpl>',
                '</tpl>'
            ],
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            xtype: 'checkboxfield',
            name: 'F_BFLAG',
            //fieldLabel: 'For RFQ',

            labelWidth: 60,
            labelAlign: 'left',
            bind: {
                fieldLabel: '{fieldLabel}',
                readOnly: '{readOnly}',
                value: '{thePhoto.F_BFLAG}'
            },
            listeners: {
                /*
                render: function(ck){
                    ck.getEl().on('click', function(e){
                        var detail = ck.up('container[itemId="photo-detail"]'),
                            dvm = detail.getViewModel(),
                            rec = dvm.get('thePhoto');

                        if(!ck.readOnly && rec.data.F_APPLICATION == 'PROD'){
                            rec.set('F_LINK', ck.checked ? 'N41IMG/200xImages/' : 'DLIB/BLU-PHOTOS/');
                        }

                    })
                }
                */
            }
    },{
            xtype: 'combo',
            name: 'F_MFLAG',
            fieldLabel: 'F/B',
            editable: false,
            bind: {
                readOnly: '{!thePhoto.F_BFLAG}',
                value: '{thePhoto.F_MFLAG}'
            },
            queryMode: 'local',
            store: ['FRONT', 'BACK'],
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                /*
                select: function(cb, selected){
                    var detail = cb.up('container[itemId="photo-detail"]'),
                        dvm = detail.getViewModel(),
                        rec = dvm.get('thePhoto');

                    //console.log(rec.data.F_BFLAG, rec.data.F_APPLICATION, rec.data.F_NAME)
                    if(!rec.data.F_BFLAG && rec.data.F_APPLICATION == 'PROD' && rec.data.F_NAME){
                        var name = rec.data.F_NAME.split('.')[0];
                        rec.set('F_NAME', name.split('_')[0] + '_' + name.split('_')[1] + '_' + selected.data.field1.toLowerCase() + rec.data.F_EXT);
                    }
                }
                */
            }
        },{
            xtype: 'combo',
            name: 'F_DESC8',
            fieldLabel: 'Customer',
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                //store: '{customers}',
                value: '{thePhoto.F_DESC8}'
            },
            store: 'Customers',
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            queryMode: 'local',
            autoLoadOnValue: true,
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                render: function(c){
                    c.on('focus', function () {
                        c.expand();
                    });
                }
            }
        },{
            xtype: "combo",
            name: 'F_DESC4',
            fieldLabel: "Vendor",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                //store: '{vendors}',
                value: '{thePhoto.F_DESC4}'

            },
            store: 'Vendors',
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            autoLoadOnValue: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                render: function(c){
                    c.on('focus', function () {
                        c.expand();
                    });
                }
            }
        },{
            xtype: "textfield",
            name: 'F_DESC7',
            fieldLabel: "Stone Price",
            //hideLabel: true,
            bind: {
                value: '{thePhoto.F_DESC7}'
            }
        },{
            xtype: 'textareafield',
            name: 'F_DESC1',
            fieldLabel: 'Description',
            grow: true,
            //hidLabel: true,
            bind: {
                value: '{thePhoto.F_DESC1}'
            }
        }];
    },

    onSave: function(action){
        var me = this,
            view = me.getView(),
            viewer = view.up('viewer'),
            vm = me.getViewModel(),
            session = vm.getSession(),
            changes = session.getChanges(),
            id;

        if(view.isValid()){

            var batch = session.getSaveBatch();
            //changes = session.getChanges();
            console.log(changes, batch);

            if(batch !== undefined){
                var processMask = new Ext.LoadMask({
                    msg: 'Saving... Please wait',
                    target: viewer
                });

                batch.on({
                    operationcomplete: function(batch, op){

                        var objResp = op.getResponse();

                        if(!Ext.isEmpty(objResp)){
                            var response = JSON.parse(objResp.responseText);
                            //console.log(response);
                            if(!Ext.isEmpty(response) && response.data.length > 0){
                                if(response.msg == 'Photos'){
                                    var field1 = view.lookupReference('photos').down('viewupload').fileUpload;

                                    if(field1 && field1.getFilesQueue().length > 0){

                                        field1.send({
                                            url: '/api/Files/Photos/upload',
                                            success: function(response){
                                                //console.log(response);
                                                Ext.Msg.alert('Success', response);
                                            },
                                            failure: function(response) {
                                                Ext.Msg.alert('Failure', response);
                                            }
                                        }, {
                                            Media: JSON.stringify(response.data)
                                        });
                                    }
                                }

                                if(response.msg == 'Sample'){
                                    var field2 = view.lookupReference('attachment').down('viewupload').fileUpload;

                                    if(field2 && field2.getFilesQueue().length > 0){

                                        field2.send({
                                            url: '/api/Files/Sample/upload',
                                            success: function(response){
                                                //console.log(response);
                                                Ext.Msg.alert('Success', response);
                                            },
                                            failure: function(response) {
                                                Ext.Msg.alert('Failure', response);
                                            }
                                        }, {
                                            File: JSON.stringify(response.data)
                                        });
                                    }
                                    //cost.setValue('')
                                }
                            }
                        }
                    },
                    complete: function(batch, op){

                        var response = JSON.parse(op.getResponse().responseText);
                        //console.log(response)

                        processMask.hide('', function() {
                            Ext.Msg.alert('Status', 'Changes saved successfully.');
                        });
                    },
                    exception: function(batch, op){
                        processMask.hide('', function(){
                            //Ext.Msg.alert('Error', 'Error occurred');
                            var objResp = op.error.response;
                            //console.log(objResp)
                            if(!Ext.isEmpty(objResp)){
                                var response = JSON.parse(objResp.responseText);
                                Ext.Msg.alert(objResp.statusText, objResp.responseText);
                            }

                        });
                    }
                });

                processMask.show();
                batch.start();
            }
            else {
                Ext.Msg.alert('No Changes', 'There are no changes to the session.');
            }
            /*
            if (changes !== null) {
                new Ext.window.Window({
                    autoShow: true,
                    title: 'Session Changes',
                    modal: true,
                    width: 600,
                    height: 400,
                    layout: 'fit',
                    items: {
                        xtype: 'textarea',
                        value: JSON.stringify(changes, null, 4)
                    }
                });
            }
            else {
                Ext.Msg.alert('No Changes', 'There are no changes to the session.');
            }
            */
        }
    },

    onClose: function(btn, e){
        var me = this,
            viewer = me.getView().up('viewer');

        viewer.remove(me.getView());
        //viewer.setActiveTab(0);
    },

    sendEmails: function(){
        Ext.Ajax.request({
            //url: '/api/Sessions',
            url: '/api/SendEmail',
            method: 'POST',
            jsonData: '',
            success: function(response, options) {
                // decode response
                var result = Ext.decode(response.responseText);
                //console.log('checkLogin', result.data);
                // check if success flag is true
                if(result.success) {
                    console.log('success', result);
                }
                // couldn't login...show error
                else {
                    //console.log('login failed');
                }
            },
            failure: function(response, options) {
                Ext.Msg.alert(response.statusText, response.status + ' - ' + response.responseText );
            },
            callback: function(response, opotions) {

            }
        });
    }

});
