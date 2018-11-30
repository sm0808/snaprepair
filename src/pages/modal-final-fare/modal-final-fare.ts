import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController, NavParams, ViewController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { UserProvider } from '../../providers/user/user';
import { TripService } from "../../services/trip-service";

/**
 * Generated class for the ModalFinalFarePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-final-fare',
  templateUrl: 'modal-final-fare.html',
})
export class ModalFinalFarePage {
  carddata: any;
  responsedata: any={};

   total_amount:any;
   trip_key:any;
  constructor( public tripService: TripService,public navCtrl: NavController, 
               public userService: UserProvider, public navParams: NavParams, 
               public alertCtrl: AlertController, public loadingCtrl: LoadingController, 
               public viewCtrl: ViewController, public localNotifications: LocalNotifications) {
    this.carddata = this.navParams.get('Card');
    //alert(JSON.stringify(this.carddata))

    this.total_amount= this.navParams.get('data')
    this.trip_key=this.navParams.get('key');

    console.log("Fare AMounts++++++++", this.total_amount);    
    console.log("Trip key++++++++", this.trip_key);
  }
  data: any = {};
  ionViewCanEnter() {
    this.data = this.navParams.get('data');
  }
  // dismiss() {
  //   this.viewCtrl.dismiss();
  // }
  dismiss() {
    let loading = this.loadingCtrl.create({ content: 'Processing...' });
    loading.present();
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
              <PWSALEAMOUNT>`+ this.data['total'] + `</PWSALEAMOUNT>
              <CARDPRESENT>FALSE</CARDPRESENT>
           </TRANSACTIONHEADER>
           <CUSTOMER>
              <PWMEDIA>CC</PWMEDIA>
               <PWTOKEN>`+ this.carddata['pwtoken'] + `</PWTOKEN>
           </CUSTOMER>
        </PAYMENTREQUEST>`;

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {


          let xml = xmlhttp.responseXML;
          var response = xml.getElementsByTagName("PAYMENTRESPONSE")[0];

          let length = response.childElementCount;

          // console.log("Length ", length);
          // console.log("Response Data", response);

          if (length < 9) {
            
            let rideinfo ;
            this.tripService.getrideinfo(this.trip_key).subscribe(snapshot => {
       
             rideinfo=snapshot;
            });
            // console.log('ELSE Fare Data',this.total_amount)
            // console.log(' ELSE -----',rideinfo)
            
            this.userService.Insert_Ride(rideinfo,this.total_amount,10).then((result) => {
  
                  console.log(result);
               
                  
               
               }, (err) => {
                 console.log(err);
               });
  
            loading.dismiss();
            this.viewCtrl.dismiss();
            this.alertCtrl.create({ subTitle: 'Problem In Transaction', buttons: ['ok'] }).present();
            this.singlenotification(1, 'Transaction Error', 'Your payment method was rejected');
          } else {

            for (let i = 0; i < length; i++) {
              this.responsedata[response.childNodes[i].nodeName] = response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue;
              // console.log(response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue);
            }
            let userId = JSON.parse(localStorage.getItem('userData'));

            this.responsedata['UserId']=  userId.userId;
           // console.log("Thsi Response data", this.responsedata);

            this.userService.tbtransaction(this.responsedata).then((result) => {

              console.log(result['data']);
              loading.dismiss();
              this.viewCtrl.dismiss();
              this.alertCtrl.create({ subTitle: ' Transaction Completed', buttons: ['ok'] }).present();
              this.singlenotification(1, 'Transaction Completed', 'Payment has been made. Thanks');
              //
              
              let rideinfo ;
              this.tripService.getrideinfo(this.trip_key).subscribe(snapshot => {
         
               rideinfo=snapshot;
              });
              // console.log('Fare Data',this.total_amount)
              // console.log('-----',rideinfo)
              
              this.userService.Insert_Ride(rideinfo,this.total_amount,4).then((result) => {
                console.log(result);
             
                
             
             }, (err) => {
               console.log(err);
             });


            }, (err) => {
              loading.dismiss();
              console.log(err);
            });

          }

        }
        else {

          let rideinfo ;
          this.tripService.getrideinfo(this.trip_key).subscribe(snapshot => {
     
           rideinfo=snapshot;
          });

          // console.log('ELSE Fare Data',this.total_amount)
          // console.log(' ELSE -----',rideinfo)
          
          this.userService.Insert_Ride(rideinfo,this.total_amount,10).then((result) => {

                console.log(result);
             
                
             
             }, (err) => {
               console.log(err);
             });

       
          this.alertCtrl.create({ subTitle: 'Transaction Is Not Done', buttons: ['ok'] }).present();
          this.singlenotification(1, 'Transaction Error', 'Your payment method was rejected');
          //this.mydata = null;
          loading.dismiss();
          this.viewCtrl.dismiss();
        }




      }
    }
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = "document";
    xmlhttp.send(sr);
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
