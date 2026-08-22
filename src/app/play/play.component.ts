import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { generateRandomString } from '@ionaru/random-string';

import { AppComponent, IPlane } from '../app.component';
import { DiceRollerComponent } from '../dice-roller/dice-roller.component';
import { NavButtonsComponent } from '../nav-buttons/nav-buttons.component';

@Component({
    selector: 'app-play',
    imports: [FontAwesomeModule, NavButtonsComponent, DiceRollerComponent],
    templateUrl: './play.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent {
    private readonly activatedRoute = inject(ActivatedRoute);
    private readonly router = inject(Router);

    currentPlane: IPlane | undefined;
    planes: IPlane[] = [];
    previousPlanes: IPlane[] = [];
    navigationPlanes: IPlane[] = [];

    nextIcon = faArrowRight;
    previousIcon = faArrowLeft;

    seed = '000000';

    constructor() {
        const activatedRoute = this.activatedRoute;

        activatedRoute.queryParams.subscribe((parameters) => {
            this.seed = parameters['seed'];

            if (!this.seed) {
                // Deliberately not awaited: this only swaps a missing seed for a
                // generated one, and the subscription carries on either way.
                void this.router.navigate([`/play`], {
                    queryParams: { seed: generateRandomString(6) },
                });
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
