sap.ui.define([
  "com/lab2dev/ordercontrol/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "com/lab2dev/ordercontrol/model/formatter",
  "sap/ui/model/odata/v2/ODataModel",
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, MessageToast, formatter, ODataModel) {
    "use strict";

    return Controller.extend("com.lab2dev.ordercontrol.controller.OrderDetail", {
      formatter: formatter,

      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        const routeDetail = oRouter.getRoute("RouteOrderDetail")
        routeDetail.attachPatternMatched(this.onObjectMatched, this);
      },

      onObjectMatched: function (oEvent) {
        const oArgs = oEvent.getParameter("arguments");
        const { orderId } = oArgs;

        const oModel = new ODataModel(this.getOwnerComponent().getManifestObject().resolveUri('v2/fiori'))

        oModel.attachMetadataLoaded(() => {
          oModel.read(`/SalesOrderDraft(${orderId})`, {
            urlParameters: {
              $expand: "items",
            },
            success: (oData) => {
              var oModel = new JSONModel(oData)

              this.getView().setModel(oModel, 'ordersDetail')
            },
            error: (oError) => {
              var msg = 'Erro ao acessar entidade.'
              MessageToast.show(msg);
            }
          })
        });

        oModel.attachMetadataFailed(() => {
          var msg = 'Serviço não disponível no momento. Tente novamente mais tarde.'
          MessageToast.show(msg);
        });
      },

      onEdit: function () {
        const position = this.byId('tableOrders').getSelectedIndex()
        const orders = this.getView().getModel('orders').getData()

        if (position !== -1) {
          return MessageToast.show(orders.at(position).orderID)
        }

        MessageToast.show("Selecione um item")
      },

      onCopy: function () {
        const { ID } = this.getView().getModel('ordersDetail').getData()

        this.navTo('RouteOrderCreate', {
          query: {
            orderId: ID
          }
        });
      },

      onDelete: function () {
        const { ID } = this.getView().getModel('ordersDetail').getData()
        const that = this

        const oModel = new ODataModel(this.getOwnerComponent().getManifestObject().resolveUri('v2/fiori'))

        oModel.attachMetadataLoaded(() => {
          oModel.remove(`/SalesOrderDraft(${ID})`, {
            success: () => {
              that.handleNavBack()
            },
            error: (oError) => {
              var msg = 'Erro ao remover entidade.'
              MessageToast.show(msg);
            }
          })
        });

        oModel.attachMetadataFailed(() => {
          var msg = 'Serviço não disponível no momento. Tente novamente mais tarde.'
          MessageToast.show(msg);
        });
      },

      handleNavBack: function () {
        this.onNavBack()
      }
    });
  });
