import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from "./constants";
import 'rxjs/add/operator/map';

/*
  Generated class for the Requests service.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Requests {
  apiUrl = API_URL;
  constructor(public http: HttpClient) {
    console.log('Hello Requests Provider');
  }

  get_Requests() {
    console.log("apiUrl: ",this.apiUrl);
    
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/request.php?action=get_Requests')
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
