sap.ui.define([], () => {
    "use strict";

    return {
        toUpperCase: function (sValue) {
            return sValue.toUpperCase();
        },

        colorStatus: function (sState) {
            if (!sState) return sState

            switch (sState) {
                case 'approved':
                    return '8'
                case 'pending':
                    return '5'
                case 'rejected ':
                    return '2'
                default:
                    return sState
            }
        },

        textStatus: function (sState) {
            if (!sState) return sState

            switch (sState) {
                case 'approved':
                    return 'Aprovado'
                case 'pending':
                    return 'Pendente'
                case 'rejected ':
                    return 'Rejeitado'
                default:
                    return sState
            }
        }
    };
});