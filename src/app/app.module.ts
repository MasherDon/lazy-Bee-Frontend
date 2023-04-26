import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { HoneycombComponent } from './honeycomb/honeycomb.component';
import { GamesComponent } from './games/games.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {
    path: 'honeycomb',
    title: 'Соты',
    component: HoneycombComponent,
  },
  {
    path: 'about',
    title: 'О нас',
    component: AboutComponent,
  },
  {
    path: 'games',
    title: 'Игры',
    component: GamesComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HoneycombComponent,
    GamesComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {}

}
