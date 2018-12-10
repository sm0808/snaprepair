import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from "../home/home";
import { AuthService } from "../../services/auth-service";
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../../providers/user/user';
import { USER_IMG_URL } from "../../services/constants";
import * as firebase from 'firebase';

import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public name              : string = "";
  public isValidEmail      : any    = false;
  public loadingAnimation  : any    = './assets/img/loading-animation.gif';
  public c_password        : any    = '';
  public userPicBase64     : any;
  public user              : any    = { name: '', email: '', phone: '', password: '', image: USER_IMG_URL+'avatar.png'};

  constructor(public nav: NavController, public authService: AuthService,
              public alertCtrl: AlertController,public loadingCtrl: LoadingController,
              public translate: TranslateService, public userService: UserProvider,
              public imagePicker: ImagePicker, public cropService: Crop,
              private file: File,) {}

  signup() {
    if(this.user['email'].length == 0 || this.user['password'].length == 0 || this.user['name'].length == 0 || this.user['phone'].length == 0){
      this.alertCtrl.create({ subTitle:'All Fields are Required!', buttons: ['ok']}).present();
    }
    else if (this.user['password'] != this.c_password) {
      this.alertCtrl.create({ subTitle:'Passwords doesn\'t match!', buttons: ['ok']}).present();
    }
    else{
      let loading = this.loadingCtrl.create({ content: 'Creating Account...'});
      loading.present();

      if(typeof this.userPicBase64 == 'undefined')
        this.userPicBase64 = '';

      let formData = new FormData();
      formData.append('profilePic', this.userPicBase64);
      
      // Register User to Server
      this.userService.signup(this.user, formData).then((result) => {
        if(result != null) {
          console.log("result: ",result);
          this.showAlert('Account Created', 'Your account has been set up. Please SignIn!')
          this.login();
        }
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });

    }

  }

  login() {
    this.nav.setRoot(LoginPage);
  }

  checkEmail(event) {
    console.log("event: ",event.target.value);
    let email = event.target.value;
    if (email != '') {
      let loading = this.loadingCtrl.create({ content: 'Checking Email Availability...'});
      loading.present();

      // Check for Email on Server
      this.userService.validateEmail(email).then((result) => {
        if(result) {
          this.isValidEmail = false;
          console.log("result: ",result);
          this.showAlert('Email Already Exsits', 'Please SignIn or use another email address to register!')
        }
        else {
          this.isValidEmail = true;
        }
        loading.dismiss();
      }, (err) => {
        loading.dismiss();
        console.log(err);
      });
    }
  }

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
          this.user.image = cropped_image;
          this.pathToBase64(this.user.image);
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

  showAlert(title, mesasge) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mesasge,
      buttons: ['OK']
    });
    alert.present();
  }

}
