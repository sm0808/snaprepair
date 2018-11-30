import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {
  public sendTo   : any;
  public subject  : string = 'Message from Social Sharing App';
  public message  : string = 'Take your app development skills to the next level with Mastering Ionic - the definitive guide';
  public image    : string	= 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
  public uri      : string	= 'http://masteringionic2.com/products/product-detail/s/mastering-ionic-2-e-book';

  constructor(public navCtrl: NavController, public navParams: NavParams,private socialSharing: SocialSharing,public platform   : Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePage');
  }
  shareViaEmail()
  {
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



  shareViaFacebook()
  {
     this.platform.ready()
     .then(() =>
     {
        this.socialSharing.canShareVia('com.apple.social.facebook', this.message, this.image, this.uri)
        .then((data) =>
        {

           this.socialSharing.shareViaFacebook(this.message, this.image, this.uri)
           .then((data) =>
           {
              console.log('Shared via Facebook');
           })
           .catch((err) =>
           {
              console.log('Was not shared via Facebook');
           });

        })
        .catch((err) =>
        {
           console.log('Not able to be shared via Facebook');
        });

     });
  }




  shareViaInstagram()
  {
     this.platform.ready()
     .then(() =>
     {

        this.socialSharing.shareViaInstagram(this.message, this.image)
        .then((data) =>
        {
           console.log('Shared via shareViaInstagram');
        })
        .catch((err) =>
        {
           console.log('Was not shared via Instagram');
        });

     });
  }




  shareViaTwitter()
  {
     this.platform.ready()
     .then(() =>
     {

        this.socialSharing.canShareVia('com.apple.social.twitter', this.message, this.image, this.uri)
        .then((data) =>
        {

           this.socialSharing.shareViaTwitter(this.message, this.image, this.uri)
           .then((data) =>
           {
              console.log('Shared via Twitter');
           })
           .catch((err) =>
           {
              console.log('Was not shared via Twitter');
           });

        });

     })
     .catch((err) =>
     {
        console.log('Not able to be shared via Twitter');
     });
  }

}
