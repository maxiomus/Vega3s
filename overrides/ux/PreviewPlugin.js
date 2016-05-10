/**
 * Created by tech on 8/13/2015.
 */
Ext.define('Ext.overrides.ux.PreviewPlugin', {
    override: 'Ext.ux.PreviewPlugin',

    setCmp: function(target) {
        //this.callParent(arguments);

        // Resolve grid from view as necessary
        var me = this,
            grid        = me.cmp = target.isXType('gridview') ? target.grid : target,
            bodyField   = me.bodyField,
            hideBodyCls = me.hideBodyCls,
            feature     = Ext.create('Ext.grid.feature.RowBody', {
                grid : grid,
                getAdditionalData: function(data, idx, model, rowValues) {

                    var xf = Ext.util.Format;
                    var getAdditionalData = Ext.grid.feature.RowBody.prototype.getAdditionalData,
                        additionalData = {
                            rowBody: xf.ellipsis(xf.stripTags(data[bodyField]),200),
                            rowBodyCls: grid.getView().previewExpanded ? '' : hideBodyCls
                        };

                    if (Ext.isFunction(getAdditionalData)) {
                        // "this" is the RowBody object hjere. Do not change to "me"
                        Ext.apply(additionalData, getAdditionalData.apply(this, arguments));
                    }
                    return additionalData;
                }
            }),
            initFeature = function(grid, view) {
                view.previewExpanded = me.previewExpanded;

                // By this point, existing features are already in place, so this must be initialized and added
                view.featuresMC.add(feature);
                feature.init(grid);
            };

        // The grid has already created its view
        if (grid.view) {
            initFeature(grid, grid.view);
        }

        // At the time a grid creates its plugins, it has not created all the things
        // it needs to create its view correctly.
        // Process the view and init the RowBody Feature as soon as the view is created.
        else {
            grid.on({
                viewcreated: initFeature,
                single: true
            });
        }
    }

})
