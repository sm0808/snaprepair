webpackJsonp([9],{

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserRequestsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_modal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_requests__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_offers__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(24);
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
 * Generated class for the UserRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserRequestsPage = (function () {
    function UserRequestsPage(nav, platform, alertCtrl, requestService, geolocation, loadingCtrl, translate, elRef, toastCtrl, navParams, localNotifications, modalCtrl, offerService) {
        var _this = this;
        this.nav = nav;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.requestService = requestService;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.elRef = elRef;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.localNotifications = localNotifications;
        this.modalCtrl = modalCtrl;
        this.offerService = offerService;
        this.USER_IMG_URL = __WEBPACK_IMPORTED_MODULE_5__services_constants__["n" /* USER_IMG_URL */];
        this.imgloaded = [];
        this.loadingAnimation = './assets/img/loading-animation.gif';
        // this.translate.setDefaultLang('en');
        this.user = JSON.parse(localStorage.getItem('userData'));
        var loading = this.loadingCtrl.create({ content: 'Getting Requests...' });
        loading.present();
        // Get Requests for Admin
        this.requestService.get_user_Requests(this.user.userId).then(function (result) {
            loading.dismiss();
            _this.requests = result;
            for (var i = 0; i < _this.requests.length; i++) {
                _this.requests[i]['img'] = __WEBPACK_IMPORTED_MODULE_5__services_constants__["i" /* IMG_URL */] + '' + _this.requests[i]['img'];
            }
            localStorage.setItem('requests', JSON.stringify(_this.requests));
            console.log('this.requests: ', _this.requests);
        }, function (err) {
            loading.dismiss();
            console.log(err);
        });
    }
    UserRequestsPage.prototype.ionViewDidLoad = function () {
    };
    UserRequestsPage.prototype.ionViewWillLeave = function () {
    };
    UserRequestsPage.prototype.deleteRequest = function (reqID) {
        var _this = this;
        // Send Admin Offer
        this.showLoading('Deleting Request...');
        this.requestService.delete_Request(reqID).then(function (result) {
            if (result) {
                for (var i = 0; i < _this.requests.length; i++) {
                    if (reqID == _this.requests[i]['requestId']) {
                        _this.requests.splice(i, 1);
                        break;
                    }
                }
            }
            _this.showToast('Request Deleted Successfully!');
            _this.hideLoading();
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    };
    // Push Notification
    UserRequestsPage.prototype.singlenotification = function (id, title, text) {
        this.localNotifications.schedule({
            id: id,
            title: title,
            text: text
        });
    };
    // Show note popup when click to 'Submit Offer'
    UserRequestsPage.prototype.showNotePopup = function (reqID) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Submit Offer',
            message: "",
            inputs: [
                {
                    name: 'price',
                    placeholder: 'Price to Offer'
                },
                {
                    name: 'description',
                    placeholder: 'Description'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'CancelCss',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    cssClass: 'SendCss',
                    handler: function (data) {
                        _this.send_Offer(reqID, data['price'], data['description']);
                    }
                }
            ]
        });
        prompt.present();
    };
    ;
    UserRequestsPage.prototype.send_Offer = function (reqID, price, desc) {
        var _this = this;
        // Send Admin Offer
        this.showLoading('Sending Offer...');
        this.offerService.send_Offer(reqID, price, desc).then(function (result) {
            if (result) {
                for (var i = 0; i < _this.requests.length; i++) {
                    if (reqID == _this.requests[i]['requestId']) {
                        _this.requests.splice(i, 1);
                        break;
                    }
                }
            }
            _this.showToast('Offer Sent');
            _this.hideLoading();
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    };
    UserRequestsPage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.present();
    };
    UserRequestsPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    UserRequestsPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'top'
        });
        toast.present();
    };
    UserRequestsPage.prototype.showAlert = function (title, mesasge) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: mesasge,
            buttons: ['OK']
        });
        alert.present();
    };
    UserRequestsPage.prototype.viewDetails = function (requestID) {
        console.log("requestID: ", requestID);
        var Modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modal_modal__["a" /* ModalPage */], { reqID: requestID });
        Modal.present();
    };
    UserRequestsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-user-requests',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/user-requests/user-requests.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n\n        <ion-title>\n            <ion-grid>\n                <ion-row class="header-class">\n                    <ion-col col-2>\n                        <!-- <div class="logoHeader"></div> -->\n                    </ion-col>\n                    <ion-col col-6>\n                        <strong>Recent Requests</strong>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n            <!-- <strong>Requests</strong> -->\n        </ion-title>\n\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="cards-bg social-cards">\n\n    <ion-card *ngFor="let i = index; let request of requests" id="card-{{request.requestId}}">\n\n        <ion-item>\n            <ion-avatar item-start>\n                <img src="{{ USER_IMG_URL + request.image }}">\n            </ion-avatar>\n            <h2>{{ request.name }}</h2>\n            <ion-note>{{ request.email }}</ion-note>\n        </ion-item>\n\n        <img *ngIf="!imgloaded[i]" src="{{ loadingAnimation }}" />\n        <img [hidden]="!imgloaded[i]" (load)="imgloaded[i] = true" src="{{ request.img }}" />\n        <!-- <img src="{{ request.img || loadingAnimation }}"> -->\n\n        <ion-card-content>\n            <p><strong>Category:</strong> {{ request.cat_name }}</p>\n            <p><strong>Description:</strong> {{ request.description }}</p>\n\n\n            <ion-col col-12 [hidden]="request.price == null">\n                <p><strong>SnapRepair Offered Prize:</strong>\n                    <ion-badge color="secondary">${{ request.price }}</ion-badge>\n                </p>\n            </ion-col>\n\n            <ion-note>\n                Expected Completion Time: {{ request.ect }}\n            </ion-note>\n            <!-- <ion-col text-center col-6>\n                <ion-badge color="primary">{{ request.price }}</ion-badge>\n            </ion-col> -->\n\n        </ion-card-content>\n\n        <ion-row>\n            <ion-col text-center col-6>\n                <button ion-button color="instagram" clear small icon-start (click)="viewDetails(request.requestId)">\n                  <ion-icon name=\'ios-bookmark\'></ion-icon>\n                  View Details\n                </button>\n            </ion-col>\n            <ion-col text-center col-6 [hidden]="request.price != null">\n                <button ion-button color="danger" clear small icon-start (click)="deleteRequest(request.requestId)">\n                  <ion-icon name=\'md-trash\'></ion-icon>\n                  Delete\n                </button>\n            </ion-col>\n\n            <ion-col text-center col-6 class="badge_Margin" [hidden]="request.price == null">\n                <ion-select [(ngModel)]="request.status" class="selectStyle" placeholder="Accept / Decline" (ionChange)="updateAcceptStatus(request.offerId, $event)">\n                    <ion-option value="1">Accept</ion-option>\n                    <ion-option value="-1">Decline</ion-option>\n                </ion-select>\n\n                <!-- <ion-badge [hidden]="offer.status != 1" color="secondary">Offer Accepted</ion-badge>\n                <ion-badge [hidden]="offer.status != 0" color="danger">Offer Not Accepted</ion-badge> -->\n            </ion-col>\n            <!-- <ion-col align-self-center text-center>\n                <ion-note>\n                    {{ request.ect }}\n                </ion-note>\n            </ion-col> -->\n        </ion-row>\n\n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/user-requests/user-requests.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__services_requests__["a" /* Requests */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */], __WEBPACK_IMPORTED_MODULE_8__services_offers__["a" /* Offers */]])
    ], UserRequestsPage);
    return UserRequestsPage;
}());

//# sourceMappingURL=user-requests.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database_database__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DealService = (function () {
    function DealService(db, authService) {
        this.db = db;
        this.authService = authService;
    }
    // sort driver by rating & distance
    DealService.prototype.sortDriversList = function (drivers) {
        return drivers.sort(function (a, b) {
            return (a.rating - a.distance / 6) - (b.rating - b.distance / 6);
        });
    };
    // make deal to driver
    DealService.prototype.makeDeal = function (driverId, origin, destination, distance, fee, currency, note, paymentMethod, promocode, discount, passid) {
        var user = this.authService.getUserData();
        var currentUnixTime = new Date;
        console.log("time show--", currentUnixTime.toISOString());
        return this.db.object('deals/' + driverId).set({
            passengerId: user.uid,
            currency: currency,
            origin: origin,
            destination: destination,
            distance: distance,
            fee: fee,
            note: note,
            paymentMethod: paymentMethod,
            status: __WEBPACK_IMPORTED_MODULE_2__constants__["c" /* DEAL_STATUS_PENDING */],
            createdAt: currentUnixTime.toISOString(),
            promocode: promocode,
            discount: discount,
            Bit: 0,
            time: 0,
            carId: '',
            DriverId: '',
            passID: passid
        });
    };
    // Update deal Destination For driver
    DealService.prototype.updateDeal_dest = function (driverId, destination) {
        return this.db.object('deals/' + driverId).update({
            destination: destination,
        });
    };
    // get deal by driverId
    DealService.prototype.getDriverDeal = function (driverId) {
        return this.db.object('deals/' + driverId);
    };
    // remove deal
    DealService.prototype.removeDeal = function (driverId) {
        return this.db.object('deals/' + driverId).remove();
    };
    DealService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]])
    ], DealService);
    return DealService;
}());

//# sourceMappingURL=deal-service.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_driver_service__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__places_places__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_trip_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_place_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_user_user__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var TrackingPage = (function () {
    function TrackingPage(nav, userService, driverService, platform, navParams, tripService, placeService, modalCtrl, alertCtrl, geo, view, loadingCtrl, localNotifications) {
        this.nav = nav;
        this.userService = userService;
        this.driverService = driverService;
        this.platform = platform;
        this.navParams = navParams;
        this.tripService = tripService;
        this.placeService = placeService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.geo = geo;
        this.view = view;
        this.loadingCtrl = loadingCtrl;
        this.localNotifications = localNotifications;
        //public check: boolean = true;
        this.tip = 0;
        this.bit = false;
        this.driver_Arrive_alert = true;
        this.trip = {};
        this.alertCnt = 0;
        this.responsedata = {};
        this.cancelAlert = true;
        this.TripCancelByDriver = false;
        this.sos = __WEBPACK_IMPORTED_MODULE_7__services_constants__["l" /* SOS */];
        var x = JSON.parse(localStorage.getItem('userData'));
        this.locality = localStorage.getItem('currentLocality');
    }
    TrackingPage.prototype.isDriverArrived = function (driverLatLng, passengerLatLng, km) {
        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * passengerLatLng.lat / 180.0) * ky;
        var dx = Math.abs(passengerLatLng.lng - driverLatLng.lng()) * kx;
        var dy = Math.abs(passengerLatLng.lat - driverLatLng.lat()) * ky;
        var computedDistance = Math.sqrt(dx * dx + dy * dy);
        return computedDistance <= km;
    };
    TrackingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var tripId;
        if (this.navParams.get('tripId'))
            tripId = this.navParams.get('tripId');
        else
            tripId = this.tripService.getId();
        this.tripId = tripId;
        this.getTripSub = this.tripService.getTrip(tripId).take(1).subscribe(function (snapshot) {
            _this.trip = snapshot;
            _this.getDriverSub = _this.driverService.getDriver(snapshot.driverId).take(1).subscribe(function (snap) {
                _this.driver = snap;
                _this.watchTrip(tripId);
                //** init map
                _this.loadMap();
            });
        });
    };
    TrackingPage.prototype.Message = function () {
        var user_Obj = JSON.parse(localStorage.getItem('userData'));
        this.userService.InsertConvo(this.driver.phoneNumber, user_Obj.phone).then(function (result) {
            // console.log(result);
        }, function (err) { return console.log(err); });
    };
    TrackingPage.prototype.ionViewWillLeave = function () {
        this.driver_Arrive_alert = false;
        clearInterval(this.driverTracking);
        if (this.TripCancelByDriver) {
            this.getTripSub.unsubscribe();
            this.getDriverSub.unsubscribe();
            // this.nav.setRoot(HomePage, {Trip : 'Trip Canceled due to Driver Verification Failed'});
        }
    };
    TrackingPage.prototype.watchTrip = function (tripId) {
        var _this = this;
        var tripSub = this.tripService.getTrip(tripId).subscribe(function (snapshot) {
            _this.tripStatus = snapshot.status;
            console.log("//////////////////////////////////// this.tripStatus: ", _this.tripStatus);
            if (_this.tripStatus == 'canceled') {
                tripSub.unsubscribe();
                _this.TripCancelByDriver = true;
                console.log("//////////////////////////////////// this.tripStatus: ", _this.tripStatus);
                _this.tripService.unverifiedDrivers(_this.trip.driverId);
                _this.singlenotification(1, 'Trip Cancelled', 'Trip has been Cancelled.');
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                // this.nav.setRoot(HomePage, {Trip : 'Trip Canceled due to Driver Verification Failed'});
                // if(this.cancelAlert) {
                //   console.log("//////////////////////////////////// this.cancelAlert: ", this.cancelAlert);
                //   this.cancelAlert = false;
                //   tripSub.unsubscribe();
                //   this.presentAlert('Trip Canceled', 'Trip Canceled due to Driver Verification Failed');
                //   this.nav.setRoot(HomePage);
                // }
            }
        });
        this.tripService.getBit(tripId).subscribe(function (snapshot) {
            // this.tripStatus = snapshot.status;
            // console.log("this.tripStatus: ", snapshot.$value);
            if (snapshot.$value == 1) {
                //console.log("this.tripStatus: ", snapshot.$value);
                //alert(snapshot.$value);
                ///this.tripService.setbit2(true);
                _this.tripStatus = __WEBPACK_IMPORTED_MODULE_7__services_constants__["m" /* TRIP_STATUS_FINISHED */];
            }
            else {
            }
        });
        //
        setInterval(function () {
            if (_this.tripStatus == __WEBPACK_IMPORTED_MODULE_7__services_constants__["m" /* TRIP_STATUS_FINISHED */]) {
                //setTimeout(() => {
                if (_this.tripService.getbit2() == true) {
                    _this.tripService.setbit2(false);
                    _this.singlenotification(3, 'Trip Completed', 'You have Reached your destination. Please Rate the Driver');
                    _this.showRateCard();
                }
                else {
                }
            }
        }, 2000);
    };
    TrackingPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Estimating Fare Please Wait...'
        });
        this.loading.present();
    };
    TrackingPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    TrackingPage.prototype.showRateCard = function () {
        this.showLoading();
        var pickUpLatLong = JSON.parse(localStorage.getItem('origin')).location;
        var dropLatLong = JSON.parse(localStorage.getItem('destination')).location;
        var orign = new google.maps.LatLng(dropLatLong.lat, dropLatLong.lng);
        var destination = new google.maps.LatLng(pickUpLatLong.lat, pickUpLatLong.lng);
        var self = this;
        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: [orign],
            destinations: [destination],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            var arrivalTime;
            self.tripService.getArrivalTime(self.tripId).subscribe(function (_) {
                arrivalTime = parseFloat(_.$value);
                if (status !== 'OK') {
                    alert('Error was: ' + status);
                }
                else {
                    var distance_1 = parseFloat(response.rows[0].elements[0].distance.text);
                    var data = {
                        carType: 5,
                        stateId: 1,
                        distance: distance_1,
                        time: arrivalTime
                    }; //// this data will be used in future to send it in estimate fare function
                    self.userService.calculateFareForTime(data).then(function (result) {
                        var costForTime = parseFloat(result['FareEstimationForTime']);
                        self.userService.estimate_Fare(distance_1).then(function (result) {
                            var directionsService = new google.maps.DirectionsService();
                            var request = {
                                origin: pickUpLatLong.lat.toString() + ',' + pickUpLatLong.lng.toString(),
                                destination: dropLatLong.lat.toString() + ',' + dropLatLong.lng.toString(),
                                travelMode: google.maps.DirectionsTravelMode.DRIVING
                            };
                            directionsService.route(request, function (response, status) {
                                var _this = this;
                                if (status == google.maps.DirectionsStatus.OK) {
                                    var myRoute = response.routes[0];
                                    var polyline = new google.maps.Polyline();
                                    var bounds = new google.maps.LatLngBounds();
                                    var legs = myRoute.legs;
                                    for (var i = 0; i < legs.length; i++) {
                                        var steps = legs[i].steps;
                                        for (var j = 0; j < steps.length; j++) {
                                            var nextSegment = steps[j].path;
                                            for (var k = 0; k < nextSegment.length; k++) {
                                                polyline.getPath().push(nextSegment[k]);
                                                bounds.extend(nextSegment[k]);
                                            }
                                        }
                                    }
                                    self.userService.GetTolls().then(function (response) {
                                        var tolls = 0;
                                        var latLongs = {};
                                        latLongs = response['data'];
                                        latLongs.forEach(function (element) {
                                            var tollPosition = new google.maps.LatLng(element.latitude, element.longitude);
                                            if (google.maps.geometry.poly.isLocationOnEdge(tollPosition, polyline, 0.01)) {
                                                tolls += parseFloat(element.cost);
                                            }
                                        });
                                        result['FareEstimationForTime'] = costForTime;
                                        var distanceCovered = distance_1;
                                        self.trip.fee = parseFloat(result['FareEstimationForMile']);
                                        var amountWithoutTaxes = self.trip.fee + costForTime;
                                        amountWithoutTaxes = amountWithoutTaxes - (amountWithoutTaxes * self.trip.discount / 100);
                                        var gst = amountWithoutTaxes * 0.0725;
                                        var data = {
                                            isBaseFare: result["IsBaseFare"],
                                            distance: Math.round(distanceCovered * 100) / 100 + " km",
                                            distanceCost: Math.round(self.trip.fee * 100) / 100,
                                            timeCost: Math.round(costForTime * 100) / 100,
                                            fare: Math.round(amountWithoutTaxes * 100) / 100,
                                            discount: Math.round(self.trip.discount * 100) / 100,
                                            promo: Math.round(self.trip.promo * 100) / 100,
                                            gst: Math.round(gst * 100) / 100,
                                            tolls: Math.round(tolls * 100) / 100,
                                            total: Math.round((gst + amountWithoutTaxes + tolls) * 100) / 100
                                        };
                                        var userId = JSON.parse(localStorage.getItem('userData'));
                                        userId = userId.userId;
                                        // // let ride_info=[
                                        // //   {"pickUpLatLong":pickUpLatLong,
                                        // //      "dropLatLong":dropLatLong,
                                        // //      "orign":orign,
                                        // //      "destination":destination,
                                        // //      "userId":userId,
                                        // //       "data": data,
                                        // //    }
                                        // //   ];
                                        // //console.log("Ride inforemation ",ride_info)
                                        //  self.userService.Insert_Ride(ride_info[0])
                                        self.userService.Getsolotransaction(userId).then(function (result2) {
                                            self.hideLoading();
                                            //code here for insert ride for passenger get from trips in firebase
                                            self.showTipAlert(data['total']).then(function (result) {
                                                if (result) {
                                                    data["tip"] = self.tip;
                                                    data['total'] += self.tip;
                                                    _this.mydata = result['data'];
                                                    var finalFareModal = self.modalCtrl.create('ModalFinalFarePage', { key: self.trip.$key, data: data, Card: result2['data'] });
                                                    finalFareModal.present();
                                                    finalFareModal.onDidDismiss(function (response) {
                                                        self.tripService.setTotalFee(self.trip.$key, amountWithoutTaxes + gst + tolls).then(function (_) {
                                                            self.modalCtrl.create('ModalRatingPage', { "tripKey": self.trip.$key }).present();
                                                        });
                                                    });
                                                }
                                            });
                                        });
                                    });
                                }
                            });
                        }, function (err) {
                            console.log(err);
                        });
                    });
                }
            });
        });
    };
    TrackingPage.prototype.showTipAlert = function (totalFare) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.tip = 0;
            var alert = _this.alertCtrl.create({
                title: 'Total Fare:\t\t' + totalFare,
                subTitle: "ADD TIP",
                cssClass: 'buttonCss',
                inputs: [
                    {
                        name: 'tip',
                        placeholder: 'TIP',
                        type: 'number',
                        min: 0
                    },
                ],
                buttons: [
                    {
                        text: 'Pay Now',
                        handler: function (data) {
                            var tip = parseFloat(alert.data.inputs[0].value);
                            if (tip >= 0) {
                                _this.tip = tip;
                            }
                            resolve(true);
                        }
                    },
                    {
                        text: 'Skip Tip',
                        handler: function (_) { return resolve(true); }
                    }
                ]
            });
            alert.present();
        });
    };
    TrackingPage.prototype.loadMap = function () {
        var latLng = new google.maps.LatLng(this.trip.origin.location.lat, this.trip.origin.location.lng);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false
        };
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        this.trackDriver();
    };
    // make array with range is n
    TrackingPage.prototype.range = function (n) {
        return new Array(Math.round(n));
    };
    TrackingPage.prototype.trackDriver = function () {
        var _this = this;
        this.showDriverOnMap();
        this.driverTracking = setInterval(function () {
            _this.marker.setMap(null);
            _this.showDriverOnMap();
        }, __WEBPACK_IMPORTED_MODULE_7__services_constants__["j" /* POSITION_INTERVAL */]);
        //console.log("POSITION_INTERVAL: ",POSITION_INTERVAL);
    };
    TrackingPage.prototype.cancelTrip = function () {
        var _this = this;
        if (typeof this.locality == 'undefined')
            this.locality = this.placeService.getLocality();
        // console.log("cancelTrip driver id: ", this.driver.uid);
        // console.log("cancelTrip driver type: ", this.driver.type);
        // console.log("cancelTrip locality: ", this.locality);
        var user_Obj = JSON.parse(localStorage.getItem('userData'));
        this.userService.DelConvo(this.driver.phoneNumber, user_Obj.phone).then(function (result) {
            //    console.log(result);
        }, function (err) { return console.log(err); });
        this.tripService.get_Driver_Loc(this.locality, this.driver.type, this.driver.uid).take(1).subscribe(function (snapshot) {
            console.log("snapshot//: ", snapshot);
            var distance = _this.getDistanceFromLatLonInMiles(snapshot.ride_ini_Lat, snapshot.ride_ini_Lng, snapshot.lat, snapshot.lng);
            // console.log("distance: ", distance);
            if (distance > 2) {
                _this.Confirm_Cancelation();
            }
            else {
                // console.log('----- this.tripId ****',this.tripId)
                var fare_1 = '';
                _this.tripService.getrideinfo(_this.tripId).subscribe(function (snnp) {
                    console.log('----- snapshot ****', snnp);
                    _this.userService.Insert_Ride(snnp, fare_1, 3).then(function (result) {
                        console.log(result);
                        _this.tripService.cancelTrip(_this.trip.$key).then(function (data) {
                            _this.singlenotification(1, 'Trip Cancelled', 'Trip has been Cancelled.');
                            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                        });
                    }, function (err) {
                        _this.tripService.cancelTrip(_this.trip.$key).then(function (data) {
                        });
                        //    console.log(err);
                    });
                });
                // console.log('Fare Data',this.total_amount)
            }
        });
    };
    TrackingPage.prototype.getDistanceFromLatLonInMiles = function (lat1, lon1, lat2, lon2) {
        // lat2 = 33.684490;
        // lon2 = 73.047904;
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        // return d * 0.621371;  // Return in Miles
        return d; // Return in Miles
    };
    TrackingPage.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    // show user on map
    TrackingPage.prototype.showDriverOnMap = function () {
        var _this = this;
        var driverPosition;
        if (typeof this.locality == 'undefined')
            this.locality = this.placeService.getLocality();
        // get user's position
        // console.log("this.placeService.getLocality(): ",this.locality);
        // console.log("this.driver.type: ",this.driver.type);
        // console.log("this.driver.$key: ",this.driver.$key);
        try {
            this.driverService.getDriverPosition(this.locality, this.driver.type, this.driver.$key).take(1).subscribe(function (snapshot) {
                //console.log("snapshot: ",snapshot);
                // create or update
                driverPosition = new google.maps.LatLng(snapshot.lat, snapshot.lng);
                // console.log("driverPosition:", JSON.stringify(driverPosition));
                _this.map.setCenter(driverPosition);
                _this.marker = null;
                // show vehicle to map
                _this.marker = new google.maps.Marker({
                    map: _this.map,
                    position: driverPosition,
                    icon: {
                        url: 'assets/img/icon/suv_right.png',
                        size: new google.maps.Size(32, 32),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(16, 16),
                        scaledSize: new google.maps.Size(32, 32)
                    },
                });
                setTimeout(function () {
                    _this.showArrivedNotification(driverPosition);
                }, 1000);
            });
        }
        catch (error) {
            console.log("error: ", error);
        }
        ;
    };
    TrackingPage.prototype.showArrivedNotification = function (driverPosition) {
        if (this.tripService.getbit() == true && this.driver_Arrive_alert == true) {
            var isArrived = false;
            if (this.bit == false) {
                isArrived = this.isDriverArrived(driverPosition, this.trip.origin.location, 0.05);
                this.bit = isArrived;
            }
            else {
                this.singlenotification(2, 'Driver Arrived', 'Yur Driver has arrived at the Pickup Location.');
                this.tripService.setbit(false);
                this.modalCtrl.create('ModalNotificationPage').present();
            }
        }
    };
    // change destination place
    TrackingPage.prototype.changeDestination = function () {
        // go to ConfirmationPage
        //console.log("this.driver.$key: ", this.driver.$key);
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__places_places__["a" /* PlacesPage */], { type: 'destination', page: 'tracking', driverID: this.driver.$key, tripId: this.tripId });
    };
    TrackingPage.prototype.Confirm_Cancelation = function () {
        //console.log("Confirm_Cancelation");
        var self = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Cancelation',
            message: 'Driver has already moved more than 2 miles. You will be charged $5 for cancelling this ride.',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Proceed',
                    handler: function () {
                        // console.log('Proceed clicked');
                        self.cancelation_Charge();
                    }
                }
            ]
        });
        alert.present();
    };
    TrackingPage.prototype.cancelation_Charge = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Processing...' });
        loading.present();
        var userId = JSON.parse(localStorage.getItem('userData'));
        var self = this;
        userId = userId.userId;
        self.userService.Gettransaction(userId).then(function (result) {
            var Card = result['data'];
            var Cost = 5;
            //console.log("card: ", Card);
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'https://dbstage1.paywire.com/API/pwapi.aspx');
            var sr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        <PAYMENTREQUEST>\n           <TRANSACTIONHEADER>\n              <PWVERSION>3</PWVERSION>\n            <PWUSER>yurt1</PWUSER>\n               <PWPASS>Kt93SbYZ</PWPASS>\n               <PWCLIENTID>0000010062</PWCLIENTID>\n               <PWKEY>8A0B6FA9-D918-4D84-B02F-5BB7C8578F4D</PWKEY>\n              <PWTRANSACTIONTYPE>SALE</PWTRANSACTIONTYPE>\n              <PWSALEAMOUNT>" + Cost + "</PWSALEAMOUNT>\n              <CARDPRESENT>FALSE</CARDPRESENT>\n           </TRANSACTIONHEADER>\n           <CUSTOMER>\n              <PWMEDIA>CC</PWMEDIA>\n               <PWTOKEN>" + Card['pwtoken'] + "</PWTOKEN>\n           </CUSTOMER>\n        </PAYMENTREQUEST>";
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        var xml = xmlhttp.responseXML;
                        var response = xml.getElementsByTagName("PAYMENTRESPONSE")[0];
                        var length_1 = response.childElementCount;
                        //console.log("Length ", length);
                        // console.log("Response Data", response);
                        if (length_1 < 9) {
                            loading.dismiss();
                            // this.viewCtrl.dismiss();
                            _this.alertCtrl.create({ subTitle: 'Problem In Transaction', buttons: ['ok'] }).present();
                        }
                        else {
                            var fare_2 = '';
                            _this.tripService.getrideinfo(_this.tripId).subscribe(function (snapshot) {
                                console.log('----- snapshot ****', snapshot);
                                _this.userService.Insert_Ride(snapshot, fare_2, 5).then(function (result) {
                                    console.log(result);
                                    _this.tripService.cancelTrip(_this.trip.$key).then(function (data) {
                                    });
                                }, function (err) {
                                    _this.tripService.cancelTrip(_this.trip.$key).then(function (data) {
                                    });
                                    //    console.log(err);
                                });
                            });
                            for (var i = 0; i < length_1; i++) {
                                _this.responsedata[response.childNodes[i].nodeName] = response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue;
                            }
                            var userId_1 = JSON.parse(localStorage.getItem('userData'));
                            _this.responsedata['UserId'] = userId_1.userId;
                            // console.log("This Response data", this.responsedata);
                            _this.userService.tbtransaction(_this.responsedata).then(function (result) {
                                // console.log(result['data']);
                                loading.dismiss();
                                _this.alertCtrl.create({ subTitle: ' Transaction Completed', buttons: ['ok'] }).present();
                            }, function (err) {
                                loading.dismiss();
                                console.log(err);
                            });
                        }
                    }
                    else {
                        var fare_3 = '';
                        _this.tripService.getrideinfo(_this.tripId).subscribe(function (snapshot) {
                            console.log('----- snapshot ****', snapshot);
                            _this.userService.Insert_Ride(snapshot, fare_3, 10).then(function (result) {
                                console.log(result);
                                _this.tripService.cancelTrip(_this.trip.$key).then(function (data) {
                                });
                            }, function (err) {
                                _this.tripService.cancelTrip(_this.trip.$key).then(function (data) {
                                });
                                //    console.log(err);
                            });
                        });
                        _this.alertCtrl.create({ subTitle: 'Transaction Is Not Done', buttons: ['ok'] }).present();
                        //this.mydata = null;
                        loading.dismiss();
                    }
                }
            };
            xmlhttp.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp.responseType = "document";
            xmlhttp.send(sr);
            // Cancel Trip and set to HomePage
            self.tripService.setTotalFee(self.trip.$key, Cost).then(function (_) {
                self.tripService.cancelTrip(self.trip.$key).then(function (data) {
                    //   console.log(data);
                    _this.singlenotification(1, 'Trip Cancelled', 'Trip has been Cancelled.');
                    self.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
                });
            });
        });
    };
    TrackingPage.prototype.presentAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['Ok']
        });
        alert.present();
    };
    // Push Notification
    TrackingPage.prototype.singlenotification = function (id, title, text) {
        this.localNotifications.schedule({
            id: id,
            title: title,
            text: text
        });
    };
    TrackingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tracking',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/tracking/tracking.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <!-- <ion-title>{{\'ON_THE_WAY\' | translate}}</ion-title> -->\n    <ion-title>RIDE DETAIL</ion-title>\n    <ion-buttons end>\n      <button ion-button *ngIf="tripStatus == \'finished\'"  (click)="showRateCard()">{{\'FINISH_TRIP\' | translate}}</button>\n      <button ion-button *ngIf="tripStatus == \'waiting\'" (click)="cancelTrip()">{{\'CANCEL_TRIP\' | translate}}</button>\n      <!-- <a href="tel:{{sos}}" ion-button *ngIf="tripStatus == \'going\'">{{\'SOS\' | translate}}</a> -->\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <!-- <ion-grid>\n    <ion-row class="header-class">\n      <ion-col col-12 *ngIf="tripStatus == \'waiting\'" style="background: black; color: white">\n        <strong>Status: Driver has started moving</strong>\n      </ion-col>\n    </ion-row>\n  </ion-grid> -->\n\n  <div *ngIf="tripStatus == \'waiting\'" class="status_div">\n    <strong>Status: Driver has started moving</strong>\n  </div>\n\n  <div *ngIf="tripStatus == \'waiting\'" class="change_dest" (click)="changeDestination()">\n    <span>Click here to Change Destination</span>\n  </div>\n\n  <div id="map" style="z-index: -1;"></div>\n</ion-content>\n\n<ion-footer>\n    <div style="float:right;background:yellow; color: #222">{{ \'OTP\' | translate}}: {{trip.otp}}</div>\n    <ion-item>\n      <ion-avatar item-left>\n          <img src="{{ (driver)?.photoURL }}"/>\n      </ion-avatar>\n      <h2>{{ (driver)?.name }} &nbsp; {{(driver)?.rating}} <ion-icon name="md-star" color="yellow"></ion-icon> </h2>\n      <p>{{ (driver)?.plate }} &middot; {{ (driver)?.brand }}</p>\n      <a item-right ion-button clear (click) = "Message()" href="tel: +12014264448 ">\n        <ion-icon name="call"></ion-icon>&nbsp;{{\'CALL\' | translate}}\n      </a>\n      <a item-right ion-button clear (click) = "Message()"  href="sms: +12014264448 ">\n        <ion-icon name="call"></ion-icon>&nbsp;{{\'SMS\' | translate}}\n      </a>\n\n    </ion-item>\n</ion-footer>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/tracking/tracking.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_9__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_3__services_driver_service__["a" /* DriverService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__services_trip_service__["a" /* TripService */],
            __WEBPACK_IMPORTED_MODULE_8__services_place_service__["a" /* PlaceService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_10__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], TrackingPage);
    return TrackingPage;
}());

//# sourceMappingURL=tracking.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return SHOW_VEHICLES_WITHIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return POSITION_INTERVAL; });
/* unused harmony export POSITION_INTERVAL2 */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return VEHICLE_LAST_ACTIVE_LIMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DEAL_STATUS_PENDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEAL_STATUS_ACCEPTED; });
/* unused harmony export TRIP_STATUS_GOING */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return TRIP_STATUS_FINISHED; });
/* unused harmony export DEAL_TIMEOUT */
/* unused harmony export TRIP_STATUS_WAITING */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return EMAIL_VERIFICATION_ENABLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return ENABLE_SIGNUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return SOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return API_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return IMG_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return USER_IMG_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return GOOGLE_MAP_API_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return GOOGLE_MAP_BASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return DEFAULT_AVATAR; });
var SHOW_VEHICLES_WITHIN = 6; // within 5km
var POSITION_INTERVAL = 10000; // 2000ms
var POSITION_INTERVAL2 = 20000; // 2000ms
var VEHICLE_LAST_ACTIVE_LIMIT = 60000; // 60s
var DEAL_STATUS_PENDING = 'pending';
var DEAL_STATUS_ACCEPTED = 'accepted';
var TRIP_STATUS_GOING = 'going';
var TRIP_STATUS_FINISHED = 'finished';
var DEAL_TIMEOUT = 60000; // 60s
var TRIP_STATUS_WAITING = 'waiting';
var EMAIL_VERIFICATION_ENABLED = true; // send verification email after user register
var ENABLE_SIGNUP = true;
var SOS = "";
var API_URL = 'http://snaprepair1.com/SnapRepair_App/api/controller';
// export let IMG_URL = 'http://blakbronco.com/service/images/';
var IMG_URL = 'http://snaprepair1.com/SnapRepair_App/images/request/';
var USER_IMG_URL = 'http://snaprepair1.com/SnapRepair_App/images/user/';
// NOTE: Please update your firebase configurations on src/app/app.module.ts
var GOOGLE_MAP_API_KEY = "AIzaSyA7MNmGM6-bW6QugXONZWdKZs8Y9eViI7E";
var GOOGLE_MAP_BASE_URL = "https://maps.googleapis.com/maps/api/";
var DEFAULT_AVATAR = "http://placehold.it/150x150";
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_database__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_crop__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_auth_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_trip_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_user_user__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var UserPage = (function () {
    function UserPage(userService, nav, authService, navParams, alertCtrl, toastCtrl, loadingCtrl, platform, tripService, translate, db, events, imagePicker, cropService, file) {
        this.userService = userService;
        this.nav = nav;
        this.authService = authService;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.tripService = tripService;
        this.translate = translate;
        this.db = db;
        this.events = events;
        this.imagePicker = imagePicker;
        this.cropService = cropService;
        this.file = file;
        this.user = { name: '', email: '', password: '' };
        this.password = '';
        this.c_password = '';
        this.loadingAnimation = './assets/img/loading-animation.gif';
        this.user = JSON.parse(localStorage.getItem('userData'));
        console.log("this.user: ", this.user);
        this.userPic = __WEBPACK_IMPORTED_MODULE_6__services_constants__["n" /* USER_IMG_URL */] + this.user.image;
        // let userx = navParams.get('user');
        // this.authService.getUser(userx.uid).take(1).subscribe(snapshot => {
        //   snapshot.uid              = snapshot.$key;
        //   // this.user["photoURL"]     = snapshot['photoURL'];
        //   this.user["uid"]          = snapshot['uid'];
        //   this.user.isEmailVerified = firebase.auth().currentUser.emailVerified;
        //   console.log("this.user: ",this.user)
        // });
        // this.user = {};
        // this.path = JSON.parse(localStorage.getItem('userData'));
        // this.user["photoURL"]    = "http://185.48.64.136/" + this.path['profilePicPath'];
        // this.user["name"]        = this.path['firstName'] + " " + this.path['lastName'];;
        // this.user["firstName"]   = this.path['firstName'];
        // this.user["lastName"]    = this.path['lastName'];
        // this.user["email"]       = this.path['email'];
        // this.user["phoneNumber"] = this.path['phone'];
        // authService.getCardSetting().take(1).subscribe(snapshot => {
        //   this.number = snapshot.number;
        //   this.exp = snapshot.exp;
        //   this.cvv = snapshot.cvv;
        // });
    }
    // save user info
    UserPage.prototype.save = function () {
        var _this = this;
        if (this.c_password != this.password)
            this.showAlert('Password Missmatch!', 'Please make sure you enter same password');
        else if (this.user.name == '' || this.user.password == '')
            this.showAlert('Empty Fields!', 'All fields are required');
        else {
            var loading_1 = this.loadingCtrl.create({ content: 'Please wait...' });
            loading_1.present();
            // let x = (<HTMLInputElement>document.getElementById('avatar')).files[0];
            // console.log(x);
            if (typeof this.userPicBase64 == 'undefined')
                this.userPicBase64 = '';
            var formData = new FormData();
            formData.append('profilePic', this.userPicBase64);
            this.userService.UpdateProfile(this.user.userId, this.user.name, this.user.email, this.password, this.user.image, formData).then(function (result) {
                console.log(result);
                localStorage.setItem('userData', JSON.stringify(result));
                _this.user = result;
                loading_1.dismiss();
                _this.displayToast("Profile has been updated");
                _this.trigger_User_Update_Event();
            }, function (err) {
                loading_1.dismiss();
                _this.showAlert('Error Updating', JSON.stringify(err));
                console.log(err);
            });
        }
    };
    UserPage.prototype.trigger_User_Update_Event = function () {
        this.events.publish('user:updated', this.user, Date.now());
    };
    UserPage.prototype.showAlert = function (title, mesasge) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: mesasge,
            buttons: ['OK']
        });
        alert.present();
    };
    // // choose file for upload
    // chooseFile() {
    //   document.getElementById('avatar').click();
    // }
    // fileChange(event){
    //   try {
    //     if(event.target.files && event.target.files[0]){
    //       let reader = new FileReader();
    //       reader.onload = (event:any) => {
    //         this.userPic   = event.target.result;
    //       }
    //       reader.readAsDataURL(event.target.files[0]);
    //     }
    //       let fileList: FileList = event.target.files;
    //       console.log("fileList: ",fileList);
    //       let file: File = fileList[0];
    //       // this.user['profilePic'] = file;
    //       console.log(file);
    //   } catch(error) {
    //     this.showAlert('Error Changing File', JSON.stringify(error));
    //   }
    // }
    UserPage.prototype.openImagePicker = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 1,
        };
        this.imagePicker.getPictures(options)
            .then(function (results) {
            _this.reduceImages(results).then(function () {
                console.log('all images cropped!! CROP ENDED');
            });
        }, function (err) { console.log(err); });
    };
    UserPage.prototype.reduceImages = function (selected_pictures) {
        var _this = this;
        return selected_pictures.reduce(function (promise, item) {
            return promise.then(function (result) {
                return _this.cropService.crop(item, { quality: 90 })
                    .then(function (cropped_image) {
                    console.log('all images cropped!!', cropped_image);
                    _this.userPic = cropped_image;
                    _this.pathToBase64(_this.userPic);
                    // this.pushToImages(cropped_image);
                });
            });
        }, Promise.resolve());
    };
    UserPage.prototype.pathToBase64 = function (res) {
        var _this = this;
        var path = res.toString();
        try {
            var n = path.lastIndexOf("/");
            var x = path.lastIndexOf("g");
            var nameFile = path.substring(n + 1, x + 1);
            var directory = path.substring(0, n);
            this.file.readAsDataURL(directory.toString(), nameFile).then(function (res) {
                _this.userPicBase64 = res;
                // this.userPic = res;      
            }).catch(function (err) { return alert('error pathToBase64 ' + JSON.stringify(err)); });
        }
        catch (error) {
            alert(error);
        }
    };
    // upload thumb for item
    UserPage.prototype.upload = function () {
        // // Create a root reference
        // // let storageRef = firebase.storage().ref();
        // let loading    = this.loadingCtrl.create({ content: 'Please wait...' });
        // loading.present();
        // let mypic;
        // for (let selectedFile of [(<HTMLInputElement>document.getElementById('avatar')).files[0]]) {
        //   mypic = [(<HTMLInputElement>document.getElementById('avatar')).files[0]];
        //   console.log("mypic: ",mypic);
        //   this.userPic = selectedFile;
        //   let path = '/users/' + Date.now() + `${selectedFile.name}`;
        //   console.log("path: ",path);
        //   loading.dismiss();
        //   // let iRef = storageRef.child(path);
        //   // console.log("path: ",path);
        //   // iRef.put(selectedFile).then((snapshot) => {
        //   //   this.user.photoURL = snapshot.downloadURL;
        //   //   // this.updatePicPath_firbase();
        //   //   loading.dismiss();
        //   //   //console.log(snapshot.fullPath);
        //   // });
        // }
    };
    UserPage.prototype.displayToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'top'
        });
        toast.present();
    };
    UserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-user',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/user/user.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n        <ion-title>\n            <ion-grid>\n                <ion-row>\n                    <ion-col col-2>\n                        <!-- <div class="logoHeader"></div> -->\n                    </ion-col>\n                    <ion-col col-4>\n                        <strong>Profile</strong>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-title>\n        <!--<ion-buttons end>\n      <button ion-button tappable (click)="presentNotifications($event)">\n        <ion-icon name="notifications"></ion-icon>\n      </button>\n      <button ion-button tappable (click)="goToAccount()">\n        <ion-icon name="cog"></ion-icon>\n      </button>\n    </ion-buttons> -->\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n    <!-- <ion-segment [(ngModel)]="tabs">\n    <ion-segment-button value="profile">\n      {{\'BASIC_PROFILE\' | translate}}\n    </ion-segment-button>\n    <ion-segment-button value="cardsetting">\n      {{\'PAYMENTS\' | translate}}\n    </ion-segment-button>\n    <ion-segment-button value="ridehistroy" (click)="getTrips()">\n      {{\'HISTORY\' | translate}}\n    </ion-segment-button>\n  </ion-segment>\n  <div [ngSwitch]="tabs">\n    <div *ngSwitchCase="\'profile\'" padding>\n      <div style="text-align:center">\n        <img src="{{ user.photoURL }}" style="width:50px;height:50px;border-radius:100px" (click)="chooseFile()">\n        <form ngNoForm>\n          <input id="avatar" name="file" type="file" (change)="upload()">\n        </form>\n        <h3>{{user.name}}</h3>\n      </div>\n      <ion-list>\n        <ion-item>\n          <ion-label stacked color="primary">{{\'FULLNAME\' | translate}}</ion-label>\n          <ion-input type="text" [(ngModel)]="user.name"></ion-input>\n        </ion-item>\n        <ion-item>\n          <button ion-button item-right clear *ngIf="!user.isPhoneVerified" (click)="verifyPhone()">{{\'VERIFY\' | translate}}</button>\n          <ion-label stacked color="primary">{{\'PHONE_NUMBER\' | translate}}</ion-label>\n          <ion-input type="text" [(ngModel)]="user.phoneNumber" [disabled]="user.isPhoneVerified"></ion-input>\n        </ion-item>\n        <ion-item>\n          <button ion-button item-right clear *ngIf="!user.isEmailVerified" (click)="verifyEmail()">{{\'VERIFY\' | translate}}</button>\n          <ion-label stacked color="primary">{{\'EMAIL_ADDRESS\' | translate}}</ion-label>\n          <ion-input type="text" [(ngModel)]="user.email" disabled></ion-input>\n        </ion-item>\n        <ion-item>\n          <button ion-button block (click)="save()">{{\'SAVE\' | translate}}</button>\n        </ion-item>\n      </ion-list>\n    </div>\n\n    <!-- Card Section --\n    <div *ngSwitchCase="\'cardsetting\'" padding>\n      <ion-grid>\n        <ion-row>\n          <ion-item>\n            <ion-label stacked>{{\'CARD_NUMBER\' | translate}}</ion-label>\n            <ion-input type="text" [(ngModel)]="number" size="20"></ion-input>\n          </ion-item>\n        </ion-row>\n        <ion-row class="split-row">\n          <ion-col col-6>\n            <ion-item>\n                <ion-label stacked>{{\'EXPIRE_DATE\' | translate}} (MM/YY)</ion-label>\n              <ion-input type="text" [(ngModel)]="exp" size="5"></ion-input>\n            </ion-item>\n          </ion-col>\n          <ion-col col-6>\n            <ion-item>\n                <ion-label stacked>{{\'CVV\' | translate}}</ion-label>\n              <ion-input type="text" [(ngModel)]="cvv" size="4"></ion-input>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <button ion-button block (click)="saveCard()">{{\'SAVE\' | translate}}</button>\n    </div>\n\n    <!-- HISTORY Section --\n    <div *ngSwitchCase="\'ridehistroy\'" padding>\n      <ion-card *ngFor="let trip of trips">\n        <ion-card-content>\n          <p>{{trip.$key}}</p>\n          <ion-row>\n            <ion-col>\n              <b style="text-align:center">{{\'FROM\' | translate}}</b>\n              <p>{{ trip.origin.vicinity }}\n                <br/>\n                <ion-note>{{ trip.pickedUpAt | amDateFormat: \'YYYY-MM-DD HH:mm\'}}</ion-note>\n              </p>\n            </ion-col>\n            <ion-col>\n              <b style="text-align:center">{{\'TO\' | translate}}</b>\n              <p>{{ trip.destination.vicinity }}\n                <br/>\n                <ion-note>{{ trip.droppedOffAt | amDateFormat: \'YYYY-MM-DD HH:mm\'}}</ion-note>\n              </p>\n            </ion-col>\n          </ion-row>\n          <p>{{\'PAYMENT_MODE\' | translate}}: {{ trip.paymentMethod }}</p>\n          <p>{{\'FEE\' | translate}}: {{trip.currency}} {{trip.fee}} * {{ trip.promo}} {{trip.discount}} % = {{ trip.fee - (trip.fee\n            * trip.discount / 100) }}</p>\n        </ion-card-content>\n      </ion-card>\n    </div>\n\n  </div> -->\n\n    <div padding>\n\n        <div style="text-align:center">\n            <img *ngIf="!imgloaded" src="{{ loadingAnimation }}" style="width: 90px; height: 90px; border-radius:100px" />\n            <img [hidden]="!imgloaded" (load)="imgloaded = true" src="{{ userPic }}" (click)="openImagePicker()" style="width: 90px; height: 90px; border-radius:100px" />\n\n            <!-- <img src="{{ userPic }}" style="width: 70px;border-radius:100px" (click)="chooseFile()"> -->\n            <!-- <form ngNoForm>\n                <input id="avatar" name="file" type="file" (change)="fileChange($event)">\n            </form> -->\n            <h3>{{ user.name }}</h3>\n        </div>\n\n        <ion-list>\n            <ion-item>\n                <!-- color="primary" -->\n                <ion-label floating>{{\'Name\' | translate}}</ion-label>\n                <ion-input type="text" [(ngModel)]="user.name"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>{{\'Email\' | translate}}</ion-label>\n                <ion-input type="text" [(ngModel)]="user.email" disabled></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>{{\'Password\' | translate}}</ion-label>\n                <ion-input type="password" [(ngModel)]="password"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>{{\'Confirm Password\' | translate}}</ion-label>\n                <ion-input type="password" [(ngModel)]="c_password"></ion-input>\n            </ion-item>\n            <!-- <ion-item>\n                <button ion-button block (click)="save()">{{\'Update\' | translate}}</button>\n            </ion-item> -->\n        </ion-list>\n    </div>\n\n</ion-content>\n\n<ion-footer transparent>\n    <ion-toolbar transparent>\n        <button ion-button block (click)="save()">{{\'Update\' | translate}}</button>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/user/user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_10__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_7__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_8__services_trip_service__["a" /* TripService */], __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */]])
    ], UserPage);
    return UserPage;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_user_user__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_requests_user_requests__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










