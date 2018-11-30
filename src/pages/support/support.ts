import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Platform} from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the SupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {
  public sendTo   : any = '';
  public subject  : string = '';
  public message  : string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,private callNumber: CallNumber,private socialSharing: SocialSharing,public platform   : Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');
  }

  sendMail(){
    this.platform.ready()
    .then(() =>
    {
       this.socialSharing.canShareViaEmail()
       .then(() =>
       {
          this.socialSharing.shareViaEmail(this.message, this.subject, this.sendTo)
          .then((data) =>
          {
             console.log('Shared via Email');
          })
          .catch((err) =>
          {
             console.log('Not able to be shared via Email');
          });
       })
       .catch((err) =>
       {
          console.log('Sharing via Email NOT enabled');
       });
    });
  }
  makeCall(){
    this.callNumber.callNumber("18001010101", true)
  .then(res => console.log('Launched dialer!', res))
  .catch(err => console.log('Error launching dialer', err));
  }

}
