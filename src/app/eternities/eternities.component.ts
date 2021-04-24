import { Component } from '@angular/core';
import { generateNumbersArray } from '@ionaru/array-utils';
import { AppComponent, IPlane } from '../app.component';
import { faDiceD6, faRedo } from '@fortawesome/free-solid-svg-icons';


class GridItem {
    plane = AppComponent.fakePlane;
    seen = false;

    constructor(
        public row: Row,
        public column: Column,
    ) {
        row.add(this);
        column.add(this);
    }

    public see(plane: IPlane): void {
        this.plane = plane;
        this.seen = true;
    }

    public reset(planes: IPlane[]): void {
        if (this.seen) {
            planes.push(this.plane);
            this.plane = AppComponent.fakePlane;
            this.seen = false;
        }
    }
}

abstract class Line {
    items: GridItem[] = [];

    public add(item: GridItem): void {
        this.items.push(item);
    }

    public move(x: number): void {
        if (x) {
            if (x === 1) {
                this.items.unshift(this.items.pop());
            }
            if (x === -1) {
                this.items.push(this.items.shift());
            }
        }
    }

    public reset(planes: IPlane[]): void {
        this.items.forEach((item) => item.reset(planes));
    }
}

class Row extends Line {}

class Column extends Line {}


@Component({
    selector: 'app-eternities',
    templateUrl: './eternities.component.html',
    styleUrls: ['./eternities.component.scss'],
})
export class EternitiesComponent {

    public planes: IPlane[] = [];
    public previewPlane: IPlane;

    public rollCounter = 0;
    public rolled?: number;

    public rollIcon = faDiceD6;
    public resetIcon = faRedo;

    public grid = generateNumbersArray(25);

    public rows = [new Row(), new Row(), new Row(), new Row(), new Row()];
    public columns = [new Column(), new Column(), new Column(), new Column(), new Column()];
    public items: GridItem[] = [];

    constructor() {
        this.planes = [
            ...AppComponent.planes.filter((plane) => plane.enabled),
            ...AppComponent.customPlanes.filter((plane) => plane.enabled),
        ];

        if (this.planes.length < 25) {
            throw new Error('Not enough planes! ✈');
        }

        for (const row of this.rows) {
            for (const column of this.columns) {
                this.items.push(new GridItem(row, column));
            }
        }
        this.seeVisibleGridItems();
    }

    public doAction(item: GridItem): void {
        const coordinates = this.getCoordinates(item);
        switch (coordinates) {
            case '1:1':
                if (item.seen) {
                    return;
                }
                this.move(this.rows, 1);
                this.move(this.columns, 1);
                break;
            case '1:2':
                this.move(this.rows, 1);
                break;
            case '1:3':
                if (item.seen) {
                    return;
                }
                this.move(this.rows, 1);
                this.move(this.columns, -1);
                break;
            case '2:1':
                this.move(this.columns, 1);
                break;
            case '2:3':
                this.move(this.columns, -1);
                break;
            case '3:1':
                if (item.seen) {
                    return;
                }
                this.move(this.rows, -1);
                this.move(this.columns, 1);
                break;
            case '3:2':
                this.move(this.rows, -1);
                break;
            case '3:3':
                if (item.seen) {
                    return;
                }
                this.move(this.rows, -1);
                this.move(this.columns, -1);
                break;
            default:
                return;
        }
        this.seeVisibleGridItems();
    }

    public getGridRow(item: GridItem): number {
        return this.rows.indexOf(item.row) + 1;
    }

    public getGridColumn(item: GridItem): number {
        return this.columns.indexOf(item.column) + 1;
    }

    public move(lines: Line[], x: number): void {
        if (x) {
            if (x === 1) {
                const line = lines.pop();
                line.reset(this.planes);
                lines.unshift(line);
            }
            if (x === -1) {
                const line = lines.shift();
                line.reset(this.planes);
                lines.push(line);
            }
        }
    }

    public seeVisibleGridItems(): void {

        const allowedCoordinates = ['1:2', '2:1', '2:2', '2:3', '3:2'];

        for (const item of this.items) {
            const coordinates = this.getCoordinates(item);
            if (allowedCoordinates.includes(coordinates) && !item.seen) {
                item.see(this.getRandomPlane());
            }
        }
    }

    public getRandomPlane(): IPlane {
        const plane = this.planes[this.getRandomNumber(this.planes.length)];
        this.planes = this.planes.filter((p) => p.id !== plane.id);
        return plane;
    }

    public getRandomNumber(max: number, min = 0): number {
        return Math.floor(Math.random() * max) + min;
    }

    public hover(item: GridItem): void {
        if (item.seen) {
            this.previewPlane = item.plane;
        }
    }

    public dismissPreview(): void {
        this.previewPlane = undefined;
    }

    public isInteractable(item: GridItem): boolean {
        const coordinates = this.getCoordinates(item);

        if (['1:2', '2:1', '2:2', '2:3', '3:2'].includes(coordinates)) {
            return true;
        }

        if (['1:1', '1:3', '3:1', '3:3'].includes(coordinates)) {
            return !item.seen;
        }

        return false;
    }

    public getCoordinates(item: GridItem): string {
        const itemRow = this.rows.indexOf(item.row);
        const itemColumn = this.columns.indexOf(item.column);
        return `${itemRow}:${itemColumn}`;
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
}
