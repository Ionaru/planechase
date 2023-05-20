import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDiceD6, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';
import seedrandom from 'seedrandom';

import { AppComponent } from '../app.component';

@Component({
    selector: 'app-dice-roller',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule, NgOptimizedImage],
    templateUrl: './dice-roller.component.html',
    styleUrls: ['./dice-roller.component.scss'],
})
export class DiceRollerComponent implements OnInit {
    @Input({ required: true }) seed!: string;

    resetSeed = '';

    rollCounter = 0;
    rolled?: number;

    rollIcon = faDiceD6;
    resetIcon = faRedo;
    xIcon = faTimes;

    ngOnInit() {
        // Set initial seed based on page seed.
        this.resetSeed = seedrandom(this.seed)().toString();
        this.reset();
    }

    roll(): void {
        const roll = AppComponent.getRandomNumber(
            this.resetSeed + this.rollCounter,
            6,
            1
        );
        this.rollCounter++;
        this.rolled = roll;
    }

    reset(): void {
        this.resetSeed = seedrandom(this.resetSeed)().toString();
        this.rollCounter = 0;
        this.rolled = undefined;
    }
}
