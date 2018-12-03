import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
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

  lastImage: string = null;
  loading: Loading;
  public photos :any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public imagePicker: ImagePicker, public cropService: Crop,
              public camera: Camera, public actionSheetCtrl: ActionSheetController,
              private file: File, public toastCtrl: ToastController,
              public platform: Platform, public loadingCtrl: LoadingController) {
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
      this.reduceImages(results).then(() => {
        console.log('all images cropped!!');
      });
    }, (err) => { console.log(err) });
  }

  takePicture_Simple() {
    let options = {
      quality: 100,
      correctOrientation: true
    };

    this.camera.getPicture(options)
    .then((data) => {
      // this.photos = new Array<string>();
      this.cropService
      .crop(data, {quality: 75})
      .then((newImage) => {
        console.log('newImage: ',newImage);
        
        this.photos.push(newImage);
        console.log(this.photos[0]);
        
      }, error => console.error("Error cropping image", error));
    }, function(error) {
      console.log(error);
    });
  }

  reduceImages(selected_pictures: any) : any {
    return selected_pictures.reduce((promise:any, item:any) => {
      return promise.then((result) => {
        return this.cropService.crop(item, {quality: 75})
        .then((cropped_image) => {
          console.log('all images cropped!!', cropped_image);
          this.photos.push(cropped_image);
        });
      });
    }, Promise.resolve());
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
   
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        // this.filePath.resolveNativePath(imagePath)
        //   .then(filePath => {
        //     let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        //     let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        //     this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        //   });
        let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  // Create a new name for the image
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
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
