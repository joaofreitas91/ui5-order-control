sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
    ],
    function (BaseController, History) {
        "use strict";

        return BaseController.extend("com.lab2dev.ordercontrol.controller.BaseController", {
            navTo: function (sRouteName, oParameters = {}) {
                this.getOwnerComponent().getRouter().navTo(sRouteName, oParameters);
            },

            onNavBack: function (sPath = "RouteOrderControl") {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);

                } else {
                    this.navTo(sPath);
                }
            }
        });
    }
);