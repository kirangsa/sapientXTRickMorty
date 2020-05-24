import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {LayoutModule} from '@angular/cdk/layout';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { HttpClientModule } from '@angular/common/http';


import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

import {EffectsModule} from '@ngrx/effects';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {characterReducers} from './home/state/home.reducers';
import { HomeEffects } from './home/state/home.effects';
import { HttpService } from './home/services/http.service';
import { CardComponent } from './home/components/card/card.component';
import { DateAgoPipe } from './shared/pipes/date-ago.pipe';
import { FilterComponent } from './home/components/filter/filter.component';
import { ChipsComponent } from './home/components/chips/chips.component';


@NgModule({
  declarations: [AppComponent, HomeComponent, CardComponent, DateAgoPipe, FilterComponent, ChipsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    MatSelectModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonModule,
    MatProgressBarModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ 'characters' : characterReducers}, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: true,
        strictActionSerializability: false,
        strictStateSerializability: false,
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([HomeEffects])
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