//B33437 awais@gmail.com
var LoginPage = (function () {
    function LoginPage(nav, authService, alertCtrl, loadingCtrl, toast, translate, userService, toastCtrl, events) {
        this.nav = nav;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toast = toast;
        this.translate = translate;
        this.userService = userService;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.user = { email: 'admin@gmail.com', password: '123456' };
        this.isRegisterEnabled = true;
        this.respnseData = null;
        this.isRegisterEnabled = __WEBPACK_IMPORTED_MODULE_6__services_constants__["f" /* ENABLE_SIGNUP */];
    }
    LoginPage.prototype.signup = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.reset = function () {
        var _this = this;
        if (this.user.email) {
            __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().sendPasswordResetEmail(this.user.email)
                .then(function (data) {
                return _this.toast.create({ message: 'Please check your mail', duration: 3000 }).present();
            })
                .catch(function (err) { return _this.toast.create({ message: err.message, duration: 3000 }).present(); });
        }
    };
    LoginPage.prototype.displayToast = function (message) {
        this.toastCtrl.create({ duration: 2000, message: message }).present();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.user.email.length == 0 || this.user.password.length == 0) {
            this.alertCtrl.create({ subTitle: 'Please enter the Email / Password.', buttons: ['ok'] }).present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({ content: 'Authenticating...' });
            loading_1.present();
            // Login with Server
            this.userService.login(this.user).then(function (result) {
                loading_1.dismiss();
                console.log('result', result);
                if (result == null) {
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Invalid Credentials',
                        subTitle: 'The user name or password you entered does not exists.',
                        buttons: ['Dismiss']
                    });
                    alert_1.present();
                }
                else {
                    localStorage.setItem('userData', JSON.stringify(result));
                    _this.trigger_User_Update_Event();
                    if (result['isAdmin'] == '1') {
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                    }
                    else {
                        _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__user_requests_user_requests__["a" /* UserRequestsPage */]);
                    }
                }
            }, function (err) {
                loading_1.dismiss();
                _this.showAlert('Error Logging In', JSON.stringify(err));
                console.log(err);
            });
        }
    };
    LoginPage.prototype.trigger_User_Update_Event = function () {
        this.events.publish('user:updated', this.user, Date.now());
    };
    LoginPage.prototype.showAlert = function (title, mesasge) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: mesasge,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.forgotPass = function () {
        var _this = this;
        var forgot = this.alertCtrl.create({
            title: 'Forgot Password?',
            message: "Enter you email address to send a reset link password.",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'Email',
                    type: 'email'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    handler: function (data) {
                        //console.log('Send clicked');
                        _this.userService.forgotPassword(data).then(function (result) {
                            _this.respnseData = result['data'];
                            if ('msg' in _this.respnseData) {
                                _this.respnseData['class'] = 'success-msg';
                                _this.respnseData['text'] = _this.respnseData['msg'];
                            }
                            else {
                                _this.respnseData['class'] = 'error-alert';
                                _this.respnseData['text'] = _this.respnseData['errorMsg'];
                            }
                            var toast = _this.toast.create({
                                message: _this.respnseData['text'],
                                duration: 3000,
                                position: 'top',
                                cssClass: _this.respnseData['class'],
                                closeButtonText: 'OK',
                                showCloseButton: true
                            });
                            toast.present();
                        }, function (err) {
                            console.log(err);
                        });
                    }
                }
            ]
        });
        forgot.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/login/login.html"*/'<!-- <ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="ios-arrow-back-outline"></ion-icon>\n        </button>\n        <ion-title>\n            <ion-grid>\n                <ion-row class="header-class">\n                    <ion-col col-1 style="margin-left: -23px;">\n                        <div class="logoHeader"></div>\n                    </ion-col>\n                    <ion-col col-1 offset-3>\n                        <strong>{{ \'SIGN IN\' | translate }}</strong>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-title>\n    </ion-navbar>\n</ion-header> -->\n\n<!-- <ion-content padding class="animated fadeIn login auth-page"> -->\n<ion-content class="animated fadeIn" padding style="display: none">\n\n    <div class="login-content">\n\n        <!-- <ion-grid>\n            <ion-row>\n                <ion-col col-6>\n                    <button ion-button icon-start block color="light">\n            <ion-icon name="logo-googleplus"></ion-icon>\n            <p>  |  {{ \'GOOGLE\' | translate }}</p>\n          </button>\n                </ion-col>\n                <ion-col col-6>\n                    <button ion-button icon-start block color="light">\n            <ion-icon name="logo-facebook"></ion-icon>\n            <p>  |  {{ \'FACEBOOK\' | translate }}</p>\n          </button>\n                </ion-col>\n            </ion-row>\n        </ion-grid> -->\n\n        <!-- <h6 class="hr_line"><span> OR </span></h6> -->\n\n        <!-- Logo -->\n        <div padding padding-horizontal text-center class="animated fadeInDown">\n            <div class="logo"></div>\n            <h2 ion-text>\n                <strong>YUR</strong>\n            </h2>\n        </div>\n\n        <!-- Login form -->\n        <!-- <form class="list-form"> -->\n        <form>\n            <ion-item>\n                <ion-label floating>\n                    <!-- class="text-primary" -->\n                    <ion-icon name="mail" item-start></ion-icon>\n                    Email\n                </ion-label>\n                <ion-input type="email" name="email" [(ngModel)]="user.email"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label floating>\n                    <ion-icon name="lock" item-start></ion-icon>\n                    Password\n                </ion-label>\n                <ion-input type="password" name="pass" [(ngModel)]="user.password"></ion-input>\n            </ion-item>\n        </form>\n\n        <div>\n            <button ion-button icon-start block tappable (click)="login()">\n        <ion-icon name="log-in"></ion-icon>\n        {{\'SIGN IN\' | translate }}\n      </button>\n\n        </div>\n\n        <button ion-button item-right clear block (click)="forgotPass()" [disabled]="user.email.length == 0"><strong style="color: #55e5eedb">{{\'Forgot Password ?\' | translate }}</strong></button>\n\n\n        <!-- Other links -->\n        <div text-center margin-top>\n            <span ion-text color="secondary" tappable (click)="signup()">New here? <strong>Sign up</strong></span>\n        </div>\n\n    </div>\n</ion-content>\n\n<ion-content scroll="false" class="animated fadeIn">\n    <div class="splash-bg"></div>\n    <div class="splash-info">\n        <!-- <div class="splash-logo"></div> -->\n        <div class="logo-div">\n            <div class="login-logo">\n                <img src="./assets/img/icon/logo.png" alt="">\n            </div>\n        </div>\n        <!-- <div class="splash-intro">\n            {{ \'SnapRepair\' | translate }}\n        </div> -->\n    </div>\n    <div padding>\n        <!-- Login form -->\n        <ion-item>\n            <ion-label floating>\n                <!-- class="text-primary" -->\n                <ion-icon name="mail" item-start></ion-icon>\n                Email\n            </ion-label>\n            <ion-input type="email" name="email" [(ngModel)]="user.email"></ion-input>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>\n                <ion-icon name="lock" item-start></ion-icon>\n                Password\n            </ion-label>\n            <ion-input type="password" name="pass" [(ngModel)]="user.password"></ion-input>\n        </ion-item>\n        <!-- <form>\n            \n        </form> -->\n        <!--  <button ion-button block (click)="signup()">{{ \'SIGNUP\' | translate }}</button> -->\n        <!-- <button ion-button block (click)="login()">{{ \'LOGIN\' | translate }}</button> -->\n    </div>\n</ion-content>\n\n<ion-footer transparent>\n    <ion-toolbar transparent padding>\n        <button ion-button block (click)="login()">{{ \'LOGIN\' | translate }}</button>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_8__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_user_user__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_crop__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var RegisterPage = (function () {
    function RegisterPage(nav, authService, alertCtrl, loadingCtrl, translate, userService, imagePicker, cropService, file) {
        this.nav = nav;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.userService = userService;
        this.imagePicker = imagePicker;
        this.cropService = cropService;
        this.file = file;
        this.name = "";
        this.isValidEmail = false;
        this.loadingAnimation = './assets/img/loading-animation.gif';
        this.c_password = '';
        this.user = { name: '', email: '', phone: '', password: '', image: __WEBPACK_IMPORTED_MODULE_6__services_constants__["n" /* USER_IMG_URL */] + 'avatar.png' };
    }
    RegisterPage.prototype.signup = function () {
        var _this = this;
        if (this.user['email'].length == 0 || this.user['password'].length == 0 || this.user['name'].length == 0 || this.user['phone'].length == 0) {
            this.alertCtrl.create({ subTitle: 'All Fields are Required!', buttons: ['ok'] }).present();
        }
        else if (this.user['password'] != this.c_password) {
            this.alertCtrl.create({ subTitle: 'Passwords doesn\'t match!', buttons: ['ok'] }).present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({ content: 'Creating Account...' });
            loading_1.present();
            if (typeof this.userPicBase64 == 'undefined')
                this.userPicBase64 = '';
            var formData = new FormData();
            formData.append('profilePic', this.userPicBase64);
            // Register User to Server
            this.userService.signup(this.user, formData).then(function (result) {
                if (result != null) {
                    console.log("result: ", result);
                    _this.showAlert('Account Created', 'Your account has been set up. Please SignIn!');
                    _this.login();
                }
                loading_1.dismiss();
            }, function (err) {
                loading_1.dismiss();
                console.log(err);
            });
        }
    };
    RegisterPage.prototype.login = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    RegisterPage.prototype.checkEmail = function (event) {
        var _this = this;
        console.log("event: ", event.target.value);
        var email = event.target.value;
        if (email != '') {
            var loading_2 = this.loadingCtrl.create({ content: 'Checking Email Availability...' });
            loading_2.present();
            // Check for Email on Server
            this.userService.validateEmail(email).then(function (result) {
                if (result) {
                    _this.isValidEmail = false;
                    console.log("result: ", result);
                    _this.showAlert('Email Already Exsits', 'Please SignIn or use another email address to register!');
                }
                else {
                    _this.isValidEmail = true;
                }
                loading_2.dismiss();
            }, function (err) {
                loading_2.dismiss();
                console.log(err);
            });
        }
    };
    RegisterPage.prototype.openImagePicker = function () {
        var _this = this;
        var options = {
            maximumImagesCount: 1,
        };
        this.imagePicker.getPictures(options)
            .then(function (results) {
            _this.reduceImages(results).then(function () {
                console.log('all images cropped!! CROP ENDED');
            });
        }, function (err) { console.log(err); });
    };
    RegisterPage.prototype.reduceImages = function (selected_pictures) {
        var _this = this;
        return selected_pictures.reduce(function (promise, item) {
            return promise.then(function (result) {
                return _this.cropService.crop(item, { quality: 90 })
                    .then(function (cropped_image) {
                    console.log('all images cropped!!', cropped_image);
                    _this.user.image = cropped_image;
                    _this.pathToBase64(_this.user.image);
                    // this.pushToImages(cropped_image);
                });
            });
        }, Promise.resolve());
    };
    RegisterPage.prototype.pathToBase64 = function (res) {
        var _this = this;
        var path = res.toString();
        try {
            var n = path.lastIndexOf("/");
            var x = path.lastIndexOf("g");
            var nameFile = path.substring(n + 1, x + 1);
            var directory = path.substring(0, n);
            this.file.readAsDataURL(directory.toString(), nameFile).then(function (res) {
                _this.userPicBase64 = res;
                // this.userPic = res;      
            }).catch(function (err) { return alert('error pathToBase64 ' + JSON.stringify(err)); });
        }
        catch (error) {
            alert(error);
        }
    };
    RegisterPage.prototype.showAlert = function (title, mesasge) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: mesasge,
            buttons: ['OK']
        });
        alert.present();
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/register/register.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n      <!-- <ion-icon name="menu"></ion-icon> -->\n      <ion-icon name="ios-arrow-back-outline"></ion-icon>\n    </button>\n\n        <ion-title>\n            <ion-grid>\n                <ion-row class="header-class">\n                    <ion-col col-2>\n                        <!-- <div class="logoHeader"></div> -->\n                    </ion-col>\n                    <ion-col col-6>\n                        <strong>{{ \'REGISTER\' | translate }}</strong>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-title>\n\n    </ion-navbar>\n\n\n</ion-header>\n\n<!-- <ion-content class="auth-page"> -->\n<ion-content class="animated fadeIn">\n    <div class="login-content">\n\n        <!-- <ion-grid lg>\n      <ion-row>\n        <ion-col col-6>\n          <button ion-button icon-start block color="light">\n            <ion-icon name="logo-googleplus"></ion-icon>\n            <p> | {{ \'GOOGLE\' | translate }}</p>\n          </button>\n        </ion-col>\n        <ion-col col-6>\n          <button ion-button icon-start block color="light">\n            <ion-icon name="logo-facebook"></ion-icon>\n            <p> | {{ \'FACEBOOK\' | translate }}</p>\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <h6 class="hr_line">\n      <span> OR </span>\n    </h6> -->\n\n        <!-- Logo -->\n        <!-- <div text-center>\n            <img src="./assets/img/icon/logo.png" alt="" style="width: 40%;">\n        </div> -->\n\n        <div style="text-align:center; margin-top: 7px;">\n            <img *ngIf="!imgloaded" src="{{ loadingAnimation }}" style="width: 90px; height: 90px; border-radius:100px" />\n            <img [hidden]="!imgloaded" (load)="imgloaded = true" src="{{ user.image }}" style="width: 90px; height: 90px; border-radius:100px" (click)="openImagePicker()" />\n\n            <!-- <img src="{{ userPic }}" style="width: 70px;border-radius:100px" (click)="chooseFile()"> -->\n            <!-- <form ngNoForm>\n                <input id="avatar" name="file" type="file" (change)="fileChange($event)">\n            </form> -->\n        </div>\n        <!-- <div text-center>\n            <div class="logo"></div>\n            <h2 ion-text class="text-primary">\n                <strong color="primary">YUR</strong>\n            </h2>\n        </div> -->\n\n        <!-- Register form -->\n        <form class="list-form">\n            <!-- <form> -->\n            <ion-item>\n                <ion-label floating>\n                    <ion-icon name="person" item-start class="text-primary"></ion-icon>\n                    Name\n                </ion-label>\n                <ion-input type="text" name="name" [(ngModel)]="user.name"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label floating>\n                    <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n                    Email\n                </ion-label>\n                <!-- <ion-input type="email" name="email" [(ngModel)]="email"></ion-input> -->\n                <ion-input type="email" name="email" [(ngModel)]="user.email" (blur)="checkEmail($event)"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label floating>\n                    <ion-icon name="md-phone-portrait" item-start class="text-primary"></ion-icon>\n                    Phone Number\n                </ion-label>\n                <!-- <ion-input type="tel" name="phone" [(ngModel)]="phoneNumber"></ion-input> -->\n                <ion-input type="tel" name="phone" [(ngModel)]="user.phone"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label floating>\n                    <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n                    Password\n                </ion-label>\n                <!-- <ion-input type="password" name="password" [(ngModel)]="password"></ion-input> -->\n                <ion-input type="password" name="password" [(ngModel)]="user.password"></ion-input>\n            </ion-item>\n\n            <ion-item>\n                <ion-label floating>\n                    <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n                    Confirm Password\n                </ion-label>\n                <!-- <ion-input type="text" name="referal"></ion-input> -->\n                <ion-input type="password" name="referal" [(ngModel)]="c_password"></ion-input>\n            </ion-item>\n        </form>\n\n\n\n    </div>\n</ion-content>\n\n<ion-footer align="center" no-border>\n    <ion-toolbar>\n        <ion-title>\n            <button ion-button block tappable (click)="signup()" [disabled]="!isValidEmail">\n        {{\'Sign Up\' | translate}}\n      </button>\n        </ion-title>\n    </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/register/register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_5__providers_user_user__["a" /* UserProvider */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__["a" /* File */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriverService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DriverService = (function () {
    function DriverService(db) {
        this.db = db;
    }
    // get driver by id
    DriverService.prototype.getDriver = function (id) {
        return this.db.object('drivers/' + id);
    };
    // get driver position
    DriverService.prototype.getDriverPosition = function (locality, vehicleType, id) {
        return this.db.object('localities/' + locality + '/' + vehicleType + '/' + id);
    };
    DriverService.prototype.getActiveDriver = function (locality, vehicleType) {
        return this.db.list('localities/' + locality + '/' + vehicleType);
    };
    // calculate vehicle angle
    DriverService.prototype.calcAngle = function (oldLat, oldLng, lat, lng) {
        var brng = Math.atan2(lat - oldLat, lng - oldLng);
        brng = brng * (180 / Math.PI);
        return brng;
    };
    // return icon suffix by angle
    DriverService.prototype.getIconWithAngle = function (vehicle) {
        var angle = this.calcAngle(vehicle.oldLat, vehicle.oldLng, vehicle.lat, vehicle.lng);
        if (angle >= -180 && angle <= -160) {
            return '_left';
        }
        if (angle > -160 && angle <= -110) {
            return '_bottom_left';
        }
        if (angle > -110 && angle <= -70) {
            return '_bottom';
        }
        if (angle > -70 && angle <= -20) {
            return '_bottom_right';
        }
        if (angle >= -20 && angle <= 20) {
            return '_right';
        }
        if (angle > 20 && angle <= 70) {
            return '_top_right';
        }
        if (angle > 70 && angle <= 110) {
            return '_top';
        }
        if (angle > 110 && angle <= 160) {
            return '_top_left';
        }
        if (angle > 160 && angle <= 180) {
            return '_left';
        }
    };
    DriverService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], DriverService);
    return DriverService;
}());

