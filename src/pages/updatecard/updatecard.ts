import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home'
import { AuthService } from "../../services/auth-service";
import * as firebase from 'firebase';
import { ENABLE_SIGNUP } from '../../services/constants';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-updatecard',
  templateUrl: 'updatecard.html'
})
export class UpdateCard {

  public data = {};
  public user: any;
  public number: any;
  public card_Month: any;
  public card_Year: any;
  public cvv: any;
  public card: any;

  constructor(public nav: NavController, public authService: AuthService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,

    public translate: TranslateService, public userService: UserProvider) {
    this.user = JSON.parse(localStorage.getItem('userData'));
    this.data['UserId'] = this.user.userId;

  }
  ngOnInit() {
    this.userService.GetCard(this.data['UserId']).then((result) => {
      this.card = result['data'];
      this.number = result['data'].maccount;

    }, (err) => {

      console.log(err);
    });

  }
  UpdateCard() {

    console.log(this.number);
    console.log(this.data);
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
              <CARDNUMBER>`+ parseInt( this.number )+ `</CARDNUMBER>
              <EXP_MM>`+ this.card_Month + `</EXP_MM>
              <EXP_YY>`+ this.card_Year + `</EXP_YY>
              <CVV2>`+ this.cvv + `</CVV2>
           </CUSTOMER>
        </PAYMENTREQUEST>`;

      xmlhttp.onreadystatechange = () => {

        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {

            let xml = xmlhttp.responseXML;

            var response = xml.getElementsByTagName("PAYMENTRESPONSE")[0];
            let length = response.childElementCount;
            console.log(length);
            console.log(response);

            if (length < 9) {
              loading.dismiss();
              this.alertCtrl.create({ subTitle: 'Invalid Credentials', buttons: ['ok'] }).present();
            } else {


              for (let i = 0; i < length; i++) {

                this.data[response.childNodes[i].nodeName] = response.getElementsByTagName(response.childNodes[i].nodeName)[0].childNodes[0].nodeValue;

              }
              console.log(this.data);
              this.userService .transaction(this.data).then((result) => {

                loading.dismiss();
                console.log('Server Response', result['data']);
                this.alertCtrl.create({ subTitle: 'Thanks for Registration', buttons: ['ok'] }).present();
                //this.number = null;
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
}



