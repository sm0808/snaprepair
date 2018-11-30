import { Component, ChangeDetectorRef, NgZone, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, LoadingController, ModalController, DateTime } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { PlacesPage } from '../places/places';
import { PaymentMethodPage } from '../payment-method/payment-method';
import { UserPage } from "../user/user";
import { TrackingPage } from '../tracking/tracking';
import { ModalPage } from '../modal/modal';

import { UserProvider } from '../../providers/user/user';
import { PlaceService } from "../../services/place-service";
import { DealService } from "../../services/deal-service";
import { SettingService } from "../../services/setting-service";
import { DriverService } from "../../services/driver-service";
import { TripService } from "../../services/trip-service";
import { SHOW_VEHICLES_WITHIN, POSITION_INTERVAL, VEHICLE_LAST_ACTIVE_LIMIT } from "../../services/constants";
import { DEAL_STATUS_PENDING, DEAL_STATUS_ACCEPTED } from "../../services/constants";
import 'rxjs/Rx'
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from "angularfire2/auth/auth";
import { AuthService } from "../../services/auth-service";
import * as firebase from 'firebase';

import { TranslateService } from '@ngx-translate/core';
import { empty } from '../../../node_modules/rxjs/Observer';

declare var google: any;
declare var InfoBubble: any;
declare var jQuery: any;
declare var $: any;


/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-confirmation',
  templateUrl: 'confirmation.html',
})
export class ConfirmationPage {

  // Intialize all Variables
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;

  public listSearch: string = '';
  public mapId = Math.random() + 'map';
  public mapHeight: number = 480;
  public showModalBg: boolean = false;
  public showVehicles: boolean = false;
  public vehicles: any = [];
  public currentVehicle: any;
  public note: any = '';
  public promocode: any = '';
  public map: any;
  public origin: any;
  public destination: any;
  public destinationVicinity: any = '';
  public loading: any;
  public distance: number = 0;
  public duration: number = 0;
  public currency: string;
  public locality: any;
  public paymentMethod: string = 'cash';
  public activeDrivers: Array<any> = [];
  public driverMarkers: Array<any> = [];
  public driverTracking: any;
  public locateDriver: any = false;
  public drivers: any;
  public user = {};
  public isTrackDriverEnabled = true;
  public discount: any = 0;
  public startLatLng: any;
  public destLatLng: any;
  public directionsService: any;
  public directionsDisplay: any;
  public bounds: any;
  public cardNumber: any;

  public distanceText: any = '';
  public durationText: any = '';

  public infoBubble: any;
  public startMarker: any;
  public PickupName: any;
  public pickupaddress: any;
  public TotalDistance: any;
  public TotalTime: any;
  public mydata: any;
  public bit : any;
  public getTripsSub   : any;
  public by_Unverified_Driver : any;

  constructor(public nav: NavController, public platform: Platform, public alertCtrl: AlertController,
    public placeService: PlaceService, private geolocation: Geolocation, private chRef: ChangeDetectorRef,
    public loadingCtrl: LoadingController, public settingService: SettingService,
    public tripService: TripService, public driverService: DriverService, public afAuth: AngularFireAuth,
    public authService: AuthService, public translate: TranslateService,
    public dealService: DealService, public navParams: NavParams,
    public userService: UserProvider, public modalCtrl: ModalController, 
    public localNotifications: LocalNotifications) {
    // this.translate.setDefaultLang('en');
    this.origin      = tripService.getOrigin();
    this.destination = tripService.getDestination();

    this.currentVehicle = JSON.parse(localStorage.getItem('carType'));
    this.vehicles       = JSON.parse(localStorage.getItem('vehicles'));
    this.activeDrivers  = JSON.parse(localStorage.getItem('activeDrivers'));
    console.log("this.currentVehicle: ", this.currentVehicle);

    afAuth.authState.subscribe(authData => {
      if (authData) {
        this.user = authService.getUserData();
      }
    });

  }

  ionViewDidLoad() {
    // on view ready, start loading map
    this.getTripsSub = this.tripService.getTrips().subscribe(trips => {
      console.log(trips);
      trips.forEach(trip => {
        console.log(trip.status);
        if (trip.status == 'waiting' || trip.status == 'accepted' || trip.status == 'going') {
          this.isTrackDriverEnabled = false;
          this.nav.setRoot(TrackingPage, { tripId: trip.$key });
        }
      })
    });
    //this.calcRoute();
    this.loadMap();

    // this.by_Unverified_Driver = this.navParams.get('by_Unverified_Driver');
    // if(this.by_Unverified_Driver) {
    //   this.book();
    // }
    // this.initAutocomplete();
  }

