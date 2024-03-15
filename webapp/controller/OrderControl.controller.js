sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "com/lab2dev/ordercontrol/model/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast, formatter) {
        "use strict";

        return Controller.extend("com.lab2dev.ordercontrol.controller.OrderControl", {
            formatter: formatter,
            
            onInit: function () {
                const payload = [
                    {
                      orderID: 8878,
                      state: 'Aprovado',
                      createdDate: "03/14/2024",
                      receiverProduct: 70,
                      paymentMethod: 70,
                      value: 99.33,
                    },
                    {
                      orderID: 1234,
                      state: 'Entregue',
                      createdDate: "03/15/2024",
                      receiverProduct: 80,
                      paymentMethod: 60,
                      value: 120.50,
                    },
                    {
                      orderID: 5678,
                      state: 'Aprovado',
                      createdDate: "03/16/2024",
                      receiverProduct: 90,
                      paymentMethod: 75,
                      value: 85.75,
                    },
                    {
                      orderID: 2468,
                      state: 'Recusado',
                      createdDate: "03/17/2024",
                      receiverProduct: 60,
                      paymentMethod: 80,
                      value: 150.20,
                    },
                    {
                      orderID: 1357,
                      state: 'Aprovado',
                      createdDate: "03/18/2024",
                      receiverProduct: 85,
                      paymentMethod: 65,
                      value: 110.75,
                    },
                    {
                      orderID: 9999,
                      state: 'Aprovado',
                      createdDate: "03/19/2024",
                      receiverProduct: 70,
                      paymentMethod: 70,
                      value: 99.99,
                    },
                    {
                      orderID: 3333,
                      state: 'Recusado',
                      createdDate: "03/20/2024",
                      receiverProduct: 75,
                      paymentMethod: 85,
                      value: 75.85,
                    },
                    {
                      orderID: 7777,
                      state: 'Aprovado',
                      createdDate: "03/21/2024",
                      receiverProduct: 95,
                      paymentMethod: 55,
                      value: 125.60,
                    },
                    {
                      orderID: 4444,
                      state: 'Entregue',
                      createdDate: "03/22/2024",
                      receiverProduct: 55,
                      paymentMethod: 95,
                      value: 80.55,
                    },
                    {
                      orderID: 8888,
                      state: 'Entregue',
                      createdDate: "03/23/2024",
                      receiverProduct: 80,
                      paymentMethod: 70,
                      value: 95.80,
                    }
                  ];
                const oData = new JSONModel(payload)

                this.getView().setModel(oData, 'orders')
            },

            onEdit: function() {
                const position = this.byId('tableOrders').getSelectedIndex()
                const orders = this.getView().getModel('orders').getData()

                if(position !== -1) {
                    return MessageToast.show(orders.at(position).orderID)
                }

                MessageToast.show("Selecione um item")
            },

            onCopy: function() {
                const position = this.byId('tableOrders').getSelectedIndex()
                const orders = this.getView().getModel('orders').getData()

                if(position !== -1) {
                    return MessageToast.show(orders.at(position).orderID)
                }

                MessageToast.show("Selecione um item")
            },

            onDelete: function() {
                const position = this.byId('tableOrders').getSelectedIndex()
                const orders = this.getView().getModel('orders').getData()

                if(position !== -1) {
                    return MessageToast.show(orders.at(position).orderID)
                }

                MessageToast.show("Selecione um item")
            },

            navTo: function(oEvent) {
                const source = oEvent.getSource();

                const context = source.getBindingContext('orders');

                const path = context.getPath();

                const order = context.getObject(path);

                const orderID = order.orderID;

                const oComponent = this.getOwnerComponent();

                const oRouter = oComponent.getRouter();

                oRouter.navTo("RouteOrderDetail", {
                    productId: orderID
                });
            }

        });
    });
