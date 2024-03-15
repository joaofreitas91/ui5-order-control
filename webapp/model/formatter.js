sap.ui.define([], () => {
	"use strict";

	return {
		toUpperCase: function (sValue) {
			return sValue.toUpperCase();
		},

        textStatus: function(sValue) {
            if(!sValue) return sValue

            switch (sValue) {
                case 'Aprovado':
                    return '8'
                case 'Entregue':
                    return '5'
                case 'Recusado':
                    return '2'
                default:
                    return sValue
            }
        }
	};
});