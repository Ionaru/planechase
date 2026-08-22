import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faRandom } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-nav-buttons',
    imports: [FontAwesomeModule, RouterLink],
    templateUrl: './nav-buttons.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./nav-buttons.component.scss'],
})
export class NavButtonsComponent {
    rollIcon = faHome;
    resetIcon = faRandom;
    window = globalThis;
}
