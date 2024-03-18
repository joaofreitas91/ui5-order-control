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

    return Controller.extend("com.lab2dev.ordercontrol.controller.OrderCreate", {
      formatter: formatter,

      onInit: function () {
        const oRouter = this.getOwnerComponent().getRouter();
        const routeDetail = oRouter.getRoute("RouteOrderCreate")
        routeDetail.attachPatternMatched(this.onObjectMatched, this);
      },

      onObjectMatched: function (oEvent) {
        const oArgs = oEvent.getParameter("arguments");
        const orderId = oArgs['?query'].orderId

        if (orderId === 'new') {
          const itemsModel = new JSONModel([])
          this.getView().setModel(itemsModel, 'items')
        } else {
          const oModel = new ODataModel(this.getOwnerComponent().getManifestObject().resolveUri('v2/fiori'))

          oModel.attachMetadataLoaded(() => {
            oModel.read(`/SalesOrderDraft(${orderId})`, {
              urlParameters: {
                $expand: "items",
              },
              success: (oData) => {
                const itemsModel = new JSONModel(oData.items.results)
                this.getView().setModel(itemsModel, 'items')
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
        }

        const ItemModel = new JSONModel({
          items: "",
          material: "",
          quantity: "",
          quantity_unit: "PC",
          amount: ""
        })

        this.getView().setModel(ItemModel, 'item')



      },

      onAddItem: function () {
        const currentItem = this.getView().getModel('item').getData();
        const items = this.getView().getModel('items').getData();

        const itemsModel = new JSONModel([...items, currentItem])
        this.getView().setModel(itemsModel, 'items')

        const ItemModel = new JSONModel({
          items: "",
          material: "",
          quantity: "",
          quantity_unit: "PC",
          amount: ""
        })

        this.getView().setModel(ItemModel, 'item')
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

        if (position !== -1) {
          return MessageToast.show(orders.at(position).orderID)
        }

        MessageToast.show("Selecione um item")
      },

      removeItem: function (oEvent) {
        const source = oEvent.getSource();
        const context = source.getBindingContext('items');
        const path = context.getPath();

        const { ID } = context.getObject(path);

        const items = this.getView().getModel('items').getData()
        const removeItem = items.filter(item => item.ID !== ID)

        const itemsModel = new JSONModel(removeItem)

        this.getView().setModel(itemsModel, 'items')

      },

      onCreate: function () {
        const oModel = new ODataModel(this.getOwnerComponent().getManifestObject().resolveUri('v2/fiori'))
        const items = this.getView().getModel('items').getData()

        oModel.attachMetadataLoaded(() => {
          oModel.create("/SalesOrderDraft", {
            "receiver": "USCU_S02",
            "payment_condition": "NT30",
            "total_amount": 1000,
            "status": "pending",
            items
          }, {

            success: (oData) => {
              var msg = 'Solicitação criada com sucesso.'
              MessageToast.show(msg);

              this.onNavBack()
            },
            error: (oError) => {
              var msg = 'Erro ao criar solicitação.'
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
