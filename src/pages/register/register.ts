import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from "../home/home";
import { AuthService } from "../../services/auth-service";
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../../providers/user/user';
import * as firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  // public email: string = "";
  // public password: string = "";
  // public phoneNumber: string = "";
  public name: string = "";
  public respnseData = null;
  public user = { fname: 'Mujtaba', lname: 'aslam', email: '', phone: '+923120063270', password: '',photoURL:'~/assets/img/logo.png', referal: '', type: '2'};

  constructor(public nav: NavController, public authService: AuthService,
              public alertCtrl: AlertController,public loadingCtrl: LoadingController,
              public translate: TranslateService, public userService: UserProvider) {}

  signup() {
    if(this.user['email'].length == 0 || this.user['password'].length == 0 || this.user['fname'].length == 0 || this.user['phone'].length == 0){
      this.alertCtrl.create({ subTitle:'Invalid Credentials', buttons: ['ok']}).present();
    }
    else{
      let loading = this.loadingCtrl.create({ content: 'Creating Account...'});
      loading.present();

      this.name = this.user['fname'] +' '+ this.user['lname'];
      // Register User to Yur Server
      this.userService.signup(this.user).then((result) => {
        this.respnseData = result;
        if(this.respnseData != null) {
          console.log(result);

          // Register User to Firebase
          this.authService.register(this.user['email'], this.user['password'], this.name, this.user['phone']).subscribe(authData => {
            loading.dismiss();
            this.nav.setRoot(LoginPage);
          }, error => {
            loading.dismiss();
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: ['OK']
            });
            alert.present();
          });

        }
      }, (err) => {
        console.log(err);
      });

    }

  }

  login() {
    this.nav.setRoot(LoginPage);
  }

  chooseFile() {
    document.getElementById('avatar').click();
  }

  // upload thumb for item
  upload() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let loading = this.loadingCtrl.create({ content: 'Please wait...' });
    loading.present();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('avatar')).files[0]]) {
      //this.mypic = [(<HTMLInputElement>document.getElementById('avatar')).files[0]];
      let path = '/users/' + Date.now() + `${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapshot) => {
        loading.dismiss();
        this.user['photoURL'] = snapshot.downloadURL;
        //console.log(snapshot.fullPath);
      });
    }
  }

}
