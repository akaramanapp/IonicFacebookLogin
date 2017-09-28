import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  userData: any;
  ngOnInit(): void {
    if(this.userData != null){
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.facebook.api('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
        this.userData = {email: profile['email'], first_name: profile['first_name'], last_name: profile['last_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
        loading.dismiss();
      });
    }
  }

  
   constructor(private facebook: Facebook, public loadingCtrl: LoadingController) { }
  
   loginWithFB() {
     this.facebook.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
       this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(profile => {
         this.userData = {email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name']}
       });
     });
   }

}
