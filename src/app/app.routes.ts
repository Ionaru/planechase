import { Routes } from '@angular/router';

import { EternitiesComponent } from './eternities/eternities.component';
import { HomeComponent } from './home/home.component';
import { PlayComponent } from './play/play.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'play', component: PlayComponent },
    { path: 'eternities', component: EternitiesComponent },
];
