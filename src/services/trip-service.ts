import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database/database";
import { Place } from "./place";
import { AuthService } from "./auth-service";

@Injectable()
export class TripService {
  private id: any;
  private trips: any;
  private currency: string;
  private origin: any;
  private destination: any;
  private distance: number;
  private fee: number;
  private note: string;
  private paymentMethod: any = 'cash';
  private vehicle: any;
  private promocode: any;
  private discount: any;
  private cancelledTripByDriver: boolean = false;
  private unverifiedDriversArr: Array<any> = [];
  // vehicle's icon
  private icon: any;
  private availableDrivers: Array<any> = [];
  private bit: boolean = true;
  private bit2: boolean = true;

  constructor(public db: AngularFireDatabase, public authService: AuthService) {

  }


  getrideinfo(tripId) {
    return  this.db.object('trips/' + tripId);
   }
  getAll() {
    return this.trips;
  }

  setTotalFee(tripId, amount) {
    return this.db.object('trips/' + tripId).update({
      fee: amount,
    });
  }
  setId(id) {
    return this.id = id;
  }

  getId() {
    return this.id;
  }

  setCurrency(currency) {
    return this.currency = currency;
  }

  getCurrency() {
    return this.currency;
  }

  setOrigin(vicinity, lat, lng) {
    let place = new Place(vicinity, lat, lng);
    return this.origin = place.getFormatted();
  }

  getOrigin() {
    return this.origin;
  }

  setDestination(vicinity, lat, lng) {
    let place = new Place(vicinity, lat, lng);
    return this.destination = place.getFormatted();
  }

  getDestination() {
    return this.destination
  }

  setDistance(distance) {
    return this.distance = distance;
  }

  getDistance() {
    return this.distance;
  }

  setFee(fee) {
    return this.fee = fee;
  }

  getFee() {
    return this.fee;
  }

  setNote(note) {
    return this.note = note;
  }

  getNote() {
    return this.note;
  }

  setPromo(promocode) {
    return this.promocode = promocode;
  }
  getPromo() {
    return this.promocode;
  }

  setDiscount(discount) {
    return this.discount = discount;
  }
  getDiscount() {
    return this.discount;
  }

  setPaymentMethod(method) {
    return this.paymentMethod = method;
  }

  getPaymentMethod() {
    return this.paymentMethod;
  }

  setVehicle(vehicle) {
    return this.vehicle = vehicle;
  }

  getVehicle() {
    return this.vehicle;
  }

  setIcon(icon) {
    return this.icon = icon;
  }

  getIcon() {
    return this.icon;
  }

  setAvailableDrivers(vehicles) {
    console.log(vehicles);
    this.availableDrivers = vehicles;
  }

  getAvailableDrivers() {
    return this.availableDrivers;
  }

  getTrip(id) {
    return this.db.object('trips/' + id);
  }
  getArrivalTime(id) {
    return this.db.object('trips/' + id +'/time');
  }
  getTrips() {
    let user = this.authService.getUserData();
    console.log(user);
    return this.db.list('trips', {
      query: {
        orderByChild: 'passengerId',
        equalTo: user.uid
      }
    });
  }

  get_Driver_Loc(locality, vehicleType, driverID) {
    return this.db.object('localities/' + locality + '/' + vehicleType + '/' + driverID);
  }

  getTripStatus(tripId) {
    return this.db.object('trips/' + tripId);
  }

  cancelTrip(Trip_Id) {
    return this.db.object('trips/' + Trip_Id).update({
      droppedOffAt: Date.now(),
      status: 'canceled'
    })
  }

  rateTrip(tripId, stars) {
    return this.db.object('trips/' + tripId).update({
      rating: parseInt(stars)
    });
  }

  // Update Trip Destination For driver
  updateTrip_dest(tripId, destination) {
    return this.db.object('trips/' + tripId).update({
      destination: destination,
    });
  }
  getBit(tripId) {
    //console.log("checking", id)
    return this.db.object('trips/' + tripId + '/Bit');
  }
  setBit(tripId, val) {
    this.db.object('trips/' + tripId).update({
      Bit: val,
    });

  }
  setbit(bit) {
    this.bit = bit;
  }

  getbit() {
    return this.bit;
  }
  setbit2(bit2) {
    this.bit2 = bit2;
  }
  getbit2() {
    return this.bit2;
  }

  unverifiedDrivers(driverID) {
    this.cancelledTripByDriver = true;
    this.unverifiedDriversArr.push(driverID);
  }

  show_Unverified_Driver_Notification() {
    if(this.cancelledTripByDriver) {
      this.cancelledTripByDriver = false;
      return true;
    }
    else
      return false;
  }
}
