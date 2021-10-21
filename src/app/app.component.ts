import { Component } from '@angular/core';
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
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {

    public static planes: IPlane[] = [];
    public static customPlanes: IPlane[] = [];
    public static fakePlane: IPlane = {
        id: '0', name: 'Planechase image', img: 'assets/Planechase Back.jpg', enabled: false,
    };

    public copyrightIcon = faCopyright;

    public constructor() {
        AppComponent.planes = planes.planes;
    }

    public static getRandomNumber(seed: string, max: number, min = 0): number {
        return Math.floor(seedrandom(seed)() * ((max - min) + 1)) + min;
    }

    public static spliceRandomItemFromList<T>(list: T[], seed: string): T {
        return list.splice(this.getRandomNumber(seed, list.length), 1)[0];
    }

}
