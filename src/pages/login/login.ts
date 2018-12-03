import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ToastController, Events } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home'
import { AuthService } from "../../services/auth-service";
import * as firebase from 'firebase';
import { ENABLE_SIGNUP } from '../../services/constants';
import { TranslateService } from '@ngx-translate/core';
import { UserProvider } from '../../providers/user/user';
import { UserRequestsPage } from '../user-requests/user-requests';

//B33437 awais@gmail.com
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user: any = { email: 'admin@gmail.com', password: '123456' };
  isRegisterEnabled: any = true;
  respnseData = null;
  UserId: any;
  constructor(public nav: NavController, public authService: AuthService,
    public alertCtrl: AlertController, public loadingCtrl: LoadingController,
    public toast: ToastController, public translate: TranslateService,
    public userService: UserProvider, public toastCtrl: ToastController,
    public events: Events ) {

    this.isRegisterEnabled = ENABLE_SIGNUP;
  }

  signup() {
    this.nav.setRoot(RegisterPage);
  }
  reset() {
    if (this.user.email) {
      firebase.auth().sendPasswordResetEmail(this.user.email)
        .then(data =>
          this.toast.create({ message: 'Please check your mail', duration: 3000 }).present())
        .catch(err => this.toast.create({ message: err.message, duration: 3000 }).present())
    }
  }
  displayToast(message) {
    this.toastCtrl.create({ duration: 2000, message }).present();
  }


  login() {
    if (this.user.email.length == 0 || this.user.password.length == 0) {
      this.alertCtrl.create({ subTitle: 'Please enter the Email / Password.', buttons: ['ok'] }).present();
    }
    else {
      let loading = this.loadingCtrl.create({ content: 'Authenticating...' });
      loading.present();

      // Login with Server
      this.userService.login(this.user).then((result) => {
        loading.dismiss();
        console.log('result',result);
        if (result == null) {
          let alert = this.alertCtrl.create({
            title: 'Invalid Credentials',
            subTitle: 'The user name or password you entered does not exists.',
            buttons: ['Dismiss']
          });
          alert.present();
        }
        else {
          localStorage.setItem('userData', JSON.stringify(result));
          this.trigger_User_Update_Event();
          if (result['isAdmin'] == '1') {
            this.nav.setRoot(HomePage);
          }
          else {
            this.nav.setRoot(UserRequestsPage);
          }
        }
      }, (err) => {
        loading.dismiss();
        this.showAlert('Error Logging In', JSON.stringify(err));
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

  forgotPass() {
    let forgot = this.alertCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            //console.log('Send clicked');
            this.userService.forgotPassword(data).then((result) => {
              this.respnseData = result['data'];
              if ('msg' in this.respnseData) {
                this.respnseData['class'] = 'success-msg';
                this.respnseData['text'] = this.respnseData['msg'];
              }
              else {
                this.respnseData['class'] = 'error-alert';
                this.respnseData['text'] = this.respnseData['errorMsg'];
              }
              let toast = this.toast.create({
                message: this.respnseData['text'],
                duration: 3000,
                position: 'top',
                cssClass: this.respnseData['class'],
                closeButtonText: 'OK',
                showCloseButton: true
              });
              toast.present();
            }, (err) => {
              console.log(err);
            });

          }
        }
      ]
    });
    forgot.present();
  }
}
