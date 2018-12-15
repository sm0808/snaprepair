import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading, AlertController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';

import { File } from '@ionic-native/file';

import { UserRequestsPage } from '../user-requests/user-requests';
import { Requests } from "../../services/requests";
declare var cordova: any;
/**
 * Generated class for the UserMakeRequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-make-request',
  templateUrl: 'user-make-request.html',
})
export class UserMakeRequestPage {

  public request_m      : any = { address: '', categoryId: '', description: '', ect: '', zip: '', userId: '', img: ''};
  public categories     : any = [];
  public zips           : any = [];
  public slidesPerView  : number = 1;
  public lastImage      : string = null;
  public loading        : Loading;
  public photos         : any = [];
  public photosBase64   : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public imagePicker: ImagePicker, public cropService: Crop,
              public camera: Camera, public actionSheetCtrl: ActionSheetController,
              private file: File, public toastCtrl: ToastController,
              public platform: Platform, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController, public requestService: Requests,
              public localNotifications: LocalNotifications) {

                this.showLoading('Getting Data');
                // Get Data
                this.requestService.get_user_make_req_data().then((result) => {
                  console.log('result: ',result);
                  this.hideLoading();
                  this.categories = result['categories'];
                  this.zips = result['zips'];
                }, (err) => {
                  this.hideLoading();
                  console.log(err);
                });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserMakeRequestPage');
  }

  openImagePicker() {
    if(this.photos.length >= 5)
      this.alertCtrl.create({ subTitle:'5 images per Request are Allowed!', buttons: ['ok']}).present();
    else {
      let count = 5 - this.photos.length;
      let options= {
        maximumImagesCount: count,
      }
      this.imagePicker.getPictures(options)
      .then((results) => {
        this.reduceImages(results).then(() => {
          console.log('all images cropped!! CROP ENDED');
        });
      }, (err) => { console.log(err) });
    }
  }

  takePicture_Simple() {
    if(this.photos.length >= 5)
      this.alertCtrl.create({ subTitle:'5 images per Request are Allowed!', buttons: ['ok']}).present();
    else {
      let options = {
        quality: 50,
        correctOrientation: true
      };

      this.camera.getPicture(options)
      .then((data) => {
        this.cropService
        .crop(data, {quality: 65})
        .then((newImage) => {

          this.pushToImages(newImage);

        }, error => console.error("Error cropping image", error));
      }, function(error) {
        console.log(error);
      });
    }
  }

  reduceImages(selected_pictures: any) : any {
    return selected_pictures.reduce((promise:any, item:any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {quality: 75})
        .then((cropped_image) => {
          console.log('all images cropped!!', cropped_image);
          this.pushToImages(cropped_image);
        });
      });
    }, Promise.resolve());
  }

  pushToImages(path) {
    // this.photos.push(path);
    this.photos.splice(0, 0, path);
    this.pathToBase64(path);
    this.set_slidesPerView();
  }

  pathToBase64(res) {
      let path : string = res.toString();
      console.log("path pathToBase64: ",path);
      try {
        let n = path.lastIndexOf("/");
        console.log("n : ",n);
        let x = path.lastIndexOf("g");
        console.log("x : ",x);
        let nameFile = path.substring(n+1, x+1);
        console.log("nameFile : ",nameFile);
        let directory = path.substring(0, n);
        console.log("directory : ",directory);
        console.log("this.file : ",this.file);
        console.log("cordova.file.externalCacheDirectory : ",cordova.file.externalCacheDirectory);
        this.file.readAsDataURL(cordova.file.externalCacheDirectory, nameFile).then((res) => {
          // this.file.readAsDataURL(directory.toString(), nameFile).then((res) => {
          // this.photosBase64.push(res);
          this.photosBase64.splice(0, 0, res);
          console.log("this.photosBase64 pathToBase64: ",this.photosBase64);

          // console.log("this.photosBase64: ",this.photosBase64);
          // this.photos.splice(0, 0, res);
          // this.set_slidesPerView();
        }).catch(err => {
          alert('error pathToBase64 ' + JSON.stringify(err));
          console.log('error pathToBase64 ', JSON.stringify(err));
        });
      } catch(error) {
         alert(error);
         console.log("error pathToBase64: ",error);
      }
  }

  set_slidesPerView() {
    if(this.photos.length == 1)
      this.slidesPerView = 1;
    else
      this.slidesPerView = 2;
  }

  removeImage(index) {
    this.photos.splice(index, 1);
    this.photosBase64.splice(index, 1);
    this.set_slidesPerView();
    // console.log("photos", JSON.stringify(this.photos));
  }

  sendRequest() {
    if(this.request_m['address'] == '' || this.request_m['categoryId'] == '' || this.request_m['description'] == '' || this.request_m['ect'] == '' || this.request_m['zip'] == '')
        this.alertCtrl.create({ subTitle:'All Fields are Required!', buttons: ['ok']}).present();
    else if(this.photos.length < 1)
        this.alertCtrl.create({ subTitle:'Atleast provide one image for request!', buttons: ['ok']}).present();
    else {
      this.showLoading('Sending Request');

      let user = JSON.parse(localStorage.getItem('userData'));
      this.request_m['userId'] = user['userId'];
      this.request_m['img']    = this.photosBase64;

      console.log("this.photosBase64 sendRequest: ",this.photosBase64);
      console.log("this.request_m: ",this.request_m);

      // Send Request
      this.requestService.sendRequest(this.request_m).then((result) => {
        console.log('result: ',result);
        this.hideLoading();
        if (result) {
          this.showAlert('Request Sent', 'Your request has been sent to SnapRepair');
          this.navCtrl.setRoot(UserRequestsPage);
        }
      }, (err) => {
        this.hideLoading();
        this.showAlert('Request Sending Failed', JSON.stringify(err));
        console.log("err", JSON.stringify(err));
      });

    }
  }


  showAlert(title, mesasge) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mesasge,
      buttons: ['OK']
    });
    alert.present();
  }

  // Push Notification
  singlenotification(id, title, text) {
    this.localNotifications.schedule({
      id: id,
      title: title,
      text: text
    });
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
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
}
