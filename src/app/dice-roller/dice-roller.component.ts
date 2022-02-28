import { Component, Input, OnInit } from '@angular/core';
import { faDiceD6, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
import seedrandom from 'seedrandom';

import { AppComponent } from '../app.component';

@Component({
    selector: 'app-dice-roller',
    templateUrl: './dice-roller.component.html',
    styleUrls: ['./dice-roller.component.scss'],
})
export class DiceRollerComponent implements OnInit {

    @Input() seed: string;

    public resetSeed = '';

    public rollCounter = 0;
    public rolled?: number;

    public rollIcon = faDiceD6;
    public resetIcon = faRedo;
    public xIcon = faTimes;

    public ngOnInit() {
        // Set initial seed based on page seed.
        this.resetSeed = seedrandom(this.seed)().toString();
        this.reset();
    }

    public roll(): void {
        const roll = AppComponent.getRandomNumber(this.resetSeed + this.rollCounter, 6, 1);
        this.rollCounter++;
        this.rolled = roll;
    }

    public reset(): void {
        this.resetSeed = seedrandom(this.resetSeed)().toString();
        this.rollCounter = 0;
        this.rolled = undefined;
    }
}
