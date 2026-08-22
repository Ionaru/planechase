import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import seedrandom from 'seedrandom';

import planes from './data/defaultPlanes.json';

export interface IPlane {
    id: string;
    img: string | ArrayBuffer;
    enabled: boolean;
    name: string;
}

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, FontAwesomeModule],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    // The lists are readonly because nothing replaces them, only mutates their
    // contents: planes are toggled in place and custom planes are pushed onto
    // the array. Seeding "planes" here rather than from the constructor keeps
    // bootstrapping free of side effects.
    static readonly planes: IPlane[] = planes.planes;
    static readonly customPlanes: IPlane[] = [];
    static readonly fakePlane: IPlane = {
        id: '0',
        name: 'Planechase image',
        img: 'assets/Planechase Back.jpg',
        enabled: false,
    };

    static getRandomNumber(seed: string, max: number, min = 0): number {
        return Math.floor(seedrandom(seed)() * (max - min + 1)) + min;
    }

    static spliceRandomItemFromList<T>(list: T[], seed: string): T {
        const indexToDelete =
            this.getRandomNumber(seed + list.length, list.length) - 1;
        return list.splice(indexToDelete, 1)[0];
    }

    copyrightIcon = faCopyright;
}
