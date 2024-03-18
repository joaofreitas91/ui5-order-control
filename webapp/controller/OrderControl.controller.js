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

    return Controller.extend("com.lab2dev.ordercontrol.controller.OrderControl", {
      formatter: formatter,

      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        const routeDetail = oRouter.getRoute("RouteOrderControl")
        routeDetail.attachPatternMatched(this.onObjectMatched, this);
      },

      onObjectMatched: function () {
        const oModel = new ODataModel(this.getOwnerComponent().getManifestObject().resolveUri('v2/fiori'))
        // const oModel = new ODataModel(sap.ui.require.toUrl('v2/fiori'))

        oModel.attachMetadataLoaded(() => {
          oModel.read("/SalesOrderDraft", {
            urlParameters: {
              $expand: "items",
            },
            success: (oData) => {
              var oModel = new JSONModel(oData.results)

              this.getView().setModel(oModel, 'orders')
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
        const position = this.byId('tableOrders').getSelectedIndex()
        const orders = this.getView().getModel('orders').getData()
        const { orderId } = orders.at(position)

        if (position !== -1) {
          return this.navTo('RouteOrderCreate', {
            query: {
              orderId
            }
          });
        }

        MessageToast.show("Selecione um item")
      },

      onDelete: function () {
        const position = this.byId('tableOrders').getSelectedIndex()
        const orders = this.getView().getModel('orders').getData()

        if (position !== -1) {
          return MessageToast.show(orders.at(position).orderID)
        }

        MessageToast.show("Selecione um item")
      },

      handleNavDetail: function (oEvent) {
        const source = oEvent.getSource();
        const context = source.getBindingContext('orders');
        const path = context.getPath();

        const { ID } = context.getObject(path);

        this.navTo('RouteOrderDetail', { orderId: ID })
      },

      handleNavCreate: function () {
        this.navTo('RouteOrderCreate', { query: { orderId: 'new' } })
      }
    });
  });
