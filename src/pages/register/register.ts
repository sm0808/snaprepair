import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from "../home/home";
import { AuthService } from "../../services/auth-service";
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../../providers/user/user';
import { USER_IMG_URL } from "../../services/constants";
import * as firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  public name              : string = "";
  public isValidEmail      : any    = false;
  public loadingAnimation  : any    = './assets/img/loading-animation.gif';
  public c_password        : any    = '';
  public user              : any    = { name: '', email: '', phone: '', password: '', image: USER_IMG_URL+'avatar.png'};

  constructor(public nav: NavController, public authService: AuthService,
              public alertCtrl: AlertController,public loadingCtrl: LoadingController,
              public translate: TranslateService, public userService: UserProvider) {}

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
      let profilePic = (<HTMLInputElement>document.getElementById('avatar')).files[0];
      let formData   = new FormData();
      formData.append('profilePic', profilePic);
      
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

  chooseFile() {
    document.getElementById('avatar').click();
  }

  fileChange(event){
    try {
      if(event.target.files && event.target.files[0]){
        let reader = new FileReader();

        reader.onload = (event:any) => {
          console.log("event: ",event);
          
          this.user.image   = event.target.result;
          this.showAlert('User Image', this.user.image);
          // this.user.image   = event.target.files[0];
        }
        reader.readAsDataURL(event.target.files[0]);
      }
        let fileList: FileList = event.target.files;
        console.log("fileList: ",fileList);

        let file: File = fileList[0];
        // this.user.image = file;
        // this.user['profilePic'] = file;
        console.log("file: ",file);
    } catch(error) {
      this.showAlert('Error Changing File', JSON.stringify(error));
    }
  }

  // upload thumb for item
  upload() {
    // Create a root reference
    // let storageRef = firebase.storage().ref();
    // let loading = this.loadingCtrl.create({ content: 'Please wait...' });
    // loading.present();

    for (let selectedFile of [(<HTMLInputElement>document.getElementById('avatar')).files[0]]) {
      // this.user.image = [(<HTMLInputElement>document.getElementById('avatar')).files[0]];
      // this.user.image = selectedFile;
      console.log("selectedFile: ",selectedFile);
      
      let path = '/users/' + Date.now() + `${selectedFile.name}`;
      console.log("path: ",path);
      // let iRef = storageRef.child(path);
      // iRef.put(selectedFile).then((snapshot) => {
      //   loading.dismiss();
      //   this.user['photoURL'] = snapshot.downloadURL;
      //   //console.log(snapshot.fullPath);
      // });
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
