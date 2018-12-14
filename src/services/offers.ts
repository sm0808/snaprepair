import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from "./constants";
import 'rxjs/add/operator/map';

/*
  Generated class for the Offers service.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Offers {
  apiUrl = API_URL;

  constructor(public http: HttpClient) {
    console.log('Hello Offers Provider');
  }

  get_Offers() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/offer.php?action=get_Offers')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  get_accepted_offers() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/offer.php?action=get_accepted_offers')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  get_user_accepted_offers(userId) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/offer.php?action=get_user_accepted_offers&userId='+userId)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  send_Offer(reqID, price, desc) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/offer.php?action=add_offer&reqID='+reqID+'&price='+price+'&desc='+desc)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  update_Offer(offerID, price) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/offer.php?action=update_Offer&offerID='+offerID+'&price='+price)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  update_Offer_status_by_user(offerID, status) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/offer.php?action=update_Offer_status_by_user&offerID='+offerID+'&status='+status)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  update_accepted_Offer_Status(offerID, status) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/offer.php?action=update_accepted_Offer_Status&offerID='+offerID+'&status='+status)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  charge_accepted_Offer(offerID, token, email, price, isCancelled) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/offer.php?action=charge_accepted_Offer&offerID='+offerID+'&token='+token+'&email='+email+'&price='+price+'&isCancelled='+isCancelled)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cancel_Request(offerID, isCancelled) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/offer.php?action=cancel_Request&offerID='+offerID+'&isCancelled='+isCancelled)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  get_Request_Images(reqID) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/request.php?action=get_Request_Images&reqID='+reqID)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  
  signup(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      let urlParam = 'firstName=' + encodeURI(data.fname) + '&lastName=' + encodeURI(data.lname) + '&email=' + encodeURI(data.email) + '&password=' + encodeURI(data.password) + '&userType=' + encodeURI(data.type) + '&phone=' + encodeURI(data.phone) + '&referralCode=' + encodeURI(data.referal);
      console.log(this.apiUrl+'/SignUp?'+urlParam);
      this.http.post(this.apiUrl+'/SignUp?'+urlParam,JSON.stringify(data))
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