//# sourceMappingURL=driver-service.js.map

/***/ }),

/***/ 209:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 209;

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthService = (function () {
    function AuthService(afAuth, db, storage) {
        this.afAuth = afAuth;
        this.db = db;
        this.storage = storage;
    }
    // get current user data from firebase
    AuthService.prototype.getUserData = function () {
        return this.afAuth.auth.currentUser;
    };
    // get passenger by id
    AuthService.prototype.getUser = function (id) {
        return this.db.object('passengers/' + id);
    };
    // login by email and password
    AuthService.prototype.login = function (email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    };
    AuthService.prototype.logout = function () {
        return this.afAuth.auth.signOut();
    };
    // register new account
    AuthService.prototype.register = function (email, password, name, phoneNumber) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].create(function (observer) {
            _this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(function (authData) {
                authData.name = name;
                authData.phoneNumber = phoneNumber;
                authData.isPhoneVerified = false;
                if (__WEBPACK_IMPORTED_MODULE_6__constants__["e" /* EMAIL_VERIFICATION_ENABLED */] === true)
                    _this.getUserData().sendEmailVerification();
                // update passenger object
                _this.updateUserProfile(authData);
                observer.next();
            }).catch(function (error) {
                if (error) {
                    observer.error(error);
                }
            });
        });
    };
    // update user display name and photo
    AuthService.prototype.updateUserProfile = function (user) {
        console.log(user);
        var name = user.name ? user.name : user.email;
        var photoUrl = user.photoURL ? user.photoURL : __WEBPACK_IMPORTED_MODULE_6__constants__["d" /* DEFAULT_AVATAR */];
        this.getUserData().updateProfile({
            displayName: name,
            photoURL: photoUrl
        });
        // create or update passenger
        this.db.object('passengers/' + user.uid).update({
            name: name,
            photoURL: photoUrl,
            email: user.email,
            phoneNumber: user.phoneNumber ? user.phoneNumber : '',
            isPhoneVerified: user.isPhoneVerified
        });
    };
    // create new user if not exist
    AuthService.prototype.createUserIfNotExist = function (user) {
        var _this = this;
        // check if user does not exist
        this.getUser(user.uid).take(1).subscribe(function (snapshot) {
            if (snapshot.$value === null) {
                // update passenger object
                _this.updateUserProfile(user);
            }
        });
    };
    // update card setting
    AuthService.prototype.updateCardSetting = function (number, exp, cvv, token) {
        var user = this.getUserData();
        this.db.object('passengers/' + user.uid + '/card').update({
            number: number,
            exp: exp,
            cvv: cvv,
            token: token
        });
    };
    // get card setting
    AuthService.prototype.getCardSetting = function () {
        var user = this.getUserData();
        return this.db.object('passengers/' + user.uid + '/card');
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		904,
		8
	],
	"../pages/commission/commission.module": [
		905,
		7
	],
	"../pages/modal-final-fare/modal-final-fare.module": [
		906,
		2
	],
	"../pages/modal-notification/modal-notification.module": [
		907,
		1
	],
	"../pages/modal-rating/modal-rating.module": [
		908,
		0
	],
	"../pages/payment/payment.module": [
		909,
		6
	],
	"../pages/share/share.module": [
		910,
		5
	],
	"../pages/support/support.module": [
		911,
		4
	],
	"../pages/trips/trips.module": [
		912,
		3
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 252;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpdateCard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_user_user__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UpdateCard = (function () {
    function UpdateCard(nav, authService, alertCtrl, toastCtrl, loadingCtrl, translate, userService) {
        this.nav = nav;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.userService = userService;
        this.data = {};
        this.user = JSON.parse(localStorage.getItem('userData'));
        this.data['UserId'] = this.user.userId;
    }
    UpdateCard.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.GetCard(this.data['UserId']).then(function (result) {
            _this.card = result['data'];
            _this.number = result['data'].maccount;
        }, function (err) {
            console.log(err);
        });
    };
    UpdateCard.prototype.UpdateCard = function () {
        var _this = this;
        console.log(this.number);
        console.log(this.data);
        if (this.number == null || this.card_Month == null || this.card_Year == null || this.cvv == null) {
            this.alertCtrl.create({ subTitle: 'Empty Fields', buttons: ['ok'] }).present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({ content: 'Processing...' });
            loading_1.present();
            this.data = {};
            this.user = JSON.parse(localStorage.getItem('userData'));
            this.data['UserId'] = this.user.userId;
            var xmlhttp_1 = new XMLHttpRequest();
            xmlhttp_1.open('POST', 'https://dbstage1.paywire.com/API/pwapi.aspx');
            var sr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        <PAYMENTREQUEST>\n           <TRANSACTIONHEADER>\n              <PWVERSION>3</PWVERSION>\n               <PWUSER>yurt1</PWUSER>\n               <PWPASS>Kt93SbYZ</PWPASS>\n               <PWCLIENTID>0000010062</PWCLIENTID>\n               <PWKEY>8A0B6FA9-D918-4D84-B02F-5BB7C8578F4D</PWKEY>\n              <PWTRANSACTIONTYPE>STORETOKEN</PWTRANSACTIONTYPE>\n              <PWSALEAMOUNT>0</PWSALEAMOUNT>\n              <PWINVOICENUMBER>001001001004</PWINVOICENUMBER>\n              <CARDPRESENT>FALSE</CARDPRESENT>\n           </TRANSACTIONHEADER>\n           <CUSTOMER>\n              <PWMEDIA>CC</PWMEDIA>\n              <CARDNUMBER>" + parseInt(this.number) + "</CARDNUMBER>\n              <EXP_MM>" + this.card_Month + "</EXP_MM>\n              <EXP_YY>" + this.card_Year + "</EXP_YY>\n              <CVV2>" + this.cvv + "</CVV2>\n           </CUSTOMER>\n        </PAYMENTREQUEST>";
            xmlhttp_1.onreadystatechange = function () {
                if (xmlhttp_1.readyState == 4) {
                    if (xmlhttp_1.status == 200) {
                        var xml = xmlhttp_1.responseXML;
                        var response = xml.getElementsByTagName("PAYMENTRESPONSE")[0];
                        var length_1 = response.childElementCount;
                        console.log(length_1);
                        console.log(response);
                        if (length_1 < 9) {
                            loading_1.dismiss();
                            _this.alertCtrl.create({ subTitle: 'Invalid Credentials', buttons: ['ok'] }).present();
                        }
                        else {
                            for (var i = 0; i < length_1; i++) {
                                _this.data[response.childNodes[i].nodeName] = response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue;
                            }
                            console.log(_this.data);
                            _this.userService.transaction(_this.data).then(function (result) {
                                loading_1.dismiss();
                                console.log('Server Response', result['data']);
                                _this.alertCtrl.create({ subTitle: 'Thanks for Registration', buttons: ['ok'] }).present();
                                //this.number = null;
                                _this.card_Month = null;
                                _this.card_Year = null;
                                _this.cvv = null;
                            }, function (err) {
                                loading_1.dismiss();
                                console.log(err);
                            });
                        }
                    }
                    else {
                        loading_1.dismiss();
                        _this.alertCtrl.create({ subTitle: 'No Access Origin', buttons: ['ok'] }).present();
                    }
                }
            };
            // Send the POST request
            xmlhttp_1.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp_1.responseType = "document";
            xmlhttp_1.send(sr);
        }
    };
    UpdateCard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-updatecard',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/updatecard/updatecard.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n            <div class="logoHeader"></div>\n          </ion-col>\n          <ion-col col-4>\n            <strong>Update Card</strong>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-title>\n    <!--<ion-buttons end>\n      <button ion-button tappable (click)="presentNotifications($event)">\n        <ion-icon name="notifications"></ion-icon>\n      </button>\n      <button ion-button tappable (click)="goToAccount()">\n        <ion-icon name="cog"></ion-icon>\n      </button>\n    </ion-buttons> -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="animated fadeIn common-bg">\n  <ion-row>\n    <ion-col>\n      <ion-item no-padding>\n        <ion-input placeholder="Card Number" type="text" [(ngModel)]="number" size="20"></ion-input>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n \n  <ion-row>\n    <ion-col col-4>\n      <ion-item no-padding>\n        <ion-select placeholder="MM" [(ngModel)]="card_Month" class="max-width full-width">\n          <ion-option value="01">01</ion-option>\n          <ion-option value="02">02</ion-option>\n          <ion-option value="03">03</ion-option>\n          <ion-option value="04">04</ion-option>\n          <ion-option value="05">05</ion-option>\n          <ion-option value="06">06</ion-option>\n          <ion-option value="07">07</ion-option>\n          <ion-option value="08">08</ion-option>\n          <ion-option value="09">09</ion-option>\n          <ion-option value="10">10</ion-option>\n          <ion-option value="11">11</ion-option>\n          <ion-option value="12">12</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-col>\n    <ion-col col-4>\n      <ion-item no-padding>\n        <ion-select placeholder="YY" [(ngModel)]="card_Year" class="max-width full-width">\n          <ion-option value="18">18</ion-option>\n          <ion-option value="19">19</ion-option>\n          <ion-option value="20">20</ion-option>\n          <ion-option value="21">21</ion-option>\n          <ion-option value="22">22</ion-option>\n          <ion-option value="23">23</ion-option>\n          <ion-option value="24">24</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-col>\n    <ion-col col-4>\n      <ion-item no-padding>\n        <ion-input placeholder="CVV" type="number" [(ngModel)]="cvv" size="4"></ion-input>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n \n\n  <button ion-button class="round" color="primary" margin-top full tappable (click)="UpdateCard()">Update Card</button>\n\n</ion-content>'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/updatecard/updatecard.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_4__providers_user_user__["a" /* UserProvider */]])
    ], UpdateCard);
    return UpdateCard;
}());

//# sourceMappingURL=updatecard.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database_database__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__place__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(25);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TripService = (function () {
    function TripService(db, authService) {
        this.db = db;
        this.authService = authService;
        this.paymentMethod = 'cash';
        this.cancelledTripByDriver = false;
        this.unverifiedDriversArr = [];
        this.availableDrivers = [];
        this.bit = true;
        this.bit2 = true;
    }
    TripService.prototype.getrideinfo = function (tripId) {
        return this.db.object('trips/' + tripId);
    };
    TripService.prototype.getAll = function () {
        return this.trips;
    };
    TripService.prototype.setTotalFee = function (tripId, amount) {
        return this.db.object('trips/' + tripId).update({
            fee: amount,
        });
    };
    TripService.prototype.setId = function (id) {
        return this.id = id;
    };
    TripService.prototype.getId = function () {
        return this.id;
    };
    TripService.prototype.setCurrency = function (currency) {
        return this.currency = currency;
    };
    TripService.prototype.getCurrency = function () {
        return this.currency;
    };
    TripService.prototype.setOrigin = function (vicinity, lat, lng) {
        var place = new __WEBPACK_IMPORTED_MODULE_2__place__["a" /* Place */](vicinity, lat, lng);
        return this.origin = place.getFormatted();
    };
    TripService.prototype.getOrigin = function () {
        return this.origin;
    };
    TripService.prototype.setDestination = function (vicinity, lat, lng) {
        var place = new __WEBPACK_IMPORTED_MODULE_2__place__["a" /* Place */](vicinity, lat, lng);
        return this.destination = place.getFormatted();
    };
    TripService.prototype.getDestination = function () {
        return this.destination;
    };
    TripService.prototype.setDistance = function (distance) {
        return this.distance = distance;
    };
    TripService.prototype.getDistance = function () {
        return this.distance;
    };
    TripService.prototype.setFee = function (fee) {
        return this.fee = fee;
    };
    TripService.prototype.getFee = function () {
        return this.fee;
    };
    TripService.prototype.setNote = function (note) {
        return this.note = note;
    };
    TripService.prototype.getNote = function () {
        return this.note;
    };
    TripService.prototype.setPromo = function (promocode) {
        return this.promocode = promocode;
    };
    TripService.prototype.getPromo = function () {
        return this.promocode;
    };
    TripService.prototype.setDiscount = function (discount) {
        return this.discount = discount;
    };
    TripService.prototype.getDiscount = function () {
        return this.discount;
    };
    TripService.prototype.setPaymentMethod = function (method) {
        return this.paymentMethod = method;
    };
    TripService.prototype.getPaymentMethod = function () {
        return this.paymentMethod;
    };
    TripService.prototype.setVehicle = function (vehicle) {
        return this.vehicle = vehicle;
    };
    TripService.prototype.getVehicle = function () {
        return this.vehicle;
    };
    TripService.prototype.setIcon = function (icon) {
        return this.icon = icon;
    };
    TripService.prototype.getIcon = function () {
        return this.icon;
    };
    TripService.prototype.setAvailableDrivers = function (vehicles) {
        console.log(vehicles);
        this.availableDrivers = vehicles;
    };
    TripService.prototype.getAvailableDrivers = function () {
        return this.availableDrivers;
    };
    TripService.prototype.getTrip = function (id) {
        return this.db.object('trips/' + id);
    };
    TripService.prototype.getArrivalTime = function (id) {
        return this.db.object('trips/' + id + '/time');
    };
    TripService.prototype.getTrips = function () {
        var user = this.authService.getUserData();
        console.log(user);
        return this.db.list('trips', {
            query: {
                orderByChild: 'passengerId',
                equalTo: user.uid
            }
        });
    };
    TripService.prototype.get_Driver_Loc = function (locality, vehicleType, driverID) {
        return this.db.object('localities/' + locality + '/' + vehicleType + '/' + driverID);
    };
    TripService.prototype.getTripStatus = function (tripId) {
        return this.db.object('trips/' + tripId);
    };
    TripService.prototype.cancelTrip = function (Trip_Id) {
        return this.db.object('trips/' + Trip_Id).update({
            droppedOffAt: Date.now(),
            status: 'canceled'
        });
    };
    TripService.prototype.rateTrip = function (tripId, stars) {
        return this.db.object('trips/' + tripId).update({
            rating: parseInt(stars)
        });
    };
    // Update Trip Destination For driver
    TripService.prototype.updateTrip_dest = function (tripId, destination) {
        return this.db.object('trips/' + tripId).update({
            destination: destination,
        });
    };
    TripService.prototype.getBit = function (tripId) {
        //console.log("checking", id)
        return this.db.object('trips/' + tripId + '/Bit');
    };
    TripService.prototype.setBit = function (tripId, val) {
        this.db.object('trips/' + tripId).update({
            Bit: val,
        });
    };
    TripService.prototype.setbit = function (bit) {
        this.bit = bit;
    };
    TripService.prototype.getbit = function () {
        return this.bit;
    };
    TripService.prototype.setbit2 = function (bit2) {
        this.bit2 = bit2;
    };
    TripService.prototype.getbit2 = function () {
        return this.bit2;
    };
    TripService.prototype.unverifiedDrivers = function (driverID) {
        this.cancelledTripByDriver = true;
        this.unverifiedDriversArr.push(driverID);
    };
    TripService.prototype.show_Unverified_Driver_Notification = function () {
        if (this.cancelledTripByDriver) {
            this.cancelledTripByDriver = false;
            return true;
        }
        else
            return false;
    };
    TripService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]])
    ], TripService);
    return TripService;
}());

//# sourceMappingURL=trip-service.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var UserProvider = (function () {
    function UserProvider(http) {
        this.http = http;
        this.apiUrl = __WEBPACK_IMPORTED_MODULE_2__services_constants__["a" /* API_URL */];
        this.chk = 1;
        console.log('Hello UserProvider Provider');
    }
    UserProvider.prototype.login = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(data);
            _this.http.post(_this.apiUrl + '/user.php?action=login&username=' + encodeURI(data.email) + '&password=' + encodeURI(data.password), JSON.stringify(data))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.validateEmail = function (email) {
        var _this = this;
        // return this.http.get(SERVER_ADDRESS + 'auth/validate-username/' + username).map(res => res.json());
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/user.php?action=validateEmail&email=' + email)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.signup = function (data, profilePic) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var urlParam = 'action=registerUser&name=' + encodeURI(data.name) + '&email=' + encodeURI(data.email) + '&phone=' + encodeURI(data.phone) + '&password=' + encodeURI(data.password);
            _this.http.post(_this.apiUrl + '/user.php?' + urlParam, profilePic)
                .subscribe(function (res) {
                console.log(res);
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.UpdateProfile = function (userId, name, email, password, oldImage, formData) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/user.php?action=updateProfile&userId=' + userId + '&name=' + name + '&email=' + email + '&password=' + password + '&oldImage=' + oldImage, formData)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.GetCard = function (user) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/GetTransaction?UserId=' + user)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.setdefault = function (userid, id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/setdefault?UserId=' + userid + '&id=' + id, JSON.stringify(userid, id))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.forgotPassword = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/ForgotPassword?&email=' + encodeURI(data.email), JSON.stringify(data))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.GetTolls = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
            _this.http.get(_this.apiUrl + '/gettolls')
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.estimate_Fare = function (distance) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
            _this.http.post(_this.apiUrl + '/CalculateFare?&carType=' + 5 + '&stateId=' + 1 + '&distance=' + encodeURI(distance) + '&time=' + 4, JSON.stringify(distance))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.calculateFareForTime = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.apiUrl + '/CalculateFareForTime?carType=' + data['carType'] + '&stateId=' + data['stateId'] +
                '&totalTime=' + data['time'], JSON.stringify(data))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.Gettransaction = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
            _this.http.get(_this.apiUrl + '/GetTransaction?&UserId=' + data)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.Getsolotransaction = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
            _this.http.get(_this.apiUrl + '/GetsoloTransaction?&UserId=' + data)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.transaction = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
            _this.http.post(_this.apiUrl + '/TranscationClient?UserId=' + data['UserId'] + '&RESULT=' + data['RESULT'] +
                '&BATCHID=' + data['BATCHID'] + '&PWCLIENTID=' + data['PWCLIENTID'] + '&AUTHCODE=' + data['AUTHCODE'] + '&AVSCODE=' + data['AVSCODE']
                + '&PAYMETH=' + data['PAYMETH'] + '&PWUNIQUEID=' + data['PWUNIQUEID'] + '&AMOUNT=' + data['AMOUNT'] + '&MACCOUNT=' + data['MACCOUNT'] +
                '&CCTYPE=' + data['CCTYPE'] + '&PWTOKEN=' + data['PWTOKEN'] + '&PWCUSTOMERID=' + data['PWCUSTOMERID'] + '&PWINVOICENUMBER=' + data['PWINVOICENUMBER'], JSON.stringify(data))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.tbtransaction = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
            _this.http.post(_this.apiUrl + '/tbTranscation?UserId=' + data['UserId'] + '&RESULT=' + data['RESULT'] +
                '&BATCHID=' + data['BATCHID'] + '&PWCLIENTID=' + data['PWCLIENTID'] + '&AUTHCODE=' + data['AUTHCODE'] + '&AVSCODE=' + data['AVSCODE']
                + '&PAYMETH=' + data['PAYMETH'] + '&PWUNIQUEID=' + data['PWUNIQUEID'] + '&PWADJAMOUNT=' + data['PWADJAMOUNT'] + '&PWSALETAX=' + data['PWSALETAX'] +
                '&PWSALEAMOUNT=' + data['PWSALEAMOUNT'] + '&AMOUNT=' + data['AMOUNT'], JSON.stringify(data))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.InsertConvo = function (num1, num2) {
        var _this = this;
        //console.log(msg);
        return new Promise(function (resolve, reject) {
            // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
            _this.http.post(_this.apiUrl + '/InsertConvo?Number1=' + num1 + '&Number2=' + num2, JSON.stringify(num1, num2))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.DelConvo = function (num1, num2) {
        var _this = this;
        //console.log(msg);
        return new Promise(function (resolve, reject) {
            // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
            _this.http.post(_this.apiUrl + '/DelConvo?Number1=' + num1 + '&Number2=' + num2, JSON.stringify(num1, num2))
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    UserProvider.prototype.Insert_Ride = function (ride, fare, status_id) {
        var _this = this;
        var dat = new Date;
        var loc = ride.origin.vicinity.split(',');
        var pick_loc = loc[0] + loc[1];
        var drp = ride.destination.vicinity.split(',');
        var drp_loc = drp[0] + drp[1];
        console.log('***', status);
        if (fare == '') {
            if (this.chk == 1) {
                this.chk = 0;
                console.log('++++++++++ if ');
                return new Promise(function (resolve, reject) {
                    _this.http.post(_this.apiUrl + '/InsertRide?PassengerId=' + ride.passID + '&DriverId=' + ride.DriverId + '&CarId=' +
                        ride.carId + '&carType=' + 4 + '&StatusId=' + status_id + '&Minutes=' + ride.time + '&Miles=' + ride.distance + '&TotalFare=' +
                        0.0 + '&Tolls=' + 0.0 + '&Tip=' + 0.0 + '&RequestdateTime=' + ride.createdAt + '&PickUpdateTime=' + dat.toISOString() + '&pickUpAddress=' +
                        pick_loc + '&pickUpCity=' + loc[2] + '&pickUpState=' + loc[3] + '&pickUpLat=' + ride.origin.location.lat + '&pickUpLong=' + ride.origin.location.lat + '&DropOffDateTime=' +
                        dat.toISOString() + '&DropOffAddress=' + drp_loc + '&DropOffCity=' + drp[2] + '&DropOffState=' + drp[3] + '&DropOffLat=' + ride.destination.location.lat
                        + '&DropOffLong=' + ride.destination.location.lng, JSON.stringify(ride, fare))
                        .subscribe(function (res) {
                        resolve(res);
                    }, function (err) {
                        reject(err);
                    });
                });
            }
            else {
                return new Promise(function (resolve, reject) {
                    _this.http.post(_this.apiUrl + '/InsertRide?PassengerId=' + ride.passID + '&DriverId=' + ride.DriverId + '&CarId=' +
                        ride.carId + '&carType=' + 4 + '&StatusId=' + status_id + '&Minutes=' + ride.time + '&Miles=' + ride.distance + '&TotalFare=' +
                        0.0 + '&Tolls=' + 0.0 + '&Tip=' + 0.0 + '&RequestdateTime=' + ride.createdAt + '&PickUpdeTime=' + "2018-10-23T09:54:48.918Z" + '&pickUpAddress=' +
                        pick_loc + '&pickUpity=' + loc[2] + '&pickUpState=' + loc[3] + '&pickUpLat=' + ride.origin.location.lat + '&pickUpLong=' + ride.origin.location.lat + '&DropOffDateTime=' +
                        dat.toISOString() + '&DropOffAddress=' + drp_loc + '&DropOffCity=' + drp[2] + '&DropOffState=' + drp[3] + '&DropOffLat=' + ride.destination.location.lat
                        + '&DropOffLong=' + ride.destination.location.lng, JSON.stringify(ride, fare))
                        .subscribe(function (res) {
                        resolve(res);
                    }, function (err) {
                        reject(err);
                    });
                });
            }
        }
        else {
            return new Promise(function (resolve, reject) {
                _this.http.post(_this.apiUrl + '/InsertRide?PassengerId=' + ride.passID + '&DriverId=' + ride.DriverId + '&CarId=' +
                    ride.carId + '&carType=' + 4 + '&StatusId=' + status_id + '&Minutes=' + ride.time + '&Miles=' + ride.distance + '&TotalFare=' +
                    fare.total + '&Tolls=' + fare.tolls + '&Tip=' + fare.tip + '&RequestdateTime=' + ride.createdAt + '&PickUpdateTime=' + ride.pickedUpAt + '&pickUpAddress=' +
                    pick_loc + '&pickUpCity=' + loc[2] + '&pickUpState=' + loc[3] + '&pickUpLat=' + ride.origin.location.lat + '&pickUpLong=' + ride.origin.location.lat + '&DropOffDateTime=' +
                    dat.toISOString() + '&DropOffAddress=' + drp_loc + '&DropOffCity=' + drp[2] + '&DropOffState=' + drp[3] + '&DropOffLat=' + ride.destination.location.lat
                    + '&DropOffLong=' + ride.destination.location.lng, JSON.stringify(ride, fare))
                    .subscribe(function (res) {
                    resolve(res);
                }, function (err) {
                    reject(err);
                });
            });
        }
    };
    UserProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], UserProvider);
    return UserProvider;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminOffersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_modal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_requests__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_offers__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(24);
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
 * Generated class for the AdminOffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdminOffersPage = (function () {
    function AdminOffersPage(nav, platform, alertCtrl, requestService, loadingCtrl, translate, toastCtrl, navParams, localNotifications, modalCtrl, offerService) {
        var _this = this;
        this.nav = nav;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.requestService = requestService;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.localNotifications = localNotifications;
        this.modalCtrl = modalCtrl;
        this.offerService = offerService;
        this.USER_IMG_URL = __WEBPACK_IMPORTED_MODULE_4__services_constants__["n" /* USER_IMG_URL */];
        this.imgloaded = [];
        this.loadingAnimation = './assets/img/loading-animation.gif';
        this.showLoading('Getting Recent Offers');
        // Get Offers by Admin
        this.offerService.get_Offers().then(function (result) {
            _this.hideLoading();
            _this.offers = result;
            for (var i = 0; i < _this.offers.length; i++) {
                _this.offers[i]['img'] = __WEBPACK_IMPORTED_MODULE_4__services_constants__["i" /* IMG_URL */] + '' + _this.offers[i]['img'];
            }
            localStorage.setItem('offers', JSON.stringify(_this.offers));
            console.log('this.offers: ', _this.offers);
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    }
    AdminOffersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdminOffersPage');
    };
    AdminOffersPage.prototype.viewDetails = function (offerID) {
        console.log("offerID: ", offerID);
        var Modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__modal_modal__["a" /* ModalPage */], { offerID: offerID });
        Modal.present();
    };
    // Show note popup when click to 'Update Quote'
    AdminOffersPage.prototype.showUpdatePopup = function (offerID, oldPrice) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Update Offer',
            message: "",
            inputs: [
                {
                    name: 'price',
                    placeholder: 'Previous price: ' + oldPrice
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'CancelCss',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    cssClass: 'SendCss',
                    handler: function (data) {
                        _this.update_Quote(offerID, data['price']);
                    }
                }
            ]
        });
        prompt.present();
    };
    ;
    AdminOffersPage.prototype.update_Quote = function (offerID, price) {
        var _this = this;
        console.log("offerID: ", offerID);
        console.log("price: ", price);
        // Send Admin Offer
        this.showLoading('Updating Offer...');
        this.offerService.update_Offer(offerID, price).then(function (result) {
            if (result) {
                for (var i = 0; i < _this.offers.length; i++) {
                    if (offerID == _this.offers[i]['offerId']) {
                        _this.offers[i]['price'] = price;
                        break;
                    }
                }
            }
            localStorage.setItem('offers', JSON.stringify(_this.offers)); // Update Offers in localStorage
            _this.showToast('Offer Updated');
            _this.hideLoading();
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    };
    // Push Notification
    AdminOffersPage.prototype.singlenotification = function (id, title, text) {
        this.localNotifications.schedule({
            id: id,
            title: title,
            text: text
        });
    };
    AdminOffersPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'top'
        });
        toast.present();
    };
    AdminOffersPage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.present();
    };
    AdminOffersPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    AdminOffersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-admin-offers',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/admin-offers/admin-offers.html"*/'<!--\n  Generated template for the AdminOffersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>admin_offers</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n    <ion-icon name="menu"></ion-icon>\n  </button>\n\n        <ion-title>\n            <ion-grid>\n                <ion-row class="header-class">\n                    <ion-col col-2>\n                        <!-- <div class="logoHeader"></div> -->\n                    </ion-col>\n                    <ion-col col-6>\n                        <strong>Recent Offers</strong>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-title>\n\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n    <div *ngFor="let offer of offers">\n        <ion-card *ngIf="offer.status != 1" id="card-{{offer.offerId}}">\n\n            <ion-item>\n                <ion-avatar item-start>\n                    <img src="{{ USER_IMG_URL + offer.image }}">\n                </ion-avatar>\n                <h2>{{ offer.name }}</h2>\n                <ion-note>{{ offer.email }}</ion-note>\n            </ion-item>\n\n            <img *ngIf="!imgloaded[i]" src="{{ loadingAnimation }}" />\n            <img [hidden]="!imgloaded[i]" (load)="imgloaded[i] = true" src="{{ offer.img }}" />\n            <!-- <img src="{{ offer.img || loadingAnimation }}"> -->\n\n            <ion-card-content>\n                <p><strong>Category:</strong> {{ offer.cat_name }}</p>\n                <p><strong>Description:</strong> {{ offer.description }}</p>\n                <ion-note>\n                    Expected Completion Time: {{ offer.ect }}\n                </ion-note>\n            </ion-card-content>\n\n            <ion-row>\n                <ion-col col-6 text-center>\n                    <button ion-button color="danger" clear small icon-start (click)="viewDetails(offer.offerId)">\n                      <ion-icon name=\'ios-bookmark\'></ion-icon>\n                      View Details\n                    </button>\n                </ion-col>\n                <ion-col col-6 text-center *ngIf="offer.status != -1">\n                    <button ion-button clear small color="instagram" icon-start (click)="showUpdatePopup(offer.offerId, offer.price)">\n                        <ion-icon name=\'ios-refresh-circle\'></ion-icon>\n                        Update Quote\n                    </button>\n                </ion-col>\n                <ion-col text-right class="badge_Margin">\n                    <ion-badge [hidden]="offer.status != -1" color="danger">Offer Declined</ion-badge>\n                    <ion-badge [hidden]="offer.status != 0" color="primary">Offer Not Accepted Yet!</ion-badge>\n                </ion-col>\n            </ion-row>\n\n        </ion-card>\n    </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/admin-offers/admin-offers.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__services_requests__["a" /* Requests */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__services_offers__["a" /* Offers */]])
    ], AdminOffersPage);
    return AdminOffersPage;
}());

