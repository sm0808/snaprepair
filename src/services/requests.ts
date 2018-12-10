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
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/request.php?action=get_Requests')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  get_user_Requests(userId) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/request.php?action=get_user_Requests&userId='+userId)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  delete_Request(reqID) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/request.php?action=delete_Request&reqID='+reqID)
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

  get_user_make_req_data() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/request.php?action=get_make_req_data')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  sendRequest(data) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append( 'data', JSON.stringify(data) );

      this.http.post(this.apiUrl+'/request.php?action=add_Request', formData)
        .subscribe(res => {
          console.log("res: ", JSON.stringify(res));
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
