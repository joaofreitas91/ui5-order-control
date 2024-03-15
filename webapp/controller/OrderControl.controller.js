sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("com.lab2dev.ordercontrol.controller.OrderControl", {
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
                        orderID: 8878,
                        state: 'Aprovado',
                        createdDate: "03/14/2024",
                        receiverProduct: 70,
                        paymentMethod: 70,
                        value: 99.33,

                    },
                    {
                        orderID: 8878,
                        state: 'Aprovado',
                        createdDate: "03/14/2024",
                        receiverProduct: 70,
                        paymentMethod: 70,
                        value: 99.33,

                    },
                    {
                        orderID: 8878,
                        state: 'Aprovado',
                        createdDate: "03/14/2024",
                        receiverProduct: 70,
                        paymentMethod: 70,
                        value: 99.33,

                    },
                    {
                        orderID: 8878,
                        state: 'Aprovado',
                        createdDate: "03/14/2024",
                        receiverProduct: 70,
                        paymentMethod: 70,
                        value: 99.33,

                    },
                    {
                        orderID: 8878,
                        state: 'Aprovado',
                        createdDate: "03/14/2024",
                        receiverProduct: 70,
                        paymentMethod: 70,
                        value: 99.33,

                    },
                    {
                        orderID: 8878,
                        state: 'Aprovado',
                        createdDate: "03/14/2024",
                        receiverProduct: 70,
                        paymentMethod: 70,
                        value: 99.33,

                    },
                    {
                        orderID: 8878,
                        state: 'Aprovado',
                        createdDate: "03/14/2024",
                        receiverProduct: 70,
                        paymentMethod: 70,
                        value: 99.33,

                    },
                    {
                        orderID: 8878,
                        state: 'Aprovado',
                        createdDate: "03/14/2024",
                        receiverProduct: 70,
                        paymentMethod: 70,
                        value: 99.33,

                    },
                    {
                        orderID: 8878,
                        state: 'Aprovado',
                        createdDate: "03/14/2024",
                        receiverProduct: 70,
                        paymentMethod: 70,
                        value: 99.33,

                    },
                    {
                        orderID: 8878,
                        state: 'Aprovado',
                        createdDate: "03/14/2024",
                        receiverProduct: 70,
                        paymentMethod: 70,
                        value: 99.33,

                    },
                ]
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

            navTo: function() {
                const component = this.getOwnerComponent().getRouter()
                debugger
                this.getRouter().navTo('RouteOrderDetail')
            }

        });
    });