//# sourceMappingURL=admin-offers.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminAcceptedOffersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_modal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_requests__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_offers__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(24);
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
 * Generated class for the AdminAcceptedOffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdminAcceptedOffersPage = (function () {
    function AdminAcceptedOffersPage(nav, platform, alertCtrl, requestService, loadingCtrl, translate, toastCtrl, navParams, localNotifications, modalCtrl, offerService) {
        var _this = this;
        this.nav = nav;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.requestService = requestService;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.localNotifications = localNotifications;
        this.modalCtrl = modalCtrl;
        this.offerService = offerService;
        this.USER_IMG_URL = __WEBPACK_IMPORTED_MODULE_4__services_constants__["n" /* USER_IMG_URL */];
        this.imgloaded = [];
        this.loadingAnimation = './assets/img/loading-animation.gif';
        this.showLoading('Getting Accepted Offers');
        this.offerStatus = 'Processing';
        // Get Offers by Admin
        this.offerService.get_accepted_offers().then(function (result) {
            _this.hideLoading();
            _this.offers = result;
            for (var i = 0; i < _this.offers.length; i++) {
                _this.offers[i]['img'] = __WEBPACK_IMPORTED_MODULE_4__services_constants__["i" /* IMG_URL */] + '' + _this.offers[i]['img'];
            }
            localStorage.setItem('accepted_offers', JSON.stringify(_this.offers));
            console.log('this.offers: ', _this.offers);
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    }
    AdminAcceptedOffersPage.prototype.updateAcceptStatus = function (offerID, status) {
        var _this = this;
        console.log("offerID: ", offerID);
        console.log("status: ", status);
        this.showLoading('Updating Status');
        this.offerService.update_accepted_Offer_Status(offerID, status).then(function (result) {
            _this.hideLoading();
            console.log('result: ', result);
            if (result) {
                _this.showToast('Status Updated');
            }
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    };
    AdminAcceptedOffersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdminAcceptedOffersPage');
    };
    AdminAcceptedOffersPage.prototype.viewDetails = function (offerID) {
        console.log("offerID: ", offerID);
        var Modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__modal_modal__["a" /* ModalPage */], { accepted_offerID: offerID });
        Modal.present();
    };
    // Push Notification
    AdminAcceptedOffersPage.prototype.singlenotification = function (id, title, text) {
        this.localNotifications.schedule({
            id: id,
            title: title,
            text: text
        });
    };
    AdminAcceptedOffersPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'top'
        });
        toast.present();
    };
    AdminAcceptedOffersPage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.present();
    };
    AdminAcceptedOffersPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    AdminAcceptedOffersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-admin-accepted-offers',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/admin-accepted-offers/admin-accepted-offers.html"*/'<!--\n  Generated template for the AdminAcceptedOffersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n  <ion-icon name="menu"></ion-icon>\n</button>\n\n        <ion-title>\n            <ion-grid>\n                <ion-row class="header-class">\n                    <ion-col col-2>\n                        <!-- <div class="logoHeader"></div> -->\n                    </ion-col>\n                    <ion-col col-6>\n                        <strong>Accepted Offers</strong>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-title>\n\n    </ion-navbar>\n</ion-header>\n\n\n\n<ion-content>\n\n    <div *ngFor="let offer of offers">\n        <ion-card *ngIf="offer.status == 1" id="card-{{offer.offerId}}">\n            <ion-item>\n                <ion-avatar item-start>\n                    <img src="{{ USER_IMG_URL + offer.image }}">\n                </ion-avatar>\n                <h2>{{ offer.name }}</h2>\n                <ion-note>{{ offer.email }}</ion-note>\n            </ion-item>\n\n            <img *ngIf="!imgloaded[i]" src="{{ loadingAnimation }}" />\n            <img [hidden]="!imgloaded[i]" (load)="imgloaded[i] = true" src="{{ offer.img }}" />\n            <!-- <img src="{{ offer.img || loadingAnimation }}"> -->\n\n            <ion-card-content>\n                <p><strong>Category:</strong> {{ offer.cat_name }}</p>\n                <p><strong>Description:</strong> {{ offer.description }}</p>\n                <ion-note>\n                    Expected Completion Time: {{ offer.ect }}\n                </ion-note>\n            </ion-card-content>\n\n            <ion-row>\n                <ion-col text-center col-6>\n                    <button ion-button color="danger" clear small icon-start (click)="viewDetails(offer.offerId)">\n                      <ion-icon name=\'ios-bookmark\'></ion-icon>\n                      View Details\n                    </button>\n                </ion-col>\n                <ion-col text-center align-self-center col-6 class="badge_Margin">\n                    <ion-select [(ngModel)]="offer.accept_status" class="selectStyle" (ionChange)="updateAcceptStatus(offer.offerId, $event)">\n                        <ion-option value="Processing">Processing</ion-option>\n                        <ion-option value="In Transit">In Transit</ion-option>\n                        <ion-option value="Delivered">Delivered</ion-option>\n                    </ion-select>\n\n                    <!-- <ion-badge [hidden]="offer.status != 1" color="secondary">Offer Accepted</ion-badge>\n                    <ion-badge [hidden]="offer.status != 0" color="danger">Offer Not Accepted</ion-badge> -->\n                </ion-col>\n            </ion-row>\n        </ion-card>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/admin-accepted-offers/admin-accepted-offers.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__services_requests__["a" /* Requests */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__services_offers__["a" /* Offers */]])
    ], AdminAcceptedOffersPage);
    return AdminAcceptedOffersPage;
}());

//# sourceMappingURL=admin-accepted-offers.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZipsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_zip__ = __webpack_require__(404);
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
 * Generated class for the ZipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ZipsPage = (function () {
    function ZipsPage(nav, platform, alertCtrl, loadingCtrl, zipService, toastCtrl, navParams, localNotifications, modalCtrl) {
        this.nav = nav;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.zipService = zipService;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.localNotifications = localNotifications;
        this.modalCtrl = modalCtrl;
        this.getZips('Geting Zip Codes');
    }
    ZipsPage.prototype.getZips = function (message) {
        var _this = this;
        this.showLoading(message);
        // Get Zips by Admin
        this.zipService.get_Zips().then(function (result) {
            _this.hideLoading();
            _this.zips = result;
            localStorage.setItem('zips', JSON.stringify(_this.zips));
            console.log('this.zips: ', _this.zips);
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    };
    ZipsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ZipsPage');
    };
    ZipsPage.prototype.show_addZip = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Add Zip Code',
            message: "",
            inputs: [
                {
                    name: 'zip',
                    placeholder: 'Enter Zip Code'
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'CancelCss',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Add',
                    cssClass: 'SendCss',
                    handler: function (data) {
                        _this.addZip(data['zip']);
                    }
                }
            ]
        });
        prompt.present();
    };
    ZipsPage.prototype.addZip = function (zip) {
        var _this = this;
        console.log("zip: ", zip);
        // Add Zip to DB
        this.showLoading('Adding Zip Code');
        this.zipService.add_Zip(zip).then(function (result) {
            console.log("result: ", result);
            _this.hideLoading();
            if (result) {
                _this.showToast('Zip Code Added Successfully!');
                _this.getZips('Updating Zip Codes');
                // this.zips.splice(0, 0, "Lene");
            }
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    };
    ZipsPage.prototype.deleteZip = function (zipID) {
        var _this = this;
        // Delete Zip from DB
        this.showLoading('Deleting Zip Code');
        this.zipService.delete_Zip(zipID).then(function (result) {
            console.log("result: ", result);
            if (result) {
                _this.showToast('Zip Code Deleted Successfully!');
                for (var i = 0; i < _this.zips.length; i++) {
                    if (zipID == _this.zips[i]['id']) {
                        _this.zips.splice(i, 1);
                        break;
                    }
                }
            }
            _this.hideLoading();
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    };
    // Push Notification
    ZipsPage.prototype.singlenotification = function (id, title, text) {
        this.localNotifications.schedule({
            id: id,
            title: title,
            text: text
        });
    };
    ZipsPage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.present();
    };
    ZipsPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    ZipsPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'top'
        });
        toast.present();
    };
    ZipsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-zips',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/zips/zips.html"*/'<!--\n  Generated template for the ZipsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n\n        <ion-title>\n            <ion-grid>\n                <ion-row class="header-class">\n                    <ion-col col-2>\n                        <!-- <div class="logoHeader"></div> -->\n                    </ion-col>\n                    <ion-col col-2 style="padding-top: 15px;">\n                        <strong>Zip Codes</strong>\n                    </ion-col>\n                    <ion-col col-2 offset-6>\n                        <button ion-button item-end (click)="show_addZip()">\n                          <ion-icon name="md-add-circle" class="ion-lg"></ion-icon>\n                      </button>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-title>\n\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-note>Slide the Pin to the Left for more options</ion-note>\n\n    <ion-list style="padding-top: 10px;">\n        <ion-item-sliding *ngFor="let zip of zips" id="card-{{ zip.id }}">\n            <ion-item>\n                <ion-icon name="pin" item-start></ion-icon>\n                <h2>{{ zip.code }}</h2>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="danger" (click)="deleteZip(zip.id)">\n                  <ion-icon name="trash"></ion-icon>\n                  Delete\n                </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n\n    <hr />\n\n</ion-content>'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/zips/zips.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__services_zip__["a" /* Zips */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */]])
    ], ZipsPage);
    return ZipsPage;
}());

//# sourceMappingURL=zips.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Zips; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the Offers service.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var Zips = (function () {
    function Zips(http) {
        this.http = http;
        this.apiUrl = __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* API_URL */];
        console.log('Hello Offers Provider');
    }
    Zips.prototype.get_Zips = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/zip_code.php?action=get_Zips')
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Zips.prototype.add_Zip = function (zip) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/zip_code.php?action=add_Zip&zip=' + zip)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Zips.prototype.delete_Zip = function (zipID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/zip_code.php?action=delete_Zip&zipID=' + zipID)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Zips = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], Zips);
    return Zips;
}());

//# sourceMappingURL=zip.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserOffersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modal_modal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_requests__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_offers__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__ = __webpack_require__(24);
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
 * Generated class for the UserOffersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserOffersPage = (function () {
    function UserOffersPage(nav, platform, alertCtrl, requestService, loadingCtrl, translate, toastCtrl, navParams, localNotifications, modalCtrl, offerService) {
        var _this = this;
        this.nav = nav;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.requestService = requestService;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.localNotifications = localNotifications;
        this.modalCtrl = modalCtrl;
        this.offerService = offerService;
        this.USER_IMG_URL = __WEBPACK_IMPORTED_MODULE_4__services_constants__["n" /* USER_IMG_URL */];
        this.imgloaded = [];
        this.loadingAnimation = './assets/img/loading-animation.gif';
        this.showLoading('Getting Recent Offers');
        // Get Offers by Admin
        this.offerService.get_Offers().then(function (result) {
            _this.hideLoading();
            _this.offers = result;
            for (var i = 0; i < _this.offers.length; i++) {
                _this.offers[i]['img'] = __WEBPACK_IMPORTED_MODULE_4__services_constants__["i" /* IMG_URL */] + '' + _this.offers[i]['img'];
            }
            localStorage.setItem('offers', JSON.stringify(_this.offers));
            console.log('this.offers: ', _this.offers);
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    }
    UserOffersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AdminOffersPage');
    };
    UserOffersPage.prototype.viewDetails = function (offerID) {
        console.log("offerID: ", offerID);
        var Modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__modal_modal__["a" /* ModalPage */], { offerID: offerID });
        Modal.present();
    };
    // Show note popup when click to 'Update Quote'
    UserOffersPage.prototype.showUpdatePopup = function (offerID, oldPrice) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Update Offer',
            message: "",
            inputs: [
                {
                    name: 'price',
                    placeholder: 'Previous price: ' + oldPrice
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'CancelCss',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    cssClass: 'SendCss',
                    handler: function (data) {
                        _this.update_Quote(offerID, data['price']);
                    }
                }
            ]
        });
        prompt.present();
    };
    ;
    UserOffersPage.prototype.update_Quote = function (offerID, price) {
        var _this = this;
        console.log("offerID: ", offerID);
        console.log("price: ", price);
        // Send Admin Offer
        this.showLoading('Updating Offer...');
        this.offerService.update_Offer(offerID, price).then(function (result) {
            if (result) {
                for (var i = 0; i < _this.offers.length; i++) {
                    if (offerID == _this.offers[i]['offerId']) {
                        _this.offers[i]['price'] = price;
                        break;
                    }
                }
            }
            localStorage.setItem('offers', JSON.stringify(_this.offers)); // Update Offers in localStorage
            _this.showToast('Offer Updated');
            _this.hideLoading();
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    };
    // Push Notification
    UserOffersPage.prototype.singlenotification = function (id, title, text) {
        this.localNotifications.schedule({
            id: id,
            title: title,
            text: text
        });
    };
    UserOffersPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'top'
        });
        toast.present();
    };
    UserOffersPage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.present();
    };
    UserOffersPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    UserOffersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-user-offers',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/user-offers/user-offers.html"*/'<!--\n  Generated template for the AdminOffersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>admin_offers</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n  <ion-icon name="menu"></ion-icon>\n</button>\n\n        <ion-title>\n            <ion-grid>\n                <ion-row class="header-class">\n                    <!-- <ion-col col-1>\n                        <!-- <div class="logoHeader"></div> --\n                    </ion-col> -->\n                    <ion-col col-11>\n                        <strong>Offers by SnapRepair</strong>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-title>\n\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n\n    <div *ngFor="let offer of offers">\n        <ion-card *ngIf="offer.status != 1" id="card-{{offer.offerId}}">\n\n            <ion-item>\n                <ion-avatar item-start>\n                    <img src="{{ USER_IMG_URL + offer.image }}">\n                </ion-avatar>\n                <h2>{{ offer.name }}</h2>\n                <ion-note>{{ offer.email }}</ion-note>\n            </ion-item>\n\n            <img *ngIf="!imgloaded[i]" src="{{ loadingAnimation }}" />\n            <img [hidden]="!imgloaded[i]" (load)="imgloaded[i] = true" src="{{ offer.img }}" />\n            <!-- <img src="{{ offer.img || loadingAnimation }}"> -->\n\n            <ion-card-content>\n                <p><strong>Category:</strong> {{ offer.cat_name }}</p>\n                <p><strong>Description:</strong> {{ offer.description }}</p>\n                <ion-note>\n                    Expected Completion Time: {{ offer.ect }}\n                </ion-note>\n            </ion-card-content>\n\n            <ion-row>\n                <ion-col col-6 text-center>\n                    <button ion-button color="danger" clear small icon-start (click)="viewDetails(offer.offerId)">\n                    <ion-icon name=\'ios-bookmark\'></ion-icon>\n                    View Details\n                  </button>\n                </ion-col>\n                <ion-col col-6 text-center *ngIf="offer.status != -1">\n                    <button ion-button clear small color="instagram" icon-start (click)="showUpdatePopup(offer.offerId, offer.price)">\n                      <ion-icon name=\'ios-refresh-circle\'></ion-icon>\n                      Update Quote\n                  </button>\n                </ion-col>\n                <ion-col text-right class="badge_Margin">\n                    <ion-badge [hidden]="offer.status != -1" color="danger">Offer Declined</ion-badge>\n                    <ion-badge [hidden]="offer.status != 0" color="primary">Offer Not Accepted Yet!</ion-badge>\n                </ion-col>\n            </ion-row>\n\n        </ion-card>\n    </div>\n\n</ion-content>'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/user-offers/user-offers.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__services_requests__["a" /* Requests */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_7__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6__services_offers__["a" /* Offers */]])
    ], UserOffersPage);
    return UserOffersPage;
}());

//# sourceMappingURL=user-offers.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserMakeRequestPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_crop__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__user_requests_user_requests__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_requests__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var cordova;
/**
 * Generated class for the UserMakeRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UserMakeRequestPage = (function () {
    function UserMakeRequestPage(navCtrl, navParams, imagePicker, cropService, camera, actionSheetCtrl, file, toastCtrl, platform, loadingCtrl, alertCtrl, requestService, localNotifications) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.imagePicker = imagePicker;
        this.cropService = cropService;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.file = file;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.requestService = requestService;
        this.localNotifications = localNotifications;
        this.request_m = { address: '', categoryId: '', description: '', ect: '', zip: '', userId: '', img: '' };
        this.categories = [];
        this.zips = [];
        this.slidesPerView = 1;
        this.lastImage = null;
        this.photos = [];
        this.photosBase64 = [];
        this.showLoading('Getting Data');
        // Get Data 
        this.requestService.get_user_make_req_data().then(function (result) {
            console.log('result: ', result);
            _this.hideLoading();
            _this.categories = result['categories'];
            _this.zips = result['zips'];
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    }
    // private transfer: Transfer, 
    // private filePath: FilePath,
    UserMakeRequestPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserMakeRequestPage');
    };
    UserMakeRequestPage.prototype.openImagePicker = function () {
        var _this = this;
        if (this.photos.length >= 5)
            this.alertCtrl.create({ subTitle: '5 images per Request are Allowed!', buttons: ['ok'] }).present();
        else {
            var count = 5 - this.photos.length;
            var options = {
                maximumImagesCount: count,
            };
            this.imagePicker.getPictures(options)
                .then(function (results) {
                _this.reduceImages(results).then(function () {
                    console.log('all images cropped!! CROP ENDED');
                });
            }, function (err) { console.log(err); });
        }
    };
    UserMakeRequestPage.prototype.takePicture_Simple = function () {
        var _this = this;
        if (this.photos.length >= 5)
            this.alertCtrl.create({ subTitle: '5 images per Request are Allowed!', buttons: ['ok'] }).present();
        else {
            var options = {
                quality: 100,
                correctOrientation: true
            };
            this.camera.getPicture(options)
                .then(function (data) {
                _this.cropService
                    .crop(data, { quality: 90 })
                    .then(function (newImage) {
                    _this.pushToImages(newImage);
                }, function (error) { return console.error("Error cropping image", error); });
            }, function (error) {
                console.log(error);
            });
        }
    };
    UserMakeRequestPage.prototype.reduceImages = function (selected_pictures) {
        var _this = this;
        return selected_pictures.reduce(function (promise, item) {
            return promise.then(function (result) {
                return _this.cropService.crop(item, { quality: 90 })
                    .then(function (cropped_image) {
                    console.log('all images cropped!!', cropped_image);
                    _this.pushToImages(cropped_image);
                });
            });
        }, Promise.resolve());
    };
    UserMakeRequestPage.prototype.pushToImages = function (path) {
        // this.photos.push(path);
        this.photos.splice(0, 0, path);
        this.set_slidesPerView();
        this.pathToBase64(path);
    };
    UserMakeRequestPage.prototype.pathToBase64 = function (res) {
        var _this = this;
        var path = res.toString();
        try {
            var n = path.lastIndexOf("/");
            var x = path.lastIndexOf("g");
            var nameFile = path.substring(n + 1, x + 1);
            var directory = path.substring(0, n);
            this.file.readAsDataURL(directory.toString(), nameFile).then(function (res) {
                // this.photosBase64.push(res);
                _this.photosBase64.splice(0, 0, path);
                // console.log("this.photosBase64: ",this.photosBase64);
                // this.photos.splice(0, 0, res);
                // this.set_slidesPerView();
            }).catch(function (err) { return alert('error pathToBase64 ' + JSON.stringify(err)); });
        }
        catch (error) {
            alert(error);
        }
    };
    UserMakeRequestPage.prototype.set_slidesPerView = function () {
        if (this.photos.length == 1)
            this.slidesPerView = 1;
        else
            this.slidesPerView = 2;
    };
    UserMakeRequestPage.prototype.removeImage = function (index) {
        this.photos.splice(index, 1);
        this.photosBase64.splice(index, 1);
        this.set_slidesPerView();
        // console.log("photos", JSON.stringify(this.photos));
    };
    UserMakeRequestPage.prototype.sendRequest = function () {
        var _this = this;
        if (this.request_m['address'] == '' || this.request_m['categoryId'] == '' || this.request_m['description'] == '' || this.request_m['ect'] == '' || this.request_m['zip'] == '')
            this.alertCtrl.create({ subTitle: 'All Fields are Required!', buttons: ['ok'] }).present();
        else if (this.photos.length < 1)
            this.alertCtrl.create({ subTitle: 'Atleast provide one image for request!', buttons: ['ok'] }).present();
        else {
            this.showLoading('Sending Request');
            var user = JSON.parse(localStorage.getItem('userData'));
            this.request_m['userId'] = user['userId'];
            this.request_m['img'] = this.photosBase64;
            console.log("this.photosBase64 Main: ", this.photosBase64);
            console.log("this.request_m: ", this.request_m);
            // Send Request 
            this.requestService.sendRequest(this.request_m).then(function (result) {
                console.log('result: ', result);
                _this.hideLoading();
                if (result) {
                    _this.showAlert('Request Sent', 'Your request has been sent to SnapRepair');
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__user_requests_user_requests__["a" /* UserRequestsPage */]);
                }
            }, function (err) {
                _this.hideLoading();
                _this.showAlert('Request Sending Failed', JSON.stringify(err));
                console.log("err", JSON.stringify(err));
            });
        }
    };
    UserMakeRequestPage.prototype.showAlert = function (title, mesasge) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: mesasge,
            buttons: ['OK']
        });
        alert.present();
    };
    // Push Notification
    UserMakeRequestPage.prototype.singlenotification = function (id, title, text) {
        this.localNotifications.schedule({
            id: id,
            title: title,
            text: text
        });
    };
    UserMakeRequestPage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'top'
        });
        toast.present();
    };
    UserMakeRequestPage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.present();
    };
    UserMakeRequestPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    UserMakeRequestPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-user-make-request',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/user-make-request/user-make-request.html"*/'<!--\n  Generated template for the UserMakeRequestPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n      </button>\n\n        <ion-title>\n            <ion-grid>\n                <ion-row class="header-class">\n                    <ion-col col-2>\n                        <!-- <div class="logoHeader"></div> -->\n                    </ion-col>\n                    <ion-col col-6>\n                        <strong>Make Request</strong>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n            <!-- <strong>Requests</strong> -->\n        </ion-title>\n\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-row>\n        <ion-col text-center col-4>\n            <button ion-button color="danger" clear icon-start (click)="takePicture_Simple()">\n                <ion-row>\n                    <ion-col text-center col-12>\n                        <ion-icon name=\'ios-camera\'></ion-icon>\n                    </ion-col>\n                    <ion-col text-center col-12>\n                        <div>Take A Pic</div>\n                    </ion-col>\n                </ion-row>\n            </button>\n        </ion-col>\n        <ion-col text-center col-8>\n            <button ion-button color="secondary" clear icon-start (click)="openImagePicker()">\n                <ion-row>\n                    <ion-col text-center col-12>\n                        <ion-icon name=\'ios-image\'></ion-icon>\n                    </ion-col>\n                    <ion-col text-center col-12>\n                        <div>Select From Gallery</div>\n                    </ion-col>\n                </ion-row>\n            </button>\n        </ion-col>\n    </ion-row>\n\n    <ion-card>\n        <ion-slides [slidesPerView]="slidesPerView" class="image-slider">\n            <ion-slide *ngFor="let i = index; let photo of photos" style="padding: 2px;">\n                <img src="{{ photo }}" class="thumb-img" style="border-radius: 4px;" imageViewer/>\n\n                <button ion-button color="danger" clear icon-only (click)="removeImage(i)">\n                    <ion-icon name=\'trash\' is-active="false"></ion-icon>\n                </button>\n            </ion-slide>\n        </ion-slides>\n    </ion-card>\n\n    <ion-list>\n        <ion-item>\n            <ion-label floating>\n                <ion-icon name="pin" item-start class="text-primary"></ion-icon>\n                Zipcode\n            </ion-label>\n\n            <ion-select [(ngModel)]="request_m.zip" class="selectStyle">\n                <ion-option *ngFor="let zip of zips" value="{{ zip[\'code\'] }}">{{ zip[\'code\'] }}</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>\n                <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n                Address\n            </ion-label>\n            <ion-input type="text" name="phone" [(ngModel)]="request_m.address"></ion-input>\n        </ion-item>\n\n\n        <ion-item>\n            <ion-label floating>\n                <ion-icon name="md-list" item-start class="text-primary"></ion-icon>\n                Work Category\n            </ion-label>\n\n            <ion-select [(ngModel)]="request_m.categoryId" class="selectStyle">\n                <ion-option *ngFor="let cat of categories" value="{{ cat[\'categoryId\'] }}">{{ cat[\'cat_name\'] }}</ion-option>\n            </ion-select>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>\n                <ion-icon name="md-calendar" item-start class="text-primary"></ion-icon>\n                Expected Completion Time\n            </ion-label>\n            <ion-datetime displayFormat="DDDD MMM D, YYYY" max="2022-12-31" [(ngModel)]="request_m.ect"></ion-datetime>\n        </ion-item>\n\n        <ion-item>\n            <ion-label floating>\n                <ion-icon name="md-bookmark" item-start class="text-primary"></ion-icon>\n                Description\n            </ion-label>\n            <ion-input type="text" name="phone" [(ngModel)]="request_m.description"></ion-input>\n            <!-- <ion-textarea placeholder="Enter a description" [(ngModel)]="request_m.description"></ion-textarea> -->\n        </ion-item>\n\n    </ion-list>\n\n    <button ion-button icon-left block (click)="sendRequest()">\n        <ion-icon name="cloud-upload"></ion-icon> Send Request\n    </button>\n\n</ion-content>\n\n\n<!-- <ion-footer>\n    <ion-toolbar color="primary">\n        <ion-buttons>\n            <button ion-button icon-left (click)="presentActionSheet()">\n          <ion-icon name="camera"></ion-icon>Select Image\n        </button>\n            <button ion-button icon-left (click)="uploadImage()" [disabled]="lastImage === null">\n          <ion-icon name="cloud-upload"></ion-icon>Upload\n        </button>\n        </ion-buttons>\n    </ion-toolbar>\n</ion-footer> -->\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/user-make-request/user-make-request.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_image_picker__["a" /* ImagePicker */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_crop__["a" /* Crop */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_8__services_requests__["a" /* Requests */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], UserMakeRequestPage);
    return UserMakeRequestPage;
}());

//# sourceMappingURL=user-make-request.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(194);
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
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WelcomePage = (function () {
    function WelcomePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    WelcomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WelcomePage');
    };
    WelcomePage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    WelcomePage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-welcome',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/welcome/welcome.html"*/'<ion-content scroll="false" class="bg_N">\n\n    <div padding padding-horizontal text-center class="animated fadeInDown">\n\n        <ion-segment color="primary" style="background-color: white;">\n            <ion-segment-button (click)="login()" style="border-right: 0.5px solid rgba(36, 43, 49, 0.2);">\n                {{ \'SIGN IN\' | translate }}\n            </ion-segment-button>\n\n            <ion-segment-button (click)="signup()" style="border-left: 0.5px solid rgba(36, 43, 49, 0.2); color:black;">\n                {{ \'REGISTER\' | translate }}\n            </ion-segment-button>\n        </ion-segment>\n\n        <div style="margin-top: -33px;">\n            <span class="dot">\n          <p class="or">OR</p>\n        </span>\n        </div>\n\n    </div>\n\n    <div class="splash-info">\n        <img src="./assets/img/icon/logo.png" alt="" style="width: 55%;">\n        <!-- <div class="splash-logo"></div>\n        <div class="splash-intro">\n            {{ \'SnapRepair\' | translate }}\n        </div> -->\n    </div>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/welcome/welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Requests; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the Requests service.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var Requests = (function () {
    function Requests(http) {
        this.http = http;
        this.apiUrl = __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* API_URL */];
        console.log('Hello Requests Provider');
    }
    Requests.prototype.get_Requests = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/request.php?action=get_Requests')
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Requests.prototype.get_user_Requests = function (userId) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/request.php?action=get_user_Requests&userId=' + userId)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Requests.prototype.delete_Request = function (reqID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/request.php?action=delete_Request&reqID=' + reqID)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Requests.prototype.get_Request_Images = function (reqID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/request.php?action=get_Request_Images&reqID=' + reqID)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Requests.prototype.get_user_make_req_data = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/request.php?action=get_make_req_data')
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Requests.prototype.sendRequest = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var formData = new FormData();
            formData.append('data', JSON.stringify(data));
            _this.http.post(_this.apiUrl + '/request.php?action=add_Request', formData)
                .subscribe(function (res) {
                console.log("res: ", JSON.stringify(res));
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Requests = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], Requests);
    return Requests;
}());

//# sourceMappingURL=requests.js.map

/***/ }),

/***/ 546:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingService = (function () {
    function SettingService(db) {
        this.db = db;
    }
    SettingService.prototype.getPrices = function () {
        return this.db.object('master_settings/prices');
    };
    SettingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], SettingService);
    return SettingService;
}());

//# sourceMappingURL=setting-service.js.map

/***/ }),

/***/ 547:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_place_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__map_map__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_trip_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_deal_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tracking_tracking__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/*
 Generated class for the PlacesPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var PlacesPage = (function () {
    function PlacesPage(nav, placeService, geolocation, loadingCtrl, navParams, tripService, dealService) {
        var _this = this;
        this.nav = nav;
        this.placeService = placeService;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.tripService = tripService;
        this.dealService = dealService;
        // all places
        this.places = [];
        // search keyword
        this.keyword = '';
        // page loaded flag
        this.pageLoaded = false;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.lat = resp.coords.latitude;
            _this.lon = resp.coords.longitude;
            _this.search();
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    }
    // show search input
    PlacesPage.prototype.ionViewDidEnter = function () {
        this.pageLoaded = true;
    };
    // hide search input
    PlacesPage.prototype.ionViewWillLeave = function () {
        this.pageLoaded = false;
    };
    // choose a place
    PlacesPage.prototype.selectPlace = function (place) {
        console.log(place);
        var tripId = this.navParams.get('tripId');
        if (this.navParams.get('type') == 'origin') {
            this.tripService.setOrigin(place.vicinity, place.geometry.location.lat, place.geometry.location.lng);
            console.log("origin set");
        }
        else {
            this.tripService.setDestination(place.vicinity, place.geometry.location.lat, place.geometry.location.lng);
            console.log("destination set");
            if (this.navParams.get('page') == 'tracking') {
                var driverID = this.navParams.get('driverID');
                console.log("driverID: ", driverID);
                this.dealService.updateDeal_dest(driverID, place);
                this.tripService.updateTrip_dest(tripId, place);
            }
        }
        // this.nav.setRoot(HomePage);
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__tracking_tracking__["a" /* TrackingPage */], { tripId: tripId });
    };
    // clear search input
    PlacesPage.prototype.clear = function () {
        this.keyword = '';
        this.search();
    };
    // search by address
    PlacesPage.prototype.search = function () {
        var _this = this;
        this.showLoading();
        this.placeService.searchByAddress(this.keyword, this.lat, this.lon).subscribe(function (result) {
            _this.hideLoading();
            _this.places = result.results;
        });
        setTimeout(function () { _this.hideLoading(); }, 5000);
    };
    // calculate distance from a place to current position
    PlacesPage.prototype.calcDistance = function (place) {
        return this.placeService.calcCrow(place.geometry.location.lat, place.geometry.location.lng, this.lat, this.lon).toFixed(1);
    };
    PlacesPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    PlacesPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    // open map page
    PlacesPage.prototype.openMap = function () {
        var tripId = this.navParams.get('tripId');
        var prev_page = this.navParams.get('page');
        var driverID = this.navParams.get('driverID');
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__map_map__["a" /* MapPage */], { type: this.navParams.get('type'), page: prev_page, driverID: driverID, tripId: tripId });
    };
    PlacesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-places',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/places/places.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <div class="search-bar">\n      <input type="text"\n             [(ngModel)]="keyword"\n             (change)="search($event)"\n             [hidden]="!pageLoaded"\n             autocorrect="off"\n             placeholder="Where are you going?">\n      <div class="close-btn" [hidden]="!keyword.length" (click)="clear()">\n        <ion-icon name="close"></ion-icon>\n      </div>\n    </div>\n    <ion-buttons end>\n      <button ion-button (click)="openMap()">\n        <ion-icon name="pin"></ion-icon>&nbsp; Pick\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="common-bg">\n  <p style="text-align:center;color:#bbb" *ngIf="places.length==0">No Places found; please make sure, your have proper permission;</p>\n  <ion-list>\n    <ion-item *ngFor="let place of places" (click)="selectPlace(place)">\n      <ion-icon name="ios-pin-outline" item-left>\n      </ion-icon>\n      <span class="item-icon-label">\n        {{ calcDistance(place) }} km\n      </span>\n      <div>\n        <div class="bold">{{ place.name }}</div>\n        <span>{{ place.vicinity }}</span>\n      </div>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/places/places.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_place_service__["a" /* PlaceService */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__services_trip_service__["a" /* TripService */],
            __WEBPACK_IMPORTED_MODULE_6__services_deal_service__["a" /* DealService */]])
    ], PlacesPage);
    return PlacesPage;
}());

//# sourceMappingURL=places.js.map

