import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TripService } from '../../services/trip-service';
import { HomePage } from '../home/home';

/**
 * Generated class for the Modalthis.ratingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal-rating',
  templateUrl: 'modal-rating.html',
})
export class ModalRatingPage {

  constructor(public service:TripService,public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController) 
  {
    this.tripKey =  this.navParams.get('tripKey');
  }

  /**
   *
   */
  tripKey ;
  headerImage = "./assets/img/rating.png";
  blankStar = "./assets/img/star_feedback_blank.png";
  filledStar = "./assets/img/star_feedback.png" 
  path1 = this.filledStar;
  path2 = this.blankStar;
  path3 = this.blankStar;
  path4 = this.blankStar;
  path5 = this.blankStar;
  rating=1;
  over(rating)
  {
    this.rating= rating;
    if (this.rating ==1)
    {
      this.path1 = this.filledStar;
      this.path2 = this.blankStar;
      this.path3 = this.blankStar;
      this.path4 = this.blankStar;
      this.path5 = this.blankStar;
    }
    else if (this.rating ==2)
    {
      this.path1 = this.filledStar;
      this.path2 = this.filledStar;
      this.path3 = this.blankStar;
      this.path4 = this.blankStar;
      this.path5 = this.blankStar;
    }
    else if (this.rating ==3)
    {
      this.path1 = this.filledStar;
      this.path2 = this.filledStar;
      this.path3 = this.filledStar;
      this.path4 = this.blankStar;
      this.path5 = this.blankStar;
    }
    else if (this.rating ==4)
    {
      this.path1 = this.filledStar;
      this.path2 = this.filledStar;
      this.path3 = this.filledStar;
      this.path4 = this.filledStar;
      this.path5 = this.blankStar;
    }
    else if (this.rating ==5)
    {
      this.path1 = this.filledStar;
      this.path2 = this.filledStar;
      this.path3 = this.filledStar;
      this.path4 = this.filledStar;
      this.path5 = this.filledStar;
    }
  }
  dismiss()
  {
    this.service.rateTrip(this.tripKey, this.rating).then(
      result => 
      {
        this.viewCtrl.dismiss();
        this.navCtrl.setRoot(HomePage);
      }
    ),err=>alert(err);
    ;
  }

}
