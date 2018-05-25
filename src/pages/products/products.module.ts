import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Products } from './products';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    Products,
  ],
  imports: [
    IonicPageModule.forChild(Products),
    Ionic2RatingModule
  ],
})
export class ProductsPageModule {}