/***/ }),

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_place_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_trip_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_deal_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tracking_tracking__ = __webpack_require__(118);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var MapPage = (function () {
    function MapPage(nav, geolocation, chRef, navParams, placeService, tripService, dealService) {
        this.nav = nav;
        this.geolocation = geolocation;
        this.chRef = chRef;
        this.navParams = navParams;
        this.placeService = placeService;
        this.tripService = tripService;
        this.dealService = dealService;
        // marker position on screen
        this.markerFromTop = 0;
        this.markerFromLeft = 0;
    }
    // Load map only after view is initialized
    MapPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
        // set marker position in center of screen
        // minus marker's size
        this.markerFromTop = window.screen.height / 2 - 16;
        this.markerFromLeft = window.screen.width / 2 - 8;
    };
    MapPage.prototype.loadMap = function () {
        var _this = this;
        // set current location as map center
        this.geolocation.getCurrentPosition().then(function (resp) {
            var latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            _this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false
            });
            _this.marker = new google.maps.Marker({ map: _this.map, position: latLng });
            _this.marker.setMap(_this.map);
            // get center's address
            _this.findPlace(latLng);
            _this.map.addListener('center_changed', function (event) {
                var center = _this.map.getCenter();
                _this.findPlace(center);
            });
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    // find address by LatLng
    MapPage.prototype.findPlace = function (latLng) {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        this.marker.setMap(null);
        this.marker = new google.maps.Marker({ map: this.map, position: latLng });
        this.marker.setMap(this.map);
        geocoder.geocode({ 'latLng': latLng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                _this.address = results[0];
                _this.chRef.detectChanges();
            }
        });
    };
    // choose address and go back to tracking page
    MapPage.prototype.selectPlace = function () {
        var address = this.placeService.formatAddress(this.address);
        var tripId = this.navParams.get('tripId');
        if (this.navParams.get('type') == 'origin') {
            this.tripService.setOrigin(address.vicinity, address.location.lat, address.location.lng);
        }
        else {
            this.tripService.setDestination(address.vicinity, address.location.lat, address.location.lng);
            if (this.navParams.get('page') == 'tracking') {
                var driverID = this.navParams.get('driverID');
                this.dealService.updateDeal_dest(driverID, address);
                this.tripService.updateTrip_dest(tripId, address);
            }
        }
        // this.nav.setRoot(HomePage);
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__tracking_tracking__["a" /* TrackingPage */], { tripId: tripId });
    };
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-map',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/map/map.html"*/'<ion-header>\n\n  <ion-navbar color="white">\n    <ion-title>{{ address ? address.formatted_address : \'\' }}</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="selectPlace()">\n        Done\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div #map id="map"></div>\n  <img class="marker" src="./assets/img/pin.png" alt=""\n       [ngStyle]="{top: markerFromTop + \'px\', left: markerFromLeft + \'px\'}">\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/map/map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__services_place_service__["a" /* PlaceService */], __WEBPACK_IMPORTED_MODULE_4__services_trip_service__["a" /* TripService */],
            __WEBPACK_IMPORTED_MODULE_5__services_deal_service__["a" /* DealService */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
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
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AboutPage = (function () {
    function AboutPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AboutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutPage');
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/about/about.html"*/'<!-- -->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n            <div class="logoHeader"></div>\n          </ion-col>\n          <ion-col col-4>\n            <strong>About Us</strong>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="common-bg">\n  <!--description-->\n  <div class="border-bottom" padding>\n    <span ion-text color="primary" class="bold headingSection">YUR Drivers Network</span>\n    <p ion-text color="secondary">YUR Drivers Network is built from the bottom up, the brainstorm of 2 friends with different skill sets and one common experience, they both drove for rideshare companies to learn the business. Then they reinvented it built on trust and respect – where every driver has a chance to earn a real living, where every passenger feels secure.</p>\n  </div>\n\n  <!--high light-->\n  <div class="border-bottom" padding>\n    <div padding class="light-bg">\n      <ion-icon name="usd" class="text-2x" color="primary"></ion-icon>\n      <span ion-text color="primary" class="bold">YUR Money</span>\n      <p ion-text color="secondary">As a YUR Drivers Network driver you will receive your income once a week, deposited directly into your account.</p>\n    </div>\n  </div>\n  <!--high light-->\n  <div class="border-bottom" padding>\n    <div padding class="light-bg">\n      <ion-icon name="usd" class="text-2x" color="primary"></ion-icon>\n      <span ion-text color="primary" class="bold">YUR Businessy</span>\n      <p ion-text color="secondary">It\'s all up to you. Your network and your business can be as large as you want to make it. There is no limit to the number of new drivers or passengers you can refer.</p>\n    </div>\n  </div>\n  <!--high light-->\n  <div class="border-bottom" padding>\n    <div padding class="light-bg">\n      <ion-icon name="usd" class="text-2x" color="primary"></ion-icon>\n      <span ion-text color="primary" class="bold">YUR Network</span>\n      <p ion-text color="secondary">You will now be able to earn income from potentially thousands of fares. Just refer new drivers and passengers to YUR and see your income grow!</p>\n    </div>\n  </div>\n  <!--high light-->\n  <div class="border-bottom" padding>\n    <div padding class="light-bg">\n      <ion-icon name="usd" class="text-2x" color="primary"></ion-icon>\n      <span ion-text color="primary" class="bold">Reliable, Safe, Secure</span>\n      <p ion-text color="secondary">With our unique biometric check you can be sure that the driver that was screened is the person driving the car. No other rideshare company offers this.</p>\n    </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/about/about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommissionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
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
 * Generated class for the CommissionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CommissionPage = (function () {
    function CommissionPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CommissionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CommissionPage');
    };
    CommissionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-commission',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/commission/commission.html"*/'<!-- -->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n            <div class="logoHeader"></div>\n          </ion-col>\n          <ion-col col-4>\n            <strong>Earn Commission</strong>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-title>\n    <!--<ion-buttons end>\n      <button ion-button tappable (click)="presentNotifications($event)">\n        <ion-icon name="notifications"></ion-icon>\n      </button>\n      <button ion-button tappable (click)="goToAccount()">\n        <ion-icon name="cog"></ion-icon>\n      </button>\n    </ion-buttons> -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="animated fadeIn common-bg">\n  <!--description-->\n  <div class="border-bottom" padding>\n    <span ion-text color="primary" class="bold headingSection2">EARN COMMISSIONS</span>\n    <p ion-text color="secondary">Refer your friends today and recive commisions every time your friends uses the Yur Pax App. There is no limit on referrals. The more friends you refer the more commission you can make!</p>\n  </div>\n\n  <!--high light-->\n  <div class="border-bottom" padding>\n    <div padding class="light-bg">\n      <ion-icon name="usd" class="text-2x" color="primary"></ion-icon>\n      <span ion-text color="primary" class="bold">Earn More Now</span>\n      <p ion-text color="secondary">You earn 80% of all YUR fares.</p>\n    </div>\n  </div>\n  <!--high light-->\n  <div class="border-bottom" padding>\n    <div padding class="light-bg">\n      <ion-icon name="usd" class="text-2x" color="primary"></ion-icon>\n      <span ion-text color="primary" class="bold">Earn More Later</span>\n      <p ion-text color="secondary">By referring new drivers, you earn more every day, every week and every year.</p>\n    </div>\n  </div>\n  <!--high light-->\n  <div class="border-bottom" padding>\n    <div padding class="light-bg">\n      <ion-icon name="usd" class="text-2x" color="primary"></ion-icon>\n      <span ion-text color="primary" class="bold">Refer Passengers to Earn Ongoing Revenue</span>\n      <p ion-text color="secondary">Refer a new passenger and receive 5% of all their fares.</p>\n    </div>\n  </div>\n  <!--high light-->\n  <div class="border-bottom" padding>\n    <div padding class="light-bg">\n      <ion-icon name="usd" class="text-2x" color="primary"></ion-icon>\n      <span ion-text color="primary" class="bold">Income into YUR Own Account</span>\n      <p ion-text color="secondary">Your revenue is deposited once a week, directly into your account.</p>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/commission/commission.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */]])
    ], CommissionPage);
    return CommissionPage;
}());

//# sourceMappingURL=commission.js.map

/***/ }),

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__updatecard_updatecard__ = __webpack_require__(355);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_trip_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_user_user__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { HomePage } from "../home/home";





// import * as firebase from 'firebase';

/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation. B33437
 */
var PaymentPage = (function () {
    function PaymentPage(nav, authService, navParams, alertCtrl, toastCtrl, loadingCtrl, platform, tripService, translate, userService) {
        this.nav = nav;
        this.authService = authService;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.tripService = tripService;
        this.translate = translate;
        this.userService = userService;
        //public paymethods: any = 'creditcard';
        this.data = {};
        var id = JSON.parse(localStorage.getItem('userData'));
        this.data['UserId'] = id.userId;
    }
    PaymentPage.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.GetCard(this.data['UserId']).then(function (result) {
            _this.card = result['data'];
            console.log("Data", _this.card);
            _this.card_length = result['data'].length;
            console.log("length", _this.card_length);
        }, function (err) {
            console.log(err);
        });
    };
    PaymentPage.prototype.default = function (id) {
        var _this = this;
        this.userService.setdefault(this.data['UserId'], id).then(function (result) {
            console.log(result);
            _this.nav.pop();
        }, function (err) {
            console.log(err);
        });
    };
    PaymentPage.prototype.saveCard = function () {
        var _this = this;
        if (this.number == null || this.card_Month == null || this.card_Year == null || this.cvv == null) {
            this.alertCtrl.create({ subTitle: 'Empty Fields', buttons: ['ok'] }).present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({ content: 'Processing...' });
            loading_1.present();
            this.data = {};
            this.user = JSON.parse(localStorage.getItem('userData'));
            this.data['UserId'] = this.user.userId;
            var xmlhttp_1 = new XMLHttpRequest();
            xmlhttp_1.open('POST', 'https://dbstage1.paywire.com/API/pwapi.aspx');
            var sr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        <PAYMENTREQUEST>\n           <TRANSACTIONHEADER>\n              <PWVERSION>3</PWVERSION>\n               <PWUSER>yurt1</PWUSER>\n               <PWPASS>Kt93SbYZ</PWPASS>\n               <PWCLIENTID>0000010062</PWCLIENTID>\n               <PWKEY>8A0B6FA9-D918-4D84-B02F-5BB7C8578F4D</PWKEY>\n              <PWTRANSACTIONTYPE>STORETOKEN</PWTRANSACTIONTYPE>\n              <PWSALEAMOUNT>0</PWSALEAMOUNT>\n              <PWINVOICENUMBER>001001001004</PWINVOICENUMBER>\n              <CARDPRESENT>FALSE</CARDPRESENT>\n           </TRANSACTIONHEADER>\n           <CUSTOMER>\n              <PWMEDIA>CC</PWMEDIA>\n              <CARDNUMBER>" + this.number + "</CARDNUMBER>\n              <EXP_MM>" + this.card_Month + "</EXP_MM>\n              <EXP_YY>" + this.card_Year + "</EXP_YY>\n              <CVV2>" + this.cvv + "</CVV2>\n           </CUSTOMER>\n        </PAYMENTREQUEST>";
            xmlhttp_1.onreadystatechange = function () {
                if (xmlhttp_1.readyState == 4) {
                    if (xmlhttp_1.status == 200) {
                        var xml = xmlhttp_1.responseXML;
                        //
                        var response = xml.getElementsByTagName("PAYMENTRESPONSE")[0];
                        // console.log(response_number);
                        var length_1 = response.childElementCount;
                        //loading.dismiss();
                        console.log(length_1);
                        console.log(response);
                        // for (let i = 0; i < length; i++) {
                        //       this.data[response.childNodes[i].nodeName] = response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue;
                        //       //console.log(xx);
                        //     }
                        //     console.log(this.data);
                        //loading.dismiss();
                        if (length_1 < 9) {
                            loading_1.dismiss();
                            _this.alertCtrl.create({ subTitle: 'Invalid Credentials', buttons: ['ok'] }).present();
                        }
                        else {
                            loading_1.present();
                            for (var i = 0; i < length_1; i++) {
                                _this.data[response.childNodes[i].nodeName] = response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue;
                                //console.log(xx);
                            }
                            console.log(_this.data);
                            _this.userService.transaction(_this.data).then(function (result) {
                                loading_1.dismiss();
                                console.log('Server Response', result['data']);
                                _this.alertCtrl.create({ subTitle: 'Thanks for Registration', buttons: ['ok'] }).present();
                                _this.number = null;
                                _this.card_Month = null;
                                _this.card_Year = null;
                                _this.cvv = null;
                            }, function (err) {
                                loading_1.dismiss();
                                console.log(err);
                            });
                        }
                    }
                    else {
                        loading_1.dismiss();
                        _this.alertCtrl.create({ subTitle: 'No Access Origin', buttons: ['ok'] }).present();
                    }
                }
            };
            // Send the POST request
            xmlhttp_1.setRequestHeader('Content-Type', 'text/xml');
            xmlhttp_1.responseType = "document";
            xmlhttp_1.send(sr);
        }
    };
    PaymentPage.prototype.update = function () {
        var _this = this;
        this.userService.GetCard(this.data['UserId']).then(function (result) {
            var data = JSON.stringify(result['data']).length;
            if (data > 2) {
                _this.nav.push(__WEBPACK_IMPORTED_MODULE_2__updatecard_updatecard__["a" /* UpdateCard */]);
            }
            else {
                _this.alertCtrl.create({ subTitle: 'Your Card Not Registerd !', buttons: ['ok'] }).present();
            }
        }, function (err) {
            console.log(err);
        });
    };
    PaymentPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-payment',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/payment/payment.html"*/'<!-- -->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n            <div class="logoHeader"></div>\n          </ion-col>\n          <ion-col col-4>\n            <strong>Payments</strong>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-title>\n    <!--<ion-buttons end>\n      <button ion-button tappable (click)="presentNotifications($event)">\n        <ion-icon name="notifications"></ion-icon>\n      </button>\n      <button ion-button tappable (click)="goToAccount()">\n        <ion-icon name="cog"></ion-icon>\n      </button>\n    </ion-buttons> -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="animated fadeIn common-bg">\n  <ion-row>\n    <ion-col>\n      <ion-item no-padding>\n        <ion-input placeholder="Card Number" type="number" [(ngModel)]="number" size="20"></ion-input>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n\n  <ion-row>\n    <ion-col col-4>\n      <ion-item no-padding>\n        <ion-select placeholder="MM" [(ngModel)]="card_Month" class="max-width full-width">\n          <ion-option value="01">01</ion-option>\n          <ion-option value="02">02</ion-option>\n          <ion-option value="03">03</ion-option>\n          <ion-option value="04">04</ion-option>\n          <ion-option value="05">05</ion-option>\n          <ion-option value="06">06</ion-option>\n          <ion-option value="07">07</ion-option>\n          <ion-option value="08">08</ion-option>\n          <ion-option value="09">09</ion-option>\n          <ion-option value="10">10</ion-option>\n          <ion-option value="11">11</ion-option>\n          <ion-option value="12">12</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-col>\n    <ion-col col-4>\n      <ion-item no-padding>\n        <ion-select placeholder="YY" [(ngModel)]="card_Year" class="max-width full-width">\n          <ion-option value="18">18</ion-option>\n          <ion-option value="19">19</ion-option>\n          <ion-option value="20">20</ion-option>\n          <ion-option value="21">21</ion-option>\n          <ion-option value="22">22</ion-option>\n          <ion-option value="23">23</ion-option>\n          <ion-option value="24">24</ion-option>\n        </ion-select>\n      </ion-item>\n    </ion-col>\n    <ion-col col-4>\n      <ion-item no-padding>\n        <ion-input placeholder="CVV" type="number" [(ngModel)]="cvv" size="4"></ion-input>\n      </ion-item>\n    </ion-col>\n  </ion-row>\n  <button ion-button class="round" color="primary" margin-top full tappable (click)="saveCard()">Add Payment Source</button>\n\n  <!-- <button ion-button class="round" color="primary" margin-top full tappable (click)="update()">Update Card</button> -->\n  <br> <br>\n  <div *ngIf="card_length > 0">\n\n\n    <br>\n    <ion-list>\n      <div *ngFor="let cad of card ">\n\n        <ion-item>\n\n\n          <ion-thumbnail>\n            {{cad.maccount}}\n\n            <ion-avatar item-start *ngIf="cad.dft == false">\n              <button ion-button clear item-end (click)="default(cad.id)">Set As Default</button>\n            </ion-avatar>\n\n            <ion-avatar item-start *ngIf="cad.dft == true">\n              <button ion-button clear item-end>Current Default Card</button>\n            </ion-avatar>\n            \n          </ion-thumbnail>\n\n\n        </ion-item>\n\n      </div>\n    </ion-list>\n\n\n\n\n  </div>\n\n</ion-content>\n\n<!-- <ion-content padding class="animated fadeIn common-bg">\n    payment info\n    <div class="border-bottom" padding>\n      <span ion-text color="secondary" class="bold headingSection2">Payment Method</span>\n    </div>\n    <ion-segment color="secondary" [(ngModel)]="paymethods">\n      <ion-segment-button value="creditcard" >\n        Credit card\n      </ion-segment-button>\n      <ion-segment-button value="paypal">\n        PayPal\n      </ion-segment-button>\n    </ion-segment>\n\n    <div class="card round" margin-top margin-bottom>\n\n      <div [ngSwitch]="paymethods">\n        <ion-grid *ngSwitchCase="\'creditcard\'" padding>\n          <ion-row>\n            <ion-col no-padding text-center>\n              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0OCA0OCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgZmlsbDojMTU2NUMwOyIgZD0iTSA0NSAzNSBDIDQ1IDM3LjIxMDkzOCA0My4yMTA5MzggMzkgNDEgMzkgTCA3IDM5IEMgNC43ODkwNjMgMzkgMyAzNy4yMTA5MzggMyAzNSBMIDMgMTMgQyAzIDEwLjc4OTA2MyA0Ljc4OTA2MyA5IDcgOSBMIDQxIDkgQyA0My4yMTA5MzggOSA0NSAxMC43ODkwNjMgNDUgMTMgWiAiLz48cGF0aCBzdHlsZT0iIGZpbGw6I0ZGRkZGRjsiIGQ9Ik0gMTUuMTg3NSAxOSBMIDEyLjU1ODU5NCAyNi44MzIwMzEgQyAxMi41NTg1OTQgMjYuODMyMDMxIDExLjg5NDUzMSAyMy41MTk1MzEgMTEuODI4MTI1IDIzLjEwMTU2MyBDIDEwLjMzMjAzMSAxOS42OTE0MDYgOC4xMjUgMTkuODgyODEzIDguMTI1IDE5Ljg4MjgxMyBMIDEwLjcyNjU2MyAzMCBMIDEwLjcyNjU2MyAyOS45OTYwOTQgTCAxMy44ODY3MTkgMjkuOTk2MDk0IEwgMTguMjU3ODEzIDE5IFogIi8+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkZGRkY7IiBkPSJNIDE3LjY4NzUgMzAgTCAyMC41NTg1OTQgMzAgTCAyMi4yOTY4NzUgMTkgTCAxOS4zOTA2MjUgMTkgWiAiLz48cGF0aCBzdHlsZT0iIGZpbGw6I0ZGRkZGRjsiIGQ9Ik0gMzguMDA3ODEzIDE5IEwgMzQuOTg4MjgxIDE5IEwgMzAuMjc3MzQ0IDMwIEwgMzMuMTI4OTA2IDMwIEwgMzMuNzE4NzUgMjguNDI5Njg4IEwgMzcuMzEyNSAyOC40Mjk2ODggTCAzNy42MTcxODggMzAgTCA0MC4yMzA0NjkgMzAgWiBNIDM0LjUxMTcxOSAyNi4zMjgxMjUgTCAzNi4wNzQyMTkgMjIuMTcxODc1IEwgMzYuODk0NTMxIDI2LjMyODEyNSBaICIvPjxwYXRoIHN0eWxlPSIgZmlsbDojRkZGRkZGOyIgZD0iTSAyNi4zNjcxODggMjIuMjA3MDMxIEMgMjYuMzY3MTg4IDIxLjYwMTU2MyAyNi44NjcxODggMjEuMTQ4NDM4IDI4LjI5Njg3NSAyMS4xNDg0MzggQyAyOS4yMjI2NTYgMjEuMTQ4NDM4IDMwLjI4NTE1NiAyMS44MjQyMTkgMzAuMjg1MTU2IDIxLjgyNDIxOSBMIDMwLjc1MzkwNiAxOS41MTU2MjUgQyAzMC43NTM5MDYgMTkuNTE1NjI1IDI5LjM5NDUzMSAxOSAyOC4wNjI1IDE5IEMgMjUuMDQyOTY5IDE5IDIzLjQ4NDM3NSAyMC40NDE0MDYgMjMuNDg0Mzc1IDIyLjI2OTUzMSBDIDIzLjQ4NDM3NSAyNS41NzgxMjUgMjcuNDY0ODQ0IDI1LjEyNSAyNy40NjQ4NDQgMjYuODIwMzEzIEMgMjcuNDY0ODQ0IDI3LjExMzI4MSAyNy4yMzQzNzUgMjcuNzg1MTU2IDI1LjU3NDIxOSAyNy43ODUxNTYgQyAyMy45MTQwNjMgMjcuNzg1MTU2IDIyLjgxNjQwNiAyNy4xNzU3ODEgMjIuODE2NDA2IDI3LjE3NTc4MSBMIDIyLjMyMDMxMyAyOS4zOTQ1MzEgQyAyMi4zMjAzMTMgMjkuMzk0NTMxIDIzLjM4NjcxOSAzMCAyNS40Mzc1IDMwIEMgMjcuNDk2MDk0IDMwIDMwLjM1NTQ2OSAyOC40NjA5MzggMzAuMzU1NDY5IDI2LjI0NjA5NCBDIDMwLjM1NTQ2OSAyMy41ODU5MzggMjYuMzY3MTg4IDIzLjM5NDUzMSAyNi4zNjcxODggMjIuMjA3MDMxIFogIi8+PHBhdGggc3R5bGU9IiBmaWxsOiNGRkMxMDc7IiBkPSJNIDEyLjIxMDkzOCAyNC45NDUzMTMgTCAxMS4yNDYwOTQgMjAuMTk1MzEzIEMgMTEuMjQ2MDk0IDIwLjE5NTMxMyAxMC44MDg1OTQgMTkuMTY3OTY5IDkuNjcxODc1IDE5LjE2Nzk2OSBDIDguNTM1MTU2IDE5LjE2Nzk2OSA1LjIzNDM3NSAxOS4xNjc5NjkgNS4yMzQzNzUgMTkuMTY3OTY5IEMgNS4yMzQzNzUgMTkuMTY3OTY5IDEwLjg5NDUzMSAyMC44Mzk4NDQgMTIuMjEwOTM4IDI0Ljk0NTMxMyBaICIvPjwvZz48L3N2Zz4=" alt="Visa" />\n              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0OCA0OCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgZmlsbDojM0Y1MUI1OyIgZD0iTSA0NSAzNSBDIDQ1IDM3LjIxMDkzOCA0My4yMTA5MzggMzkgNDEgMzkgTCA3IDM5IEMgNC43ODkwNjMgMzkgMyAzNy4yMTA5MzggMyAzNSBMIDMgMTMgQyAzIDEwLjc4OTA2MyA0Ljc4OTA2MyA5IDcgOSBMIDQxIDkgQyA0My4yMTA5MzggOSA0NSAxMC43ODkwNjMgNDUgMTMgWiAiLz48cGF0aCBzdHlsZT0iIGZpbGw6I0ZGQzEwNzsiIGQ9Ik0gNDAgMjQgQyA0MCAyOS41MjM0MzggMzUuNTIzNDM4IDM0IDMwIDM0IEMgMjQuNDc2NTYzIDM0IDIwIDI5LjUyMzQzOCAyMCAyNCBDIDIwIDE4LjQ3NjU2MyAyNC40NzY1NjMgMTQgMzAgMTQgQyAzNS41MjM0MzggMTQgNDAgMTguNDc2NTYzIDQwIDI0IFogIi8+PHBhdGggc3R5bGU9IiBmaWxsOiNGRjNEMDA7IiBkPSJNIDIyLjAxNTYyNSAzMCBDIDIxLjU1MDc4MSAyOS4zODI4MTMgMjEuMTUyMzQ0IDI4LjcxNDg0NCAyMC44Mzk4NDQgMjggTCAyNi4xNjQwNjMgMjggQyAyNi40NDE0MDYgMjcuMzYzMjgxIDI2LjY2MDE1NiAyNi42OTUzMTMgMjYuODAwNzgxIDI2IEwgMjAuMjAzMTI1IDI2IEMgMjAuMDcwMzEzIDI1LjM1NTQ2OSAyMCAyNC42ODc1IDIwIDI0IEwgMjcgMjQgQyAyNyAyMy4zMTI1IDI2LjkyOTY4OCAyMi42NDQ1MzEgMjYuODAwNzgxIDIyIEwgMjAuMTk5MjE5IDIyIEMgMjAuMzQzNzUgMjEuMzA0Njg4IDIwLjU1ODU5NCAyMC42MzY3MTkgMjAuODM5ODQ0IDIwIEwgMjYuMTY0MDYzIDIwIEMgMjUuODUxNTYzIDE5LjI4NTE1NiAyNS40NTMxMjUgMTguNjE3MTg4IDI0Ljk4ODI4MSAxOCBMIDIyLjAxNTYyNSAxOCBDIDIyLjQ0OTIxOSAxNy40MjE4NzUgMjIuOTQ1MzEzIDE2Ljg3ODkwNiAyMy40OTYwOTQgMTYuNDA2MjUgQyAyMS43NDYwOTQgMTQuOTEwMTU2IDE5LjQ4MDQ2OSAxNCAxNyAxNCBDIDExLjQ3NjU2MyAxNCA3IDE4LjQ3NjU2MyA3IDI0IEMgNyAyOS41MjM0MzggMTEuNDc2NTYzIDM0IDE3IDM0IEMgMjAuMjY5NTMxIDM0IDIzLjE2MDE1NiAzMi40MjU3ODEgMjQuOTg0Mzc1IDMwIFogIi8+PC9nPjwvc3ZnPg==" alt="mastercard">\n              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0OCA0OCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgZmlsbDojRTFFN0VBOyIgZD0iTSA0NSAzNSBDIDQ1IDM3LjE5OTIxOSA0My4xOTkyMTkgMzkgNDEgMzkgTCA3IDM5IEMgNC44MDA3ODEgMzkgMyAzNy4xOTkyMTkgMyAzNSBMIDMgMTMgQyAzIDEwLjgwMDc4MSA0LjgwMDc4MSA5IDcgOSBMIDQxIDkgQyA0My4xOTkyMTkgOSA0NSAxMC44MDA3ODEgNDUgMTMgWiAiLz48cGF0aCBzdHlsZT0iIGZpbGw6I0ZGNkQwMDsiIGQ9Ik0gNDUgMzUgQyA0NSAzNy4xOTkyMTkgNDMuMTk5MjE5IDM5IDQxIDM5IEwgMTYgMzkgQyAxNiAzOSAzOS42MDE1NjMgMzUuMTk5MjE5IDQ1IDI0IFogTSAyMiAyNCBDIDIyIDI1LjY5OTIxOSAyMy4zMDA3ODEgMjcgMjUgMjcgQyAyNi42OTkyMTkgMjcgMjggMjUuNjk5MjE5IDI4IDI0IEMgMjggMjIuMzAwNzgxIDI2LjY5OTIxOSAyMSAyNSAyMSBDIDIzLjMwMDc4MSAyMSAyMiAyMi4zMDA3ODEgMjIgMjQgWiAiLz48cGF0aCBzdHlsZT0iICIgZD0iTSAxMS4xOTkyMTkgMjEgTCAxMi4zMDA3ODEgMjEgTCAxMi4zMDA3ODEgMjcgTCAxMS4xOTkyMTkgMjcgWiBNIDE3LjE5OTIxOSAyNCBDIDE3LjE5OTIxOSAyNS42OTkyMTkgMTguNSAyNyAyMC4xOTkyMTkgMjcgQyAyMC42OTkyMTkgMjcgMjEuMTAxNTYzIDI2Ljg5ODQzOCAyMS42MDE1NjMgMjYuNjk5MjE5IEwgMjEuNjAxNTYzIDI1LjM5ODQzOCBDIDIxLjE5OTIxOSAyNS44MDA3ODEgMjAuODAwNzgxIDI2IDIwLjE5OTIxOSAyNiBDIDE5LjEwMTU2MyAyNiAxOC4zMDA3ODEgMjUuMTk5MjE5IDE4LjMwMDc4MSAyNCBDIDE4LjMwMDc4MSAyMi44OTg0MzggMTkuMTAxNTYzIDIyIDIwLjE5OTIxOSAyMiBDIDIwLjY5OTIxOSAyMiAyMS4xMDE1NjMgMjIuMTk5MjE5IDIxLjYwMTU2MyAyMi42MDE1NjMgTCAyMS42MDE1NjMgMjEuMzAwNzgxIEMgMjEuMTAxNTYzIDIxLjEwMTU2MyAyMC42OTkyMTkgMjAuODk4NDM4IDIwLjE5OTIxOSAyMC44OTg0MzggQyAxOC41IDIxIDE3LjE5OTIxOSAyMi4zOTg0MzggMTcuMTk5MjE5IDI0IFogTSAzMC42MDE1NjMgMjQuODk4NDM4IEwgMjkgMjEgTCAyNy44MDA3ODEgMjEgTCAzMC4zMDA3ODEgMjcgTCAzMC44OTg0MzggMjcgTCAzMy4zOTg0MzggMjEgTCAzMi4xOTkyMTkgMjEgWiBNIDMzLjg5ODQzOCAyNyBMIDM3LjEwMTU2MyAyNyBMIDM3LjEwMTU2MyAyNiBMIDM1IDI2IEwgMzUgMjQuMzk4NDM4IEwgMzcgMjQuMzk4NDM4IEwgMzcgMjMuMzk4NDM4IEwgMzUgMjMuMzk4NDM4IEwgMzUgMjIgTCAzNy4xMDE1NjMgMjIgTCAzNy4xMDE1NjMgMjEgTCAzMy44OTg0MzggMjEgWiBNIDQxLjUgMjIuODAwNzgxIEMgNDEuNSAyMS42OTkyMTkgNDAuODAwNzgxIDIxIDM5LjUgMjEgTCAzNy44MDA3ODEgMjEgTCAzNy44MDA3ODEgMjcgTCAzOC44OTg0MzggMjcgTCAzOC44OTg0MzggMjQuNjAxNTYzIEwgMzkgMjQuNjAxNTYzIEwgNDAuNjAxNTYzIDI3IEwgNDIgMjcgTCA0MC4xOTkyMTkgMjQuNSBDIDQxIDI0LjMwMDc4MSA0MS41IDIzLjY5OTIxOSA0MS41IDIyLjgwMDc4MSBaIE0gMzkuMTk5MjE5IDIzLjgwMDc4MSBMIDM4Ljg5ODQzOCAyMy44MDA3ODEgTCAzOC44OTg0MzggMjIgTCAzOS4xOTkyMTkgMjIgQyAzOS44OTg0MzggMjIgNDAuMzAwNzgxIDIyLjMwMDc4MSA0MC4zMDA3ODEgMjIuODk4NDM4IEMgNDAuMzAwNzgxIDIzLjM5ODQzOCA0MCAyMy44MDA3ODEgMzkuMTk5MjE5IDIzLjgwMDc4MSBaIE0gNy42OTkyMTkgMjEgTCA2IDIxIEwgNiAyNyBMIDcuNjAxNTYzIDI3IEMgMTAuMTAxNTYzIDI3IDEwLjY5OTIxOSAyNC44OTg0MzggMTAuNjk5MjE5IDI0IEMgMTAuODAwNzgxIDIyLjE5OTIxOSA5LjUgMjEgNy42OTkyMTkgMjEgWiBNIDcuMzk4NDM4IDI2IEwgNy4xMDE1NjMgMjYgTCA3LjEwMTU2MyAyMiBMIDcuNSAyMiBDIDkgMjIgOS42MDE1NjMgMjMgOS42MDE1NjMgMjQgQyA5LjYwMTU2MyAyNC4zOTg0MzggOS41IDI2IDcuMzk4NDM4IDI2IFogTSAxNS4zMDA3ODEgMjMuMzAwNzgxIEMgMTQuNjAxNTYzIDIzIDE0LjM5ODQzOCAyMi44OTg0MzggMTQuMzk4NDM4IDIyLjYwMTU2MyBDIDE0LjM5ODQzOCAyMi4xOTkyMTkgMTQuODAwNzgxIDIyIDE1LjE5OTIxOSAyMiBDIDE1LjUgMjIgMTUuODAwNzgxIDIyLjEwMTU2MyAxNi4xMDE1NjMgMjIuNSBMIDE2LjY5OTIxOSAyMS42OTkyMTkgQyAxNi4xOTkyMTkgMjEuMTk5MjE5IDE1LjY5OTIxOSAyMSAxNSAyMSBDIDE0IDIxIDEzLjE5OTIxOSAyMS42OTkyMTkgMTMuMTk5MjE5IDIyLjY5OTIxOSBDIDEzLjE5OTIxOSAyMy41IDEzLjYwMTU2MyAyMy44OTg0MzggMTQuNjAxNTYzIDI0LjMwMDc4MSBDIDE1LjE5OTIxOSAyNC41IDE1LjY5OTIxOSAyNC42OTkyMTkgMTUuNjk5MjE5IDI1LjE5OTIxOSBDIDE1LjY5OTIxOSAyNS42OTkyMTkgMTUuMzAwNzgxIDI2IDE0LjgwMDc4MSAyNiBDIDE0LjMwMDc4MSAyNiAxMy44MDA3ODEgMjUuNjk5MjE5IDEzLjYwMTU2MyAyNS4xOTkyMTkgTCAxMi44OTg0MzggMjUuODk4NDM4IEMgMTMuMzk4NDM4IDI2LjY5OTIxOSAxNCAyNyAxNC44OTg0MzggMjcgQyAxNi4xMDE1NjMgMjcgMTYuODk4NDM4IDI2LjE5OTIxOSAxNi44OTg0MzggMjUuMTAxNTYzIEMgMTYuODk4NDM4IDI0LjE5OTIxOSAxNi41IDIzLjgwMDc4MSAxNS4zMDA3ODEgMjMuMzAwNzgxIFogIi8+PC9nPjwvc3ZnPg==" alt="discover">\n              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyNTIgMjUyIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMCwyNTJ2LTI1MmgyNTJ2MjUyeiIgZmlsbD0ibm9uZSIvPjxnPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggZD0iTTIzNi4yNSwxODMuNzVjMCwxMS42MDc0MiAtOS4zOTI1OCwyMSAtMjEsMjFoLTE3OC41Yy0xMS42MDc0MiwwIC0yMSwtOS4zOTI1OCAtMjEsLTIxdi0xMTUuNWMwLC0xMS42MDc0MiA5LjM5MjU4LC0yMSAyMSwtMjFoMTc4LjVjMTEuNjA3NDIsMCAyMSw5LjM5MjU4IDIxLDIxeiIgZmlsbD0iIzE2YTA4NSIvPjxwYXRoIGQ9Ik0xMTYuODMzMDEsMTA1bC0xMS4wOTQ3MywyNC41ODg4N2wtMTEuMDMzMiwtMjQuNTg4ODdoLTE0LjE1MDM5djM1LjMxNDQ2bC0xNS43NzA1MSwtMzUuMzE0NDZoLTExLjkzNTU1bC0xNi4wOTg2MywzNi42NDc0Nmg5LjUzNjEzbDMuNTA2ODQsLTguMTgyNjJoMTguMDI2MzdsMy41ODg4Nyw4LjE4MjYyaDE4LjE5MDQzdi0yNy4yMTM4N2wxMi4wNTg1OSwyNy4yMTM4N2g4LjIwMzEzbDEyLjM0NTcxLC0yNi43NDIxOXYyNi43NDIxOWg5LjA0Mzk0di0zNi42NDc0NnpNNTMuMjE3NzcsMTI1LjU0ODgzbDUuMzczMDQsLTEyLjc5Njg3bDUuNTk4NjQsMTIuNzk2ODh6IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTE5OC44ODQ3NywxMjIuOTIzODNsMTYuMzY1MjMsLTE3LjgyMTI5aC0xMS42NDg0NGwtMTAuNDU4OTgsMTEuMzYxMzNsLTEwLjEzMDg2LC0xMS40NjM4N2gtMzYuMDExNzJ2MzYuNjQ3NDZoMzQuODQyNzdsMTAuOTcxNjgsLTEyLjEyMDEybDEwLjcwNTA4LDEyLjIyMjY2aDExLjYwNzQyek0xNzcuMDY0NDYsMTMzLjk1NzAzaC0yMS4wNDEwMnYtNy4yMzkyNmgyMC4xMzg2N3YtNi45NTIxNWgtMjAuMTM4Njd2LTYuODcwMTJsMjIuMjA5OTYsMC4wNjE1Mmw4LjkwMDM5LDkuOTY2OHoiIGZpbGw9IiNmZmZmZmYiLz48L2c+PC9nPjwvZz48L3N2Zz4=" alt="Amex">\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item no-padding>\n                <ion-input type="text" placeholder="Card Holder"></ion-input>\n              <ion-icon name="person" item-end no-margin></ion-icon> \n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item no-padding>\n                <ion-input placeholder="Card Number" type="number" [(ngModel)]="number" size="20"></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-4>\n              <ion-item no-padding>\n                <ion-select placeholder="MM" [(ngModel)]="card_Month" class="max-width full-width">\n                  <ion-option value="01">01</ion-option>\n                  <ion-option value="02">02</ion-option>\n                  <ion-option value="03">03</ion-option>\n                  <ion-option value="04">04</ion-option>\n                  <ion-option value="05">05</ion-option>\n                  <ion-option value="06">06</ion-option>\n                  <ion-option value="07">07</ion-option>\n                  <ion-option value="08">08</ion-option>\n                  <ion-option value="09">09</ion-option>\n                  <ion-option value="10">10</ion-option>\n                  <ion-option value="11">11</ion-option>\n                  <ion-option value="12">12</ion-option>\n                </ion-select>\n              </ion-item>\n            </ion-col>\n            <ion-col col-4>\n              <ion-item no-padding>\n                <ion-select placeholder="YY" [(ngModel)]="card_Year" class="max-width full-width">\n                  <ion-option value="19">19</ion-option>\n                  <ion-option value="20">20</ion-option>\n                  <ion-option value="21">21</ion-option>\n                  <ion-option value="22">22</ion-option>\n                  <ion-option value="23">23</ion-option>\n                  <ion-option value="24">24</ion-option>\n                </ion-select>\n              </ion-item>\n            </ion-col>\n            <ion-col col-4>\n              <ion-item no-padding>\n                <ion-input placeholder="CVV" type="number" [(ngModel)]="cvv" size="4"></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n\n        <ion-grid *ngSwitchCase="\'paypal\'" padding>\n          <ion-row>\n            <ion-col no-padding text-center>\n              <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA0OCA0OCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij48ZyBpZD0ic3VyZmFjZTEiPjxwYXRoIHN0eWxlPSIgZmlsbDojMTU2NUMwOyIgZD0iTSAxOC42OTkyMTkgMTMuNzY1NjI1IEwgMTguNzAzMTI1IDEzLjc2OTUzMSBDIDE4LjgwODU5NCAxMy4zMjQyMTkgMTkuMTg3NSAxMyAxOS42NjAxNTYgMTMgTCAzMy4xMzI4MTMgMTMgQyAzMy4xNDg0MzggMTMgMzMuMTY0MDYzIDEyLjk5MjE4OCAzMy4xODM1OTQgMTIuOTkyMTg4IEMgMzIuODk0NTMxIDguMjE0ODQ0IDI4Ljg4NjcxOSA2IDI1LjM1MTU2MyA2IEwgMTEuODc4OTA2IDYgQyAxMS40MDIzNDQgNiAxMS4wMjczNDQgNi4zMzU5MzggMTAuOTIxODc1IDYuNzc3MzQ0IEwgMTAuOTE3OTY5IDYuNzczNDM4IEwgNS4wMjczNDQgMzMuODEyNSBMIDUuMDQyOTY5IDMzLjgxMjUgQyA1LjAyNzM0NCAzMy44Nzg5MDYgNS4wMDM5MDYgMzMuOTM3NSA1LjAwMzkwNiAzNC4wMDc4MTMgQyA1LjAwMzkwNiAzNC41NjI1IDUuNDQ5MjE5IDM1IDYuMDAzOTA2IDM1IEwgMTQuMDc0MjE5IDM1IFogIi8+PHBhdGggc3R5bGU9IiBmaWxsOiMwMzlCRTU7IiBkPSJNIDMzLjE4MzU5NCAxMi45OTIxODggQyAzMy4yMzQzNzUgMTMuODcxMDk0IDMzLjE3OTY4OCAxNC44MjQyMTkgMzIuOTUzMTI1IDE1Ljg3NSBDIDMxLjY3MTg3NSAyMS44NzEwOTQgMjcuMDQyOTY5IDI0Ljk5MjE4OCAyMS4zMjAzMTMgMjQuOTkyMTg4IEMgMjEuMzIwMzEzIDI0Ljk5MjE4OCAxNy44NDc2NTYgMjQuOTkyMTg4IDE3LjAwNzgxMyAyNC45OTIxODggQyAxNi40ODQzNzUgMjQuOTkyMTg4IDE2LjIzODI4MSAyNS4yOTY4NzUgMTYuMTI1IDI1LjUzMTI1IEwgMTQuMzg2NzE5IDMzLjU3ODEyNSBMIDE0LjA4MjAzMSAzNS4wMDc4MTMgTCAxNC4wNzQyMTkgMzUuMDA3ODEzIEwgMTIuODEyNSA0MC44MDQ2ODggTCAxMi44MjQyMTkgNDAuODA0Njg4IEMgMTIuODEyNSA0MC44NzEwOTQgMTIuNzg1MTU2IDQwLjkyOTY4OCAxMi43ODUxNTYgNDEgQyAxMi43ODUxNTYgNDEuNTU0Njg4IDEzLjIzNDM3NSA0MiAxMy43ODUxNTYgNDIgTCAyMS4xMTcxODggNDIgTCAyMS4xMzI4MTMgNDEuOTg4MjgxIEMgMjEuNjA1NDY5IDQxLjk4NDM3NSAyMS45ODA0NjkgNDEuNjQ0NTMxIDIyLjA3ODEyNSA0MS4yMDMxMjUgTCAyMi4wOTM3NSA0MS4xODc1IEwgMjMuOTA2MjUgMzIuNzY5NTMxIEMgMjMuOTA2MjUgMzIuNzY5NTMxIDI0LjAzMTI1IDMxLjk2ODc1IDI0Ljg3ODkwNiAzMS45Njg3NSBDIDI1LjcyMjY1NiAzMS45Njg3NSAyOS4wNTQ2ODggMzEuOTY4NzUgMjkuMDU0Njg4IDMxLjk2ODc1IEMgMzQuNzc3MzQ0IDMxLjk2ODc1IDM5LjQ1NzAzMSAyOC44NjMyODEgNDAuNzM4MjgxIDIyLjg2NzE4OCBDIDQyLjE3OTY4OCAxNi4xMDU0NjkgMzcuMzU5Mzc1IDEzLjAxOTUzMSAzMy4xODM1OTQgMTIuOTkyMTg4IFogIi8+PHBhdGggc3R5bGU9IiBmaWxsOiMyODM1OTM7IiBkPSJNIDE5LjY2MDE1NiAxMyBDIDE5LjE4NzUgMTMgMTguODA4NTk0IDEzLjMyNDIxOSAxOC43MDMxMjUgMTMuNzY5NTMxIEwgMTguNjk5MjE5IDEzLjc2NTYyNSBMIDE2LjEyNSAyNS41MzEyNSBDIDE2LjIzODI4MSAyNS4yOTY4NzUgMTYuNDg0Mzc1IDI0Ljk5MjE4OCAxNy4wMDM5MDYgMjQuOTkyMTg4IEMgMTcuODQ3NjU2IDI0Ljk5MjE4OCAyMS4yMzgyODEgMjQuOTkyMTg4IDIxLjIzODI4MSAyNC45OTIxODggQyAyNi45NjQ4NDQgMjQuOTkyMTg4IDMxLjY3MTg3NSAyMS44NzEwOTQgMzIuOTUzMTI1IDE1Ljg3ODkwNiBDIDMzLjE3OTY4OCAxNC44MjQyMTkgMzMuMjM0Mzc1IDEzLjg3MTA5NCAzMy4xODM1OTQgMTIuOTk2MDk0IEMgMzMuMTY0MDYzIDEyLjk5MjE4OCAzMy4xNDg0MzggMTMgMzMuMTMyODEzIDEzIFogIi8+PC9nPjwvc3ZnPg==" alt="paypal">\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item no-padding>\n                <ion-input type="mail" placeholder="E-mail"></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item no-padding>\n                <ion-input placeholder="Password" type="password"></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </div>\n\n    </div>\n\n    <!--submit button\n    <button ion-button class="round" color="primary" margin-top full tappable (click)="saveCard()">Add Payment Source</button>\n\n  </ion-content> -->'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/payment/payment.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__services_trip_service__["a" /* TripService */],
            __WEBPACK_IMPORTED_MODULE_5__ngx_translate_core__["c" /* TranslateService */], __WEBPACK_IMPORTED_MODULE_6__providers_user_user__["a" /* UserProvider */]])
    ], PaymentPage);
    return PaymentPage;
}());

