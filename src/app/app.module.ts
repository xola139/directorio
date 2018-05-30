import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { ClipboardModule } from 'ngx-clipboard';
// 1. Import lazy loading module;
import { LazyLoadModule } from '@greg-md/ng-lazy-load';
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module'
import { LottieAnimationViewModule } from 'ng-lottie';

import {GoogleAnalyticsEventsService} from "./google-analytics-events.service";

import { MatFormFieldModule, MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule, } from '@angular/material'



import { AppComponent } from './app.component';



import { PromosComponent } from './promos/promos.component';
import { ModelComponent } from './model/model.component';
import { PerfilComponent } from './perfil/perfil.component';

import { ModelService } from './model/model.service';
import { PromosService } from './promos/promos.service';
import { PerfilService } from './perfil/perfil.service';
import { DisponibleService } from './disponibles/disponible.service';

import { DisponiblesComponent } from './disponibles/disponibles.component';
import { ToolsComponent } from './tools/tools.component';
import { GenericmodalComponent } from './genericmodal/genericmodal.component';
import { RedirectComponent } from './redirect/redirect.component';





const appRoutes: Routes = [
  { path: '', redirectTo: 'model', pathMatch: 'full' },
  { path: 'promos', component: PromosComponent },
  { path: 'disponibles', component: DisponiblesComponent },
  { path: 'model', component: ModelComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'perfil/:id', component: PerfilComponent },

  

];

@NgModule({
  declarations: [
    AppComponent,
    PromosComponent,
    ModelComponent,
    PerfilComponent,
    DisponiblesComponent,
    ToolsComponent,
    GenericmodalComponent,
    RedirectComponent,
    
    
    
  ],entryComponents: [GenericmodalComponent],
  imports: [
    BrowserModule,
    LazyLoadModule,
    AsyncLocalStorageModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgHttpLoaderModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatFormFieldModule, MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    LottieAnimationViewModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ModelService,PromosService,PerfilService,DisponibleService,GoogleAnalyticsEventsService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