  ionViewWillLeave() {
    // stop tracking driver
    clearInterval(this.driverTracking);
    this.getTripsSub.unsubscribe();
  }

  // get current payment method from service
  getPaymentMethod() {
    this.paymentMethod = this.tripService.getPaymentMethod()
    return this.paymentMethod;
  }

  choosePaymentMethod1() {
    let alert = this.alertCtrl.create({ message: 'Profile -> Payments to add card' });
    alert.addInput({ type: 'radio', label: 'Cash', value: 'cash', checked: true });
    this.authService.getCardSetting().take(1).subscribe(snapshot => {
      if (snapshot) {
        this.cardNumber = snapshot.number;
        if (this.cardNumber != null || this.cardNumber != undefined)
          alert.addInput({ type: 'radio', label: 'Credit Card', value: 'card' });
      }
    });

    alert.addButton({ text: 'Cancel' });

    alert.addButton({
      text: 'Ok',
      handler: data => {
        console.log(data);
        this.tripService.setPaymentMethod(data);
      }
    });
    alert.present();
  }

  // toggle active vehicle
  chooseVehicle(index) {
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
  }

  goProfilePage() {
    this.nav.push(UserPage, { user: this.user });
  }

  // load map
  loadMap() {
    this.showLoading('Please wait...');

    // get current location
    return this.geolocation.getCurrentPosition().then((resp) => {

      // if (this.origin)
      //   this.startLatLng = new google.maps.LatLng(this.origin.location.lat, this.origin.location.lng);
      // else
      //   this.startLatLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      // Get Current Location
      this.startLatLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

      let directionsDisplay;
      let directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer();

      this.map = new google.maps.Map(document.getElementById(this.mapId), {
        zoom: 15,
        center: this.startLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        zoomControl: false,
        streetViewControl: false,
      });

      let mapx = this.map;
      directionsDisplay.setMap(mapx);
      ////////////////////////////////////////
      ///////////////////////////////////////


      // find map center address
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'latLng': this.map.getCenter() }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          if (!this.destination) {
            // set map center as destination
            this.destination         = this.placeService.formatAddress(results[0]);
            this.destinationVicinity = this.destination.vicinity;
            console.log("/////////this.destination :",this.destination)
            this.tripService.setDestination(this.destination.vicinity, this.destination.location.lat, this.destination.location.lng);
            this.setDestination();
            this.chRef.detectChanges();
          } else {
            this.setDestination();
          }

          // save locality
          let locality = this.placeService.setLocalityFromGeocoder(results);

          // load list vehicles
          this.settingService.getPrices().subscribe(snapshot => {
            console.log("getPrices snapshot: ", snapshot);
            let obj = snapshot[locality] ? snapshot[locality] : snapshot.default;
            console.log("obj: ", obj);
            this.currency = obj.currency;
            this.tripService.setCurrency(this.currency);

            // // calculate price
            // Object.keys(obj.vehicles).forEach(id => {
            //   obj.vehicles[id].id  = id;
            //   obj.vehicles[id].fee = obj.vehicles[id].price;
            //   this.vehicles.push(obj.vehicles[id]);
            // });

            // calculate distance between origin and destination
            if (this.destination) {
              this.placeService.getDirection(this.origin.location.lat, this.origin.location.lng, this.destination.location.lat,
                this.destination.location.lng).subscribe(result => {
                  console.log(result);
                  if (result.routes.length != 0) {
                    this.distance = result.routes[0].legs[0].distance.value;

                    this.distanceText = result.routes[0].legs[0].distance.text;
                    this.durationText = result.routes[0].legs[0].duration.text;


                    for (let i = 0; i < this.vehicles.length; i++) {
                      this.vehicles[i].fee = this.distance * this.vehicles[i].price / 1000;
                      this.vehicles[i].fee = this.vehicles[i].fee.toFixed(2);
                      this.directionsDisplay(result);
                    }
                  } else {
                    this.alertCtrl.create({
                      subTitle: 'No Driver Found',
                      buttons: ['OK']
                    }).present();
                  }
                });

            }

            // // set first device as default
            // this.vehicles[0].active = true;
            // this.currentVehicle = this.vehicles[0];

            console.log("this.vehicles Inner: ", this.vehicles);
            this.locality = locality;
            if (this.isTrackDriverEnabled)
              this.trackDrivers();
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
      this.initAutocomplete();

      let self = this;
      // Get Updated address on moving marker
      this.map.addListener('center_changed', (event) => {
        setTimeout(function () {
          let center = self.map.getCenter();
          if (typeof self.startMarker != 'undefined') {
            self.moveMarker(center);
          }
        }, 500);
      });

      this.hideLoading();
    }).catch((error) => {
      this.hideLoading();
      console.log('Error getting location', error);
    });
  }

  initAutocomplete(): void {
    // this.addressElement = this.searchbar.nativeElement.querySelector('.text-input');
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      let options = {
        center: location,
        // zoom: 17
      };
      this.map.setOptions(options);
      // this.moveMarker(location);
    });

