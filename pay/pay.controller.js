/* global ZaloPay, theApp */

(function () {
    'use strict';

    theApp
            .controller('PayController', PayController);

    PayController.$inject = ['$scope', '$rootScope', '$location', 'PayService'];
    function PayController($scope, $rootScope, $location, PayService) {
        var vm = this;
        $rootScope.click_btnthanhtoan = false;
        $scope.amount = 0;
        $scope.show_donhang = false;
        $rootScope.invoice_code = "";
        $rootScope.total_amount = 0;
        $rootScope.msg = "";
        $scope.show_pay = false;
        $scope.iszp = false;
        $rootScope.isaction = false;
        $scope.payInvoice = payInvoice;

        
        
        $scope.init = function () {
            initJsBrige();
            get_params();
            if ($rootScope.merchant_code !== undefined && $rootScope.invoice_code !== undefined) {
                getPaymentInvoice();
            }
        };

        $scope.init();
        
        

        function get_params() {
            var cur_url = window.location.href;
            var cur_url_split = cur_url.split('?');
            if (cur_url_split.length === 2) {
                var params = cur_url_split[1];
                var params_split = params.split('&');
                for (var i = 0; i < params_split.length; i++) {
                    var param_i = params_split[i];
                    var param_i_split = param_i.split('=');
                    if (param_i_split.length === 2) {
                        var param_name = param_i_split[0];
                        if (param_name === 'mc') {
                            $rootScope.merchant_code = param_i_split[1];
                        } else if (param_name === 'iv') {
                            $rootScope.invoice_code = param_i_split[1];
                        } else if (param_name === 'amount') {
                            $rootScope.total_amount = param_i_split[1];
                        }
                    }
                }
            }
        }

        function getPaymentInvoice() {
            if(!$scope.iszp) {
                $rootScope.msg = "ZaloPay chưa sẵn sàng";
                $location.path("/invoice_err");
            } else {
                if(!$rootScope.isaction) {
                    PayService.getPaymentInvoice($rootScope.merchant_code, $rootScope.invoice_code, $rootScope.total_amount)
                        .then(function (response) {
                            if (response.err === 0) {
                                $scope.show_pay = true; 
                                $scope.amount = response.dt.invoice.amount;
                            } else {
                                //don hang khong hop le
                                if($rootScope.click_btnthanhtoan === false) {
                                    $rootScope.msg = response.msg;
                                }
                            }
                        });
                        $rootScope.isaction = true;
                } else {
                    ZaloPay.closeWindow();
                }
            }
        }

        function payInvoice() {
            ZaloPay.showLoading();
            $rootScope.click_btnthanhtoan = true;
            PayService.payInvoice($rootScope.merchant_code, $rootScope.invoice_code, $scope.amount)
                    .then(function (response) {
                        ZaloPay.hideLoading();
                        if (response.err === 0) {
                            $scope.show_donhang = false;
                            var zptranstoken = response.dt.zptranstoken;
                            var appid = response.dt.appid;
                            ZaloPay.payOrder({
                                appid: appid,
                                zptranstoken: zptranstoken
                            }, $scope.cb);
                        } else {
                            $scope.show_donhang = true;
                            $rootScope.msg = response.msg;
                            $location.path("/invoice_err");
                        }
                    });
            ZaloPay.hideLoading();
        }

        function initJsBrige() {
            ZaloPay.ready(() => {
                $scope.iszp = true;
                console.log("ZaloPayBridge is ready");
            });
        }
        
        $scope.cb = function (data) {
            var link = window.location.href;
            var url = link.split('#')[0];    
            if (typeof data === "object") {
                if (data.error === 1) {
//                    ZaloPay.showDialog({
//                        title: "THÔNG BÁO",
//                        message: "Thanh toán đơn hàng thành công. Vui lòng nhận hoá đơn.",
//                        button: "OK"
//                    });
                    $rootScope.msg = "Thanh toán đơn hàng thành công"; 
                    window.location.href = url + "#/alert_success";
//                    $location.path("/alert_success");
                } else if (data.error === 4) {
//                    ZaloPay.showDialog({
//                        title: "THÔNG BÁO",
//                        message: "Người dùng huỷ đơn hàng.",
//                        button: "OK"
//                    });
                    $rootScope.msg = "Người dùng huỷ đơn hàng"; 
                    window.location.href = url + "#/alert_faile";
                    //$location.path("/alert_faile");
                } else {
//                    ZaloPay.showDialog({
//                        title: "THÔNG BÁO",
//                        message: "Thanh toán thất bại. Vui lòng thử lại.",
//                        button: "OK"
//                    });
                    $rootScope.msg = "Thanh toán thất bại"; 
                    window.location.href = url + "#/alert_faile";
//                    $location.path("/alert_faile");
                }
            }
        };
    }

})();