//# sourceMappingURL=payment.js.map

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__ = __webpack_require__(170);
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
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SharePage = (function () {
    function SharePage(navCtrl, navParams, socialSharing, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.socialSharing = socialSharing;
        this.platform = platform;
        this.subject = 'Message from Social Sharing App';
        this.message = 'Take your app development skills to the next level with Mastering Ionic - the definitive guide';
        this.image = 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
        this.uri = 'http://masteringionic2.com/products/product-detail/s/mastering-ionic-2-e-book';
    }
    SharePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SharePage');
    };
    SharePage.prototype.shareViaEmail = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            _this.socialSharing.canShareViaEmail()
                .then(function () {
                _this.socialSharing.shareViaEmail(_this.message, _this.subject, _this.sendTo)
                    .then(function (data) {
                    console.log('Shared via Email');
                })
                    .catch(function (err) {
                    console.log('Not able to be shared via Email');
                });
            })
                .catch(function (err) {
                console.log('Sharing via Email NOT enabled');
            });
        });
    };
    SharePage.prototype.shareViaFacebook = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            _this.socialSharing.canShareVia('com.apple.social.facebook', _this.message, _this.image, _this.uri)
                .then(function (data) {
                _this.socialSharing.shareViaFacebook(_this.message, _this.image, _this.uri)
                    .then(function (data) {
                    console.log('Shared via Facebook');
                })
                    .catch(function (err) {
                    console.log('Was not shared via Facebook');
                });
            })
                .catch(function (err) {
                console.log('Not able to be shared via Facebook');
            });
        });
    };
    SharePage.prototype.shareViaInstagram = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            _this.socialSharing.shareViaInstagram(_this.message, _this.image)
                .then(function (data) {
                console.log('Shared via shareViaInstagram');
            })
                .catch(function (err) {
                console.log('Was not shared via Instagram');
            });
        });
    };
    SharePage.prototype.shareViaTwitter = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            _this.socialSharing.canShareVia('com.apple.social.twitter', _this.message, _this.image, _this.uri)
                .then(function (data) {
                _this.socialSharing.shareViaTwitter(_this.message, _this.image, _this.uri)
                    .then(function (data) {
                    console.log('Shared via Twitter');
                })
                    .catch(function (err) {
                    console.log('Was not shared via Twitter');
                });
            });
        })
            .catch(function (err) {
            console.log('Not able to be shared via Twitter');
        });
    };
    SharePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-share',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/share/share.html"*/'<!-- -->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n            <div class="logoHeader"></div>\n          </ion-col>\n          <ion-col col-4>\n            <strong>Share</strong>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-title>\n    <!--<ion-buttons end>\n      <button ion-button tappable (click)="presentNotifications($event)">\n        <ion-icon name="notifications"></ion-icon>\n      </button>\n      <button ion-button tappable (click)="goToAccount()">\n        <ion-icon name="cog"></ion-icon>\n      </button>\n    </ion-buttons> -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="animated fadeIn common-bg">\n  <ion-list>\n    <ion-item-group class="group">\n       <ion-item-divider color="dark">Share through social media</ion-item-divider>\n       <ion-item>\n          <button\n             class="button"\n             ion-button\n             icon-right\n             block\n             padding-vertical\n             color="facebook"\n             (click)="shareViaFacebook()">\n                Share this via Facebook\n                <ion-icon ios="logo-facebook" md="logo-facebook"></ion-icon>\n          </button>\n       </ion-item>\n\n\n       <ion-item>\n          <button\n             class="button"\n             ion-button\n             icon-right\n             block\n             padding-vertical\n             color="instagram"\n             (click)="shareViaInstagram()">\n                Share this via Instagram\n                <ion-icon ios="logo-instagram" md="logo-instagram"></ion-icon>\n          </button>\n       </ion-item>\n\n\n       <ion-item>\n          <button\n             class="button"\n             ion-button\n             icon-right\n             block\n             padding-vertical\n             color="twitter"\n             (click)="shareViaTwitter()">\n                Share this via Twitter\n                <ion-icon ios="logo-twitter" md="logo-twitter"></ion-icon>\n          </button>\n       </ion-item>\n    </ion-item-group>\n\n\n\n    <ion-item-group class="group">\n       <ion-item-divider color="dark">Share via e-mail</ion-item-divider>\n       <ion-item>\n          <ion-label block>To: </ion-label>\n          <ion-input\n             block\n             type="text"\n             placeholder="E-mail address..."\n             [(ngModel)]="sendTo"></ion-input>\n       </ion-item>\n\n\n\n       <ion-item>\n          <button\n             class="button"\n             ion-button\n             icon-right\n             block\n             padding-vertical\n             color="email"\n             (click)="shareViaEmail()">\n                Share this via Email\n                <ion-icon ios="ios-mail" md="md-mail"></ion-icon>\n          </button>\n       </ion-item>\n    </ion-item-group>\n\n </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/share/share.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */]])
    ], SharePage);
    return SharePage;
}());

//# sourceMappingURL=share.js.map

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SupportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__ = __webpack_require__(170);
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
 * Generated class for the SupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SupportPage = (function () {
    function SupportPage(navCtrl, navParams, callNumber, socialSharing, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.callNumber = callNumber;
        this.socialSharing = socialSharing;
        this.platform = platform;
        this.sendTo = '';
        this.subject = '';
        this.message = '';
    }
    SupportPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SupportPage');
    };
    SupportPage.prototype.sendMail = function () {
        var _this = this;
        this.platform.ready()
            .then(function () {
            _this.socialSharing.canShareViaEmail()
                .then(function () {
                _this.socialSharing.shareViaEmail(_this.message, _this.subject, _this.sendTo)
                    .then(function (data) {
                    console.log('Shared via Email');
                })
                    .catch(function (err) {
                    console.log('Not able to be shared via Email');
                });
            })
                .catch(function (err) {
                console.log('Sharing via Email NOT enabled');
            });
        });
    };
    SupportPage.prototype.makeCall = function () {
        this.callNumber.callNumber("18001010101", true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    SupportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-support',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/support/support.html"*/'<!-- -->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n            <div class="logoHeader"></div>\n          </ion-col>\n          <ion-col col-4>\n            <strong>Support</strong>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-title>\n    <!--<ion-buttons end>\n      <button ion-button tappable (click)="presentNotifications($event)">\n        <ion-icon name="notifications"></ion-icon>\n      </button>\n      <button ion-button tappable (click)="goToAccount()">\n        <ion-icon name="cog"></ion-icon>\n      </button>\n    </ion-buttons> -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="animated fadeIn common-bg">\n  <!--description-->\n  <div class="border-bottom" padding>\n    <span ion-text color="secondary" class="bold headingSection2">Support</span>\n  </div>\n  <div padding class="light-bg">\n    <button ion-button icon-left full color="email" menuClose (click)="sendMail()">\n      <ion-icon name="mail"></ion-icon>\n      Email\n    </button>\n    <button class="marginT-16px" ion-button icon-left full color="instagram" menuClose (click)="makeCall()">\n      <ion-icon name="call"></ion-icon>\n      Call\n    </button>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/support/support.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_call_number__["a" /* CallNumber */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */]])
    ], SupportPage);
    return SupportPage;
}());

//# sourceMappingURL=support.js.map

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_trip_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
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
 * Generated class for the TripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TripsPage = (function () {
    function TripsPage(nav, authService, navParams, alertCtrl, toastCtrl, loadingCtrl, platform, tripService, translate) {
        var _this = this;
        this.nav = nav;
        this.authService = authService;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.tripService = tripService;
        this.translate = translate;
        this.tripCount = 0;
        this.totalSpent = 0;
        this.tabs = 'profile';
        var userx = navParams.get('user');
        this.authService.getUser(userx.uid).take(1).subscribe(function (snapshot) {
            snapshot.uid = snapshot.$key;
            _this.user = snapshot;
            _this.user.isEmailVerified = __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().currentUser.emailVerified;
            console.log(_this.user);
            _this.getTrips();
        });
    }
    TripsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TripsPage');
    };
    TripsPage.prototype.getTrips = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please wait...' });
        loading.present();
        this.tripService.getTrips().take(1).subscribe(function (snapshot) {
            _this.trips = snapshot.reverse();
            loading.dismiss();
        });
    };
    TripsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-trips',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/trips/trips.html"*/'<!-- -->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      <ion-grid>\n        <ion-row>\n          <ion-col col-2>\n            <div class="logoHeader"></div>\n          </ion-col>\n          <ion-col col-4>\n            <strong>Recent Trips</strong>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-title>\n    <!--<ion-buttons end>\n      <button ion-button tappable (click)="presentNotifications($event)">\n        <ion-icon name="notifications"></ion-icon>\n      </button>\n      <button ion-button tappable (click)="goToAccount()">\n        <ion-icon name="cog"></ion-icon>\n      </button>\n    </ion-buttons> -->\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding class="animated fadeIn common-bg">\n\n  <!-- HISTORY Section -->\n  <div padding>\n    <ion-card *ngFor="let trip of trips">\n      <ion-card-content>\n        <p>{{ trip.$key }}</p>\n        <ion-row>\n          <ion-col>\n            <b style="text-align:center">{{\'FROM\' | translate}}</b>\n            <p>{{ trip.origin.vicinity }}\n              <br/>\n              <ion-note>{{ trip.pickedUpAt | amDateFormat: \'YYYY-MM-DD HH:mm\'}}</ion-note>\n            </p>\n          </ion-col>\n          <ion-col>\n            <b style="text-align:center">{{\'TO\' | translate}}</b>\n            <p>{{ trip.destination.vicinity }}\n              <br/>\n              <ion-note>{{ trip.droppedOffAt | amDateFormat: \'YYYY-MM-DD HH:mm\'}}</ion-note>\n            </p>\n          </ion-col>\n        </ion-row>\n        <p>{{\'PAYMENT_MODE\' | translate}}: {{ trip.paymentMethod }}</p>\n        <p>{{\'FEE\' | translate}}: {{trip.currency}} {{trip.fee}} </p>\n          \n      </ion-card-content>\n    </ion-card>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/trips/trips.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__services_trip_service__["a" /* TripService */],
            __WEBPACK_IMPORTED_MODULE_4__ngx_translate_core__["c" /* TranslateService */]])
    ], TripsPage);
    return TripsPage;
}());

//# sourceMappingURL=trips.js.map

/***/ }),

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(562);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createTranslateLoader */
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(884);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_image_loader__ = __webpack_require__(885);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2__ = __webpack_require__(887);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2_database__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular2_moment__ = __webpack_require__(888);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_driver_service__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_place_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_trip_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_setting_service__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_deal_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_auth_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_requests__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_offers__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_zip__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_home_home__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_login_login__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_admin_offers_admin_offers__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_admin_accepted_offers_admin_accepted_offers__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_zips_zips__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_user_requests_user_requests__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_user_offers_user_offers__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_user_make_request_user_make_request__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_payment_method_payment_method__ = __webpack_require__(893);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_places_places__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_register_register__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_tracking_tracking__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_map_map__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_user_user__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_payment_payment__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_trips_trips__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_support_support__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_share_share__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_commission_commission__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_about_about__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_welcome_welcome__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_confirmation_confirmation__ = __webpack_require__(894);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_modal_modal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_call_number__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_native_social_sharing__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50_ionic_img_viewer__ = __webpack_require__(895);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_image_picker__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_native_crop__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__ionic_native_camera__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__angular_common_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__ngx_translate_core__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__ngx_translate_http_loader__ = __webpack_require__(902);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__providers_user_user__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__pages_updatecard_updatecard__ = __webpack_require__(355);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












// Import the AF2 Module



// Import moment module

// import services
































//Import plugins











function createTranslateLoader(http) {
    return new __WEBPACK_IMPORTED_MODULE_56__ngx_translate_http_loader__["a" /* TranslateHttpLoader */](http, './assets/lang/', '.json');
}
var firebaseConfig = {
    // apiKey: "AIzaSyASfN_OVXgjuLbKKv6TKul-1S14joHFzww",
    // authDomain: "ionfiretaxi.firebaseapp.com",
    // databaseURL: "https://ionfiretaxi.firebaseio.com",
    // projectId: "ionfiretaxi",
    // storageBucket: "ionfiretaxi.appspot.com",
    // messagingSenderId: "493104185856"
    apiKey: "AIzaSyC08IhmXMpnFj2yJbsNcA2LqUU6bKo_F3Y",
    authDomain: "yurdriver-55498.firebaseapp.com",
    databaseURL: "https://yurdriver-55498.firebaseio.com",
    projectId: "yurdriver-55498",
    storageBucket: "yurdriver-55498.appspot.com",
    messagingSenderId: "163425583846"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_25__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_admin_offers_admin_offers__["a" /* AdminOffersPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_admin_accepted_offers_admin_accepted_offers__["a" /* AdminAcceptedOffersPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_zips_zips__["a" /* ZipsPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_user_requests_user_requests__["a" /* UserRequestsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_user_offers_user_offers__["a" /* UserOffersPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_user_make_request_user_make_request__["a" /* UserMakeRequestPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_payment_method_payment_method__["a" /* PaymentMethodPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_places_places__["a" /* PlacesPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_tracking_tracking__["a" /* TrackingPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_trips_trips__["a" /* TripsPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_support_support__["a" /* SupportPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_share_share__["a" /* SharePage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_commission_commission__["a" /* CommissionPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_confirmation_confirmation__["a" /* ConfirmationPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_modal_modal__["a" /* ModalPage */],
                __WEBPACK_IMPORTED_MODULE_58__pages_updatecard_updatecard__["a" /* UpdateCard */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_50_ionic_img_viewer__["a" /* IonicImageViewerModule */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_54__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_11_ionic_image_loader__["a" /* IonicImageLoader */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_55__ngx_translate_core__["b" /* TranslateModule */].forRoot({
                    loader: {
                        provide: __WEBPACK_IMPORTED_MODULE_55__ngx_translate_core__["a" /* TranslateLoader */],
                        useFactory: createTranslateLoader,
                        deps: [__WEBPACK_IMPORTED_MODULE_54__angular_common_http__["a" /* HttpClient */]]
                    }
                }),
                __WEBPACK_IMPORTED_MODULE_12_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_13_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_15_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */], {
                    mode: 'md'
                }, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/commission/commission.module#CommissionPageModule', name: 'CommissionPage', segment: 'commission', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal-final-fare/modal-final-fare.module#ModalFinalFarePageModule', name: 'ModalFinalFarePage', segment: 'modal-final-fare', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal-notification/modal-notification.module#ModalNotificationPageModule', name: 'ModalNotificationPage', segment: 'modal-notification', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modal-rating/modal-rating.module#ModalRatingPageModule', name: 'ModalRatingPage', segment: 'modal-rating', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/payment/payment.module#PaymentPageModule', name: 'PaymentPage', segment: 'payment', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/share/share.module#SharePageModule', name: 'SharePage', segment: 'share', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/support/support.module#SupportPageModule', name: 'SupportPage', segment: 'support', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/trips/trips.module#TripsPageModule', name: 'TripsPage', segment: 'trips', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_25__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_admin_offers_admin_offers__["a" /* AdminOffersPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_admin_accepted_offers_admin_accepted_offers__["a" /* AdminAcceptedOffersPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_zips_zips__["a" /* ZipsPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_user_requests_user_requests__["a" /* UserRequestsPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_user_offers_user_offers__["a" /* UserOffersPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_user_make_request_user_make_request__["a" /* UserMakeRequestPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_payment_method_payment_method__["a" /* PaymentMethodPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_places_places__["a" /* PlacesPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_tracking_tracking__["a" /* TrackingPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_user_user__["a" /* UserPage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_payment_payment__["a" /* PaymentPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_trips_trips__["a" /* TripsPage */],
                __WEBPACK_IMPORTED_MODULE_58__pages_updatecard_updatecard__["a" /* UpdateCard */],
                __WEBPACK_IMPORTED_MODULE_41__pages_support_support__["a" /* SupportPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_share_share__["a" /* SharePage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_commission_commission__["a" /* CommissionPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_confirmation_confirmation__["a" /* ConfirmationPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_modal_modal__["a" /* ModalPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__["a" /* BackgroundMode */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_16__services_driver_service__["a" /* DriverService */],
                __WEBPACK_IMPORTED_MODULE_17__services_place_service__["a" /* PlaceService */],
                __WEBPACK_IMPORTED_MODULE_18__services_trip_service__["a" /* TripService */],
                __WEBPACK_IMPORTED_MODULE_19__services_setting_service__["a" /* SettingService */],
                __WEBPACK_IMPORTED_MODULE_20__services_deal_service__["a" /* DealService */],
                __WEBPACK_IMPORTED_MODULE_21__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_48__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_49__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_22__services_requests__["a" /* Requests */],
                __WEBPACK_IMPORTED_MODULE_23__services_offers__["a" /* Offers */],
                __WEBPACK_IMPORTED_MODULE_24__services_zip__["a" /* Zips */],
                __WEBPACK_IMPORTED_MODULE_51__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_52__ionic_native_crop__["a" /* Crop */],
                __WEBPACK_IMPORTED_MODULE_53__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_57__providers_user_user__["a" /* UserProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_requests__ = __webpack_require__(52);
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
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModalPage = (function () {
    function ModalPage(userService, navCtrl, alertCtrl, loadingCtrl, navParams, viewCtrl, platform, requestService) {
        this.userService = userService;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.platform = platform;
        this.requestService = requestService;
        this.slidesPerView = 2;
        this.requestModal = false;
        this.images = [];
        this.imgloaded = [];
        this.loadingAnimation = './assets/img/loading-animation.gif';
        if (navParams.get('reqID')) {
            this.requestModal = true;
            this.requests = JSON.parse(localStorage.getItem('requests'));
            this.reqID = navParams.get('reqID');
            for (var i = 0; i < this.requests.length; i++) {
                if (this.reqID == this.requests[i]['requestId']) {
                    this.request = this.requests[i];
                    break;
                }
            }
            this.get_Request_Images();
            console.log("reqID", this.reqID);
        }
        else if (navParams.get('accepted_offerID')) {
            this.requestModal = false;
            this.offers = JSON.parse(localStorage.getItem('accepted_offers'));
            this.offerID = navParams.get('accepted_offerID');
            for (var i = 0; i < this.offers.length; i++) {
                if (this.offerID == this.offers[i]['offerId']) {
                    this.offer = this.offers[i];
                    this.reqID = this.offer['requestId'];
                    break;
                }
            }
            this.get_Request_Images();
            console.log("offer", this.offer);
        }
        else {
            this.requestModal = false;
            this.offers = JSON.parse(localStorage.getItem('offers'));
            this.offerID = navParams.get('offerID');
            console.log("offers: ", this.offers);
            console.log("offerID: ", this.offerID);
            for (var i = 0; i < this.offers.length; i++) {
                if (this.offerID == this.offers[i]['offerId']) {
                    this.offer = this.offers[i];
                    this.reqID = this.offer['requestId'];
                    break;
                }
            }
            this.get_Request_Images();
            console.log("offer", this.offer);
        }
    }
    ModalPage.prototype.get_Request_Images = function () {
        var _this = this;
        this.showLoading('Getting Details of Request');
        // Get Request Images
        this.requestService.get_Request_Images(this.reqID).then(function (result) {
            var countImages = 0;
            for (var key in result) {
                var value = result[key];
                console.log("value: ", value);
                _this.images.push(__WEBPACK_IMPORTED_MODULE_3__services_constants__["i" /* IMG_URL */] + '' + value['img']);
                countImages++;
            }
            if (countImages == 1)
                _this.slidesPerView = 1;
            _this.hideLoading();
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    };
    ModalPage.prototype.ionViewDidLoad = function () {
        console.log('Screen Width is: ', this.platform.width());
        // On a desktop, and is wider than 1200px
        if (this.platform.width() > 1200) {
            this.slidesPerView = 5;
        }
        else if (this.platform.width() > 768) {
            this.slidesPerView = 4;
        }
        else if (this.platform.width() > 400) {
            this.slidesPerView = 2;
        }
        else if (this.platform.width() > 319) {
            this.slidesPerView = 2;
        }
    };
    ModalPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss({ "foo": "bar" });
    };
    ModalPage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.present();
    };
    ModalPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    ModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-modal',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/modal/modal.html"*/'<ion-content class="main-view" *ngIf="requestModal">\n    <div class="overlay" (click)="dismiss()"></div>\n\n    <div class="modal_content" style="overflow:auto">\n\n        <ion-title>\n            <ion-grid>\n                <ion-row class="header-class">\n                    <ion-col text-center>\n                        <strong class="list_header">Request</strong>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-title>\n\n\n        <ion-slides [slidesPerView]="slidesPerView" class="image-slider">\n            <ion-slide *ngFor="let img of images">\n                <img *ngIf="!imgloaded[i]" src="{{ loadingAnimation }}" class="thumb-img" />\n                <img [hidden]="!imgloaded[i]" (load)="imgloaded[i] = true" src="{{ img }}" class="thumb-img" imageViewer/>\n\n                <!-- <img *ngIf="!loaded" src="{{ loadingAnimation }}" class="thumb-img" />\n                <img [hidden]="!loaded" (load)="loaded = true" src="{{ img }}" class="thumb-img" imageViewer/> -->\n                <!-- <img src="{{ img || loadingAnimation }}" alt="" class="thumb-img" imageViewer> -->\n            </ion-slide>\n        </ion-slides>\n\n        <ion-list no-border>\n            <ion-list-header color="light">\n                <strong class="list_header" item-start>Request User</strong>\n            </ion-list-header>\n\n            <ion-item>\n                <ion-icon name=\'person\' color="primary" item-start></ion-icon>\n                {{ request.name }}\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name=\'mail\' color="primary" item-start></ion-icon>\n                {{ request.email }}\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name=\'call\' color="primary" item-start></ion-icon>\n                {{ request.phone }}\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name=\'ios-pin\' color="primary" item-start></ion-icon>\n                {{ request.address }}\n            </ion-item>\n        </ion-list>\n\n        <ion-list no-border>\n            <ion-list-header color="light">\n                <strong class="list_header" item-start>Request Details</strong>\n            </ion-list-header>\n\n            <ion-item>\n                <ion-row>\n                    <ion-col col-6 text-left>\n                        <strong>Category Name</strong>\n                    </ion-col>\n\n                    <ion-col col-6 text-right>\n                        {{ request.cat_name }}\n                    </ion-col>\n                </ion-row>\n            </ion-item>\n\n            <ion-item>\n                <ion-row>\n                    <ion-col col-6 text-left>\n                        <strong>Expected Completion Time</strong>\n                    </ion-col>\n\n                    <ion-col col-6 text-right>\n                        {{ request.ect }}\n                    </ion-col>\n                </ion-row>\n            </ion-item>\n\n            <!-- <ion-item>\n                <ion-row>\n                    <ion-col col-6 text-left>\n                        <strong>Status of Job</strong>\n                    </ion-col>\n\n                    <ion-col col-6 text-right>\n                        {{ request.soj }}\n                    </ion-col>\n                </ion-row>\n            </ion-item> -->\n\n            <ion-item>\n                <ion-row>\n                    <ion-col col-6 text-left>\n                        <strong>Description</strong>\n                    </ion-col>\n\n                    <ion-col col-6 text-right>\n                        {{ request.description }}\n                    </ion-col>\n                </ion-row>\n            </ion-item>\n\n        </ion-list>\n\n        <button ion-button block (click)="dismiss()">Dismiss</button>\n    </div>\n</ion-content>\n\n<!-- Show Offer Modal Content -->\n<ion-content class="main-view" *ngIf="!requestModal">\n    <div class="overlay" (click)="dismiss()"></div>\n\n    <div class="modal_content" style="overflow:auto">\n\n        <ion-title>\n            <ion-grid>\n                <ion-row class="header-class">\n                    <ion-col text-center>\n                        <strong class="list_header">Offer Details</strong>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-title>\n\n\n        <ion-slides [slidesPerView]="slidesPerView" class="image-slider">\n            <ion-slide *ngFor="let img of images">\n                <img *ngIf="!imgloaded[i]" src="{{ loadingAnimation }}" class="thumb-img" />\n                <img [hidden]="!imgloaded[i]" (load)="imgloaded[i] = true" src="{{ img }}" class="thumb-img" imageViewer/>\n                <!-- <img *ngIf="!loaded" src="{{ loadingAnimation }}" class="thumb-img" />\n                <img [hidden]="!loaded" (load)="loaded = true" src="{{ img }}" class="thumb-img" imageViewer/> -->\n                <!-- <img src="{{ img || loadingAnimation }}" alt="" class="thumb-img" imageViewer> -->\n            </ion-slide>\n        </ion-slides>\n\n        <ion-list no-border>\n            <ion-list-header color="light">\n                <strong class="list_header" item-start>Request User</strong>\n            </ion-list-header>\n\n            <ion-item>\n                <ion-icon name=\'person\' color="primary" item-start></ion-icon>\n                {{ offer.name }}\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name=\'mail\' color="primary" item-start></ion-icon>\n                {{ offer.email }}\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name=\'call\' color="primary" item-start></ion-icon>\n                {{ offer.phone }}\n            </ion-item>\n\n            <ion-item>\n                <ion-icon name=\'ios-pin\' color="primary" item-start></ion-icon>\n                {{ offer.address }}\n            </ion-item>\n        </ion-list>\n\n        <ion-list no-border>\n            <ion-list-header color="light">\n                <strong class="list_header" item-start>Request Details</strong>\n            </ion-list-header>\n\n            <ion-item>\n                <ion-row>\n                    <ion-col col-6 text-left>\n                        <strong>Category Name</strong>\n                    </ion-col>\n\n                    <ion-col col-6 text-right>\n                        {{ offer.cat_name }}\n                    </ion-col>\n                </ion-row>\n            </ion-item>\n\n            <ion-item>\n                <ion-row>\n                    <ion-col col-6 text-left>\n                        <strong>Expected Completion Time</strong>\n                    </ion-col>\n\n                    <ion-col col-6 text-right>\n                        {{ offer.ect }}\n                    </ion-col>\n                </ion-row>\n            </ion-item>\n\n            <!-- <ion-item>\n                <ion-row>\n                    <ion-col col-6 text-left>\n                        <strong>Status of Job</strong>\n                    </ion-col>\n\n                    <ion-col col-6 text-right>\n                        {{ offer.soj }}\n                    </ion-col>\n                </ion-row>\n            </ion-item> -->\n\n            <ion-item>\n                <ion-row>\n                    <ion-col col-6 text-left>\n                        <strong>Description</strong>\n                    </ion-col>\n\n                    <ion-col col-6 text-right>\n                        {{ offer.description }}\n                    </ion-col>\n                </ion-row>\n            </ion-item>\n\n        </ion-list>\n\n        <ion-list no-border>\n            <ion-list-header color="light">\n                <strong class="list_header" item-start>Offer Details</strong>\n            </ion-list-header>\n\n            <ion-item>\n                <ion-row>\n                    <ion-col col-6 text-left>\n                        <strong>Offered Price</strong>\n                    </ion-col>\n\n                    <ion-col col-6 text-right>\n                        {{ offer.price }}\n                    </ion-col>\n                </ion-row>\n            </ion-item>\n\n            <ion-item>\n                <ion-row>\n                    <ion-col col-6 text-left>\n                        <strong>Offer Description</strong>\n                    </ion-col>\n\n                    <ion-col col-6 text-right>\n                        {{ offer.offer_description }}\n                    </ion-col>\n                </ion-row>\n            </ion-item>\n\n\n        </ion-list>\n\n        <button ion-button block (click)="dismiss()">Dismiss</button>\n    </div>\n</ion-content>\n<!-- <ion-footer transparent>\n    <ion-toolbar transparent>\n        <button ion-button full (click)="dismiss()">OK</button>\n    </ion-toolbar>\n</ion-footer> -->\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/modal/modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["x" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__services_requests__["a" /* Requests */]])
    ], ModalPage);
    return ModalPage;
}());

