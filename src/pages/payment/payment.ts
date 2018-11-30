import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, Platform, AlertController } from "ionic-angular";
// import { HomePage } from "../home/home";
import { UpdateCard } from '../updatecard/updatecard';

import { AuthService } from "../../services/auth-service";
import { TripService } from '../../services/trip-service';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../../providers/user/user';

// import * as firebase from 'firebase';
import 'rxjs/add/operator/map';
import { empty } from 'rxjs/Observer';

declare var Stripe: any;
/**
 * Generated class for the PaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation. B33437
 */

@IonicPage()
@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',


})
export class PaymentPage {

  //public paymethods: any = 'creditcard';
  public data = {};
  public user: any;
  public number: any;
  public card_Month: any;
  public card: any;
  public card_length: any;

  public card_Year: any;
  public cvv: any;
  public chk: any;

  constructor(public nav: NavController, public authService: AuthService,
    public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public platform: Platform, public tripService: TripService,
    public translate: TranslateService, public userService: UserProvider) {
    let id = JSON.parse(localStorage.getItem('userData'));
    this.data['UserId'] = id.userId;
  }

   ngOnInit() {
    this.userService.GetCard(this.data['UserId']).then((result) => {
      this.card = result['data'];
  
    console.log( "Data", this.card)
    this.card_length=result['data'].length;
    console.log( "length",this.card_length)

    }, (err) => {

      console.log(err);
    });

  }
  default(id){

    this.userService.setdefault(this.data['UserId'],id).then((result) => {
     console.log(result)
      this.nav.pop();
    }, (err) => {

      console.log(err);
    });

  }

  saveCard() {



    if (this.number == null || this.card_Month == null || this.card_Year == null || this.cvv == null) {
      this.alertCtrl.create({ subTitle: 'Empty Fields', buttons: ['ok'] }).present();
    } else {
      let loading = this.loadingCtrl.create({ content: 'Processing...' });
      loading.present();
      this.data = {};
      this.user = JSON.parse(localStorage.getItem('userData'));
      this.data['UserId'] = this.user.userId;

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
              <PWTRANSACTIONTYPE>STORETOKEN</PWTRANSACTIONTYPE>
              <PWSALEAMOUNT>0</PWSALEAMOUNT>
              <PWINVOICENUMBER>001001001004</PWINVOICENUMBER>
              <CARDPRESENT>FALSE</CARDPRESENT>
           </TRANSACTIONHEADER>
           <CUSTOMER>
              <PWMEDIA>CC</PWMEDIA>
              <CARDNUMBER>`+ this.number + `</CARDNUMBER>
              <EXP_MM>`+ this.card_Month + `</EXP_MM>
              <EXP_YY>`+ this.card_Year + `</EXP_YY>
              <CVV2>`+ this.cvv + `</CVV2>
           </CUSTOMER>
        </PAYMENTREQUEST>`;

      xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            let xml = xmlhttp.responseXML;
            //
            var response = xml.getElementsByTagName("PAYMENTRESPONSE")[0];
            // console.log(response_number);
            let length = response.childElementCount;
            //loading.dismiss();
            console.log(length);
            console.log(response);
            // for (let i = 0; i < length; i++) {
            //       this.data[response.childNodes[i].nodeName] = response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue;
            //       //console.log(xx);
            //     }
            //     console.log(this.data);
            //loading.dismiss();
            if (length < 9) {
              loading.dismiss();
              this.alertCtrl.create({ subTitle: 'Invalid Credentials', buttons: ['ok'] }).present();
            } else {
              loading.present();
              for (let i = 0; i < length; i++) {
                this.data[response.childNodes[i].nodeName] = response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue;
                //console.log(xx);
              }
              console.log(this.data);

              this.userService.transaction(this.data).then((result) => {

                loading.dismiss();
                console.log('Server Response', result['data']);
                this.alertCtrl.create({ subTitle: 'Thanks for Registration', buttons: ['ok'] }).present();
                this.number = null;
                this.card_Month = null;
                this.card_Year = null;
                this.cvv = null;


              }, (err) => {
                loading.dismiss();
                console.log(err);
              });
            }

          } else {
            loading.dismiss();
            this.alertCtrl.create({ subTitle: 'No Access Origin', buttons: ['ok'] }).present();

          }
        }
      }
      // Send the POST request
      xmlhttp.setRequestHeader('Content-Type', 'text/xml');

      xmlhttp.responseType = "document";
      xmlhttp.send(sr);



    }

  }

  update() {
    this.userService.GetCard(this.data['UserId']).then((result) => {


      let data = JSON.stringify(result['data']).length;


      if (data > 2) {

        this.nav.push(UpdateCard);


      } else {
        this.alertCtrl.create({ subTitle: 'Your Card Not Registerd !', buttons: ['ok'] }).present();

      }


    }, (err) => {

      console.log(err);
    });


  }

}


