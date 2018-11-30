import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { PlaceService } from '../../services/place-service';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from "../home/home";
import { MapPage } from "../map/map";
import { TripService } from "../../services/trip-service";
import { DealService } from "../../services/deal-service";
import { TrackingPage } from '../tracking/tracking';

/*
 Generated class for the PlacesPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-places',
  templateUrl: 'places.html'
})
export class PlacesPage {
  // all places
  places: any = [];

  // search keyword
  keyword = '';

  // lat & lon
  lat: number;
  lon: number;

  // loading object
  loading: any;

  // page loaded flag
  pageLoaded = false;

  constructor(public nav: NavController, public placeService: PlaceService, public geolocation: Geolocation,
              public loadingCtrl: LoadingController, public navParams: NavParams, public tripService: TripService,
              public dealService: DealService) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      this.search();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  // show search input
  ionViewDidEnter() {
    this.pageLoaded = true;
  }

  // hide search input
  ionViewWillLeave() {
    this.pageLoaded = false;
  }

  // choose a place
  selectPlace(place) {
    console.log(place);
    let tripId = this.navParams.get('tripId');
    if (this.navParams.get('type') == 'origin') {
      this.tripService.setOrigin(place.vicinity, place.geometry.location.lat, place.geometry.location.lng);
      console.log("origin set");
    } else {
      this.tripService.setDestination(place.vicinity, place.geometry.location.lat, place.geometry.location.lng);
      console.log("destination set");
      if (this.navParams.get('page') == 'tracking') {
        let driverID = this.navParams.get('driverID');
        console.log("driverID: ",driverID);
        this.dealService.updateDeal_dest(driverID, place);
        this.tripService.updateTrip_dest(tripId, place);
      }
    }

    // this.nav.setRoot(HomePage);
    this.nav.setRoot(TrackingPage, {tripId: tripId});
  }

  // clear search input
  clear() {
    this.keyword = '';
    this.search();
  }

  // search by address
  search() {
    this.showLoading();
    this.placeService.searchByAddress(this.keyword, this.lat, this.lon).subscribe(result => {
      this.hideLoading();
      this.places = result.results;
    });
    setTimeout(()=>{ this.hideLoading() }, 5000);
  }

  // calculate distance from a place to current position
  calcDistance(place) {
    return this.placeService.calcCrow(place.geometry.location.lat, place.geometry.location.lng, this.lat, this.lon).toFixed(1);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  // open map page
  openMap() {
    let tripId    = this.navParams.get('tripId');
    let prev_page = this.navParams.get('page');
    let driverID  = this.navParams.get('driverID');
    this.nav.push(MapPage, {type: this.navParams.get('type') , page: prev_page, driverID: driverID, tripId: tripId });
  }
}
