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
export class Zips {
  apiUrl = API_URL;

  constructor(public http: HttpClient) {
    console.log('Hello Offers Provider');
  }

  get_Zips() {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/zip_code.php?action=get_Zips')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  add_Zip(zip) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/zip_code.php?action=add_Zip&zip='+zip)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  delete_Zip(zipID) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/zip_code.php?action=delete_Zip&zipID='+zipID)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

}
