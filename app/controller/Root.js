/**
 * Created by tech on 8/25/2015.
 */
Ext.define('Vega.controller.Root', {
    extend: 'Vega.controller.Base',

    requires: [
        'Vega.util.HttpStateProvider'
    ],

    routes: {
        //':node': 'onRouteChange',

        'login': {
            before: 'onBeforeLogin',
            action: 'onLogin'
        },
        ':node:viewmode:id': {
            before: 'onBeforeRoute',
            action: 'onRouteViewMode',
            conditions: {
                //':node': '([%a-zA-Z0-9\\-\\_\\s,.\+]+)',
                //':node': '(^(?!.*login).*$)',
                //':node': '(dashboard|notice|sales|dal|inventory|reports)',
                ':viewmode':'(?:(?:/){1}(default|medium|tiles))?',
                //':id':'(?:(?:/){1}([%a-zA-Z0-9\\-\\_\\s,]+))?'
                ':id':'(?:(?:/){1}([0-9]+))?'
            }
        },
        ':node/tab:id:sub': {
            before: 'onBeforeRoute',
            action: 'onRouteTab',
            conditions: {
                //':op': '(?:(?:/){1}(new|edit))?',
                ':id':'(?:(?:/){1}([0-9]+))?',
                ':sub':'(?:(?:/){1}([0-9]+))?'
            }
        },
        ':node/:op:id': {
            before: 'onBeforeRoute',
            action: 'onRouteOp',
            conditions: {
                //':node': '([%a-zA-Z0-9\\-\\_\\s,.\+]+)',
                ':op': '(new|edit|copy|import)',
                ':id':'(?:(?:/){1}([0-9]+))?'
            }
        },
        ':node/:sub': {
            before: 'onBeforeRoute',
            action: 'onRoute'
        }
        /*
        ':node:viewmode/srch/:prop/:val': {
            before: 'onBeforeRoute',
            action: 'onRouteSrch',
            conditions: {
                ':viewmode':'(?:(?:/){1}(default|medium|tiles))?'
            }
        }
        */
    },

    init: function(){
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
        //console.log('Main - grid after render', grid)
    },

    onGridReconfigure: function(grid){
        //grid.setLoading(false);
    },

    onViewAfterRender: function(view){
        //view.setLoading(true);
    },

    onViewReady: function(view){
        //view.setLoading(false);
    },

    onBeforeLogin: function(){
        var me = this,
            args = Ext.Array.slice(arguments),
            node = args[0],
            action = args[args.length - 1];

        if(Vega.user){
            action.stop();
            this.redirectTo('dashboard');
        }
        else{
            action.resume();
        }
    },

    onLogin: function(){

        var loginWin = Ext.ComponentQuery.query('authlogin')[0];
        if(!loginWin){
            loginWin = Ext.widget('authlogin');
        }

        loginWin.show();
    },

    secureNavigate: function (tree, rid) {
        var items = tree.itemMap;

        Ext.Object.each(items, function(key,value,myself){
            //var roles = items[i].config.node.data.granted;
            var granted = true,
                roles = value.config.node.data.granted;
            //console.log('snav', node, roles);
            if(roles != undefined){
                granted = false;
                Ext.Array.each(roles, function(role){
                    //console.log('roles', Vega.user.inRole(role));
                    if(Vega.user.inRole(role)){
                        granted = true;
                        return false;
                    }

                });
            }

            //if(items[i].config.node.data.read == false){
            if(!granted){
                //console.log('not g', node, value)
                value.config.node.data.read = false;
                value.destroy();
            }
        });
    },

    setCurrentView: function(args, action) {

        var me = this,
            hashTag = (args[0] || '').toLowerCase(),
        //refs = me.getReferences(),
            main = Vega.app.getMainView().getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            mainLayout = mainCard.getLayout(),
            viewModel = main.getViewModel(),
            vmData = viewModel.getData(),
            treelist = refs.navigationTreeList,
            treestore = treelist.getStore(),
            node = treestore.findNode('routeId', hashTag),
            existingItem = mainCard.child('component[routeId=' + hashTag + ']');

        viewModel.set('currentUser', Vega.user);

        // method for security...
        me.secureNavigate(treelist, hashTag);

        var view = (node && node.get('read')) ? node.get('view') : null;
        // Kill any previously routed window
        /*
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }
        */

        var lastView = viewModel.get('currentView') || mainLayout.getActiveItem(),
            newView;

        //console.log('setCurrentView', view, args, hashTag, node)

        if (!existingItem) {
            newView = Ext.create('Vega.view.' + (view || 'pages.Error404Window'), {
                hideMode: 'offsets',
                routeId: hashTag
            });

            var nvm = newView.getViewModel();
            if(nvm){
                var storeName = hashTag.replace('-','')+'s',
                    listStore = nvm.getStore(storeName);

                //console.log('Got Store?', listStore, args[2])
                if(listStore != null){
                    var currentPage = 1,
                        //id = args[args.length - 2];
                        //strUrl = '../api/Paging/' + storeName;
                        id = 0;

                    Ext.Array.each(args, function(item){
                        if(Ext.isNumeric(item)){
                            id = item;
                        }
                    });

                    Ext.Ajax.request({
                        //url: Ext.String.urlAppend(listStore.getProxy().url + id),
                        url: '../api/Paging/' + storeName + '/' + id,
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
                            Ext.Msg.alert(response.statusText, response.status + ' - ' + response.responseText );
                        },
                        callback: function(response, opotions) {

                            listStore.loadPage(currentPage);

                        }
                    });
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
                // newView is set (did not exist already), so add it and make it the activeItem.
                //console.log('Got View?', newView)
                //Ext.suspendLayouts(false);
                mainLayout.setActiveItem(mainCard.add(newView));
                //Ext.resumeLayouts(true);
            }
        }

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        viewModel.set('currentView', newView);
        //vmData.currentView = newView;

        var cvm = vmData.currentView.getViewModel(),
            //settings = null,
            store = null;

        if(cvm != null) {
            //console.log('not null', vm.getData().currentView);
            store = cvm.getStore(hashTag.replace('-', '')+'s');
        }

        if(store != null && !store.isLoaded()){
            store.on('load', action.resume, action, {single:true});
        }
        else{
            action.resume();
        }

        treelist.suspendEvents(true);
        treelist.setSelection(node);
        treelist.resumeEvents(true);

        Ext.getBody().unmask();
    },

    onBeforeRoute: function(){
        var me = this,
            args = Ext.Array.slice(arguments),
            action = args[args.length - 1];

        if(Vega.app.getAppready()) {
            if(Vega.user){
                var setting = Ext.getStore('Settings');

                if(!Vega.app.getMainView()){
                    Vega.app.setMainView('Vega.view.main.Main');
                }

                if(!setting.isLoaded()){
                    setting.on('load',
                        Ext.bind(me.onBeforeRoute, me, args),
                        me,
                        {
                            single: true
                        }
                    );
                }
                else {
                    if(Ext.isEmpty(Vega.sp)){
                        Vega.sp = Ext.create('Vega.util.HttpStateProvider', {
                            userId: Vega.user.data.Userid,
                            url: '/api/State',
                            stateCallBack: function(){
                                me.setCurrentView(args, action);
                            }
                        });
                        Ext.state.Manager.setProvider(Vega.sp);
                    }
                    else {
                        me.setCurrentView(args, action);
                    }
                }

                /*
                var viewport = Vega.app.getMainView(),
                vc = viewport.getController();

                vc.setCurrentView('notice');
                */

                /*
                settingStore.on('beforeload', function(s){
                    s.getProxy().setUrl('/api/Settings/development');
                }, this)
                */

            }
            else {
                //Set previous location...
                if(Ext.util.History.getToken() !== 'login'){
                    //console.log(Ext.util.History.getToken())
                    Vega.app.setPrevNode(Ext.util.History.getToken());
                }
                action.stop();
                //console.log('Not ready', Ext.Object.toQueryString({previous: node}));
                //console.log('Not ready', node.replace(/\//g, '+'));
                me.redirectTo('login');
            }
        }
        else {
            Vega.app.on(
                'appready',
                Ext.bind(me.onBeforeRoute, me, args),
                me,
                {
                    single: true
                }
            );
        }

        //Ext.getBody().unmask();
    },

    onRouteSrch: function(node, viewmode, prop, val){
        var mainView = Vega.app.getMainView(),
            vm = mainView.getViewModel(),
            view = vm.get('currentView'),
            multiview = view.lookupReference('multiview');

        if(multiview != null){
            var grid = multiview.lookupReference('grid'),
                topbar = multiview.lookupReference('topbar'),
                category = topbar.lookupReference('filterSelection'),
                search = topbar.lookupReference('searchfield');

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
                    //ctn.getLayout().setActiveItem(segmented.getValue());
                }
            }

            //console.log(grid.getPlugin('gridfilters'))
            //grid.getPlugin('gridfilters').clearFilters();
            category.setValue(prop);
            search.paramName = prop;
            search.setValue(val);

            //var store = view.getViewModel().getStore(node.replace('-','')+'s');
            //grid.getPlugin('gridfilters').bindStore(store);

            search.onSearchClick();

            //this.waitForBinding(grid);
        }

        console.log('onRouteSrch');
    },

    waitForBinding: function(grid){
        var me = this,
            multiview = grid.up('multiview'),
            topbar = multiview.lookupReference('topbar'),
            search = topbar.lookupReference('searchfield');

        if(grid.getStore().isEmptyStore && grid.hasView){
            //grid.on('afterrender', Ext.Function.bind(me.waitForBinding, me));
            Ext.defer(function () {
                me.waitForBinding(grid);
            }, 10);
        }
        else {
            search.onSearchClick();
        }

    },

    onRouteViewMode: function(node, viewmode, id){
        /*var me = this,
         args = Ext.Array.slice(arguments),
         node = args[0], viewmode = args[1],
         id = args[args.length - 1];

         if(args.length > 0){

         }*/
        //console.log(node, viewmode, id)
        var mainView = Vega.app.getMainView(),
            vm = mainView.getViewModel(),
            view = vm.get('currentView'),
            multiview = view.lookupReference('multiview'),
            store = view.getViewModel().getStore(node.replace('-','')+'s');

        //console.log('onRoute', node, viewmode, id, view)
        if(multiview != null){
            //console.log('onRoute', node, viewmode, id, Vega.app.getPrevNode())
            var topbar = multiview.lookupReference('topbar'),
                ctn = multiview.lookupReference('center');

            view.suspendEvents(false);
            view.setActiveTab(multiview);
            view.resumeEvents(true);

            if(viewmode) {
                var segmented = topbar.lookupReference('viewselection'),
                    value = 0;

                switch(viewmode){

                    case 'medium':
                        value = 1;
                        break;
                    case 'tiles':
                        value = 2;
                        break;
                    default:
                        value = 0;
                        break;
                }

                if(segmented){
                    segmented.setValue(value);
                    ctn.getLayout().setActiveItem(segmented.getValue());
                }

            }

            if (id) {
                var grid = ctn.getLayout().getActiveItem(),
                    fieldname = store.first().getIdProperty(),
                    record = store.findRecord(fieldname, id.toString(), 0, false, false, true);

                var setting = Ext.getStore('Settings'),
                    setRec = setting.findRecord('Property', view.getXType());

                if(record != null){
                    var xtypes = ['grid', 'gridpanel', 'dataview'];
                    //console.log(grid, grid.superclass)
                    if(xtypes.indexOf(grid.superclass.getXType()) == -1) {
                        if(xtypes.indexOf(grid.getXType()) == -1){
                            grid = grid.down();
                        }
                    }

                    var sm = grid.getSelectionModel();

                    Ext.defer(function () {
                        if (viewmode != 'default') {

                            sm.suspendEvents(false);
                            sm.select([record], true, true);
                            sm.resumeEvents(true);
                            //console.log('Root - view selection', sm.selected)

                            if(topbar.actCopy){
                                topbar.actCopy.setDisabled(!record);
                            }

                            if(topbar.actEdit){
                                //console.log('MOYAC', record)
                                //topbar.actEdit.setDisabled(!record);
                                topbar.actEdit.setDisabled(!record);
                            }

                            if(topbar.actDelete){
                                //topbar.actDelete.setDisabled(!record);
                                topbar.actDelete.setDisabled(!record);
                            }
                        }
                        else {
                            grid.suspendEvents(true);
                            //grid.getSelectionModel().select([record]);
                            grid.ensureVisible(store.indexOf(record), {
                                animate: true,
                                //highlight: true,
                                select: true,
                                focus: true,
                                callback: function (success, record, node) {

                                    if(topbar.actCopy){
                                        topbar.actCopy.setDisabled((record.data.Status && record.data.Status == 'Complete') || !record);
                                    }

                                    if(topbar.actEdit){
                                        topbar.actEdit.setDisabled((record.data.Status && record.data.Status == 'Complete') || !record);
                                    }

                                    if(topbar.actDelete){
                                        topbar.actDelete.setDisabled((record.data.Status && record.data.Status == 'Complete') || !record);
                                    }

                                    if(topbar.actComplete){
                                        //topbar.actComplete.setHidden((record.get('Status') == 'Complete') || !record);
                                        topbar.actComplete.setDisabled(!(Vega.user.inRole('administrators') || (!setRec || setRec.data.Value == Vega.user.data.Userid) || Vega.user.data.FirstName.concat(' ', Vega.user.data.LastName) == record.get('Coordinator')) || !record);
                                        topbar.actComplete.setHidden((record.get('Status') == 'Complete') || !record);
                                    }

                                    if(topbar.actActive){
                                        topbar.actActive.setDisabled(!(Vega.user.inRole('administrators') || (!setRec || setRec.data.Value == Vega.user.data.Userid) || Vega.user.data.FirstName.concat(' ', Vega.user.data.LastName) == record.get('Coordinator')) || !record);
                                        topbar.actActive.setHidden((record.get('Status') != 'Complete') || !record);
                                    }
                                    //console.log('ensureVisible callback', grid.getSelection())
                                }
                            });
                            //console.log('Root - grid selection', sm.selected)
                            grid.resumeEvents(true);
                        }
                    }, 100);
                }
            }
        }

    },

    onRouteTab: function(node, id, sub) {
        //this.selectItem(node, 'medium', id);
        /*var me = this,
         args = Ext.Array.slice(arguments),
         node = args[0],
         id = args[args.length - 1];

         if(args.length > 0){

         }*/
        var me = this,
        //refs = me.getReferences(),
            mainView = Vega.app.getMainView(),
            main = mainView.getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            view = mainCard.child('component[routeId=' + node + ']'),
            vm = view.getViewModel(),
            store = vm.getStore(node.replace('-','')+'s'),
            fieldname = store.first().getIdProperty(),
            rec = store.findRecord(fieldname, id.toString(), 0, false, false, true),
            item, innerTab, prefix = node + '-',
            xf = Ext.util.Format;

        //console.log('Route - openTab', node, id, sub, vm.getStore(node+'s'), fieldname, rec);
        //console.log(store, store.isLoaded(), store.isLoading())
        switch(node) {
            case 'dal':
                var title = rec.data.Title;
                if(Ext.isEmpty(rec.data.Title)){
                    switch (rec.data.F_CATEGORY.toLowerCase()) {
                        case 'body':
                            title = rec.data.F_DESC5;
                            break;
                        case 'photos':
                            title = (rec.data.F_OWNER != null ? rec.data.F_OWNER + ' ' : '') + rec.data.F_STYLE;
                            break;
                        default:
                            title = rec.data.F_DESC6;
                            break;
                    }
                }

                var srcPath = '';
                if(!Ext.isEmpty(rec.data.F_NAME) && !Ext.isEmpty(rec.data.F_TYPE)){
                    srcPath = '../' + rec.data.F_LINK + rec.data.F_PATH + '/' + rec.data.ID + '/' + rec.data.F_NAME;
                }
                else {
                    srcPath = '../' + rec.data.F_LINK + rec.data.F_PATH + '/' + rec.data.F_LOCATION + rec.data.F_EXT;
                }

                //prefix = 'nDisplay-';
                innerTab = {
                    inTab: true,
                    node: node,
                    xtype: 'display',
                    reference: prefix + rec.get(fieldname),
                    title: 'No. ' + title,
                    tabConfig: {
                        tooltip: title,
                        keyHandlers: {
                            Q: 'onEnterKey',
                            B: 'onPrintKeyPressed'
                        },
                        onEnterKey: function(event){
                            //Ext.Msg.alert('KeyMap', 'You pressed ENTER.');
                            event.preventDefault();
                            event.stopEvent();
                            //console.log(this.card.tab, this, this.tabBar.tabPanel)
                            //var tabpanel = this.tabBar.tabPanel;
                            var ctrl = this.card.getController();
                            if(event.ctrlKey && this.closable){
                                //tabpanel.remove(this.card);
                                ctrl.onClose();
                            }
                        },
                        onPrintKeyPressed: function(e){
                            e.preventDefault();
                            e.stopEvent();

                            //console.log('print B')
                            var ctrl = this.card.getController();
                            if(e.ctrlKey){
                                ctrl.printTab();
                            }
                        }
                    },
                    closable: true,
                    //scrollable: true,
                    layout: 'fit',
                    //active: rec,
                    style: {
                        borderTop: '1px solid #cfcfcf'
                    },
                    items: [{
                        xtype: 'container',
                        itemId: 'innerPnl',
                        scrollable: true,
                        items:[{
                            xtype: 'image',
                            src: srcPath,
                            //maxWidth: '1200px',
                            maxHeight: 1600,
                            margin: 5,
                            style: {
                                position: 'absolute',
                                cursor: 'zoom-in',
                                //maxWidth: '70%',
                                height: '98%',
                                top: 0,
                                left: 0
                            },
                            listeners: {
                                render: function(img){
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
                        }],
                        listeners: {
                            /*
                            render: function (c) {
                                //var panel = img.ownerCt.body;
                                var i = new Image();
                                i.crossOrigin = 'anonymous';

                                i.onload = function(){

                                    var canvas = document.createElement('CANVAS');
                                    var ctx = canvas.getContext('2d');

                                    canvas.height = this.naturalHeight;
                                    canvas.width = this.naturalWidth;

                                    ctx.drawImage(this, 0, 0);
                                    var dataURL = canvas.toDataURL();

                                    //img.setSrc(dataURL);
                                    console.log(dataURL)
                                    var img = c.down('image');
                                    img.setSrc(dataURL)
                                };
                                i.src = srcPath;
                                i = null;
                                //console.log(i, img.getEl().dom)
                            }
                            */
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
            case 'request':
            case 'review':
            case 'pending':
            case 'pow':
                //prefix = 'nDisplay-';
                srcPath = xf.format('../services/POWHandler.ashx?date={0}&file={1}', xf.date(rec.data.createdon, 'm/d/Y'), rec.data.link);

                if(rec.data.revision != -1){
                    srcPath = xf.format('../services/PowPreviewPrint.ashx?ID={0}', rec.data.powhId);
                }

                innerTab = {
                    inTab: true,
                    node: node,
                    xtype: 'display',
                    reference: prefix + rec.data.powhId,
                    title: 'P.O.W #' + xf.ellipsis(rec.data.powno, 18),
                    tabConfig: {
                        tooltip: rec.data.powno,
                        keyHandlers: {
                            Q: 'onEnterKey',
                            B: 'onPrintKeyPressed'
                        },
                        onEnterKey: function(event){
                            //Ext.Msg.alert('KeyMap', 'You pressed ENTER.');
                            event.preventDefault();
                            event.stopEvent();
                            //console.log(this.card.tab, this, this.tabBar.tabPanel)
                            //var tabpanel = this.tabBar.tabPanel;
                            var ctrl = this.card.getController();
                            if(event.ctrlKey && this.closable){
                                //tabpanel.remove(this.card);
                                ctrl.onClose();
                            }
                        },
                        onPrintKeyPressed: function(e){
                            e.preventDefault();
                            e.stopEvent();
                            //console.log(this.card.tab, this, this.tabBar.tabPanel)
                            //var tabpanel = this.tabBar.tabPanel;
                            var ctrl = this.card.getController();
                            if(e.ctrlKey && this.closable){
                                //tabpanel.remove(this.card);
                                ctrl.printTab();
                            }
                        }
                    },
                    iconCls: 'x-fa fa-file-text-o',
                    closable: true,
                    //active: rec,
                    //session: true,
                    style: {
                        borderTop: '1px solid #cfcfcf'
                    },
                    viewModel: {
                        data: {
                            thePow: rec
                            //progress: rec.data.progress,
                            //status: rec.data.status
                        }
                        /*
                         links: {
                         thePow: {
                         type: 'Powh',
                         id: parseInt(rec.data.powhId,10)
                         }
                         }
                         */
                    },
                    items: [{
                        xtype: 'component',
                        itemId: 'contentIframe',
                        autoEl: {
                            tag: 'iframe',
                            style: 'height: 100%; width: 100%; border: none',
                            //src: 'QuickGuideforIllustratorCS6-Basics.pdf'
                            src: srcPath
                        }
                    }]
                };
                break;
            case 'notice':
                //prefix = 'nPost-';
                /*
                 rec.filesInArticles(function(files){
                 files.each(function(file){
                 //console.log(file)
                 })
                 });
                 */
                innerTab = {
                    inTab: true,
                    node: node,
                    xtype: 'notice-post',
                    reference: prefix + rec.get(fieldname),
                    title: xf.ellipsis(rec.data.Title, 18),
                    closable: true
                };
                break;
            case 'line':
                store = vm.getStore('linesheets');
                fieldname = store.first().getIdProperty();
                rec = store.findRecord(fieldname, id.toString(), 0, false, false, true);

                innerTab = {
                    inTab: true,
                    node: node,
                    xtype: 'linesheet',
                    reference: prefix + rec.get(fieldname),
                    //title: rec.data.title,
                    bind: {
                        title: '{title}'
                    },
                    closable: true,
                    viewModel: {
                        type: 'linesheet',
                        data: {
                            title: rec.data.title + ' - ' + Ext.Date.format(new Date(rec.data.season.slice(4,6)+'/1/'+rec.data.season.slice(0,4)), 'F, Y')
                        },
                        links: {
                            theLineSheet: {
                                type: 'sample.Linesheet',
                                id: rec.data.lineId
                            }
                        }
                    }
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
        item.tab.focus(100);
        view.resumeEvents(true);
    },

    onRouteOp: function(node, op, id) {
        var me = this,
        //refs = me.getReferences(),
            mainView = Vega.app.getMainView(),
            main = mainView.getController(),
            refs = main.getReferences(),
            mainCard = refs.mainCardPanel,
            view = mainCard.child('component[routeId=' + node + ']');
            //viewModel = view.getViewModel(),
        //console.log('onRouteOp', node, op, id);

        var title = Ext.String.capitalize(op),
            //title = (!id ? 'New' : 'Edit'),
            alias;

        switch(node){
            case 'request':
            case 'review':
            case 'pending':
            case 'pow':
                title += ' P.O.W';
                alias = 'sales-edit-form';
                break;
            case 'sample':
            case 'product':
                title += ' Style';
                alias = 'style-edit-form';
                break;
            case 'physical':
                title += ' P.I';
                alias = 'pi-form';
                break;
        }

        var form = view.lookupReference(alias);

        if (!form) {
            form = view.add({
                xtype: alias,
                iconCls: 'x-fa fa-plus-circle',
                reference: alias,
                //opMode: op,
                closable: true,
                //isEdit: isEdit,
                viewModel: {
                    type: alias,
                    data: {
                        node: node
                    }
                }
            });
        }

        form.opMode = op;
        form.isEdit = !!id;

        var fvm = form.getViewModel();
        fvm.set('title', title);

        form.on('activate', function(p){
            if(form.isEdit){
                p.setLoading(true);
            }
        }, this, {single:true});

        var s = fvm.getStore('powStatus');
        switch(node){
            case 'request':
                //var statusCombo = form.lookupReference('information').down('combo[name="status"]');
                //statusCombo.getStore().loadData([['DRAFT'],['PRE-ADVISE']]);
                if(s){
                    s.filterBy(function(rec){
                        if(rec.get('id') === 'DRAFT' || rec.get('id') === 'PRE-ADVISE'){
                            return true;
                        }
                    });
                }
            case 'review':
            case 'pending':
            case 'pow':
                if(node !== 'request'){

                    if(s){
                        s.filterBy(function(rec){
                            if(rec.get('id') !== 'DRAFT'){
                                return true;
                            }
                        });
                    }
                }
                this.processSales(fvm, node, op, id);
                break;
            case 'product':
                var tabs = form.lookupReference('editsampletabs'),
                    photos = form.lookupReference('photos'),
                    attach = form.lookupReference('attachment'),
                    request = form.lookupReference('reqs');

                photos.setTitle('Style Photos');

                tabs.remove(attach);
                tabs.remove(request);
            case 'sample':
                this.processSamples(fvm, node, op, id);
                break;
            case 'physical':
                this.processPIs(fvm, node, op, id);
                break;
        }
        /*
        Ext.Ajax.on('beforerequest', function (con, opt) {
            if(form){
                form.setLoading(true);
            }
        }, this);

        Ext.Ajax.on('requestcomplete', function (con, opt) {
            if(form){
                form.setLoading(false);
            }
        }, this);
        */

        view.suspendEvents(false);
        view.setActiveTab(form);
        view.resumeEvents(true);
    },

    onRoute: function(node, sub){
        var mainView = Vega.app.getMainView(),
            vm = mainView.getViewModel(),
            view = vm.get('currentView');
            //multiview = view.lookupReference('multiview'),
            //store = view.getViewModel().getStore(node.replace('-','')+'s');

        //console.log('onRoute', node, sub)
        switch(node){
            case 'receiving':
                this.inventoryReceiving(view, node, sub);
                break;
            case 'allocation':
                this.inventoryAllocation(view, node, sub);
                break;
            case 'settings':
                this.navigateSettings(view, node, sub);
                break;
        }
    },

    processSales: function(vm, node, op, id){
        var session = vm.getSession(),
            binding = null,
            record;

        if(!Ext.isEmpty(session.data.Powh) && !session.data.Powh.hasOwnProperty(id)){
            session.data.Powh = null;
            session.data.Powd = null;
            session.data.Powm = null;
            session.data.Powlog = null;
        }

        if(!id){
            /*
             var powhRec = Ext.create('Vega.model.Powh', {
             userId: Vega.user.get('Userid'),
             revision: 0,
             division: 'MISSY',
             status: 'PRE-ADVISE',
             pack: 'HANGING',
             progress: node
             });

             fvm.set('header', powhRec);
             */

            if(vm.get('srcPowhId') != null){
                vm.set('srcPowhId', null);
            }

            vm.linkTo('header', {
                type: 'Powh',
                create: {
                    userId: Vega.user.get('Userid'),
                    powno: 'TBD',
                    revision: 0,
                    division: 'MISSY',
                    status: node == 'request' ? 'DRAFT' : 'PRE-ADVISE',
                    pack: 'HANGING',
                    progress: node
                }
            });
        }
        else {
            /*
             isEdit =  true;
             //record.id = parseInt(id);
             //record.updatedby = Vega.user.get('Userid');
             //record.progress = nextProgress;
             console.log('onRouteOp', node, op, id)
             */

            if(node === 'request' && op === 'edit' && Vega.user.inRole('sales')){
                vm.set('srcPowhId', parseInt(id,10));

                vm.linkTo('header', {
                    type: 'Powh',
                    //reference: 'Vega.model.Powh',
                    id: parseInt(id,10)
                });

                binding = vm.bind('{header}', function(rec){

                    var powlogs = vm.getStore('powlogs');
                    powlogs.on('beforeload', function(s){
                        Ext.apply(powlogs.getProxy().extraParams, {
                            powhId: vm.get('srcPowhId'),
                            powno: rec.data.powno
                        });
                    }, this);

                    powlogs.load();

                    vm.getView().setLoading(false);
                    binding.destroy();
                });
            }
            else {
                //console.log('Not Request', session.peekRecord('Powh', -1), vm.get('srcPowhId'), node, op)
                if(vm.get('srcPowhId') == null || vm.get('srcPowhId') != parseInt(id,10))
                {
                    vm.set('srcPowhId', parseInt(id, 10));

                    Vega.model.Powh.load(parseInt(id,10), {
                        success: function (rec, ope) {
                            //var session = item.getViewModel().getSession();
                            record = rec.copy(null, session);

                            switch(op){
                                case 'edit':
                                    record.data.revision = parseInt(id,10);
                                    if(node === 'review'){
                                        record.data.status = 'REVISED';
                                    }
                                    break;
                                case 'copy':
                                    record.data.revision = 0;
                                    record.data.status = 'PRE-ADVISE';

                                    if(node === 'request'){
                                        record.data.powno = 'TBD';
                                        record.data.progress = node;
                                    }
                                    if(node === 'review'){
                                        record.data.powno = '';
                                    }
                                    break;
                            }

                            //record.data.progress = nextProcess;
                            record.data.userId = Vega.user.data.Userid;
                            //console.log(record.data.userId,Vega.user.data.Userid)
                            record.data.createdon = new Date();
                            record.data.updatedby = null;
                            record.data.updatedon = null;

                            rec.powds().each(function (d) {
                                var nd = d.copy(null, session);
                                //console.log('powd', nd)
                                nd.data.userId = record.data.userId;
                                nd.data.createdon = record.data.createdon;
                                nd.data.updatedby = null;
                                nd.data.updatedon = null;

                                var mat = record.powds().add(nd);

                                d.powms().sort('lineseq', 'ASC');
                                d.powms().each(function (m) {
                                    mat[0].powms().add(m.copy(null, session));
                                });

                                d.tnaps().each(function (p) {
                                    mat[0].tnaps().add(p.copy(null, session));
                                });

                                //console.log(nd, count);
                                /*
                                 d.filesInPowds().each(function(f){
                                 mat[0].filesInPowds().add(f.copy(null, session));
                                 })
                                 */
                            });

                            /*
                            rec.powlogs().each(function(g){
                                var ng = g.copy(null, session);

                                //record.powlogs().add(ng);
                            });
                            */

                            //console.log('New Record', fvm.get('srcPowhId'), fvm.get('header'), session.getChanges())
                            binding = vm.bind('{header}', function(r){

                                var powlogs = vm.getStore('powlogs');
                                powlogs.on('beforeload', function(s){
                                    Ext.apply(powlogs.getProxy().extraParams, {
                                        powhId: vm.get('srcPowhId'),
                                        powno: record.data.powno
                                    });
                                }, this);

                                powlogs.load();

                                vm.getView().setLoading(false);
                                binding.destroy();
                            });

                            vm.set('header', record);

                        },
                        failure: function (rec, ope) {
                            //console.log('fail', rec, ope);
                        },
                        callback: function (rec, ope, success) {

                        }
                    });

                }

                if(!binding){
                    binding = vm.bind('{header}', function(r){

                        vm.getView().setLoading(false);
                        binding.destroy();
                    });
                }
            }
        }
    },

    processSamples: function(vm, node, op, id){
        var session = vm.getSession();
            //boms = vm.getView().lookupReference('boms'),
            //store = boms.getViewModel().getStore('boms'),
            //bomStore = vm.getStore('boms'),
            //center = boms.lookupReference('center');

        if(!Ext.isEmpty(session.data['sample.Product']) && !session.data['sample.Product'].hasOwnProperty(id)){
            //console.log('before clear', session.data['sample.Product'].hasOwnProperty(id), id,session.data['sample.Product'].hasOwnProperty(id) != id);
            session.data['sample.Product'] = null;
            session.data['sample.Bomh'] = null;
            session.data['sample.Bolh'] = null;
            session.data['sample.Bom'] = null;
            session.data['sample.Bol'] = null;
            session.data['sample.File'] = null;
            session.data['sample.Smph'] = null;
            //console.log('after clear', session.data, session.data["sample.Product"])
        }

        if(id){
            /*
            Vega.model.Product.load(parseInt(id,10), {
                success: function(rec, ope){

                    vm.set('theSample', rec);

                    var bomIdx = 0;
                }
            });
            */
            var binding = null;

            if(op == 'edit'){

                vm.linkTo('theSample', {
                    type: 'sample.Product',
                    id: parseInt(id,10)
                });
            }

            if(op == 'copy'){
                Vega.model.sample.Product.load(parseInt(id,10), {
                    success: function (rec, ope) {
                        var record = rec.copy(null, session);

                        record.data.style = style;
                        record.data.color = color;
                        record.data.userName = Vega.user.data.Userid;
                        record.data.userTime = new Date();
                        record.data.UpdateUser = null;
                        record.data.UpdateTime = null;

                        if(!copy.checked){
                            record.data.cost = 0;
                            record.data.defaultBomCost = 0;
                            record.data.avgCost = 0;
                            record.data.BomCost1 = 0;
                            record.data.bomcost2 = 0;
                            record.data.bomcost3 = 0;
                            record.data.bomcost4 = 0;
                            record.data.bomcost5 = 0;
                        }
                        else {
                            rec.bomhs(function(bomhs){
                                //console.log('Product Get', bomhs, csnum.getValue());
                                bomhs.each(function(bomh){
                                    if(bomh.data.bomno == csnum.getValue()){

                                        var nbomh = bomh.copy(null, session);
                                        nbomh.data.color = record.data.color;
                                        nbomh.data.createUser = Vega.user.data.Userid;
                                        nbomh.data.createTime = new Date();
                                        nbomh.data.updateUser = null;
                                        nbomh.data.updateTime = null;

                                        var abomh = record.bomhs().add(nbomh);

                                        bomh.boms(function(boms){

                                            boms.each(function(bom){
                                                var nbom = bom.copy(null, session);
                                                nbom.data.color = record.data.color;

                                                abomh[0].boms().add(nbom);
                                            });
                                            //console.log('Product Get', boms, abomh);
                                        });

                                        bomh.bolhs(function(bolhs){
                                            bolhs.each(function(bolh){
                                                var nbolh = bolh.copy(null, session);
                                                nbolh.data.color = record.data.color;
                                                nbolh.data.createUser = Vega.user.data.Userid;
                                                nbolh.data.createTime = new Date();
                                                nbolh.data.updateUser = null;
                                                nbolh.data.updateTime = null;

                                                var abolh = abomh.bolhs().add(nbolh);

                                                bolh.bols().each(function(bol){
                                                    var nbol = bol.copy(null, session);
                                                    nbol.data.color = record.data.color;

                                                    abolh[0].bols().add(nbol);
                                                });
                                            });
                                        });
                                    }
                                });
                            });
                        }

                        vm.set('theSample', record);
                    },
                    failure: function (rec, ope) {
                        //console.log('fail', rec, ope);
                    },
                    callback: function (rec, ope, success) {

                    }
                });
            }

            if(op == 'import'){

                vm.set('srcId', id);

                var num = parseInt(id, 10);

                Vega.model.Powh.load(parseInt(num / 100), {
                    success: function (rec, ope) {

                        var powd = rec.powds().getAt(num % 100);

                        vm.linkTo('theSample', {
                            type: 'sample.Product',
                            create: {
                                //style: powd.data.style,
                                //color: powd.data.color,
                                type: 'Style',
                                rawMatType: 'Style',
                                descript: powd.data.bodyref + ' ' + powd.data.bodydesc,
                                division: rec.data.division,
                                processtype: rec.data.ordertype,
                                sizeCat: rec.data.sizes,
                                user2: powd.data.bodyref,
                                //cost: powd.data.cost,
                                price1: powd.data.price,
                                sgtRetailPrice: powd.data.msrp,
                                //default
                                fabricType: 'KNIT',
                                fabcontent: '00',
                                season: 'E',
                                status: 'ACTIVE',

                                userName: Vega.user.data.Userid,
                                lowestno: 1
                            }
                        });

                        var newSample = vm.get('theSample');
                        var newBomh = Ext.create('Vega.model.sample.Bomh', {
                            style: newSample.data.style,
                            color: newSample.data.color,
                            bomno: 1,
                            //processType: newSample.data.processtype.trim(),
                            EffStartDate: '2000-01-01 00:00:00',
                            EffEndDate: '2099-12-31 12:59:59',
                            createUser: Vega.user.data.Userid
                        });

                        var aBomh = newSample.bomhs().add(newBomh);

                        powd.powms().each(function(powm){

                            if(!Ext.isEmpty(powm.data.mattype) && !Ext.isEmpty(powm.data.matcode) && !Ext.isEmpty(powm.data.matcolor)){
                                var newBom = Ext.create('Vega.model.sample.Bom', {
                                    style: newBomh.data.style,
                                    color: newBomh.data.color,
                                    bomno: newBomh.data.bomno,
                                    rawMatType: powm.data.mattype,
                                    rawStyle: powm.data.matcode,
                                    rawColor: powm.data.matcolor,
                                    qty: 0,
                                    memo: powm.data.matcategory,
                                    compLevel: 'Color',
                                    po_autocreate: 'Y'
                                });

                                aBomh[0].boms().add(newBom);
                            }
                        });

                        //console.log(rec, newSample)
                    },
                    failure: function (rec, ope) {
                        //console.log('fail', rec, ope);
                    },
                    callback: function (rec, ope, success) {

                    }
                });
            }

            binding = vm.bind('{theSample}', function(rec){
                vm.getView().setLoading(false);
                binding.destroy();
            });

            if(binding){
                vm.getView().setLoading(false);
            }
        }
        else {
            /*
            var product = Ext.create('Vega.model.Product', {
                userId: Vega.user.get('Userid'),
                type: 'Style',
                rawMatType: 'Style',
                processtype: 'DS SAMPLE',
                division: 'MISSY',
                status: 'ACTIVE',
                lowestno: 1
            });
            */

            vm.linkTo('theSample', {
                type: 'sample.Product',
                create: {
                    type: 'Style',
                    rawMatType: 'Style',
                    division: 'MISSY',
                    status: 'ACTIVE',
                    color: node == 'sample' ? '00' : '',
                    season: node == 'sample' ? 'E' : '',
                    processtype: node == 'sample' ? 'DS SAMPLE' : '',
                    sizeCat: node == 'sample' ? 'ONESIZE' : '',
                    userName: Vega.user.get('Userid'),
                    lowestno: 1
                }
            });
           // console.log('edit', vm.get('theSample'), vm.linkData.theSample)
        }
    },

    processPIs: function(vm, node, op, id){
        var session = vm.getSession();
        //boms = vm.getView().lookupReference('boms'),
        //store = boms.getViewModel().getStore('boms'),
        //bomStore = vm.getStore('boms'),
        //center = boms.lookupReference('center');

        var cRec = vm.get('thePhysical');
        if(!Ext.isEmpty(session.data.PIH) && !session.data.PIH.hasOwnProperty(id)){
            //console.log(session.data)
            session.data.PIH = null;
            session.data.PI = null;
            session.data.PIRoll = null;
        }

        var binding = null;
        if(id){
            vm.linkTo('thePhysical', {
                type: 'PIH',
                //reference: 'Vega.model.Powh',
                id: parseInt(id,10)
            });

            //console.log(vm.linkData.thePhysical)
            //var piStore = vm.linkData.thePhysical;
            binding = vm.bind('{thePhysical}', function(rec){

                vm.getView().setLoading(false);
                binding.destroy();
            });

            if(binding){
                vm.getView().setLoading(false);
            }
        }
        else {
            if(vm.get('thePhysical') != null){
                vm.set('thePhysical', null);
            }

            vm.linkTo('thePhysical', {
                type: 'PIH',
                create: {
                    pidate: new Date().toDateString(),
                    status: 'Closed',
                    warehouse: '00',
                    createUser: Vega.user.get('Userid')
                }
            });
        }

        binding = vm.bind('{theSample}', function(rec){

            vm.getView().setLoading(false);
            binding.destroy();
        });

        if(binding){
            vm.getView().setLoading(false);
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
                        //console.log(poh);
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
    },

    inventoryRolls: function(view, node, id){
        var vc = view.getController(),
            store = vc.getViewModel().getStore('rolls'),
            grid = vc.lookupReference('rolls-grid'),
            selection = grid.getSelectionModel(),
            field = vc.lookupReference('search');


    },

    navigateSettings: function(view, node, sub){
        //console.log('navigateSettings', view, node, sub);
        var vm = view.getViewModel(),
            //vc = view.getController(),
            store = vm.get('areas'),
            item = view.lookupReference(node+'-'+sub),
            center = view.lookupReference('center-base'),
            navi = view.lookupReference('navigate-menu');

        if(navi.getStore() == null){
            navi.setStore(store);
        }

        var nd = store.findNode('routeId', sub);
        //Breadcrumb setSelection only accept Node not Record...
        navi.setSelection(nd);

        if (!item) {
            item = Ext.widget(sub, {
                reference: node+ '-' + sub
            });
        }

        center.getLayout().setActiveItem(item);
        //console.log('navigateSetting', view, node, id);
    }
});
