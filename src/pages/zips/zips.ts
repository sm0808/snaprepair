import { Component } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, ToastController, NavParams, ModalController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { Zips } from "../../services/zip";
/**
 * Generated class for the ZipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-zips',
  templateUrl: 'zips.html',
})
export class ZipsPage {

  // Intialize all Variables
  public zips     : any;
  public user     : any;
  public loading  : any;

  constructor(public nav: NavController, public platform: Platform, public alertCtrl: AlertController,
              public loadingCtrl: LoadingController, public zipService: Zips,
              public toastCtrl: ToastController, public navParams: NavParams, 
              public localNotifications: LocalNotifications, public modalCtrl: ModalController) {
            
                this.getZips('Geting Zip Codes');
  }

  getZips(message) {
    this.showLoading(message);

    // Get Zips by Admin
    this.zipService.get_Zips().then((result) => {
      this.hideLoading();
      this.zips = result;
      localStorage.setItem('zips', JSON.stringify(this.zips));
      console.log('this.zips: ',this.zips);
    }, (err) => {
      this.hideLoading();
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ZipsPage');
  }

  show_addZip() {
    let prompt = this.alertCtrl.create({
      title: 'Add Zip Code',
      message: "",
      inputs: [
        {
          name: 'zip',
          placeholder: 'Enter Zip Code'
        }
      ],
      
      buttons: [
        {
          text: 'Cancel',
          cssClass:'CancelCss',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          cssClass:'SendCss',
          handler: data => {
            this.addZip(data['zip']);
          }
        }
      ]
    });
    prompt.present();
  }

  addZip(zip) {
    console.log("zip: ",zip);
    // Add Zip to DB
    this.showLoading('Adding Zip Code');
    this.zipService.add_Zip(zip).then((result) => {
      console.log("result: ",result);
      this.hideLoading();
      if(result) {
        this.showToast('Zip Code Added Successfully!');
        this.getZips('Updating Zip Codes');
        // this.zips.splice(0, 0, "Lene");
      }
    }, (err) => {
      this.hideLoading();
      console.log(err);
    });
  }

  deleteZip(zipID) {
    // Delete Zip from DB
    this.showLoading('Deleting Zip Code');
    this.zipService.delete_Zip(zipID).then((result) => {
      console.log("result: ",result);
      
      if(result) {
        this.showToast('Zip Code Deleted Successfully!');
        for (let i = 0; i < this.zips.length; i++) {
          if (zipID == this.zips[i]['id']) {
            this.zips.splice(i, 1);
            break;
          }
        }
      }
      this.hideLoading();
    }, (err) => {
      this.hideLoading();
      console.log(err);
    });
  }

  // Push Notification
  singlenotification(id, title, text) {
    this.localNotifications.schedule({
      id: id,
      title: title,
      text: text
    });
  }

  showLoading(message) {
    this.loading = this.loadingCtrl.create({
      content: message
    });
    this.loading.present();
  }

  hideLoading() {
    this.loading.dismiss();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

}