//# sourceMappingURL=modal.js.map

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Place; });
var Place = (function () {
    function Place(vicinity, lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this.vicinity = vicinity;
    }
    // get place object with formatted data
    Place.prototype.getFormatted = function () {
        return {
            location: {
                lat: this.lat,
                lng: this.lng
            },
            vicinity: this.vicinity
        };
    };
    return Place;
}());

//# sourceMappingURL=place.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Offers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the Offers service.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var Offers = (function () {
    function Offers(http) {
        this.http = http;
        this.apiUrl = __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* API_URL */];
        console.log('Hello Offers Provider');
    }
    Offers.prototype.get_Offers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/offer.php?action=get_Offers')
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Offers.prototype.get_accepted_offers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/offer.php?action=get_accepted_offers')
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Offers.prototype.send_Offer = function (reqID, price, desc) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/offer.php?action=add_offer&reqID=' + reqID + '&price=' + price + '&desc=' + desc)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Offers.prototype.update_Offer = function (offerID, price) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/offer.php?action=update_Offer&offerID=' + offerID + '&price=' + price)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Offers.prototype.update_accepted_Offer_Status = function (offerID, status) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/offer.php?action=update_accepted_Offer_Status&offerID=' + offerID + '&status=' + status)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Offers.prototype.get_Request_Images = function (reqID) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.get(_this.apiUrl + '/request.php?action=get_Request_Images&reqID=' + reqID)
                .subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Offers.prototype.signup = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log(data);
            var urlParam = 'firstName=' + encodeURI(data.fname) + '&lastName=' + encodeURI(data.lname) + '&email=' + encodeURI(data.email) + '&password=' + encodeURI(data.password) + '&userType=' + encodeURI(data.type) + '&phone=' + encodeURI(data.phone) + '&referralCode=' + encodeURI(data.referal);
            console.log(_this.apiUrl + '/SignUp?' + urlParam);
            _this.http.post(_this.apiUrl + '/SignUp?' + urlParam, JSON.stringify(data))
                .subscribe(function (res) {
                console.log(res);
                resolve(res);
            }, function (err) {
                reject(err);
            });
        });
    };
    Offers = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], Offers);
    return Offers;
}());

//# sourceMappingURL=offers.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(409);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlaceService = (function () {
    function PlaceService(http) {
        this.http = http;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_2__constants__["h" /* GOOGLE_MAP_BASE_URL */];
        this.apiKey = __WEBPACK_IMPORTED_MODULE_2__constants__["g" /* GOOGLE_MAP_API_KEY */];
    }
    // search by address
    PlaceService.prototype.searchByAddress = function (address, lat, lng) {
        var url = this.baseUrl + 'place/nearbysearch/json?key=' + this.apiKey
            + '&keyword=' + encodeURI(address)
            + '&location=' + lat + ',' + lng
            + '&radius=50000';
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    // get direction between to points
    PlaceService.prototype.getDirection = function (lat1, lon1, lat2, lon2) {
        var url = this.baseUrl + 'directions/json?'
            + 'origin=' + lat1 + ',' + lon1
            + '&destination=' + lat2 + ',' + lon2;
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    PlaceService.prototype.calcCrow = function (lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    // Converts numeric degrees to radians
    PlaceService.prototype.toRad = function (value) {
        return value * Math.PI / 180;
    };
    /**
     * Convert geocoder address to place object
     * @param address: Geocoder address result
     * @returns {{location: {lat: any, lng: any}, vicinity: string}}
     */
    PlaceService.prototype.formatAddress = function (address) {
        console.log(address);
        var components = address.address_components;
        var vicinity = components[0].short_name + ', ' + components[1].short_name;
        return {
            location: {
                lat: address.geometry.location.lat(),
                lng: address.geometry.location.lng()
            },
            vicinity: vicinity
        };
    };
    // set locality from geocoder result
    // @param results: Geocoder array results
    PlaceService.prototype.setLocalityFromGeocoder = function (results) {
        var component;
        var address;
        for (var i = 0; i < results.length; i++) {
            address = results[i];
            for (var j = 0; j < address.address_components.length; j++) {
                component = address.address_components[j];
                // if (component.types[0] == 'administrative_area_level_2') {
                if (component.types[0] == 'locality') {
                    // escape firebase characters
                    var locality = component.short_name.replace(/[\%\.\#\$\/\[\]]/, '_');
                    this.setLocality(locality);
                    return locality;
                }
            }
        }
        return false;
    };
    PlaceService.prototype.setLocality = function (locality) {
        return this.locality = locality;
    };
    PlaceService.prototype.getLocality = function () {
        return this.locality;
    };
    PlaceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], PlaceService);
    return PlaceService;
}());

//# sourceMappingURL=place-service.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modal_modal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_requests__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_offers__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HomePage = (function () {
    function HomePage(nav, platform, alertCtrl, requestService, geolocation, loadingCtrl, translate, elRef, toastCtrl, navParams, localNotifications, modalCtrl, offerService) {
        var _this = this;
        this.nav = nav;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.requestService = requestService;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.translate = translate;
        this.elRef = elRef;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.localNotifications = localNotifications;
        this.modalCtrl = modalCtrl;
        this.offerService = offerService;
        this.USER_IMG_URL = __WEBPACK_IMPORTED_MODULE_5__services_constants__["n" /* USER_IMG_URL */];
        this.imgloaded = [];
        this.loadingAnimation = './assets/img/loading-animation.gif';
        // this.translate.setDefaultLang('en');
        this.user = JSON.parse(localStorage.getItem('userData'));
        var loading = this.loadingCtrl.create({ content: 'Getting Requests...' });
        loading.present();
        // Get Requests for Admin
        this.requestService.get_Requests().then(function (result) {
            loading.dismiss();
            _this.requests = result;
            for (var i = 0; i < _this.requests.length; i++) {
                _this.requests[i]['img'] = __WEBPACK_IMPORTED_MODULE_5__services_constants__["i" /* IMG_URL */] + '' + _this.requests[i]['img'];
            }
            localStorage.setItem('requests', JSON.stringify(_this.requests));
            console.log('this.requests: ', _this.requests);
        }, function (err) {
            loading.dismiss();
            console.log(err);
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.ionViewWillLeave = function () {
    };
    // Push Notification
    HomePage.prototype.singlenotification = function (id, title, text) {
        this.localNotifications.schedule({
            id: id,
            title: title,
            text: text
        });
    };
    // Show note popup when click to 'Submit Offer'
    HomePage.prototype.showNotePopup = function (reqID) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Submit Offer',
            message: "",
            inputs: [
                {
                    name: 'price',
                    placeholder: 'Price to Offer'
                },
                {
                    name: 'description',
                    placeholder: 'Description'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    cssClass: 'CancelCss',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send',
                    cssClass: 'SendCss',
                    handler: function (data) {
                        _this.send_Offer(reqID, data['price'], data['description']);
                    }
                }
            ]
        });
        prompt.present();
    };
    ;
    HomePage.prototype.send_Offer = function (reqID, price, desc) {
        var _this = this;
        // Send Admin Offer
        this.showLoading('Sending Offer...');
        this.offerService.send_Offer(reqID, price, desc).then(function (result) {
            if (result) {
                for (var i = 0; i < _this.requests.length; i++) {
                    if (reqID == _this.requests[i]['requestId']) {
                        _this.requests.splice(i, 1);
                        break;
                    }
                }
            }
            _this.showToast('Offer Sent');
            _this.hideLoading();
        }, function (err) {
            _this.hideLoading();
            console.log(err);
        });
    };
    HomePage.prototype.showLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.present();
    };
    HomePage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    HomePage.prototype.showToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'top'
        });
        toast.present();
    };
    HomePage.prototype.showAlert = function (title, mesasge) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: mesasge,
            buttons: ['OK']
        });
        alert.present();
    };
    HomePage.prototype.viewDetails = function (requestID) {
        console.log("requestID: ", requestID);
        var Modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__modal_modal__["a" /* ModalPage */], { reqID: requestID });
        Modal.present();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/home/home.html"*/'<ion-header>\n    <ion-navbar color="primary">\n        <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n        </button>\n\n        <ion-title>\n            <ion-grid>\n                <ion-row class="header-class">\n                    <ion-col col-2>\n                        <!-- <div class="logoHeader"></div> -->\n                    </ion-col>\n                    <ion-col col-6>\n                        <strong>Requests</strong>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n            <!-- <strong>Requests</strong> -->\n        </ion-title>\n\n    </ion-navbar>\n</ion-header>\n\n<ion-content class="cards-bg social-cards">\n\n    <ion-card *ngFor="let i = index; let request of requests" id="card-{{request.requestId}}">\n\n        <ion-item>\n            <ion-avatar item-start>\n                <img src="{{ USER_IMG_URL + request.image }}">\n            </ion-avatar>\n            <h2>{{ request.name }}</h2>\n            <ion-note>{{ request.email }}</ion-note>\n        </ion-item>\n\n        <img *ngIf="!imgloaded[i]" src="{{ loadingAnimation }}" />\n        <img [hidden]="!imgloaded[i]" (load)="imgloaded[i] = true" src="{{ request.img }}" />\n        <!-- <img src="{{ request.img || loadingAnimation }}"> -->\n\n        <ion-card-content>\n            <p><strong>Category:</strong> {{ request.cat_name }}</p>\n            <p><strong>Description:</strong> {{ request.description }}</p>\n            <ion-note>\n                Expected Completion Time: {{ request.ect }}\n            </ion-note>\n        </ion-card-content>\n\n        <ion-row>\n            <ion-col text-center>\n                <button ion-button color="danger" clear small icon-start (click)="viewDetails(request.requestId)">\n                  <ion-icon name=\'ios-bookmark\'></ion-icon>\n                  View Details\n                </button>\n            </ion-col>\n            <ion-col text-center>\n                <button ion-button color="instagram" clear small icon-start (click)="showNotePopup(request.requestId)">\n                  <ion-icon name=\'ios-pricetag\'></ion-icon>\n                  Make Offer\n                </button>\n            </ion-col>\n            <!-- <ion-col align-self-center text-center>\n                <ion-note>\n                    {{ request.ect }}\n                </ion-note>\n            </ion-col> -->\n        </ion-row>\n\n    </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__services_requests__["a" /* Requests */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_9__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["v" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */], __WEBPACK_IMPORTED_MODULE_8__services_offers__["a" /* Offers */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 884:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_background_mode__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_admin_offers_admin_offers__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_admin_accepted_offers_admin_accepted_offers__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_zips_zips__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_user_requests_user_requests__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_user_offers_user_offers__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_user_make_request_user_make_request__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_user_user__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_welcome_welcome__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth_auth__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_constants__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth, authService, alertCtrl, translate, modalCtrl, geo, backgroundMode, events) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.afAuth = afAuth;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.translate = translate;
        this.modalCtrl = modalCtrl;
        this.geo = geo;
        this.backgroundMode = backgroundMode;
        this.events = events;
        this.name = '';
        this.email = '';
        // public user: any = { photoURL: 'http://placehold.it/50x50' }; //setting default image, if user dont have images
        // public user     : any;
        this.user = { name: '', email: '' };
        this.userPic = '';
        // public keyboard: Keyboard
        this.translate.setDefaultLang('en');
        this.translate.use('en');
        // this.platform.ready().then(() => {
        //   // Here I'm using the keyboard class from ionic native.
        //   Keyboard.disableScroll(true)
        //   StatusBar.styleDefault();
        // });
        this.appMenuItems = [];
        this.initializeApp();
        events.subscribe('user:updated', function (user, time) {
            // user and time are the same arguments passed in `events.publish(user, time)`
            console.log('Welcome', user, 'at', time);
            // Update User
            _this.user = JSON.parse(localStorage.getItem('userData'));
            _this.name = _this.user.name;
            _this.email = _this.user.email;
            _this.userPic = __WEBPACK_IMPORTED_MODULE_18__services_constants__["n" /* USER_IMG_URL */] + _this.user.image;
            _this.setAppMenu();
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.backgroundMode.enable();
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            // this.keyboard.disableScroll(true)
            // // let status bar overlay webview
            // this.statusBar.overlaysWebView(true);
            //
            // // set status bar to white
            // this.statusBar.backgroundColorByHexString('#ffffff');
            // check for login stage, then redirect
            _this.user = JSON.parse(localStorage.getItem('userData'));
            console.log("this.user: ", _this.user);
            if (_this.user != null) {
                _this.name = _this.user.name.toUpperCase();
                _this.email = _this.user.email;
                _this.userPic = __WEBPACK_IMPORTED_MODULE_18__services_constants__["n" /* USER_IMG_URL */] + _this.user.image;
                _this.setAppMenu();
            }
            else {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_13__pages_welcome_welcome__["a" /* WelcomePage */]);
            }
        });
    };
    MyApp.prototype.setAppMenu = function () {
        if (this.user.isAdmin == '1') {
            console.log("isAdmin");
            this.appMenuItems = [
                { title: 'Recent Requests', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */], icon: 'ios-list-outline' },
                { title: 'Recent Offers', component: __WEBPACK_IMPORTED_MODULE_6__pages_admin_offers_admin_offers__["a" /* AdminOffersPage */], icon: 'ios-pricetag-outline' },
                { title: 'Accepted Offers', component: __WEBPACK_IMPORTED_MODULE_7__pages_admin_accepted_offers_admin_accepted_offers__["a" /* AdminAcceptedOffersPage */], icon: 'ios-checkmark-circle-outline' },
                { title: 'Mannage Zips', component: __WEBPACK_IMPORTED_MODULE_8__pages_zips_zips__["a" /* ZipsPage */], icon: 'ios-navigate-outline' },
                { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_12__pages_user_user__["a" /* UserPage */], icon: 'ios-contact-outline' },
            ];
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]);
        }
        else {
            console.log("is Not Admin");
            this.appMenuItems = [
                { title: 'Make Requests', component: __WEBPACK_IMPORTED_MODULE_11__pages_user_make_request_user_make_request__["a" /* UserMakeRequestPage */], icon: 'logo-buffer' },
                { title: 'Recent Requests', component: __WEBPACK_IMPORTED_MODULE_9__pages_user_requests_user_requests__["a" /* UserRequestsPage */], icon: 'ios-list-outline' },
                { title: 'Accepted Offers', component: __WEBPACK_IMPORTED_MODULE_10__pages_user_offers_user_offers__["a" /* UserOffersPage */], icon: 'ios-pricetag-outline' },
                // { title: 'Accepted Offers', component: AdminAcceptedOffersPage, icon: 'ios-checkmark-circle-outline'},
                // { title: 'Mannage Zips', component: ZipsPage, icon: 'ios-navigate-outline'},
                { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_12__pages_user_user__["a" /* UserPage */], icon: 'ios-contact-outline' },
            ];
            this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_9__pages_user_requests_user_requests__["a" /* UserRequestsPage */]);
        }
    };
    // view current user profile
    MyApp.prototype.viewProfile = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_12__pages_user_user__["a" /* UserPage */], {
            user: this.user
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.title == 'Map') {
            this.nav.push(page.component, {
                type: 'Destination'
            });
        }
        else {
            // this.nav.push(page.component, {
            //   user: this.user
            // });
            this.nav.setRoot(page.component, {
                user: this.user
            });
        }
    };
    MyApp.prototype.logout = function () {
        // this.authService.logout().then(() => {
        //   this.nav.setRoot(WelcomePage);
        //   // this.nav.setRoot(LoginPage);
        // });
        localStorage.clear();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_13__pages_welcome_welcome__["a" /* WelcomePage */]);
        // this.nav.setRoot(LoginPage);
    };
    MyApp.prototype.editprofile = function () {
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/app/app.html"*/'<!--Material Design Menu-->\n<ion-menu [content]="content" side="left" id="menu-material">\n    <ion-content>\n        <div class="menu-header">\n            <!--material-design-background-->\n            <img class="user-avatar round" style="height:90px; width:90px;" [src]="userPic" />\n            <div style="background:rgba(0, 0, 0, 0.47058823529411764); width: 100%">\n                <p class="name">{{ name }}</p>\n                <p class="e-mail">{{ email }}</p>\n            </div>\n        </div>\n        <ion-list>\n            <button menuClose="left" ion-item detail-none *ngFor="let menuItem of appMenuItems" (click)="openPage(menuItem)">\n              <ion-icon [name]="menuItem.icon" item-left></ion-icon>\n              {{menuItem.title}}\n            </button>\n        </ion-list>\n    </ion-content>\n\n    <ion-footer transparent>\n        <ion-toolbar transparent>\n            <button ion-item menuClose class="text-1x" menuClose (click)="logout()">\n                <ion-icon name="ios-log-out" item-left></ion-icon>\n                Log Out\n            </button>\n        </ion-toolbar>\n    </ion-footer>\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n<!-- <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav> -->'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/app/app.html"*/,
            queries: {
                nav: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('content')
            }
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth_auth__["a" /* AngularFireAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core__["c" /* TranslateService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_16__ngx_translate_core__["c" /* TranslateService */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__["a" /* Geolocation */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_17__ionic_native_geolocation__["a" /* Geolocation */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_background_mode__["a" /* BackgroundMode */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_background_mode__["a" /* BackgroundMode */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Events */]) === "function" && _l || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 412,
	"./af.js": 412,
	"./ar": 413,
	"./ar-dz": 414,
	"./ar-dz.js": 414,
	"./ar-kw": 415,
	"./ar-kw.js": 415,
	"./ar-ly": 416,
	"./ar-ly.js": 416,
	"./ar-ma": 417,
	"./ar-ma.js": 417,
	"./ar-sa": 418,
	"./ar-sa.js": 418,
	"./ar-tn": 419,
	"./ar-tn.js": 419,
	"./ar.js": 413,
	"./az": 420,
	"./az.js": 420,
	"./be": 421,
	"./be.js": 421,
	"./bg": 422,
	"./bg.js": 422,
	"./bm": 423,
	"./bm.js": 423,
	"./bn": 424,
	"./bn.js": 424,
	"./bo": 425,
	"./bo.js": 425,
	"./br": 426,
	"./br.js": 426,
	"./bs": 427,
	"./bs.js": 427,
	"./ca": 428,
	"./ca.js": 428,
	"./cs": 429,
	"./cs.js": 429,
	"./cv": 430,
	"./cv.js": 430,
	"./cy": 431,
	"./cy.js": 431,
	"./da": 432,
	"./da.js": 432,
	"./de": 433,
	"./de-at": 434,
	"./de-at.js": 434,
	"./de-ch": 435,
	"./de-ch.js": 435,
	"./de.js": 433,
	"./dv": 436,
	"./dv.js": 436,
	"./el": 437,
	"./el.js": 437,
	"./en-au": 438,
	"./en-au.js": 438,
	"./en-ca": 439,
	"./en-ca.js": 439,
	"./en-gb": 440,
	"./en-gb.js": 440,
	"./en-ie": 441,
	"./en-ie.js": 441,
	"./en-il": 442,
	"./en-il.js": 442,
	"./en-nz": 443,
	"./en-nz.js": 443,
	"./eo": 444,
	"./eo.js": 444,
	"./es": 445,
	"./es-do": 446,
	"./es-do.js": 446,
	"./es-us": 447,
	"./es-us.js": 447,
	"./es.js": 445,
	"./et": 448,
	"./et.js": 448,
	"./eu": 449,
	"./eu.js": 449,
	"./fa": 450,
	"./fa.js": 450,
	"./fi": 451,
	"./fi.js": 451,
	"./fo": 452,
	"./fo.js": 452,
	"./fr": 453,
	"./fr-ca": 454,
	"./fr-ca.js": 454,
	"./fr-ch": 455,
	"./fr-ch.js": 455,
	"./fr.js": 453,
	"./fy": 456,
	"./fy.js": 456,
	"./gd": 457,
	"./gd.js": 457,
	"./gl": 458,
	"./gl.js": 458,
	"./gom-latn": 459,
	"./gom-latn.js": 459,
	"./gu": 460,
	"./gu.js": 460,
	"./he": 461,
	"./he.js": 461,
	"./hi": 462,
	"./hi.js": 462,
	"./hr": 463,
	"./hr.js": 463,
	"./hu": 464,
	"./hu.js": 464,
	"./hy-am": 465,
	"./hy-am.js": 465,
	"./id": 466,
	"./id.js": 466,
	"./is": 467,
	"./is.js": 467,
	"./it": 468,
	"./it.js": 468,
	"./ja": 469,
	"./ja.js": 469,
	"./jv": 470,
	"./jv.js": 470,
	"./ka": 471,
	"./ka.js": 471,
	"./kk": 472,
	"./kk.js": 472,
	"./km": 473,
	"./km.js": 473,
	"./kn": 474,
	"./kn.js": 474,
	"./ko": 475,
	"./ko.js": 475,
	"./ky": 476,
	"./ky.js": 476,
	"./lb": 477,
	"./lb.js": 477,
	"./lo": 478,
	"./lo.js": 478,
	"./lt": 479,
	"./lt.js": 479,
	"./lv": 480,
	"./lv.js": 480,
	"./me": 481,
	"./me.js": 481,
	"./mi": 482,
	"./mi.js": 482,
	"./mk": 483,
	"./mk.js": 483,
	"./ml": 484,
	"./ml.js": 484,
	"./mn": 485,
	"./mn.js": 485,
	"./mr": 486,
	"./mr.js": 486,
	"./ms": 487,
	"./ms-my": 488,
	"./ms-my.js": 488,
	"./ms.js": 487,
	"./mt": 489,
	"./mt.js": 489,
	"./my": 490,
	"./my.js": 490,
	"./nb": 491,
	"./nb.js": 491,
	"./ne": 492,
	"./ne.js": 492,
	"./nl": 493,
	"./nl-be": 494,
	"./nl-be.js": 494,
	"./nl.js": 493,
	"./nn": 495,
	"./nn.js": 495,
	"./pa-in": 496,
	"./pa-in.js": 496,
	"./pl": 497,
	"./pl.js": 497,
	"./pt": 498,
	"./pt-br": 499,
	"./pt-br.js": 499,
	"./pt.js": 498,
	"./ro": 500,
	"./ro.js": 500,
	"./ru": 501,
	"./ru.js": 501,
	"./sd": 502,
	"./sd.js": 502,
	"./se": 503,
	"./se.js": 503,
	"./si": 504,
	"./si.js": 504,
	"./sk": 505,
	"./sk.js": 505,
	"./sl": 506,
	"./sl.js": 506,
	"./sq": 507,
	"./sq.js": 507,
	"./sr": 508,
	"./sr-cyrl": 509,
	"./sr-cyrl.js": 509,
	"./sr.js": 508,
	"./ss": 510,
	"./ss.js": 510,
	"./sv": 511,
	"./sv.js": 511,
	"./sw": 512,
	"./sw.js": 512,
	"./ta": 513,
	"./ta.js": 513,
	"./te": 514,
	"./te.js": 514,
	"./tet": 515,
	"./tet.js": 515,
	"./tg": 516,
	"./tg.js": 516,
	"./th": 517,
	"./th.js": 517,
	"./tl-ph": 518,
	"./tl-ph.js": 518,
	"./tlh": 519,
	"./tlh.js": 519,
	"./tr": 520,
	"./tr.js": 520,
	"./tzl": 521,
	"./tzl.js": 521,
	"./tzm": 522,
	"./tzm-latn": 523,
	"./tzm-latn.js": 523,
	"./tzm.js": 522,
	"./ug-cn": 524,
	"./ug-cn.js": 524,
	"./uk": 525,
	"./uk.js": 525,
	"./ur": 526,
	"./ur.js": 526,
	"./uz": 527,
	"./uz-latn": 528,
	"./uz-latn.js": 528,
	"./uz.js": 527,
	"./vi": 529,
	"./vi.js": 529,
	"./x-pseudo": 530,
	"./x-pseudo.js": 530,
	"./yo": 531,
	"./yo.js": 531,
	"./zh-cn": 532,
	"./zh-cn.js": 532,
	"./zh-hk": 533,
	"./zh-hk.js": 533,
	"./zh-tw": 534,
	"./zh-tw.js": 534
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 890;

/***/ }),

/***/ 893:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentMethodPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_trip_service__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
 Generated class for the PaymentMethodPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var PaymentMethodPage = (function () {
    function PaymentMethodPage(nav, authService, tripService, loadingCtrl) {
        var _this = this;
        this.nav = nav;
        this.authService = authService;
        this.tripService = tripService;
        this.loadingCtrl = loadingCtrl;
        this.carNumber = null;
        var loading = loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        authService.getCardSetting().take(1).subscribe(function (snapshot) {
            loading.dismiss();
            if (snapshot) {
                _this.carNumber = snapshot.number;
            }
        });
    }
    // apply change method
    PaymentMethodPage.prototype.changeMethod = function (method) {
        this.tripService.setPaymentMethod(method);
        // go back
        this.nav.pop();
    };
    PaymentMethodPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-payment-method',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/payment-method/payment-method.html"*/'<!--\n  Generated template for the PaymentMethodPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Payment Methods</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list class="list-full-border" radio-group>\n    <ion-item>\n      <ion-label>\n        Cash\n        <p class="text-hint">Use cash</p>\n      </ion-label>\n      <ion-radio value="cash" (click)="changeMethod(\'cash\')"></ion-radio>\n    </ion-item>\n\n    <ion-item *ngIf="carNumber">\n      <ion-label>\n        Card\n        <p class="text-hint">{{ carNumber }}</p>\n      </ion-label>\n      <ion-radio value="card" (click)="changeMethod(\'card\')"></ion-radio>\n    </ion-item>\n\n  </ion-list>\n\n  <div padding *ngIf="!carNumber">\n    <button ion-button block color="primary" (click)="addCard()">Add payment method</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/payment-method/payment-method.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__services_trip_service__["a" /* TripService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */]])
    ], PaymentMethodPage);
    return PaymentMethodPage;
}());

