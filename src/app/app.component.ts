import { Component } from '@angular/core';
import * as defaultPlanes from './data/defaultPlanes.json';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';

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
        id: '0', name: 'Planechase image', img: 'assets/Planechase Back.jpg', enabled: false
    };

    public copyrightIcon = faCopyright;

    public constructor() {
        AppComponent.planes = defaultPlanes.planes;
    }

    public static getRandomNumber(max: number, min = 0): number {
        return Math.floor(Math.random() * ((max - min) + 1)) + min;
    }

    public static spliceRandomItemFromList<T>(list: T[]): T {
        return list.splice(this.getRandomNumber(list.length), 1)[0];
    }

}
