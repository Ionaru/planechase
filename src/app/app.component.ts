import { Component } from '@angular/core';
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
    standalone: true,
    imports: [RouterOutlet, FontAwesomeModule],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    static planes: IPlane[] = [];
    static customPlanes: IPlane[] = [];
    static fakePlane: IPlane = {
        id: '0',
        name: 'Planechase image',
        img: 'assets/Planechase Back.jpg',
        enabled: false,
    };

    copyrightIcon = faCopyright;

    constructor() {
        AppComponent.planes = planes.planes;
    }

    static getRandomNumber(seed: string, max: number, min = 0): number {
        return Math.floor(seedrandom(seed)() * (max - min + 1)) + min;
    }

    static spliceRandomItemFromList<T>(list: T[], seed: string): T {
        const indexToDelete =
            this.getRandomNumber(seed + list.length, list.length) - 1;
        return list.splice(indexToDelete, 1)[0];
    }
}
