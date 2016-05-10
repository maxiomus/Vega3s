/**
 * Created by tech on 8/25/2015.
 */
Ext.define('Vega.controller.Root', {

    extend: 'Vega.controller.Base',

    routes: {
        //':node': 'onRouteChange',

        'login': {
            before: 'onBeforeLogin',
            action: 'onLogin'
        },

        ':node:viewmode:id': {
            before: 'onBeforeRoute',
            action: 'onRoute',
            conditions: {
                ':node': '([%a-zA-Z0-9\\-\\_\\s,.\+]+)',
                ':viewmode':'(?:(?:/){1}(default|medium|tiles))?',
                ':id':'(?:(?:/){1}([0-9]+))?'
            }
        },

        ':node/tab/:id': {
            before: 'onBeforeRoute',
            action: 'onRouteTab',
            conditions: {
                ':id': '([0-9]+)'
            }
        },

        ':node/tab/:op': {
            before: 'onBeforeRoute',
            action: 'onRouteOp',
            conditions: {
                ':op': '(preview|new|edit)?'
            }
        }
    },

    init: function(){
        //console.log('Root - init');
        this.listen({
            component: {
                'grid': {
                    afterrender: 'onGridAfterRender',
                    reconfigure: 'onGridReconfigure'
                },
                'dataview': {
                    afterrender: 'onViewAfterRender'
                }
            }
        });
    },

    onGridAfterRender: function(grid){

        //grid.setLoading(true);
        console.log('Main - grid after render', grid)
    },

    onGridReconfigure: function(grid){

        //grid.setLoading(false);
    },

    onViewAfterRender: function(view){
        //view.setLoading(true);
    },

    onViewReady: function(view){
        view.setLoading(false);
    },

    onBeforeLogin: function(action){

        if(Vega.app.user){
            action.stop();
            this.redirectTo('dashboard');
        }
        else{
            action.resume();
        }
    },

    onLogin: function(){

        Ext.widget('authlogin').show();
    },

    onBeforeRoute: function(){

        var me = this,
            args = Ext.Array.slice(arguments),
            node = args[0],
            action = args[args.length - 1];

        if(Vega.app.appready) {

            Ext.getBody().unmask();

            if(Vega.app.user){

                //console.log(args, action);

                if(!Vega.app.getMainView()){
                    Vega.app.setMainView('Vega.view.main.Main');
                }

                var main = Vega.app.getMainView(),
                    vm = main.getViewModel(),
                    vmData = vm.getData(),
                    store = null;
                /*var viewport = Vega.app.getMainView(),
                 vc = viewport.getController();

                 vc.setCurrentView('notice');*/
                console.log('onBeforeRoute', args)
                me.setCurrentView(main, node, args[args.length - 2]);

                var cvm = vmData.currentView.getViewModel();

                if(cvm != null) {
                    //console.log('not null', vm.getData().currentView);
                    store = cvm.getStore(node+'s');
                }

                // store.isLoading() not working???
                if(store != null && (store.isLoading() || store.getCount() == 0)){
                    store.on('load', action.resume, action, {single:true});
                }
                else{
                    action.resume();
                }
            }
            else {
                action.stop();
                me.redirectTo('login');
            }
        }
        else {
            Vega.app.on(
                'appready',
                Ext.Function.bind(me.onBeforeRoute, me, args),
                me,
                {
                    single: true
                }
            );
        }
    },

    onRoute:function(node, viewmode, id){
        //this.setCurrentView(id);
        /*var me = this,
         args = Ext.Array.slice(arguments),
         node = args[0], viewmode = args[1],
         id = args[args.length - 1];

         if(args.length > 0){

         }*/
        //console.log('onRoute');
        var mainView = Vega.app.getMainView(),
            vm = mainView.getViewModel(),
            view = vm.get('currentView'),
            multiview = view.lookupReference('multiview');

        if(multiview != null){
            this.handleMultiview(view, node, viewmode, id);
        }
        else {

            switch(node){
                case 'inventory.receiving':
                    this.inventoryReceiving(view, node, id);
                    break;
                case 'inventory.allocation':
                    this.inventoryAllocation(view, node, id);
                    break;
            }
        }
    },

    onRouteTab: function(node, id) {
        //this.selectItem(node, 'medium', id);
        /*var me = this,
         args = Ext.Array.slice(arguments),
         node = args[0],
         id = args[args.length - 1];

         if(args.length > 0){

         }*/
        this.openTab(node, id);
    },

    openTab: function(node, id){
        var me = this,
            //refs = me.getReferences(),
            mainView = Vega.app.getMainView(),
            main = mainView.getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            view = mainCard.child('component[routeId=' + node + ']'),
            vm = view.getViewModel(),
            store = vm.get(node+'s'),
            fieldname = store.first().getIdProperty(),
            rec = store.findRecord(fieldname, id),
            items = [], item,
            innerTab, prefix,
            xf = Ext.util.Format;

        if (rec) {

            switch(node) {
                case 'dal':
                    var title = rec.data.Title;
                    if(Ext.isEmpty(rec.data.Title)){
                        switch (rec.data.F_CATEGORY.toLowerCase()) {
                            case 'body':
                                title = rec.data.F_DESC5;
                                break;
                            case 'photos':
                                title = (rec.data.F_OWNER != null ? rec.data.F_OWNER : '') + ' ' + rec.data.F_NAME;
                                break;
                            default:
                                title = rec.data.F_DESC6;
                                break;
                        }
                    }

                    prefix = 'nDisplay-';
                    innerTab = {
                        inTab: true,
                        xtype: 'display',
                        reference: prefix + rec.get(fieldname),
                        title: 'No. ' + xf.ellipsis(title, 18),
                        closable: true,
                        active: rec,
                        items: [{
                            xtype: 'image',
                            src: '../' + rec.data.F_LINK + rec.data.F_LOCATION + rec.data.F_EXT,
                            margin: 10,
                            style: {
                                position: 'absolute',
                                cursor: 'zoom-in',
                                top: 0,
                                left: 0
                            },
                            listeners: {
                                render: function (img) {
                                    var panel = img.ownerCt.body;

                                    img.getEl().on({
                                        click: function (event, element) {
                                            var position = img.getEl().dom.style.position,
                                                cursor = img.getEl().dom.style.cursor;

                                            position = position == 'absolute' ? '' : 'absolute';
                                            cursor = cursor == 'zoom-in' ? 'zoom-out' : 'zoom-in';
                                            img.setStyle({
                                                'position': position,
                                                'cursor': cursor
                                            });
                                        }
                                    });
                                }
                            }
                        }/*,{
                         xtype: 'component',
                         itemId: 'contentIframe',
                         autoEl: {
                         tag: 'iframe',
                         scrolling: 'no',
                         style: 'width: 100%; height: 100%; border: none;',
                         src: 'M152646_BLUE GROTTO WHITE_front.jpg'
                         //src: xf.format('PDFHandler.ashx?index={0}&date={1}&file={2}', 2, xf.date(rec.data.CreateOn, 'm/d/Y'), rec.data.Link)
                         }
                         }*/]
                    };
                    break;
                case 'pow':
                    prefix = 'nDisplay-';
                    innerTab = {
                        inTab: true,
                        xtype: 'display',
                        reference: prefix + rec.data.PID,
                        title: 'No.' + xf.ellipsis(rec.data.PowNo, 18),
                        iconCls: 'fa fa-file-text-o',
                        closable: true,
                        active: rec,
                        items: [{
                            xtype: 'component',
                            itemId: 'contentIframe',
                            autoEl: {
                                tag: 'iframe',
                                style: 'height: 100%; width: 100%; border: none',
                                //src: 'QuickGuideforIllustratorCS6-Basics.pdf'
                                src: xf.format('PDFHandler.ashx?index={0}&date={1}&file={2}', 2, xf.date(rec.data.CreateOn, 'm/d/Y'), rec.data.Link)
                            }
                        }]
                    };
                    break;
                case 'notice':
                    prefix = 'nPost-';
                    innerTab = {
                        inTab: true,
                        xtype: 'notice-post',
                        reference: prefix + rec.get(fieldname),
                        title: xf.ellipsis(rec.data.Title, 18),
                        closable: true
                    };
                    break;

            }

            item = view.lookupReference(prefix + rec.get(fieldname));

            if (!item) {
                item = view.add(innerTab);
                item.setActive(rec);
            }

            view.suspendEvents(false);
            view.setActiveTab(item);
            view.resumeEvents(true);

            //var el = item.getComponent('contentIframe').getEl().down('html');
            //console.log(el);
        }
    },

    onRouteOp: function(node, op) {
        console.log('onRouteOp', node, op);
        var me = this,
        //refs = me.getReferences(),
            mainView = Vega.app.getMainView(),
            main = mainView.getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            view = mainCard.child('component[routeId=' + node + ']'),
            vm = view.getViewModel();
            //store = vm.get(node+'s'),
            //fieldname = store.first().getIdProperty(),
            //rec = store.findRecord(fieldname, id);

        var item = view.lookupReference(op);

        if (!item) {
            var xtype, title, iconCls;

            switch (node){
                case 'pow':
                    xtype = 'sales-edit-form';
                    title = 'New P.O.W';
                    iconCls = 'fa fa-plus-circle';
                    break;
                case 'dal':
                    xtype = 'dal-edit-form';
                    title = 'New D.A.L';
                    iconCls = 'fa fa-navicon';
                    break;
            }

            item = view.add({
                xtype: xtype,
                title: title,
                iconCls: iconCls,
                reference: op,
                closable: true,
                inTab: true
            });
        }

        view.suspendEvents(false);
        view.setActiveTab(item);
        view.resumeEvents(true);
    },

    setCurrentView: function(mainView, hashTag, id) {
        hashTag = (hashTag || '').toLowerCase();

        var me = this,
            //refs = me.getReferences(),
            main = mainView.getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            navigationList = refs.navigationTreeList,
            viewModel = main.getViewModel(),
            vmData = viewModel.getData(),
            store = navigationList.getStore(),
            node = store.findNode('routeId', hashTag),
            view = node ? node.get('view') : null,
            lastView = vmData.currentView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']');

        // Kill any previously routed window
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {

            var newView = Ext.create('Vega.view.' + (view || 'pages.Error404Window'), {
                hideMode: 'offsets',
                routeId: hashTag
            });

            var nvm = newView.getViewModel();
            if(nvm){
                var listStore = nvm.getStore(hashTag+'s');
                if(listStore != null){
                    var currentPage = 1;

                    if(id && Ext.isNumeric(id)){
                        Ext.Ajax.request({
                            url: Ext.String.urlAppend(listStore.getProxy().url + id),
                            method: 'GET',
                            success: function(response, options) {
                                // decode response
                                var result = Ext.decode(response.responseText);
                                //console.log('checkLogin', result.data);
                                // check if success flag is true
                                if(result.success) {
                                    //console.log('success', result.index, listStore.getPageSize(), result.index / listStore.getPageSize());
                                    currentPage = Math.ceil(result.index / listStore.getPageSize());
                                }
                                // couldn't login...show error
                                else {
                                    //console.log('login failed');
                                }
                            },
                            failure: function(response, options) {
                                //console.log(response);
                                Ext.Msg.alert(response.status.toString(), response.statusText + ', an error occurred during your request. Please try again.' );
                            },
                            callback: function(response, opotions) {
                                listStore.loadPage(currentPage);
                            }
                        });
                    }
                    else {
                        listStore.loadPage(currentPage);
                    }
                }
            }
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        navigationList.suspendEvents(false);
        navigationList.setSelection(node);
        navigationList.resumeEvents(true);

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        vmData.currentView = newView;
    },

    handleMultiview: function(view, node, viewmode, id) {
        //console.log('selectItem');

        var multiview = view.lookupReference('multiview'),
            topbar = multiview.lookupReference('topbar'),
            store = view.getViewModel().getStore(node+'s'),
            fieldname = store.first().getIdProperty(),
            record = store.findRecord(fieldname, id);

        view.suspendEvents(false);
        view.setActiveTab(multiview);
        view.resumeEvents(true);

        if(viewmode) {
            var segmented = topbar.lookupReference('viewselection'),
                ctn = multiview.lookupReference('center'),
                value = 0;

            switch(viewmode){
                case 'default':
                    value = 0;
                    break;
                case 'medium':
                    value = 1;
                    break;
                case 'tiles':
                    value = 2;
                    break;
            }

            if(segmented){
                segmented.setValue(value);
                ctn.getLayout().setActiveItem(segmented.getValue());
            }
        }

        if (id) {
            //console.log(ctn.getLayout().getActiveItem());

            var grid = ctn.getLayout().getActiveItem();

            Ext.defer(function () {
                if (viewmode != 'default') {
                    //console.log('view');
                    var sm = grid.getSelectionModel();
                    sm.suspendEvents(false);
                    sm.select([record]);
                    sm.resumeEvents(true);
                }
                else {
                    //console.log('grid');
                    grid.suspendEvents(false);
                    //grid.getSelectionModel().select([record]);
                    grid.ensureVisible(store.indexOf(record), {
                        animate: true,
                        highlight: true,
                        select: true,
                        focus: true,
                        callback: function (recordIdx, record, node) {
                            //console.log(recordIdx, record, node);
                        }
                    });
                    grid.resumeEvents(true);
                }
            }, 100);
        }
    },

    inventoryReceiving: function(view, node, id){

        var vc = view.getController(),
            form = vc.lookupReference('poheader').getForm(),
            store = vc.getViewModel().getStore('podetails'),
            grid = vc.lookupReference('orders-list'),
            selection = grid.getSelectionModel(),
            field = vc.lookupReference('search');

        if(id){
            field.setValue(id);

            var proxy = store.getProxy();
            proxy.encodeFilters = function(filters){
                return filters[0].getValue();
            };

            if (selection.selected) {
                selection.deselectAll(false);
            }

            if(store.loadCount == 0){

                Vega.model.Poh.load(id, {
                    callback: function(poh){
                        form.loadRecord(poh);
                        //console.log('POH #' + poh.get('pono'), poh);

                        poh.podetails(function(podetails){
                            grid.bindStore(podetails);
                            /*pods.each(function(pod){
                             console.log('POD #' + pod.get('id'), pod);
                             });*/
                        });
                    }
                });
            }
        }
        else {
            field.setValue('');

            form.reset();

            if(selection.selected){
                selection.deselectAll();
            }

            grid.getStore().removeAll();
        }


    },

    inventoryAllocation: function(view, node, id){
        var vc = view.getController(),
            store = vc.getViewModel().getStore('fabricrequirements'),
            grid = vc.lookupReference('requirements'),
            selection = grid.getSelectionModel(),
            field = vc.lookupReference('search');

        if(id){
            field.setValue(id);

            var proxy = store.getProxy();
            proxy.encodeFilters = function(filters){
                return filters[0].getValue();
            };

            if (selection.selected) {
                selection.deselectAll(false);
            }

            store.filter('cutno', id);
        }
        else {
            field.setValue('');

            if(selection.selected){
                selection.deselectAll();
            }

            grid.getStore().removeAll();
        }

    }

});
