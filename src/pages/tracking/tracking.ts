import { Component } from '@angular/core';
import { NavController, Platform, ModalController, AlertController, NavParams, ViewController, Modal, LoadingController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { DriverService } from '../../services/driver-service';
import { HomePage } from "../home/home";
import { PlacesPage } from '../places/places';
import { TripService } from "../../services/trip-service";
import { POSITION_INTERVAL, TRIP_STATUS_GOING, TRIP_STATUS_FINISHED, TRIP_STATUS_WAITING, SOS, POSITION_INTERVAL2 } from "../../services/constants";
import { PlaceService } from "../../services/place-service";
import { UserProvider } from '../../providers/user/user';
import { Geolocation } from '@ionic-native/geolocation';
import { ModalNotificationPage } from "../modal-notification/modal-notification";

declare var google: any;


@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html'
})
export class TrackingPage {

  //public check: boolean = true;

  tip = 0;
  public bit = false;
  public loading: any;
  driver: any;
  driver_Arrive_alert : any = true;
  locality: any;
  map: any;
  trip: any = {};
  tripId: any;
  driverTracking: any;
  marker: any;
  tripStatus: any;
  sos: any;
  alertCnt: any = 0;
  responsedata: any={};
  cancelAlert : any = true;
  TripCancelByDriver : any = false;
  getTripSub : any;
  getDriverSub : any;

  constructor(public nav: NavController, public userService: UserProvider, public driverService: DriverService,
    public platform: Platform, public navParams: NavParams, public tripService: TripService,
    public placeService: PlaceService, public modalCtrl: ModalController, public alertCtrl: AlertController,
    public geo: Geolocation, public view: ViewController, public loadingCtrl: LoadingController,
    public localNotifications: LocalNotifications) {
    this.sos = SOS;
    let x         = JSON.parse(localStorage.getItem('userData'));
    this.locality = localStorage.getItem('currentLocality');
  }

  isDriverArrived(driverLatLng, passengerLatLng, km) {
    var ky = 40000 / 360;
    var kx = Math.cos(Math.PI * passengerLatLng.lat / 180.0) * ky;
    var dx = Math.abs(passengerLatLng.lng - driverLatLng.lng()) * kx;
    var dy = Math.abs(passengerLatLng.lat - driverLatLng.lat()) * ky;
    var computedDistance = Math.sqrt(dx * dx + dy * dy);
    return computedDistance <= km;
  }

  ionViewDidLoad() {
    let tripId;
    if (this.navParams.get('tripId'))
      tripId = this.navParams.get('tripId')
    else
      tripId = this.tripService.getId();

    this.tripId = tripId;
    this.getTripSub = this.tripService.getTrip(tripId).take(1).subscribe(snapshot => {
      this.trip = snapshot;
      this.getDriverSub = this.driverService.getDriver(snapshot.driverId).take(1).subscribe(snap => {
        this.driver = snap;
        this.watchTrip(tripId);
        //** init map
        this.loadMap();
      })
    });
  }

  Message() {
    let user_Obj = JSON.parse(localStorage.getItem('userData'));
    this.userService.InsertConvo(this.driver.phoneNumber, user_Obj.phone).then((result) => {
     // console.log(result);
    }, err => console.log(err)
    );

  }

  ionViewWillLeave() {
    this.driver_Arrive_alert = false;
    clearInterval(this.driverTracking);
    if (this.TripCancelByDriver) {
        this.getTripSub.unsubscribe();
        this.getDriverSub.unsubscribe();
        // this.nav.setRoot(HomePage, {Trip : 'Trip Canceled due to Driver Verification Failed'});
    }
  }

