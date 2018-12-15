webpackJsonp([2],{

/***/ 907:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalFinalFarePageModule", function() { return ModalFinalFarePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_final_fare__ = __webpack_require__(914);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ModalFinalFarePageModule = (function () {
    function ModalFinalFarePageModule() {
    }
    ModalFinalFarePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__modal_final_fare__["a" /* ModalFinalFarePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__modal_final_fare__["a" /* ModalFinalFarePage */]),
            ],
        })
    ], ModalFinalFarePageModule);
    return ModalFinalFarePageModule;
}());

//# sourceMappingURL=modal-final-fare.module.js.map

/***/ }),

/***/ 914:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalFinalFarePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_user_user__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_trip_service__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ModalFinalFarePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalFinalFarePage = (function () {
    function ModalFinalFarePage(tripService, navCtrl, userService, navParams, alertCtrl, loadingCtrl, viewCtrl, localNotifications) {
        this.tripService = tripService;
        this.navCtrl = navCtrl;
        this.userService = userService;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.localNotifications = localNotifications;
        this.responsedata = {};
        this.data = {};
        this.carddata = this.navParams.get('Card');
        //alert(JSON.stringify(this.carddata))
        this.total_amount = this.navParams.get('data');
        this.trip_key = this.navParams.get('key');
        console.log("Fare AMounts++++++++", this.total_amount);
        console.log("Trip key++++++++", this.trip_key);
    }
    ModalFinalFarePage.prototype.ionViewCanEnter = function () {
        this.data = this.navParams.get('data');
    };
    // dismiss() {
    //   this.viewCtrl.dismiss();
    // }
    ModalFinalFarePage.prototype.dismiss = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Processing...' });
        loading.present();
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'https://dbstage1.paywire.com/API/pwapi.aspx');
        var sr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        <PAYMENTREQUEST>\n           <TRANSACTIONHEADER>\n              <PWVERSION>3</PWVERSION>\n            <PWUSER>yurt1</PWUSER>\n               <PWPASS>Kt93SbYZ</PWPASS>\n               <PWCLIENTID>0000010062</PWCLIENTID>\n               <PWKEY>8A0B6FA9-D918-4D84-B02F-5BB7C8578F4D</PWKEY>\n              <PWTRANSACTIONTYPE>SALE</PWTRANSACTIONTYPE>\n              <PWSALEAMOUNT>" + this.data['total'] + "</PWSALEAMOUNT>\n              <CARDPRESENT>FALSE</CARDPRESENT>\n           </TRANSACTIONHEADER>\n           <CUSTOMER>\n              <PWMEDIA>CC</PWMEDIA>\n               <PWTOKEN>" + this.carddata['pwtoken'] + "</PWTOKEN>\n           </CUSTOMER>\n        </PAYMENTREQUEST>";
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    var xml = xmlhttp.responseXML;
                    var response = xml.getElementsByTagName("PAYMENTRESPONSE")[0];
                    var length_1 = response.childElementCount;
                    // console.log("Length ", length);
                    // console.log("Response Data", response);
                    if (length_1 < 9) {
                        var rideinfo_1;
                        _this.tripService.getrideinfo(_this.trip_key).subscribe(function (snapshot) {
                            rideinfo_1 = snapshot;
                        });
                        // console.log('ELSE Fare Data',this.total_amount)
                        // console.log(' ELSE -----',rideinfo)
                        _this.userService.Insert_Ride(rideinfo_1, _this.total_amount, 10).then(function (result) {
                            console.log(result);
                        }, function (err) {
                            console.log(err);
                        });
                        loading.dismiss();
                        _this.viewCtrl.dismiss();
                        _this.alertCtrl.create({ subTitle: 'Problem In Transaction', buttons: ['ok'] }).present();
                        _this.singlenotification(1, 'Transaction Error', 'Your payment method was rejected');
                    }
                    else {
                        for (var i = 0; i < length_1; i++) {
                            _this.responsedata[response.childNodes[i].nodeName] = response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue;
                            // console.log(response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue);
                        }
                        var userId = JSON.parse(localStorage.getItem('userData'));
                        _this.responsedata['UserId'] = userId.userId;
                        // console.log("Thsi Response data", this.responsedata);
                        _this.userService.tbtransaction(_this.responsedata).then(function (result) {
                            console.log(result['data']);
                            loading.dismiss();
                            _this.viewCtrl.dismiss();
                            _this.alertCtrl.create({ subTitle: ' Transaction Completed', buttons: ['ok'] }).present();
                            _this.singlenotification(1, 'Transaction Completed', 'Payment has been made. Thanks');
                            //
                            var rideinfo;
                            _this.tripService.getrideinfo(_this.trip_key).subscribe(function (snapshot) {
                                rideinfo = snapshot;
                            });
                            // console.log('Fare Data',this.total_amount)
                            // console.log('-----',rideinfo)
                            _this.userService.Insert_Ride(rideinfo, _this.total_amount, 4).then(function (result) {
                                console.log(result);
                            }, function (err) {
                                console.log(err);
                            });
                        }, function (err) {
                            loading.dismiss();
                            console.log(err);
                        });
                    }
                }
                else {
                    var rideinfo_2;
                    _this.tripService.getrideinfo(_this.trip_key).subscribe(function (snapshot) {
                        rideinfo_2 = snapshot;
                    });
                    // console.log('ELSE Fare Data',this.total_amount)
                    // console.log(' ELSE -----',rideinfo)
                    _this.userService.Insert_Ride(rideinfo_2, _this.total_amount, 10).then(function (result) {
                        console.log(result);
                    }, function (err) {
                        console.log(err);
                    });
                    _this.alertCtrl.create({ subTitle: 'Transaction Is Not Done', buttons: ['ok'] }).present();
                    _this.singlenotification(1, 'Transaction Error', 'Your payment method was rejected');
                    //this.mydata = null;
                    loading.dismiss();
                    _this.viewCtrl.dismiss();
                }
            }
        };
        xmlhttp.setRequestHeader('Content-Type', 'text/xml');
        xmlhttp.responseType = "document";
        xmlhttp.send(sr);
    };
    // Push Notification
    ModalFinalFarePage.prototype.singlenotification = function (id, title, text) {
        this.localNotifications.schedule({
            id: id,
            title: title,
            text: text
        });
    };
    ModalFinalFarePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-modal-final-fare',template:/*ion-inline-start:"C:\Users\sb_08\Desktop\Waqar Project\snaprepair-master\src\pages\modal-final-fare\modal-final-fare.html"*/'<!--\n  Generated template for the ModalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color=app>\n\n\n    <ion-title>\n      Invoice\n    </ion-title>\n\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content style="color:black">\n\n\n  <ion-grid>\n\n    <ion-row>\n      <ion-col col-6 text-left class="type">\n        Total Mileage\n      </ion-col>\n\n      <ion-col col-6 text-left class="price">\n\n        {{data[\'distance\']}}\n      </ion-col>\n    </ion-row>\n    <ion-row *ngIf="data[\'isBaseFare\'] == true">\n      <ion-col col-6 text-left class="type">\n        Basic Price\n      </ion-col>\n\n      <ion-col col-6 text-left class="price">\n\n         {{data[\'distanceCost\']}}\n      </ion-col>\n    </ion-row>\n  <ion-row *ngIf="data[\'isBaseFare\'] == false">\n      <ion-col col-6 text-left class="type">\n        Distance Cost\n        <br>\n        <small>1.30 $ Per Mile</small>\n      </ion-col>\n\n      <ion-col col-6 text-left class="price">\n\n         {{data[\'distanceCost\']}}\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-6 text-left class="type">\n        Time Cost\n        <br>\n        <small>20.00 Cents Per Min </small>\n      </ion-col>\n\n      <ion-col col-6 text-left class="price">\n\n        {{data[\'timeCost\']}}\n      </ion-col>\n    </ion-row>\n    <hr>\n    <ion-row>\n      <ion-col col-6 text-left class="type">\n        Fare\n      </ion-col>\n\n      <ion-col col-6 text-left class="price">\n\n        {{data[\'fare\']}}\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-6 text-left class="type">\n        Discount\n      </ion-col>\n\n      <ion-col col-6 text-left class="price">\n\n        {{data[\'discount\']}}\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-6 text-left class="type">\n        GST(7.25%)\n      </ion-col>\n    \n      <ion-col col-6 text-left class="price">\n    \n        {{data[\'gst\']}}\n      </ion-col>\n    </ion-row>\n\n    <hr>\n<ion-row>\n  <ion-col col-6 text-left class="type">\n    Tolls\n  </ion-col>\n\n  <ion-col col-6 text-left class="price">\n\n    {{data[\'tolls\']}}\n  </ion-col>\n</ion-row>\n<ion-row *ngIf="data[\'tip\'] >0">\n  <ion-col col-6 text-left class="type">\n    Tip\n  </ion-col>\n\n  <ion-col col-6 text-left class="price">\n\n    {{data[\'tip\']}}\n  </ion-col>\n</ion-row>\n    <hr>\n    <ion-row>\n      <ion-col col-6 text-left>\n        <h1 style="margin-top: 0px;">Total Fare</h1>\n      </ion-col>\n\n      <ion-col col-6 text-left class="price" >\n        <h1 style="margin-top: 0px;">{{data[\'total\']}}</h1>\n        \n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n\n<ion-footer transparent>\n  <ion-toolbar transparent>\n    <button ion-button full color=app (click)="dismiss()">Confirm</button>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"C:\Users\sb_08\Desktop\Waqar Project\snaprepair-master\src\pages\modal-final-fare\modal-final-fare.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_trip_service__["a" /* TripService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], ModalFinalFarePage);
    return ModalFinalFarePage;
}());

//# sourceMappingURL=modal-final-fare.js.map

/***/ })

});
//# sourceMappingURL=2.js.map