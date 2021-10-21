import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DelayedHoverDirective } from './delayed-hover.directive';
import { DiceRollerComponent } from './dice-roller/dice-roller.component';
import { EternitiesComponent } from './eternities/eternities.component';
import { HomeComponent } from './home/home.component';
import { NavButtonsComponent } from './nav-buttons/nav-buttons.component';
import { PlayComponent } from './play/play.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        PlayComponent,
        EternitiesComponent,
        DelayedHoverDirective,
        DiceRollerComponent,
        NavButtonsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        FontAwesomeModule,
        NgbModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