    //** Check If Previous Ride was cancelled by Unverified Driver, then start auto-booking
    this.by_Unverified_Driver = this.navParams.get('by_Unverified_Driver');
    if(this.by_Unverified_Driver) {
      console.log("Start Auto Booking")
      this.book();
    }
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    let autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          //sub.complete();
        }
      });
    });
  }

  Transaction() {

    this.bit = 1;
    let userId = JSON.parse(localStorage.getItem('userData'));


    userId = userId.userId;
    console.log(userId);
    //console.log(userId)
    this.userService.Gettransaction(userId).then((result) => {
      if (result['data'].userId != null) {
        //let Modal = this.modalCtrl.create(ModalPage, { mydata: result['data'] });
        this.mydata = result['data'];
        this.get_DistanceMatrix();
      } else {
        let alert = this.alertCtrl.create({
          message: "Register Your Card First",
          buttons: ['OK']
        });
        alert.present();
      }
      // this.hideLoading()
    }, (err) => {
      // Hide Loader
      this.hideLoading()
      console.log(err);
    });
  }

  showLoading(content) {
    this.loading = this.loadingCtrl.create({
      content: content
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  // Add Destination Marker to Map
  setDestination() {
    let self = this;
    console.log("this.destination.location.lat: ", this.destination.location.lat);
    console.log("this.destination.location.lng: ", this.destination.location.lng);
    // add Sestination marker
    let icon = './assets/img/Pin_Rider3.png';
    let latLng = new google.maps.LatLng(this.destination.location.lat, this.destination.location.lng);
    let startMarker = new google.maps.Marker({
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
  }

  moveMarker(position) {
    this.destination.location.lat = position.lat();
    this.destination.location.lng = position.lng();
    this.startMarker.setPosition(position);
    this.map.panTo(position);
    this.getCurrectAddress();
  }

  getCurrectAddress() {
    let position = this.startMarker.getPosition();
    let geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(position.lat(), position.lng());
    let request = { latLng: latlng };

    geocoder.geocode(request, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let result = results[0];
        if (result) {
          this.PickupName = result.address_components[0].long_name;
          this.pickupaddress = result.formatted_address;

          this.destination.vicinity     = this.pickupaddress;
          this.destinationVicinity      = this.destination.vicinity;
          this.destination.location.lat = position.lat();
          this.destination.location.lng = position.lng();

          this.tripService.setDestination(this.destination.vicinity, this.destination.location.lat, this.destination.location.lng);
        }
      }
    });
  }

  estimate_Fare() {
    if (typeof this.destination != 'undefined') {
      let user_Obj = JSON.parse(localStorage.getItem('userData'));
      let carType = JSON.parse(localStorage.getItem('carType'));

      // let data = { email: user_Obj['email'], carType: carType['SID'], stateId: user_Obj['stateId'], distance: this.TotalDistance, time: this.TotalTime };
      var dist = this.TotalDistance.split(" ");
      dist[0]  = parseInt(dist[0]);
      var time = this.TotalTime.split(" ");
      time[0]  = parseInt(time[0]);
      time[2]  = parseInt(time[2]);
      if (time[1] == 'hour' || time[1] == 'hours') {
        time[0] = (time[0] * 60) + time[2]; // Convert Hours to mins
      }
      // Hide Loader
      this.hideLoading();
      // estimate_Fare with Server
      //let dataForTimeBasedCalculation = { carType: carType['SID'], stateId: user_Obj['stateId'], totalTime: this.FindDriverReachTime() };
      let data = {
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

      this.userService.estimate_Fare(data['distance']).then((result) => {
        //console.log("Result "result);
        //console.log('Bit ',this.bit);
        result['FareEstimationForMile'] = result['FareEstimationForMile'];
        //   result['FareEstimationForTim'] = estimationForTime;
        if (this.bit == 1) {
          this.bit = 0;
          let Modal = this.modalCtrl.create(ModalPage, { type: 'PAY FARE', data: result, mydata: this.mydata, from: this.origin.vicinity, To: this.destination.vicinity, car: this.currentVehicle });
          Modal.present();
        } else {
          let Modal = this.modalCtrl.create(ModalPage, { type: 'ESTIMATED FARE', data: result, mydata: null, from: this.origin.vicinity, To: this.destination.vicinity, car: this.currentVehicle });
          Modal.present();
        }

        // Hide Loader
        this.hideLoading()
      }, (err) => {
        // Hide Loader
        this.hideLoading()
        console.log(err);
      });
    }
    else {
      this.presentAlert('Select Destination', 'Please Select a Destination');
    }
  }

  get_DistanceMatrix() {
    this.showLoading('GETTING FARE ESTIMATE...');
    let geocoder = new google.maps.Geocoder();
    let orign = new google.maps.LatLng(this.origin.location['lat'], this.origin.location['lng']);
    let destination = new google.maps.LatLng(this.destination.location['lat'], this.destination.location['lng']);

    localStorage.setItem('origin', JSON.stringify(orign));
    localStorage.setItem('destination', JSON.stringify(destination));

    let self = this;
    let service = new google.maps.DistanceMatrixService;
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
      } else {
        var originList = response.originAddresses;
        var destinationList = response.destinationAddresses;

        var showGeocodedAddressOnMap = function (asDestination) {
          return function (results, status) {
            if (status === 'OK') {
            } else {
              // alert('Geocode was not successful due to: ' + status);
            }
          };
        };


        for (var i = 0; i < originList.length; i++) {
          var results = response.rows[i].elements;
          geocoder.geocode({ 'address': originList[i] },
            showGeocodedAddressOnMap(false));
          for (var j = 0; j < results.length; j++) {
            geocoder.geocode({ 'address': destinationList[j] },
              showGeocodedAddressOnMap(true));

            self.TotalDistance = results[j].distance.text;
            self.TotalTime = results[j].duration.text;
          }
        }
        self.estimate_Fare();
      }
    });
  }

  FindDriverReachTime() {
    let bookingTime = new Date().getTime();
    let arrivalTime = new Date().getTime() + 1200000;
    return new Date(arrivalTime - bookingTime).getMinutes();
  }

  // go to next view when the 'Book' button is clicked
  book() {

    let userId = JSON.parse(localStorage.getItem('userData'));


    userId = userId.userId;
    this.userService.Getsolotransaction(userId).then((result2) => {
      console.log(result2['data'])
      if(result2['data'] == '')
      {
        this.presentAlert('', 'No Card Found Or Set To Default');
      }else{

        localStorage.setItem('origin', JSON.stringify(this.origin));
        localStorage.setItem('destination', JSON.stringify(this.destination));
        this.locateDriver = true;
        console.log("this.vehicles: ", this.vehicles);
        console.log("this.activeDrivers: ", this.activeDrivers);
        // store detail
        this.tripService.setAvailableDrivers(this.activeDrivers);
        this.tripService.setDistance(this.distance);
        this.tripService.setFee(this.currentVehicle.fee);
        this.tripService.setIcon(this.currentVehicle.icon);
        this.tripService.setNote(this.note);
        this.tripService.setPromo(this.promocode);
        this.tripService.setDiscount(this.discount);
        // this.tripService.setPaymentMethod('');
        this.drivers = this.tripService.getAvailableDrivers();

        // sort by driver distance and rating
        this.drivers = this.dealService.sortDriversList(this.drivers);
        // console.log("this.drivers: ", this.drivers);
        //
        if (this.drivers) {
          this.makeDeal(0);
        }
      }
    });



  }

  makeDeal(index) {
    let driver = this.drivers[index];
    let dealAccepted = false;

    if (driver && typeof driver.$key != "undefined") {
      console.log("driver.$key: ", driver.$key);
      console.log("type driver.$key: ", typeof driver.$key);
      driver.status = 'Bidding';
      this.dealService.getDriverDeal(driver.$key).take(1).subscribe(snapshot => {
        // if user is available
        if (snapshot.$value === null) {
          // create a record
          console.log("getDriverDeal snapshot: ", snapshot);
          let passid = JSON.parse(localStorage.getItem('userData'));

          this.dealService.makeDeal(
            driver.$key,
            this.tripService.getOrigin(),
            this.tripService.getDestination(),
            this.tripService.getDistance(),
            this.tripService.getFee(),
            this.tripService.getCurrency(),
            this.tripService.getNote(),
            this.tripService.getPaymentMethod(),
            this.tripService.getPromo(),
            this.tripService.getDiscount(),
            passid.userId
          ).then(() => {
            let sub = this.dealService.getDriverDeal(driver.$key).subscribe(snap => {
              // if record doesn't exist or is accepted
              if (snap.$value === null || snap.status != DEAL_STATUS_PENDING) {
                sub.unsubscribe();
                // if deal has been cancelled
                if (snap.$value === null) {
                  this.nextDriver(index);
                } else if (snap.status == DEAL_STATUS_ACCEPTED) {
                  // if deal is accepted
                  console.log('accepted', snap.tripId);
                  dealAccepted = true;
                  this.drivers = [];
                  this.tripService.setId(snap.tripId);
                  console.log("this.locality: ",this.locality);
                  // go to user page
                  localStorage.setItem('currentLocality', this.locality);
                  this.singlenotification(1, 'Driver Found', 'Yur Driver is on the way');
                  this.nav.setRoot(TrackingPage , {
                    locality: this.locality
                  });
                }
              }
            });
          });
        } else {
          this.nextDriver(index);
        }
      });
    } else {
      // show error & try again button
      console.log('No user found');
      this.locateDriver = false;
      if(this.by_Unverified_Driver) {
        this.presentAlert('', 'No New Driver Found');
      }
      else {
        this.presentAlert('', 'No Driver Found');
      }

    }
  }

  // make deal to next driver
  nextDriver(index) {
    this.drivers.splice(index, 1);
    this.makeDeal(index);
  }

  presentAlert(title, mesasge) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mesasge,
      buttons: ['OK']
    });
    alert.present();
  }

  // show or hide vehicles
  toggleVehicles() {
    this.showVehicles = !this.showVehicles;
    this.showModalBg = (this.showVehicles == true);
  }

  // track drivers
  trackDrivers() {
    this.showDriverOnMap(this.locality);
    clearInterval(this.driverTracking);

    this.driverTracking = setInterval(() => {
      this.showDriverOnMap(this.locality);
    }, POSITION_INTERVAL);

    console.log(POSITION_INTERVAL);
  }

  // show drivers on map
  showDriverOnMap(locality) {
    // get active drivers
    console.log('locality: ', locality);
    console.log('this.currentVehicle.id: ', this.currentVehicle.id);
    this.driverService.getActiveDriver(locality, this.currentVehicle.id).take(1).subscribe(snapshot => {
      console.log('fresh vehicles: ', snapshot);
      // clear vehicles
      this.clearDrivers();

      // only show near vehicle
      snapshot.forEach(vehicle => {
        console.log('vehicle: ', vehicle);
        // only show vehicle which has last active < 30 secs & distance < 5km
        let distance = this.placeService.calcCrow(vehicle.lat, vehicle.lng, this.origin.location.lat, this.origin.location.lng);
        // console.log("Date.now(): " + Date.now() + " Last Active: " + (Date.now() - vehicle.last_active));
        console.log("Last Active: " + (Date.now() - vehicle.last_active) + " VEHICLE_LAST_ACTIVE_LIMIT: " + VEHICLE_LAST_ACTIVE_LIMIT);
        console.log("distance: " + distance + " SHOW_VEHICLES_WITHIN: " + SHOW_VEHICLES_WITHIN);
        // checking last active time and distance
        if (distance < SHOW_VEHICLES_WITHIN && Date.now() - vehicle.last_active < VEHICLE_LAST_ACTIVE_LIMIT) {
          console.log("Vehical Found: ", vehicle);
          // create or update
          let latLng = new google.maps.LatLng(vehicle.lat, vehicle.lng);
          let angle = this.driverService.getIconWithAngle(vehicle);

          let marker = new google.maps.Marker({
            map: this.map,
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
          this.driverMarkers.push(marker);
          this.activeDrivers.push(vehicle);
          console.log("this.activeDrivers: ", this.activeDrivers);
        } else {
          console.log('This vehicle is too far');
        }

      });
    });
  }

  // clear expired drivers on the map
  clearDrivers() {
    this.activeDrivers = [];
    this.driverMarkers.forEach((vehicle) => {
      vehicle.setMap(null);
    });
  }

  // Push Notification
  singlenotification(id, title, text) {
    this.localNotifications.schedule({
      id: id,
      title: title,
      text: text
    });
  }


}
