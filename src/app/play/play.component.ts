import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { generateRandomString } from '@ionaru/random-string';

import { AppComponent, IPlane } from '../app.component';
import { DiceRollerComponent } from '../dice-roller/dice-roller.component';
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component';

@Component({
    selector: 'app-play',
    standalone: true,
    imports: [
        CommonModule,
        FontAwesomeModule,
        NavButtonsComponent,
        DiceRollerComponent,
    ],
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
    currentPlane: IPlane | undefined;
    planes: IPlane[] = [];
    previousPlanes: IPlane[] = [];
    navigationPlanes: IPlane[] = [];

    nextIcon = faArrowRight;
    previousIcon = faArrowLeft;

    seed = '000000';

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) {
        activatedRoute.queryParams.subscribe((parameters) => {
            this.seed = parameters['seed'];

            if (!this.seed) {
                this.router
                    .navigate([`/play`], {
                        queryParams: { seed: generateRandomString(6) },
                    })
                    .then();
            }

            this.resetPlanes();
        });
    }

    setNextPlane(): void {
        if (this.currentPlane) {
            this.previousPlanes.push(this.currentPlane);
        }
        if (this.navigationPlanes.length > 0) {
            this.setPlane(this.navigationPlanes.pop());
        } else if (this.planes.length > 0) {
            this.setPlane(this.getRandomPlane());
        } else {
            this.setPlane();
        }
    }

    setPlane(plane?: IPlane): void {
        this.currentPlane = plane;
    }

    setPreviousPlane(): void {
        if (this.previousPlanes.length === 0) {
            return;
        }
        if (this.currentPlane) {
            this.navigationPlanes.push(this.currentPlane);
        }
        this.setPlane(this.previousPlanes.pop());
    }

    resetPlanes(): void {
        this.previousPlanes = [];
        this.navigationPlanes = [];
        this.planes = [
            ...AppComponent.planes.filter((plane) => plane.enabled),
            ...AppComponent.customPlanes.filter((plane) => plane.enabled),
        ];
        this.setPlane(this.getRandomPlane());
    }

    getRandomPlane(): IPlane {
        return AppComponent.spliceRandomItemFromList(this.planes, this.seed);
    }
}
