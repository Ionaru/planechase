import { Component } from '@angular/core';
import { AppComponent, IPlane } from '../app.component';
import { faArrowLeft, faArrowRight, faDiceD6, faRedo } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss'],
})
export class PlayComponent {

    public currentPlane: IPlane;
    public planes: IPlane[];
    public previousPlanes: IPlane[] = [];
    public navigationPlanes: IPlane[] = [];

    public rollCounter = 0;
    public rolled?: number;

    public rollIcon = faDiceD6;
    public resetIcon = faRedo;
    public nextIcon = faArrowRight;
    public previousIcon = faArrowLeft;

    constructor() {
        this.resetPlanes();
    }

    public setNextPlane(): void {
        this.previousPlanes.push(this.currentPlane);
        if (this.navigationPlanes.length) {
            this.setPlane(this.navigationPlanes.pop());
        } else if (this.planes.length) {
            this.setPlane(this.getRandomPlane());
        } else {
            this.setPlane();
        }
    }

    public setPlane(plane?: IPlane): void {
        this.currentPlane = plane;
    }

    public setPreviousPlane(): void {
        if (!this.previousPlanes.length) {
            return;
        }
        if (this.currentPlane) {
            this.navigationPlanes.push(this.currentPlane);
        }
        this.setPlane(this.previousPlanes.pop());
    }

    public resetPlanes(): void {
        this.previousPlanes = [];
        this.navigationPlanes = [];
        this.planes = [
            ...AppComponent.planes.filter((plane) => plane.enabled),
            ...AppComponent.customPlanes.filter((plane) => plane.enabled),
        ];
        this.setPlane(this.getRandomPlane());
    }

    public getRandomPlane(): IPlane {
        return this.planes.splice(this.getRandomNumber(this.planes.length), 1)[0];
    }

    public roll(): void {
        const roll = this.getRandomNumber(6, 1);
        this.rollCounter++;
        this.rolled = roll;
    }

    public reset(): void {
        this.rollCounter = 0;
        this.rolled = undefined;
    }

    public getRandomNumber(max: number, min = 0): number {
        return Math.floor(Math.random() * max) + min;
    }

}
