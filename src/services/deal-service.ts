import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database/database";
import { DEAL_STATUS_PENDING } from "./constants";
import { AuthService } from "./auth-service";

@Injectable()
export class DealService {
  constructor(public db: AngularFireDatabase, public authService: AuthService) {
  }

  // sort driver by rating & distance
  sortDriversList(drivers: Array<any>) {
    return drivers.sort((a, b) => {
      return (a.rating - a.distance / 6) - (b.rating - b.distance / 6);
    })
  }

  // make deal to driver
  makeDeal(driverId, origin, destination, distance, fee, currency, note, paymentMethod, promocode, discount,passid) {
    let user = this.authService.getUserData();
    var currentUnixTime = new Date

      console.log( "time show--", currentUnixTime.toISOString());
    return this.db.object('deals/' + driverId).set({
      passengerId: user.uid,
      currency: currency,
      origin: origin,
      destination: destination,
      distance: distance,
      fee: fee,
      note: note,
      paymentMethod: paymentMethod,
      status: DEAL_STATUS_PENDING,
      createdAt: currentUnixTime.toISOString(),
      promocode: promocode,
      discount: discount,
      Bit:0,
      time:0,
      carId:'',
      DriverId:'',
      passID:passid
      
      
    });
  
  }

  // Update deal Destination For driver
  updateDeal_dest(driverId, destination) {
    return this.db.object('deals/' + driverId).update({
      destination: destination,
    });
  }

  // get deal by driverId
  getDriverDeal(driverId) {
    return this.db.object('deals/' + driverId);
  }

  // remove deal
  removeDeal(driverId) {
    return this.db.object('deals/' + driverId).remove();
  }
}
