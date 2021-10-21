import { Component } from '@angular/core';
import { faHome, faRandom } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-nav-buttons',
    templateUrl: './nav-buttons.component.html',
    styleUrls: ['./nav-buttons.component.scss'],
})
export class NavButtonsComponent {

    public rollIcon = faHome;
    public resetIcon = faRandom;
    public window = window;

}
