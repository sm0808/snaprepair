import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from "../../services/constants";
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  apiUrl = API_URL;
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }
  chk:any=1;
  login(data) {
    return new Promise((resolve, reject) => {
      console.log(data);
      this.http.post(this.apiUrl+'/user.php?action=login&username=' + encodeURI(data.email) + '&password=' + encodeURI(data.password),JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  validateEmail(email) {
      // return this.http.get(SERVER_ADDRESS + 'auth/validate-username/' + username).map(res => res.json());
      return new Promise((resolve, reject) => {
        this.http.get(this.apiUrl+'/user.php?action=validateEmail&email='+email)
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          });
      });
  }

  signup(data, profilePic) {
    return new Promise((resolve, reject) => {
      let urlParam = 'action=registerUser&name=' + encodeURI(data.name) + '&email=' + encodeURI(data.email) + '&phone=' + encodeURI(data.phone) + '&password=' + encodeURI(data.password);

      this.http.post(this.apiUrl+'/user.php?'+urlParam, profilePic)
        .subscribe(res => {
          console.log(res);
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  UpdateProfile(userId, name, email, password, oldImage, formData) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/user.php?action=updateProfile&userId='+ userId +'&name='+ name +'&email='+ email +'&password='+ password+'&oldImage='+ oldImage, formData)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
 GetCard(user) {
    return new Promise((resolve, reject) => {
     
      this.http.get(this.apiUrl+'/GetTransaction?UserId='+user)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  setdefault(userid,id)
  {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/setdefault?UserId='+userid+'&id='+id, JSON.stringify(userid,id))
        .subscribe(res => {
        resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }  


  forgotPassword(data){
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/ForgotPassword?&email=' + encodeURI(data.email),JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  GetTolls() {
    return new Promise((resolve, reject) => {
      // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
      this.http.get(this.apiUrl + '/gettolls')
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  estimate_Fare(distance) {
    return new Promise((resolve, reject) => {
      // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
      this.http.post(this.apiUrl + '/CalculateFare?&carType=' + 5 + '&stateId=' + 1 + '&distance=' + encodeURI(distance) + '&time=' + 4, JSON.stringify(distance))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });

  }
  calculateFareForTime(data)
  {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl + '/CalculateFareForTime?carType=' + data['carType'] + '&stateId=' + data['stateId'] +
        '&totalTime=' + data['time'], JSON.stringify(data))
        .subscribe(res => {
        resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }  
  Gettransaction(data) {
    return new Promise((resolve, reject) => {
      // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
      this.http.get(this.apiUrl+'/GetTransaction?&UserId='+ data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
    Getsolotransaction(data) {
    return new Promise((resolve, reject) => {
      // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
      this.http.get(this.apiUrl+'/GetsoloTransaction?&UserId='+ data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  transaction(data) {
    return new Promise((resolve, reject) => {
      // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
      this.http.post(this.apiUrl+'/TranscationClient?UserId='+data['UserId']+'&RESULT='+data['RESULT']+
      '&BATCHID='+data['BATCHID']+'&PWCLIENTID='+data['PWCLIENTID']+'&AUTHCODE='+data['AUTHCODE']+'&AVSCODE='+data['AVSCODE']
      +'&PAYMETH='+data['PAYMETH']+'&PWUNIQUEID='+data['PWUNIQUEID']+'&AMOUNT='+data['AMOUNT']+'&MACCOUNT='+data['MACCOUNT']+
      '&CCTYPE='+data['CCTYPE']+'&PWTOKEN='+data['PWTOKEN']+'&PWCUSTOMERID='+data['PWCUSTOMERID'] +'&PWINVOICENUMBER='+data['PWINVOICENUMBER'],JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  tbtransaction(data) {
    return new Promise((resolve, reject) => {
      // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
      this.http.post(this.apiUrl+'/tbTranscation?UserId='+data['UserId']+'&RESULT='+data['RESULT']+
      '&BATCHID='+data['BATCHID']+'&PWCLIENTID='+data['PWCLIENTID']+'&AUTHCODE='+data['AUTHCODE']+'&AVSCODE='+data['AVSCODE']
      +'&PAYMETH='+data['PAYMETH']+'&PWUNIQUEID='+data['PWUNIQUEID']+'&PWADJAMOUNT='+data['PWADJAMOUNT']+'&PWSALETAX='+data['PWSALETAX']+
      '&PWSALEAMOUNT='+data['PWSALEAMOUNT']+'&AMOUNT='+data['AMOUNT'],JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  
  InsertConvo(num1,num2) {
    //console.log(msg);
     return new Promise((resolve, reject) => {
       // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
       this.http.post(this.apiUrl + '/InsertConvo?Number1=' + num1 + '&Number2=' + num2, JSON.stringify(num1,num2))
         .subscribe(res => {
           resolve(res);
         }, (err) => {
           reject(err);
         });
     });
 
   }
   DelConvo(num1,num2) {
    //console.log(msg);
     return new Promise((resolve, reject) => {
       // this.http.post(this.apiUrl+'/CalculateFare?&email=' + encodeURI(data.email),JSON.stringify(data))
       this.http.post(this.apiUrl + '/DelConvo?Number1=' + num1 + '&Number2=' + num2, JSON.stringify(num1,num2))
         .subscribe(res => {
           resolve(res);
         }, (err) => {
           reject(err);
         });
     });
 
   }
   Insert_Ride(ride,fare,status_id) {
     
    let dat=new Date;
   
    let loc=ride.origin.vicinity.split(',');
    let pick_loc=loc[0]+loc[1];
  
    let drp=ride.destination.vicinity.split(',');
    let drp_loc=drp[0]+drp[1];
    
     console.log('***',status) 

  
     if (fare == '')
     {
       if(this.chk==1)
       {
         this.chk=0;
        console.log('++++++++++ if ');
        return new Promise((resolve, reject) => {
       
          this.http.post(this.apiUrl +'/InsertRide?PassengerId=' + ride.passID +'&DriverId=' + ride.DriverId +'&CarId=' +
          ride.carId+'&carType=' + 4 +'&StatusId=' +status_id+'&Minutes=' + ride.time +'&Miles=' + ride.distance+'&TotalFare=' +
          0.0+'&Tolls=' +0.0 +'&Tip=' + 0.0 +'&RequestdateTime=' + ride.createdAt+'&PickUpdateTime=' + dat.toISOString() +'&pickUpAddress=' +
          pick_loc +'&pickUpCity=' + loc[2]+'&pickUpState=' +  loc[3] +'&pickUpLat=' + ride.origin.location.lat+'&pickUpLong=' + ride.origin.location.lat+'&DropOffDateTime=' + 
          dat.toISOString()+'&DropOffAddress=' +drp_loc +'&DropOffCity=' +  drp[2]+'&DropOffState=' +  drp[3]+'&DropOffLat=' +  ride.destination.location.lat
             +'&DropOffLong=' + ride.destination.location.lng,  JSON.stringify(ride,fare))
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
       }else{
        return new Promise((resolve, reject) => {
       
          this.http.post(this.apiUrl +'/InsertRide?PassengerId=' + ride.passID +'&DriverId=' + ride.DriverId +'&CarId=' +
          ride.carId+'&carType=' + 4 +'&StatusId=' +status_id+'&Minutes=' + ride.time +'&Miles=' + ride.distance+'&TotalFare=' +
          0.0+'&Tolls=' +0.0 +'&Tip=' + 0.0 +'&RequestdateTime=' + ride.createdAt+'&PickUpdeTime=' + "2018-10-23T09:54:48.918Z" +'&pickUpAddress=' +
          pick_loc +'&pickUpity=' + loc[2]+'&pickUpState=' +  loc[3] +'&pickUpLat=' + ride.origin.location.lat+'&pickUpLong=' + ride.origin.location.lat+'&DropOffDateTime=' + 
          dat.toISOString()+'&DropOffAddress=' +drp_loc +'&DropOffCity=' +  drp[2]+'&DropOffState=' +  drp[3]+'&DropOffLat=' +  ride.destination.location.lat
             +'&DropOffLong=' + ride.destination.location.lng,  JSON.stringify(ride,fare))
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        });
       }
      

     }else{


      return new Promise((resolve, reject) => {
     
       this.http.post(this.apiUrl +'/InsertRide?PassengerId=' + ride.passID +'&DriverId=' + ride.DriverId +'&CarId=' +
       ride.carId+'&carType=' + 4 +'&StatusId=' +status_id+'&Minutes=' + ride.time +'&Miles=' + ride.distance+'&TotalFare=' +
       fare.total+'&Tolls=' +fare.tolls +'&Tip=' + fare.tip +'&RequestdateTime=' + ride.createdAt+'&PickUpdateTime=' + ride.pickedUpAt+'&pickUpAddress=' +
       pick_loc +'&pickUpCity=' + loc[2]+'&pickUpState=' +  loc[3] +'&pickUpLat=' + ride.origin.location.lat+'&pickUpLong=' + ride.origin.location.lat+'&DropOffDateTime=' + 
       dat.toISOString()+'&DropOffAddress=' +drp_loc +'&DropOffCity=' +  drp[2]+'&DropOffState=' +  drp[3]+'&DropOffLat=' +  ride.destination.location.lat
          +'&DropOffLong=' + ride.destination.location.lng,  JSON.stringify(ride,fare))
         .subscribe(res => {
           resolve(res);
         }, (err) => {
           reject(err);
         });
     });
    }
   }
}
