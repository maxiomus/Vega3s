/**
 * Created by tech on 3/7/2016.
 */

Ext.define("Ext.ux.form.plugin.ClearTrigger", {
    extend: 'Ext.AbstractPlugin',

    alias: "plugin.cleartrigger",

    config: {
        toggleEvent: "change",
        weight: -100
    },

    init: function (g) {
        var e = this;
        var f = g.toggleEvent || e.getToggleEvent();
        var h = e.getWeight();

        g.setTriggers(
            Ext.applyIf(g.getTriggers(), {
                clear: {
                    cls: "x-form-clear-trigger",
                    weight: h,
                    handler: function () {
                        if (Ext.isFunction(g.clearValue)) {
                            g.clearValue()
                        } else {
                            g.setValue(null)
                        }
                        g.getTrigger("clear").hide();
                        g.fireEvent("triggerclear", g)
                    },
                    hidden: !g.getValue()
                }
            })
        );

        g.on("render",
            function () {
                var a = {
                    destroyable: true
                };
                a[f] = function (b) {
                    var c = b.getValue();
                    var d = false;
                    switch (b.getXType()) {
                        case "numberfield":
                            d = c !== null;
                            break;
                        default:
                            d = c
                    }

                    b.getTrigger("clear")[d ? "show" : "hide"]();
                };
                g.clearableListeners = g.on(a)
            }, g, { single: true });

        Ext.Function.interceptAfter(g, "setReadOnly", e.syncClearTriggerVisibility, e);
    },

    destroy: function () {
        var b = this.getCmp();
        if (b.clearableListeners) {
            b.clearableListeners.destroy()
        }
    },

    syncClearTriggerVisibility: function () {
        var g = this.getCmp();
        var e = g.getValue();
        var f = g.getTrigger("clear");
        var h = g.readOnly;
        f[e && !h ? "show" : "hide"]();
    }
});