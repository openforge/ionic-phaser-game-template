import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PhaserSingletonService } from 'libs/example-app/phaser/singleton/src';
import { ShopPageComponent } from './shop/shop.component';

@NgModule({
    declarations: [AppComponent, ShopPageComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), PhaserSingletonService.forRoot(), AppRoutingModule],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {}
