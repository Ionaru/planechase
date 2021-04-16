import { Component } from '@angular/core';
import * as opca from './data/opca.json';

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

    public constructor() {
        AppComponent.planes = opca.data.map((data): IPlane => {
            return {
                id: data.oracle_id,
                enabled: true,
                name: data.name,
                img: `assets/planes/opca-${data.collector_number}.jpg`,
            };
        });
    }

}
