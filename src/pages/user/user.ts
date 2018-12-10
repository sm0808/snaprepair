import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Platform, AlertController, Events } from 'ionic-angular';
import { AngularFireDatabase } from "angularfire2/database/database";
import { LoginPage } from '../login/login';
import { HomePage } from "../home/home";
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';

import { USER_IMG_URL } from "../../services/constants";

import { AuthService } from "../../services/auth-service";
import { TripService } from '../../services/trip-service';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../../providers/user/user';

import * as firebase from 'firebase';
import 'rxjs/add/operator/map';


declare var Stripe: any;
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public user          : any = { name: '', email: '', password: ''};
  public userPic       : any;
  public userPicBase64 : any;
  public password      : any = '';
  public c_password    : any = '';
  public loadingAnimation  : any = './assets/img/loading-animation.gif';



  constructor(public userService: UserProvider, public nav: NavController,
              public authService: AuthService, public navParams: NavParams,
              public alertCtrl: AlertController, public toastCtrl: ToastController,
              public loadingCtrl: LoadingController, public platform: Platform,
              public tripService: TripService, public translate: TranslateService,
              public db: AngularFireDatabase, public events: Events,
              public imagePicker: ImagePicker, public cropService: Crop,
              private file: File,) {

                this.user = JSON.parse(localStorage.getItem('userData'));
                console.log("this.user: ",this.user);
                this.userPic = USER_IMG_URL + this.user.image;

    // let userx = navParams.get('user');
    // this.authService.getUser(userx.uid).take(1).subscribe(snapshot => {
    //   snapshot.uid              = snapshot.$key;
    //   // this.user["photoURL"]     = snapshot['photoURL'];
    //   this.user["uid"]          = snapshot['uid'];
    //   this.user.isEmailVerified = firebase.auth().currentUser.emailVerified;
    //   console.log("this.user: ",this.user)
    // });

    // this.user = {};
    // this.path = JSON.parse(localStorage.getItem('userData'));
    // this.user["photoURL"]    = "http://185.48.64.136/" + this.path['profilePicPath'];
    // this.user["name"]        = this.path['firstName'] + " " + this.path['lastName'];;
    // this.user["firstName"]   = this.path['firstName'];
    // this.user["lastName"]    = this.path['lastName'];
    // this.user["email"]       = this.path['email'];
    // this.user["phoneNumber"] = this.path['phone'];

    // authService.getCardSetting().take(1).subscribe(snapshot => {
    //   this.number = snapshot.number;
    //   this.exp = snapshot.exp;
    //   this.cvv = snapshot.cvv;
    // });
  }

  // save user info
  save() {
    if(this.c_password != this.password)
      this.showAlert('Password Missmatch!', 'Please make sure you enter same password');
    else if(this.user.name == '' || this.user.password == '')
      this.showAlert('Empty Fields!', 'All fields are required');
    else {
      let loading = this.loadingCtrl.create({ content: 'Please wait...' });
      loading.present();
      // let x = (<HTMLInputElement>document.getElementById('avatar')).files[0];
      // console.log(x);
      if(typeof this.userPicBase64 == 'undefined')
        this.userPicBase64 = '';

      let formData = new FormData();
      formData.append('profilePic', this.userPicBase64);

      this.userService.UpdateProfile(this.user.userId, this.user.name, this.user.email, this.password, this.user.image, formData).then((result) => {
        console.log(result);
        localStorage.setItem('userData', JSON.stringify(result));
        this.user = result;
        loading.dismiss();
        this.displayToast("Profile has been updated");
        this.trigger_User_Update_Event();
      }, (err) => {
        loading.dismiss();
        this.showAlert('Error Updating', JSON.stringify(err));
        console.log(err);
      });

    }
  }

  trigger_User_Update_Event() {
    this.events.publish('user:updated', this.user, Date.now());
  }

  showAlert(title, mesasge) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mesasge,
      buttons: ['OK']
    });
    alert.present();
  }


  // // choose file for upload
  // chooseFile() {
  //   document.getElementById('avatar').click();
  // }

  // fileChange(event){
  //   try {
  //     if(event.target.files && event.target.files[0]){
  //       let reader = new FileReader();

  //       reader.onload = (event:any) => {
  //         this.userPic   = event.target.result;
  //       }
  //       reader.readAsDataURL(event.target.files[0]);
  //     }
  //       let fileList: FileList = event.target.files;
  //       console.log("fileList: ",fileList);

  //       let file: File = fileList[0];
  //       // this.user['profilePic'] = file;
  //       console.log(file);
  //   } catch(error) {
  //     this.showAlert('Error Changing File', JSON.stringify(error));
  //   }
  // }

  openImagePicker() {
      let options= {
        maximumImagesCount: 1,
      }
      this.imagePicker.getPictures(options)
      .then((results) => {
        this.reduceImages(results).then(() => {
          console.log('all images cropped!! CROP ENDED');
        });
      }, (err) => { console.log(err) });    
  }

  reduceImages(selected_pictures: any) : any {
    return selected_pictures.reduce((promise:any, item:any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {quality: 90})
        .then((cropped_image) => {
          console.log('all images cropped!!', cropped_image);
          this.userPic = cropped_image;
          this.pathToBase64(this.userPic);
          // this.pushToImages(cropped_image);
        });
      });
    }, Promise.resolve());
  }

  pathToBase64(res) {
    let path : string = res.toString();
    try {
      let n = path.lastIndexOf("/");
      let x = path.lastIndexOf("g");
      let nameFile = path.substring(n+1, x+1);
      let directory = path.substring(0, n);
      this.file.readAsDataURL(directory.toString(), nameFile).then((res) => {
        this.userPicBase64 = res;
        // this.userPic = res;      
      }).catch(err => alert('error pathToBase64 ' + JSON.stringify(err)));
    } catch(error) {
       alert(error);
    }
  }

  // upload thumb for item
  upload() {
    // // Create a root reference
    // // let storageRef = firebase.storage().ref();
    // let loading    = this.loadingCtrl.create({ content: 'Please wait...' });
    // loading.present();

    // let mypic;
    // for (let selectedFile of [(<HTMLInputElement>document.getElementById('avatar')).files[0]]) {
    //   mypic = [(<HTMLInputElement>document.getElementById('avatar')).files[0]];
    //   console.log("mypic: ",mypic);
    //   this.userPic = selectedFile;

    //   let path = '/users/' + Date.now() + `${selectedFile.name}`;
    //   console.log("path: ",path);


    //   loading.dismiss();
    //   // let iRef = storageRef.child(path);
    //   // console.log("path: ",path);

    //   // iRef.put(selectedFile).then((snapshot) => {
    //   //   this.user.photoURL = snapshot.downloadURL;
    //   //   // this.updatePicPath_firbase();
    //   //   loading.dismiss();
    //   //   //console.log(snapshot.fullPath);
    //   // });
    // }
  }

  displayToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }
}
