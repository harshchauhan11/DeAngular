import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class Products {
  information: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    let localData = http.get('assets/info.json').map(res => res.json().items);
    localData.subscribe(data => {
      this.information = data;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Products');
  }

  toggleSection(i) {
    this.information[i].open = !this.information[i].open;
  }
 
  toggleItem(i, j) {
    this.information[i].children[j].open = !this.information[i].children[j].open;
  }

}