  watchTrip(tripId) {

    let tripSub = this.tripService.getTrip(tripId).subscribe(snapshot => {
      this.tripStatus = snapshot.status;
      console.log("//////////////////////////////////// this.tripStatus: ", this.tripStatus);
      if(this.tripStatus == 'canceled') {
        tripSub.unsubscribe();
        this.TripCancelByDriver = true;
        console.log("//////////////////////////////////// this.tripStatus: ", this.tripStatus);
        this.tripService.unverifiedDrivers(this.trip.driverId);
        this.singlenotification(1, 'Trip Cancelled', 'Trip has been Cancelled.');
        this.nav.setRoot(HomePage);
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

    this.tripService.getBit(tripId).subscribe(snapshot => {
      // this.tripStatus = snapshot.status;
     // console.log("this.tripStatus: ", snapshot.$value);
      if (snapshot.$value == 1) {
        //console.log("this.tripStatus: ", snapshot.$value);
        //alert(snapshot.$value);
        ///this.tripService.setbit2(true);
        this.tripStatus = TRIP_STATUS_FINISHED;


      } else {

      }
    });
    //
    setInterval(() => {

      if (this.tripStatus == TRIP_STATUS_FINISHED) {

        //setTimeout(() => {
        if (this.tripService.getbit2() == true) {
          this.tripService.setbit2(false);
          this.singlenotification(3, 'Trip Completed', 'You have Reached your destination. Please Rate the Driver');
          this.showRateCard();
        } else {

        }
      }
    }, 2000);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Estimating Fare Please Wait...'
    });
    this.loading.present();
  }
  hideLoading() {
    this.loading.dismiss();
  }

  showRateCard() {

    this.showLoading();

    let pickUpLatLong = JSON.parse(localStorage.getItem('origin')).location;
    let dropLatLong = JSON.parse(localStorage.getItem('destination')).location;
    let orign = new google.maps.LatLng(dropLatLong.lat, dropLatLong.lng);
    let destination = new google.maps.LatLng(pickUpLatLong.lat, pickUpLatLong.lng);

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
      let arrivalTime;
      self.tripService.getArrivalTime(self.tripId).subscribe(
        _ => {

          arrivalTime = parseFloat(_.$value);


          if (status !== 'OK') {
            alert('Error was: ' + status);
          }
          else {
            let distance = parseFloat(response.rows[0].elements[0].distance.text);
            let data = {
              carType: 5,//JSON.parse(localStorage.getItem('carType'))['SID'],
              stateId: 1,//JSON.parse(localStorage.getItem('userData'))['stateId'],
              distance: distance,
              time: arrivalTime
            };  //// this data will be used in future to send it in estimate fare function
            self.userService.calculateFareForTime(data).then
              (
              result => {
                let costForTime = parseFloat(result['FareEstimationForTime']);
                self.userService.estimate_Fare(distance).then(
                  result => {
                    var directionsService = new google.maps.DirectionsService();
                    var request = {
                      origin: pickUpLatLong.lat.toString() + ',' + pickUpLatLong.lng.toString(),
                      destination: dropLatLong.lat.toString() + ',' + dropLatLong.lng.toString(),
                      travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };
                    directionsService.route(request, function (response, status) {
                      if (status == google.maps.DirectionsStatus.OK) {
                        var myRoute = response.routes[0];
                        var polyline = new google.maps.Polyline();
                        var bounds = new google.maps.LatLngBounds();
                        var legs = myRoute.legs;
                        for (let i = 0; i < legs.length; i++) {
                          var steps = legs[i].steps;
                          for (let j = 0; j < steps.length; j++) {
                            var nextSegment = steps[j].path;
                            for (let k = 0; k < nextSegment.length; k++) {
                              polyline.getPath().push(nextSegment[k]);
                              bounds.extend(nextSegment[k]);
                            }
                          }
                        }
                        self.userService.GetTolls().then(response => {
                          let tolls = 0;
                          let latLongs = <any>{};
                          latLongs = response['data'];
                          latLongs.forEach(element => {
                            let tollPosition = new google.maps.LatLng(element.latitude, element.longitude);
                            if (google.maps.geometry.poly.isLocationOnEdge(tollPosition, polyline, 0.01)) {
                              tolls += parseFloat(element.cost)
                            }
                          });
                          result['FareEstimationForTime'] = costForTime;
                          let distanceCovered = distance;
                          self.trip.fee = parseFloat(result['FareEstimationForMile']);
                          let amountWithoutTaxes = self.trip.fee + costForTime;
                          amountWithoutTaxes = amountWithoutTaxes - (amountWithoutTaxes * self.trip.discount / 100);
                          let gst = amountWithoutTaxes * 0.0725;
                          let data = {
                            isBaseFare: result["IsBaseFare"],
                            distance: Math.round(distanceCovered * 100) / 100 + " km",
                            distanceCost: Math.round(self.trip.fee * 100) / 100,
                            timeCost: Math.round(costForTime * 100) / 100,
                            fare: Math.round(amountWithoutTaxes * 100) / 100,//
                            discount: Math.round(self.trip.discount * 100) / 100,
                            promo: Math.round(self.trip.promo * 100) / 100,
                            gst: Math.round(gst * 100) / 100,
                            tolls: Math.round(tolls * 100) / 100,
                            total: Math.round((gst + amountWithoutTaxes + tolls) * 100) / 100
                          }
                          let userId = JSON.parse(localStorage.getItem('userData'));
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
                          self.userService.Getsolotransaction(userId).then((result2) => {
                            self.hideLoading();



                    //code here for insert ride for passenger get from trips in firebase



                            self.showTipAlert(data['total']).then((result) => {
                              if (result) {
                                data["tip"] = self.tip;
                                data['total'] += self.tip;
                                this.mydata = result['data'];
                                let finalFareModal = self.modalCtrl.create('ModalFinalFarePage', { key:self.trip.$key,data: data, Card: result2['data'] });
                                finalFareModal.present();
                                finalFareModal.onDidDismiss(response => {
                                  self.tripService.setTotalFee(self.trip.$key, amountWithoutTaxes + gst + tolls).then(
                                    _ => {
                                      self.modalCtrl.create('ModalRatingPage', { "tripKey": self.trip.$key }).present();
                                    });


                                });
                              }
                            });

                          });
                        });

                      }

                    });
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              }
              );

          }
        });
    });
  }

  showTipAlert(totalFare): Promise<boolean> {
    return new Promise((resolve, reject) => {

      this.tip = 0;
      let alert = this.alertCtrl.create({
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
            handler: data => {
              var tip = parseFloat(alert.data.inputs[0].value);
              if (tip >= 0) {
                this.tip = tip;
              }
              resolve(true);
            }
          },
          {
            text: 'Skip Tip',
            handler: _ => resolve(true)
          }
        ]
      });

      alert.present();
    });

  }



  loadMap() {
    let latLng = new google.maps.LatLng(this.trip.origin.location.lat, this.trip.origin.location.lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      streetViewControl: false
    }

    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: latLng
    });

    this.trackDriver();
  }

  // make array with range is n
  range(n) {
    return new Array(Math.round(n));
  }

  trackDriver() {
    this.showDriverOnMap();
    this.driverTracking = setInterval(() => {
      this.marker.setMap(null);
      this.showDriverOnMap();
    }, POSITION_INTERVAL);
    //console.log("POSITION_INTERVAL: ",POSITION_INTERVAL);
  }

  cancelTrip() {
    if(typeof this.locality == 'undefined')
      this.locality = this.placeService.getLocality();
    // console.log("cancelTrip driver id: ", this.driver.uid);
    // console.log("cancelTrip driver type: ", this.driver.type);
    // console.log("cancelTrip locality: ", this.locality);

    let user_Obj = JSON.parse(localStorage.getItem('userData'));
    this.userService.DelConvo(this.driver.phoneNumber, user_Obj.phone).then((result) => {
  //    console.log(result);
    }, err => console.log(err)
    );

    this.tripService.get_Driver_Loc(this.locality, this.driver.type, this.driver.uid).take(1).subscribe(snapshot => {
      console.log("snapshot//: ", snapshot);
      let distance = this.getDistanceFromLatLonInMiles(snapshot.ride_ini_Lat, snapshot.ride_ini_Lng, snapshot.lat, snapshot.lng)
     // console.log("distance: ", distance);
      if (distance > 2) {
        this.Confirm_Cancelation();
      }
      else {
       // console.log('----- this.tripId ****',this.tripId)
        let fare='';
        this.tripService.getrideinfo(this.tripId).subscribe(snnp => {
        console.log('----- snapshot ****',snnp)
            this.userService.Insert_Ride(snnp,fare,3).then((result) => {
              console.log(result);
              this.tripService.cancelTrip(this.trip.$key).then(data => {
                this.singlenotification(1, 'Trip Cancelled', 'Trip has been Cancelled.');
                this.nav.setRoot(HomePage);
              });


          }, (err) => {
            this.tripService.cancelTrip(this.trip.$key).then(data => {

            });
          //    console.log(err);
          });

        });
        // console.log('Fare Data',this.total_amount)




      }
    });
  }

  getDistanceFromLatLonInMiles(lat1,lon1,lat2,lon2) {
    // lat2 = 33.684490;
    // lon2 = 73.047904;
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    // return d * 0.621371;  // Return in Miles
    return d;  // Return in Miles
  }

  deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  // show user on map
  showDriverOnMap() {
    let driverPosition;
    if(typeof this.locality == 'undefined')
      this.locality = this.placeService.getLocality();
    // get user's position
    // console.log("this.placeService.getLocality(): ",this.locality);
    // console.log("this.driver.type: ",this.driver.type);
    // console.log("this.driver.$key: ",this.driver.$key);
    try {
      this.driverService.getDriverPosition(
        this.locality,
        this.driver.type,
        this.driver.$key
      ).take(1).subscribe(snapshot => {
        //console.log("snapshot: ",snapshot);
        // create or update
        driverPosition = new google.maps.LatLng(snapshot.lat, snapshot.lng);
       // console.log("driverPosition:", JSON.stringify(driverPosition));
        this.map.setCenter(driverPosition);
        this.marker = null;
        // show vehicle to map
        this.marker = new google.maps.Marker({
          map: this.map,
          position: driverPosition,
          icon: {
            url: 'assets/img/icon/suv_right.png',
            size: new google.maps.Size(32, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(16, 16),
            scaledSize: new google.maps.Size(32, 32)
          },
        });

        setTimeout(() => {
          this.showArrivedNotification(driverPosition);
        }, 1000);
      });

    } catch(error) {
      console.log("error: ",error);
    };

  }

  showArrivedNotification(driverPosition) {
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
  }
  // change destination place
  changeDestination() {
    // go to ConfirmationPage
    //console.log("this.driver.$key: ", this.driver.$key);
    this.nav.push(PlacesPage, { type: 'destination', page: 'tracking', driverID: this.driver.$key, tripId: this.tripId });
  }

  Confirm_Cancelation() {
    //console.log("Confirm_Cancelation");
    let self = this;
    let alert = this.alertCtrl.create({
    title: 'Confirm Cancelation',
    message: 'Driver has already moved more than 2 miles. You will be charged $5 for cancelling this ride.',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Proceed',
        handler: () => {
         // console.log('Proceed clicked');
          self.cancelation_Charge();
        }
      }
    ]
  });
  alert.present();
}