//# sourceMappingURL=payment-method.js.map

/***/ }),

/***/ 894:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfirmationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_user__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tracking_tracking__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modal_modal__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_user_user__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_place_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_deal_service__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_setting_service__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_driver_service__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_trip_service__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_constants__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_Rx__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_Observable__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_auth_auth__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_auth_service__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ngx_translate_core__ = __webpack_require__(24);
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
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConfirmationPage = (function () {
    function ConfirmationPage(nav, platform, alertCtrl, placeService, geolocation, chRef, loadingCtrl, settingService, tripService, driverService, afAuth, authService, translate, dealService, navParams, userService, modalCtrl, localNotifications) {
        var _this = this;
        this.nav = nav;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.placeService = placeService;
        this.geolocation = geolocation;
        this.chRef = chRef;
        this.loadingCtrl = loadingCtrl;
        this.settingService = settingService;
        this.tripService = tripService;
        this.driverService = driverService;
        this.afAuth = afAuth;
        this.authService = authService;
        this.translate = translate;
        this.dealService = dealService;
        this.navParams = navParams;
        this.userService = userService;
        this.modalCtrl = modalCtrl;
        this.localNotifications = localNotifications;
        this.addressElement = null;
        this.listSearch = '';
        this.mapId = Math.random() + 'map';
        this.mapHeight = 480;
        this.showModalBg = false;
        this.showVehicles = false;
        this.vehicles = [];
        this.note = '';
        this.promocode = '';
        this.destinationVicinity = '';
        this.distance = 0;
        this.duration = 0;
        this.paymentMethod = 'cash';
        this.activeDrivers = [];
        this.driverMarkers = [];
        this.locateDriver = false;
        this.user = {};
        this.isTrackDriverEnabled = true;
        this.discount = 0;
        this.distanceText = '';
        this.durationText = '';
        // this.translate.setDefaultLang('en');
        this.origin = tripService.getOrigin();
        this.destination = tripService.getDestination();
        this.currentVehicle = JSON.parse(localStorage.getItem('carType'));
        this.vehicles = JSON.parse(localStorage.getItem('vehicles'));
        this.activeDrivers = JSON.parse(localStorage.getItem('activeDrivers'));
        console.log("this.currentVehicle: ", this.currentVehicle);
        afAuth.authState.subscribe(function (authData) {
            if (authData) {
                _this.user = authService.getUserData();
            }
        });
    }
    ConfirmationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // on view ready, start loading map
        this.getTripsSub = this.tripService.getTrips().subscribe(function (trips) {
            console.log(trips);
            trips.forEach(function (trip) {
                console.log(trip.status);
                if (trip.status == 'waiting' || trip.status == 'accepted' || trip.status == 'going') {
                    _this.isTrackDriverEnabled = false;
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__tracking_tracking__["a" /* TrackingPage */], { tripId: trip.$key });
                }
            });
        });
        //this.calcRoute();
        this.loadMap();
        // this.by_Unverified_Driver = this.navParams.get('by_Unverified_Driver');
        // if(this.by_Unverified_Driver) {
        //   this.book();
        // }
        // this.initAutocomplete();
    };
    ConfirmationPage.prototype.ionViewWillLeave = function () {
        // stop tracking driver
        clearInterval(this.driverTracking);
        this.getTripsSub.unsubscribe();
    };
    // get current payment method from service
    ConfirmationPage.prototype.getPaymentMethod = function () {
        this.paymentMethod = this.tripService.getPaymentMethod();
        return this.paymentMethod;
    };
    ConfirmationPage.prototype.choosePaymentMethod1 = function () {
        var _this = this;
        var alert = this.alertCtrl.create({ message: 'Profile -> Payments to add card' });
        alert.addInput({ type: 'radio', label: 'Cash', value: 'cash', checked: true });
        this.authService.getCardSetting().take(1).subscribe(function (snapshot) {
            if (snapshot) {
                _this.cardNumber = snapshot.number;
                if (_this.cardNumber != null || _this.cardNumber != undefined)
                    alert.addInput({ type: 'radio', label: 'Credit Card', value: 'card' });
            }
        });
        alert.addButton({ text: 'Cancel' });
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                console.log(data);
                _this.tripService.setPaymentMethod(data);
            }
        });
        alert.present();
    };
    // toggle active vehicle
    ConfirmationPage.prototype.chooseVehicle = function (index) {
        for (var i = 0; i < this.vehicles.length; i++) {
            this.vehicles[i].active = (i == index);
            // choose this vehicle type
            if (i == index) {
                this.tripService.setVehicle(this.vehicles[i]);
                this.currentVehicle = this.vehicles[i];
            }
        }
        // start tracking new driver type
        this.trackDrivers();
        this.toggleVehicles();
    };
    ConfirmationPage.prototype.goProfilePage = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__user_user__["a" /* UserPage */], { user: this.user });
    };
    // load map
    ConfirmationPage.prototype.loadMap = function () {
        var _this = this;
        this.showLoading('Please wait...');
        // get current location
        return this.geolocation.getCurrentPosition().then(function (resp) {
            // if (this.origin)
            //   this.startLatLng = new google.maps.LatLng(this.origin.location.lat, this.origin.location.lng);
            // else
            //   this.startLatLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            // Get Current Location
            _this.startLatLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            var directionsDisplay;
            var directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer();
            _this.map = new google.maps.Map(document.getElementById(_this.mapId), {
                zoom: 15,
                center: _this.startLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                zoomControl: false,
                streetViewControl: false,
            });
            var mapx = _this.map;
            directionsDisplay.setMap(mapx);
            ////////////////////////////////////////
            ///////////////////////////////////////
            // find map center address
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': _this.map.getCenter() }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (!_this.destination) {
                        // set map center as destination
                        _this.destination = _this.placeService.formatAddress(results[0]);
                        _this.destinationVicinity = _this.destination.vicinity;
                        console.log("/////////this.destination :", _this.destination);
                        _this.tripService.setDestination(_this.destination.vicinity, _this.destination.location.lat, _this.destination.location.lng);
                        _this.setDestination();
                        _this.chRef.detectChanges();
                    }
                    else {
                        _this.setDestination();
                    }
                    // save locality
                    var locality_1 = _this.placeService.setLocalityFromGeocoder(results);
                    // load list vehicles
                    _this.settingService.getPrices().subscribe(function (snapshot) {
                        console.log("getPrices snapshot: ", snapshot);
                        var obj = snapshot[locality_1] ? snapshot[locality_1] : snapshot.default;
                        console.log("obj: ", obj);
                        _this.currency = obj.currency;
                        _this.tripService.setCurrency(_this.currency);
                        // // calculate price
                        // Object.keys(obj.vehicles).forEach(id => {
                        //   obj.vehicles[id].id  = id;
                        //   obj.vehicles[id].fee = obj.vehicles[id].price;
                        //   this.vehicles.push(obj.vehicles[id]);
                        // });
                        // calculate distance between origin and destination
                        if (_this.destination) {
                            _this.placeService.getDirection(_this.origin.location.lat, _this.origin.location.lng, _this.destination.location.lat, _this.destination.location.lng).subscribe(function (result) {
                                console.log(result);
                                if (result.routes.length != 0) {
                                    _this.distance = result.routes[0].legs[0].distance.value;
                                    _this.distanceText = result.routes[0].legs[0].distance.text;
                                    _this.durationText = result.routes[0].legs[0].duration.text;
                                    for (var i = 0; i < _this.vehicles.length; i++) {
                                        _this.vehicles[i].fee = _this.distance * _this.vehicles[i].price / 1000;
                                        _this.vehicles[i].fee = _this.vehicles[i].fee.toFixed(2);
                                        _this.directionsDisplay(result);
                                    }
                                }
                                else {
                                    _this.alertCtrl.create({
                                        subTitle: 'No Driver Found',
                                        buttons: ['OK']
                                    }).present();
                                }
                            });
                        }
                        // // set first device as default
                        // this.vehicles[0].active = true;
                        // this.currentVehicle = this.vehicles[0];
                        console.log("this.vehicles Inner: ", _this.vehicles);
                        _this.locality = locality_1;
                        if (_this.isTrackDriverEnabled)
                            _this.trackDrivers();
                    });
                }
            });
            // // add destination to map
            // if (this.destination) {
            //   this.destLatLng = new google.maps.LatLng(this.destination.location.lat, this.destination.location.lng);
            //   var bounds      = new google.maps.LatLngBounds();
            //   bounds.extend(this.startLatLng);
            //   bounds.extend(this.destLatLng);
            //
            //   mapx.fitBounds(bounds);
            //   var request = {
            //       origin: this.startLatLng,
            //       destination: this.destLatLng,
            //       travelMode: google.maps.TravelMode.DRIVING
            //   };
            //   directionsService.route(request, function (response, status) {
            //       if (status == google.maps.DirectionsStatus.OK) {
            //           console.log(response);
            //           directionsDisplay.setDirections(response);
            //           directionsDisplay.setMap(mapx);
            //       } else {
            //           console.log("error");
            //       }
            //   });
            // }
            _this.initAutocomplete();
            var self = _this;
            // Get Updated address on moving marker
            _this.map.addListener('center_changed', function (event) {
                setTimeout(function () {
                    var center = self.map.getCenter();
                    if (typeof self.startMarker != 'undefined') {
                        self.moveMarker(center);
                    }
                }, 500);
            });
            _this.hideLoading();
        }).catch(function (error) {
            _this.hideLoading();
            console.log('Error getting location', error);
        });
    };
    ConfirmationPage.prototype.initAutocomplete = function () {
        var _this = this;
        // this.addressElement = this.searchbar.nativeElement.querySelector('.text-input');
        this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
        this.createAutocomplete(this.addressElement).subscribe(function (location) {
            var options = {
                center: location,
            };
            _this.map.setOptions(options);
            // this.moveMarker(location);
        });
        //** Check If Previous Ride was cancelled by Unverified Driver, then start auto-booking
        this.by_Unverified_Driver = this.navParams.get('by_Unverified_Driver');
        if (this.by_Unverified_Driver) {
            console.log("Start Auto Booking");
            this.book();
        }
    };
    ConfirmationPage.prototype.createAutocomplete = function (addressEl) {
        var autocomplete = new google.maps.places.Autocomplete(addressEl);
        autocomplete.bindTo('bounds', this.map);
        return new __WEBPACK_IMPORTED_MODULE_15_rxjs_Observable__["Observable"](function (sub) {
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    sub.error({
                        message: 'Autocomplete returned place with no geometry'
                    });
                }
                else {
                    sub.next(place.geometry.location);
                    //sub.complete();
                }
            });
        });
    };
    ConfirmationPage.prototype.Transaction = function () {
        var _this = this;
        this.bit = 1;
        var userId = JSON.parse(localStorage.getItem('userData'));
        userId = userId.userId;
        console.log(userId);
        //console.log(userId)
        this.userService.Gettransaction(userId).then(function (result) {
            if (result['data'].userId != null) {
                //let Modal = this.modalCtrl.create(ModalPage, { mydata: result['data'] });
                _this.mydata = result['data'];
                _this.get_DistanceMatrix();
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    message: "Register Your Card First",
                    buttons: ['OK']
                });
                alert_1.present();
            }
            // this.hideLoading()
        }, function (err) {
            // Hide Loader
            _this.hideLoading();
            console.log(err);
        });
    };
    ConfirmationPage.prototype.showLoading = function (content) {
        this.loading = this.loadingCtrl.create({
            content: content
        });
        this.loading.present();
    };
    ConfirmationPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    // Add Destination Marker to Map
    ConfirmationPage.prototype.setDestination = function () {
        var self = this;
        console.log("this.destination.location.lat: ", this.destination.location.lat);
        console.log("this.destination.location.lng: ", this.destination.location.lng);
        // add Sestination marker
        var icon = './assets/img/Pin_Rider3.png';
        var latLng = new google.maps.LatLng(this.destination.location.lat, this.destination.location.lng);
        var startMarker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng,
            icon: icon,
            draggable: true,
        });
        startMarker.setMap(this.map);
        // Set Marker dragged event
        google.maps.event.addListener(startMarker, 'dragend', function () {
            // Get the Current position, where the pointer was dropped
            var point = startMarker.getPosition();
            self.getCurrectAddress();
            // Center the map at given point
            self.map.panTo(point);
        });
        // set map center to destination address
        this.map.setCenter(latLng);
        this.startMarker = startMarker;
        this.getCurrectAddress();
    };
    ConfirmationPage.prototype.moveMarker = function (position) {
        this.destination.location.lat = position.lat();
        this.destination.location.lng = position.lng();
        this.startMarker.setPosition(position);
        this.map.panTo(position);
        this.getCurrectAddress();
    };
    ConfirmationPage.prototype.getCurrectAddress = function () {
        var _this = this;
        var position = this.startMarker.getPosition();
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(position.lat(), position.lng());
        var request = { latLng: latlng };
        geocoder.geocode(request, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var result = results[0];
                if (result) {
                    _this.PickupName = result.address_components[0].long_name;
                    _this.pickupaddress = result.formatted_address;
                    _this.destination.vicinity = _this.pickupaddress;
                    _this.destinationVicinity = _this.destination.vicinity;
                    _this.destination.location.lat = position.lat();
                    _this.destination.location.lng = position.lng();
                    _this.tripService.setDestination(_this.destination.vicinity, _this.destination.location.lat, _this.destination.location.lng);
                }
            }
        });
    };
    ConfirmationPage.prototype.estimate_Fare = function () {
        var _this = this;
        if (typeof this.destination != 'undefined') {
            var user_Obj = JSON.parse(localStorage.getItem('userData'));
            var carType = JSON.parse(localStorage.getItem('carType'));
            // let data = { email: user_Obj['email'], carType: carType['SID'], stateId: user_Obj['stateId'], distance: this.TotalDistance, time: this.TotalTime };
            var dist = this.TotalDistance.split(" ");
            dist[0] = parseInt(dist[0]);
            var time = this.TotalTime.split(" ");
            time[0] = parseInt(time[0]);
            time[2] = parseInt(time[2]);
            if (time[1] == 'hour' || time[1] == 'hours') {
                time[0] = (time[0] * 60) + time[2]; // Convert Hours to mins
            }
            // Hide Loader
            this.hideLoading();
            // estimate_Fare with Server
            //let dataForTimeBasedCalculation = { carType: carType['SID'], stateId: user_Obj['stateId'], totalTime: this.FindDriverReachTime() };
            var data = {
                carType: carType['SID'],
                stateId: user_Obj['stateId'],
                distance: dist[0],
                time: time[0],
            };
            // this.userService.calculateFareForTime(dataForTimeBasedCalculation).then
            //   (
            //       result =>
            //       {
            //         let estimationForTime = result['FareEstimationForTime'];
            this.userService.estimate_Fare(data['distance']).then(function (result) {
                //console.log("Result "result);
                //console.log('Bit ',this.bit);
                result['FareEstimationForMile'] = result['FareEstimationForMile'];
                //   result['FareEstimationForTim'] = estimationForTime;
                if (_this.bit == 1) {
                    _this.bit = 0;
                    var Modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__modal_modal__["a" /* ModalPage */], { type: 'PAY FARE', data: result, mydata: _this.mydata, from: _this.origin.vicinity, To: _this.destination.vicinity, car: _this.currentVehicle });
                    Modal.present();
                }
                else {
                    var Modal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__modal_modal__["a" /* ModalPage */], { type: 'ESTIMATED FARE', data: result, mydata: null, from: _this.origin.vicinity, To: _this.destination.vicinity, car: _this.currentVehicle });
                    Modal.present();
                }
                // Hide Loader
                _this.hideLoading();
            }, function (err) {
                // Hide Loader
                _this.hideLoading();
                console.log(err);
            });
        }
        else {
            this.presentAlert('Select Destination', 'Please Select a Destination');
        }
    };
    ConfirmationPage.prototype.get_DistanceMatrix = function () {
        this.showLoading('GETTING FARE ESTIMATE...');
        var geocoder = new google.maps.Geocoder();
        var orign = new google.maps.LatLng(this.origin.location['lat'], this.origin.location['lng']);
        var destination = new google.maps.LatLng(this.destination.location['lat'], this.destination.location['lng']);
        localStorage.setItem('origin', JSON.stringify(orign));
        localStorage.setItem('destination', JSON.stringify(destination));
        var self = this;
        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: [orign],
            destinations: [destination],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function (response, status) {
            if (status !== 'OK') {
                alert('Error was: ' + status);
            }
            else {
                var originList = response.originAddresses;
                var destinationList = response.destinationAddresses;
                var showGeocodedAddressOnMap = function (asDestination) {
                    return function (results, status) {
                        if (status === 'OK') {
                        }
                        else {
                            // alert('Geocode was not successful due to: ' + status);
                        }
                    };
                };
                for (var i = 0; i < originList.length; i++) {
                    var results = response.rows[i].elements;
                    geocoder.geocode({ 'address': originList[i] }, showGeocodedAddressOnMap(false));
                    for (var j = 0; j < results.length; j++) {
                        geocoder.geocode({ 'address': destinationList[j] }, showGeocodedAddressOnMap(true));
                        self.TotalDistance = results[j].distance.text;
                        self.TotalTime = results[j].duration.text;
                    }
                }
                self.estimate_Fare();
            }
        });
    };
    ConfirmationPage.prototype.FindDriverReachTime = function () {
        var bookingTime = new Date().getTime();
        var arrivalTime = new Date().getTime() + 1200000;
        return new Date(arrivalTime - bookingTime).getMinutes();
    };
    // go to next view when the 'Book' button is clicked
    ConfirmationPage.prototype.book = function () {
        var _this = this;
        var userId = JSON.parse(localStorage.getItem('userData'));
        userId = userId.userId;
        this.userService.Getsolotransaction(userId).then(function (result2) {
            console.log(result2['data']);
            if (result2['data'] == '') {
                _this.presentAlert('', 'No Card Found Or Set To Default');
            }
            else {
                localStorage.setItem('origin', JSON.stringify(_this.origin));
                localStorage.setItem('destination', JSON.stringify(_this.destination));
                _this.locateDriver = true;
                console.log("this.vehicles: ", _this.vehicles);
                console.log("this.activeDrivers: ", _this.activeDrivers);
                // store detail
                _this.tripService.setAvailableDrivers(_this.activeDrivers);
                _this.tripService.setDistance(_this.distance);
                _this.tripService.setFee(_this.currentVehicle.fee);
                _this.tripService.setIcon(_this.currentVehicle.icon);
                _this.tripService.setNote(_this.note);
                _this.tripService.setPromo(_this.promocode);
                _this.tripService.setDiscount(_this.discount);
                // this.tripService.setPaymentMethod('');
                _this.drivers = _this.tripService.getAvailableDrivers();
                // sort by driver distance and rating
                _this.drivers = _this.dealService.sortDriversList(_this.drivers);
                // console.log("this.drivers: ", this.drivers);
                //
                if (_this.drivers) {
                    _this.makeDeal(0);
                }
            }
        });
    };
    ConfirmationPage.prototype.makeDeal = function (index) {
        var _this = this;
        var driver = this.drivers[index];
        var dealAccepted = false;
        if (driver && typeof driver.$key != "undefined") {
            console.log("driver.$key: ", driver.$key);
            console.log("type driver.$key: ", typeof driver.$key);
            driver.status = 'Bidding';
            this.dealService.getDriverDeal(driver.$key).take(1).subscribe(function (snapshot) {
                // if user is available
                if (snapshot.$value === null) {
                    // create a record
                    console.log("getDriverDeal snapshot: ", snapshot);
                    var passid = JSON.parse(localStorage.getItem('userData'));
                    _this.dealService.makeDeal(driver.$key, _this.tripService.getOrigin(), _this.tripService.getDestination(), _this.tripService.getDistance(), _this.tripService.getFee(), _this.tripService.getCurrency(), _this.tripService.getNote(), _this.tripService.getPaymentMethod(), _this.tripService.getPromo(), _this.tripService.getDiscount(), passid.userId).then(function () {
                        var sub = _this.dealService.getDriverDeal(driver.$key).subscribe(function (snap) {
                            // if record doesn't exist or is accepted
                            if (snap.$value === null || snap.status != __WEBPACK_IMPORTED_MODULE_13__services_constants__["c" /* DEAL_STATUS_PENDING */]) {
                                sub.unsubscribe();
                                // if deal has been cancelled
                                if (snap.$value === null) {
                                    _this.nextDriver(index);
                                }
                                else if (snap.status == __WEBPACK_IMPORTED_MODULE_13__services_constants__["b" /* DEAL_STATUS_ACCEPTED */]) {
                                    // if deal is accepted
                                    console.log('accepted', snap.tripId);
                                    dealAccepted = true;
                                    _this.drivers = [];
                                    _this.tripService.setId(snap.tripId);
                                    console.log("this.locality: ", _this.locality);
                                    // go to user page
                                    localStorage.setItem('currentLocality', _this.locality);
                                    _this.singlenotification(1, 'Driver Found', 'Yur Driver is on the way');
                                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__tracking_tracking__["a" /* TrackingPage */], {
                                        locality: _this.locality
                                    });
                                }
                            }
                        });
                    });
                }
                else {
                    _this.nextDriver(index);
                }
            });
        }
        else {
            // show error & try again button
            console.log('No user found');
            this.locateDriver = false;
            if (this.by_Unverified_Driver) {
                this.presentAlert('', 'No New Driver Found');
            }
            else {
                this.presentAlert('', 'No Driver Found');
            }
        }
    };
    // make deal to next driver
    ConfirmationPage.prototype.nextDriver = function (index) {
        this.drivers.splice(index, 1);
        this.makeDeal(index);
    };
    ConfirmationPage.prototype.presentAlert = function (title, mesasge) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: mesasge,
            buttons: ['OK']
        });
        alert.present();
    };
    // show or hide vehicles
    ConfirmationPage.prototype.toggleVehicles = function () {
        this.showVehicles = !this.showVehicles;
        this.showModalBg = (this.showVehicles == true);
    };
    // track drivers
    ConfirmationPage.prototype.trackDrivers = function () {
        var _this = this;
        this.showDriverOnMap(this.locality);
        clearInterval(this.driverTracking);
        this.driverTracking = setInterval(function () {
            _this.showDriverOnMap(_this.locality);
        }, __WEBPACK_IMPORTED_MODULE_13__services_constants__["j" /* POSITION_INTERVAL */]);
        console.log(__WEBPACK_IMPORTED_MODULE_13__services_constants__["j" /* POSITION_INTERVAL */]);
    };
    // show drivers on map
    ConfirmationPage.prototype.showDriverOnMap = function (locality) {
        var _this = this;
        // get active drivers
        console.log('locality: ', locality);
        console.log('this.currentVehicle.id: ', this.currentVehicle.id);
        this.driverService.getActiveDriver(locality, this.currentVehicle.id).take(1).subscribe(function (snapshot) {
            console.log('fresh vehicles: ', snapshot);
            // clear vehicles
            _this.clearDrivers();
            // only show near vehicle
            snapshot.forEach(function (vehicle) {
                console.log('vehicle: ', vehicle);
                // only show vehicle which has last active < 30 secs & distance < 5km
                var distance = _this.placeService.calcCrow(vehicle.lat, vehicle.lng, _this.origin.location.lat, _this.origin.location.lng);
                // console.log("Date.now(): " + Date.now() + " Last Active: " + (Date.now() - vehicle.last_active));
                console.log("Last Active: " + (Date.now() - vehicle.last_active) + " VEHICLE_LAST_ACTIVE_LIMIT: " + __WEBPACK_IMPORTED_MODULE_13__services_constants__["o" /* VEHICLE_LAST_ACTIVE_LIMIT */]);
                console.log("distance: " + distance + " SHOW_VEHICLES_WITHIN: " + __WEBPACK_IMPORTED_MODULE_13__services_constants__["k" /* SHOW_VEHICLES_WITHIN */]);
                // checking last active time and distance
                if (distance < __WEBPACK_IMPORTED_MODULE_13__services_constants__["k" /* SHOW_VEHICLES_WITHIN */] && Date.now() - vehicle.last_active < __WEBPACK_IMPORTED_MODULE_13__services_constants__["o" /* VEHICLE_LAST_ACTIVE_LIMIT */]) {
                    console.log("Vehical Found: ", vehicle);
                    // create or update
                    var latLng = new google.maps.LatLng(vehicle.lat, vehicle.lng);
                    var angle = _this.driverService.getIconWithAngle(vehicle);
                    var marker = new google.maps.Marker({
                        map: _this.map,
                        position: latLng,
                        icon: {
                            // url: './assets/img/icon/' + this.currentVehicle.icon + '/' + this.currentVehicle.icon + angle + '.png',
                            url: './assets/img/icon/sedan' + angle + '.png',
                            size: new google.maps.Size(32, 32),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(16, 16),
                            scaledSize: new google.maps.Size(32, 32)
                        },
                    });
                    // add vehicle and marker to the list
                    vehicle.distance = distance;
                    console.log("marker: ", marker);
                    _this.driverMarkers.push(marker);
                    _this.activeDrivers.push(vehicle);
                    console.log("this.activeDrivers: ", _this.activeDrivers);
                }
                else {
                    console.log('This vehicle is too far');
                }
            });
        });
    };
    // clear expired drivers on the map
    ConfirmationPage.prototype.clearDrivers = function () {
        this.activeDrivers = [];
        this.driverMarkers.forEach(function (vehicle) {
            vehicle.setMap(null);
        });
    };
    // Push Notification
    ConfirmationPage.prototype.singlenotification = function (id, title, text) {
        this.localNotifications.schedule({
            id: id,
            title: title,
            text: text
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ConfirmationPage.prototype, "mapElement", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('searchbar', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], ConfirmationPage.prototype, "searchbar", void 0);
    ConfirmationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-confirmation',template:/*ion-inline-start:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/confirmation/confirmation.html"*/'<!--\n  Generated template for the ConfirmationPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <button ion-button menuToggle>\n      <!-- <ion-icon name="menu"></ion-icon> -->\n      <ion-icon name="ios-arrow-back"></ion-icon>\n    </button>\n\n    <ion-title>\n      <ion-grid>\n        <ion-row class="header-class">\n          <ion-col col-1 style="margin-left: -23px;">\n            <div class="logoHeader"></div>\n          </ion-col>\n          <ion-col col-1 offset-3>\n            <strong>{{ \'CONFIRMATION\' | translate }}</strong>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n    </ion-title>\n\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<!-- <ion-content padding> -->\n<ion-content style="background: #e1dede;">\n\n  <ion-grid class="grid_style z-depth-3">\n\n    <ion-row>\n      <ion-col col-3 style="background: #ccae5b;">\n        <h6>PICK UP</h6>\n      </ion-col>\n      <ion-col col-9 style="background: #fff; color: black" >\n        <ion-input disabled type="text" value="{{origin ? origin.vicinity : \'\' }}"></ion-input>\n        <!-- <ion-input disabled type="text" value="Add Pickup Location"></ion-input> -->\n      </ion-col>\n    </ion-row>\n\n    <ion-row>\n      <ion-col col-3 style="background: #d6c181;">\n        <h6>DROP</h6>\n      </ion-col>\n      <ion-col col-9 style="background: #fff; color: black">\n        <!-- <ion-input disabled type="text" placeholder="Add Drop Location" value="{{destination ? destination.vicinity : \'\' }}"></ion-input> -->\n        <!-- <ion-item id="search" class="search-input-keyword" style="padding-left: 0px;">\n            <ion-input clearInput type="text" #searchbar placeholder="Add Drop Off Location" value="{{destination ? destination.vicinity : \'\' }}"></ion-input>\n        </ion-item> -->\n        <div id="search" class="search-input-keyword bg_primary" style="padding-left: 0px;">\n          <ion-searchbar class="ion-searchtext" #searchbar [(ngModel)]="destinationVicinity"\n            placeholder="Add Drop Off Location"\n            debounce="1"></ion-searchbar>\n        </div>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n  <!-- Set Choose Destination Map -->\n  <div id="{{ mapId }}" [ngStyle]="{height: \'calc(100% / 2 - 3px)\'}"></div>\n\n\n  <ion-grid class="z-depth-3 card_grid">\n\n    <ion-row style="border-bottom: 1px solid lightgray; cursor: pointer;" (click)="Transaction()">\n      <ion-col col-2>\n        <div class="">\n          <ion-icon name="ios-card-outline" style="background: #515151; color: white;"></ion-icon>\n        </div>\n      </ion-col>\n      <ion-col col-8>\n        <h5>Credit Card</h5>\n      </ion-col>\n      <ion-col col-2>\n        <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n      </ion-col>\n    </ion-row>\n\n    <ion-row style="cursor: pointer;" (click)="get_DistanceMatrix()">\n      <ion-col col-2>\n        <div class="">\n          <ion-icon name="ios-cash-outline" style="background: #828080; color: white;"></ion-icon>\n        </div>\n      </ion-col>\n      <ion-col col-8>\n        <h5>Fare Estimate</h5>\n      </ion-col>\n      <ion-col col-2>\n        <ion-icon name="ios-arrow-forward-outline" float-right></ion-icon>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n\n  <ion-grid class="request_btn_grid">\n\n    <ion-row>\n      <ion-col col-2>\n      </ion-col>\n      <ion-col col-8>\n        <!-- <button ion-button class="request_btn" color="dark" block (click)="book()">{{ locateDriver == false ? \'Request Yur Driver\':\'Locating Drivers\'}}<ion-spinner name="dots" color="light" [hidden]="!locateDriver"></ion-spinner></button> -->\n        <button ion-button class="request_btn" color="dark" block [hidden]="locateDriver" (click)="book()">Request Yur Driver</button>\n        <button ion-button class="request_btn" color="dark" block [hidden]="!locateDriver">Locating Drivers <ion-spinner name="dots" color="light" [hidden]="!locateDriver"></ion-spinner></button>\n        <!-- <button ion-button block color="primary" [hidden]="!destination" (click)="book()">{{ locateDriver == false ? \'RIDE NOW\':\'Locating Drivers\'}} <ion-spinner name="dots" color="light" [hidden]="!locateDriver"></ion-spinner></button> -->\n      </ion-col>\n      <ion-col col-2>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n  <!-- <div >\n    <button ion-button color="dark" block class="request_btn">Request Yur Driver</button>\n  </div> -->\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/mac/Desktop/Twubs App/snapServer/snaprepair/src/pages/confirmation/confirmation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__services_place_service__["a" /* PlaceService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_10__services_setting_service__["a" /* SettingService */],
            __WEBPACK_IMPORTED_MODULE_12__services_trip_service__["a" /* TripService */], __WEBPACK_IMPORTED_MODULE_11__services_driver_service__["a" /* DriverService */], __WEBPACK_IMPORTED_MODULE_16_angularfire2_auth_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_17__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_18__ngx_translate_core__["c" /* TranslateService */],
            __WEBPACK_IMPORTED_MODULE_9__services_deal_service__["a" /* DealService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_local_notifications__["a" /* LocalNotifications */]])
    ], ConfirmationPage);
    return ConfirmationPage;
}());

//# sourceMappingURL=confirmation.js.map

/***/ })

},[557]);
//# sourceMappingURL=main.js.map