/*global QUnit*/

sap.ui.define([
	"comlab2dev/ordercontrol/controller/OrderControl.controller"
], function (Controller) {
	"use strict";

	QUnit.module("OrderControl Controller");

	QUnit.test("I should test the OrderControl controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
