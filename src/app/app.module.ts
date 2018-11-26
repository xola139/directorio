import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { ClipboardModule } from 'ngx-clipboard';
// 1. Import lazy loading module;
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module'
import { LottieAnimationViewModule } from 'ng-lottie';
import { LoaderService } from './loader.service';
import { GoogleAnalyticsEventsService} from "./google-analytics-events.service";
import { LazyLoadImagesModule } from 'ngx-lazy-load-images'; 



// Import ngx-twitter-timeline
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';

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
import { ToolService } from './tools/tools.service';
import { PerfilService } from './perfil/perfil.service';
import { DisponibleService } from './disponibles/disponible.service';

import { DisponiblesComponent } from './disponibles/disponibles.component';
import { ToolsComponent } from './tools/tools.component';
import { GenericmodalComponent } from './genericmodal/genericmodal.component';
import { RedirectComponent } from './redirect/redirect.component';
import { AvisoComponent } from './aviso/aviso.component';
import { RegistroComponent } from './registro/registro.component';






const appRoutes: Routes = [
  { path: '', component: AvisoComponent},
  { path: 'promos', component: PromosComponent },
  { path: 'disponibles', component: DisponiblesComponent },
  { path: 'model/:id', component: ModelComponent },
  { path: 'tools', component: ToolsComponent },
  { path: 'perfil/:id', component: PerfilComponent },
  { path: 'registro/:id', component: RegistroComponent },
  { path: 'contact/:id', component: RedirectComponent },

  

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
    AvisoComponent,
    RegistroComponent,
    
    
    
  ],entryComponents: [GenericmodalComponent],
  imports: [
    BrowserModule,
    AsyncLocalStorageModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatFormFieldModule, MatAutocompleteModule,
    MatButtonModule,
    NgHttpLoaderModule,
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
    LazyLoadImagesModule,
    NgxTwitterTimelineModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ModelService,PromosService,ToolService,PerfilService,DisponibleService,GoogleAnalyticsEventsService,LoaderService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
