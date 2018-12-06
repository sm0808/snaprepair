import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading, AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';

import { File } from '@ionic-native/file';

var cordova: any;
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

  public slidesPerView  : number = 2;
  public lastImage      : string = null;
  public loading        : Loading;
  public photos         : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public imagePicker: ImagePicker, public cropService: Crop,
              public camera: Camera, public actionSheetCtrl: ActionSheetController,
              private file: File, public toastCtrl: ToastController,
              public platform: Platform, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController) {
  }

  // private transfer: Transfer, 
  // private filePath: FilePath,
   
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserMakeRequestPage');
  }

  openImagePicker() {
    let options= {
      maximumImagesCount: 5,
    }
    // this.photos = new Array<string>();
    this.imagePicker.getPictures(options)
    .then((results) => {
      // // console.log("results: ", JSON.stringify(results));
      // for (var i = 0; i < results.length; i++) {
      //     // console.log('Image URI: ' + results[i]);
      //     let picture = 'data:image/jpg;base64,' + results[i];
      //     this.showAlert('picture', picture);
      //     // console.log("picture: ",picture);
          
                
      //     // Push to array
      //     this.photos.push(picture);
      // }
      
      this.reduceImages(results).then(() => {
        console.log('all images cropped!! CROP ENDED');
      });
    }, (err) => { console.log(err) });
  }

  takePicture_Simple() {
    let options = {
      quality: 100,
      correctOrientation: true
    };

    // let options = {
    //     // sourceType: selectedSourceType,
    //     quality: 100,
    //     destinationType: this.camera.DestinationType.DATA_URL,
    //     correctOrientation: true,
    //     encodingType: this.camera.EncodingType.JPEG,
    //     mediaType: this.camera.MediaType.PICTURE,
    //     targetWidth: 1024,
    //     targetHeight: 1024
    // }

    this.camera.getPicture(options)
    .then((data) => {

      // this.base64.encodeFile(data).then((base64File: string) => {
      //   console.log("base64File: ",base64File);
      //   // let picture = 'data:image/jpg;base64,' + base64File;
      //   // console.log("picture: ",picture);
      //   this.photos.push(base64File);
      // }, (err) => {
      //   console.log(err);
      // });

      // let picture = 'data:image/jpg;base64,' + data;
      // console.log("picture: ",picture);
      
            
      // // Push to array
      // this.photos.push(picture);

      // this.photos = new Array<string>();
      this.cropService
      .crop(data, {quality: 90})
      .then((newImage) => {
        console.log('newImage: ',newImage);
        
        // this.photos.push(newImage);
        // console.log(this.photos[0]);

        this.pathToBase64(newImage);
        
      }, error => console.error("Error cropping image", error));
    }, function(error) {
      console.log(error);
    });
  }

  reduceImages(selected_pictures: any) : any {
    return selected_pictures.reduce((promise:any, item:any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {quality: 90})
        .then((cropped_image) => {
          console.log('all images cropped!!', cropped_image);
          // console.log(location.href);

          // this.base64.encodeFile(cropped_image).then((base64File: string) => {
          //   // console.log("base64File: ",base64File);
          //   let picture = 'data:image/jpg;base64,' + base64File;
          //   // console.log("picture: ",picture);
          //   this.photos.push(picture);
          // }, (err) => {
          //   console.log(err);
          // });
          
          // this.photos.push(cropped_image);
          this.pathToBase64(cropped_image);
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
        // console.log("nameFile", JSON.stringify(nameFile));
        let directory = path.substring(0, n);
        // console.log("nameFile", JSON.stringify(nameFile));
        // alert("nameFile :" + nameFile + " *directory: " +directory.toString()+ " *allPath: " + res);
        this.file.readAsDataURL(directory.toString(), nameFile).then((res) => {
          // console.log("readAsDataURL res", JSON.stringify(res));
          // this.photos.push(res);
          this.photos.splice(0, 0, res);
          
        }).catch(err => alert('error pathToBase64 ' + JSON.stringify(err)));
      } catch(error) {
         alert(error);
      }
  }

  removeImage(index) {
    this.photos.splice(index, 1);
    console.log("photos", JSON.stringify(this.photos));
  }

  showAlert(title, mesasge) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: mesasge,
      buttons: ['OK']
    });
    alert.present();
  }

  

// public uploadImage() {
//   // Destination URL
//   var url = "http://yoururl/upload.php";
 
//   // File for Upload
//   var targetPath = this.pathForImage(this.lastImage);
 
//   // File name only
//   var filename = this.lastImage;
 
//   var options = {
//     fileKey: "file",
//     fileName: filename,
//     chunkedMode: false,
//     mimeType: "multipart/form-data",
//     params : {'fileName': filename}
//   };
 
//   const fileTransfer: TransferObject = this.transfer.create();
 
//   this.loading = this.loadingCtrl.create({
//     content: 'Uploading...',
//   });
//   this.loading.present();
 
//   // Use the FileTransfer to upload the image
//   fileTransfer.upload(targetPath, url, options).then(data => {
//     this.loading.dismissAll()
//     this.presentToast('Image succesful uploaded.');
//   }, err => {
//     this.loading.dismissAll()
//     this.presentToast('Error while uploading file.');
//   });
// }

}