cancelation_Charge() {
  let loading = this.loadingCtrl.create({ content: 'Processing...' });
  loading.present();
  let userId = JSON.parse(localStorage.getItem('userData'));
  let self = this;
  userId = userId.userId;
  self.userService.Gettransaction(userId).then((result) => {
    let Card = result['data'];
    let Cost = 5;
    //console.log("card: ", Card);

    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://dbstage1.paywire.com/API/pwapi.aspx');

    let sr =
      `<?xml version="1.0" encoding="UTF-8"?>
        <PAYMENTREQUEST>
           <TRANSACTIONHEADER>
              <PWVERSION>3</PWVERSION>
            <PWUSER>yurt1</PWUSER>
               <PWPASS>Kt93SbYZ</PWPASS>
               <PWCLIENTID>0000010062</PWCLIENTID>
               <PWKEY>8A0B6FA9-D918-4D84-B02F-5BB7C8578F4D</PWKEY>
              <PWTRANSACTIONTYPE>SALE</PWTRANSACTIONTYPE>
              <PWSALEAMOUNT>`+ Cost + `</PWSALEAMOUNT>
              <CARDPRESENT>FALSE</CARDPRESENT>
           </TRANSACTIONHEADER>
           <CUSTOMER>
              <PWMEDIA>CC</PWMEDIA>
               <PWTOKEN>`+ Card['pwtoken'] + `</PWTOKEN>
           </CUSTOMER>
        </PAYMENTREQUEST>`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          let xml      = xmlhttp.responseXML;
          var response = xml.getElementsByTagName("PAYMENTRESPONSE")[0];
          let length   = response.childElementCount;

          //console.log("Length ", length);
         // console.log("Response Data", response);

          if (length < 9) {
            loading.dismiss();
            // this.viewCtrl.dismiss();
            this.alertCtrl.create({ subTitle: 'Problem In Transaction', buttons: ['ok'] }).present();
          } else {
            let fare='';
            this.tripService.getrideinfo(this.tripId).subscribe(snapshot => {
            console.log('----- snapshot ****',snapshot)

                this.userService.Insert_Ride(snapshot,fare,5).then((result) => {
                  console.log(result);
                  this.tripService.cancelTrip(this.trip.$key).then(data => {

                  });


              }, (err) => {
                this.tripService.cancelTrip(this.trip.$key).then(data => {

                });
              //    console.log(err);
              });

            });
            for (let i = 0; i < length; i++) {
              this.responsedata[response.childNodes[i].nodeName] = response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue;
            }
            let userId = JSON.parse(localStorage.getItem('userData'));
            this.responsedata['UserId']=  userId.userId;
           // console.log("This Response data", this.responsedata);

            this.userService.tbtransaction(this.responsedata).then((result) => {
             // console.log(result['data']);
              loading.dismiss();
              this.alertCtrl.create({ subTitle: ' Transaction Completed', buttons: ['ok'] }).present();
            }, (err) => {
              loading.dismiss();
              console.log(err);
            });
          }
        }
        else {

          let fare='';
          this.tripService.getrideinfo(this.tripId).subscribe(snapshot => {


          console.log('----- snapshot ****',snapshot)

              this.userService.Insert_Ride(snapshot,fare,10).then((result) => {
                console.log(result);
                this.tripService.cancelTrip(this.trip.$key).then(data => {

                });


            }, (err) => {
              this.tripService.cancelTrip(this.trip.$key).then(data => {

              });
            //    console.log(err);
            });

          });
          this.alertCtrl.create({ subTitle: 'Transaction Is Not Done', buttons: ['ok'] }).present();
          //this.mydata = null;
          loading.dismiss();
        }
      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);

    // Cancel Trip and set to HomePage
    self.tripService.setTotalFee(self.trip.$key, Cost).then(
      _ => {
        self.tripService.cancelTrip(self.trip.$key).then(data => {
       //   console.log(data);
          this.singlenotification(1, 'Trip Cancelled', 'Trip has been Cancelled.');
          self.nav.setRoot(HomePage);
        });
      });
  });
}

presentAlert(title, message) {
  let alert = this.alertCtrl.create({
    title: title,
    subTitle: message,
    buttons: ['Ok']
  });
  alert.present();
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
