import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [RouterModule.forRoot([
        {path: '', component: HomeComponent},
        {path: 'play', component: PlayComponent},
    ])],
    exports: [RouterModule],
})
export class AppRoutingModule {}
