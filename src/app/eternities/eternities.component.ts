import { AfterViewInit, Component } from '@angular/core';
import { generateNumbersArray } from '@ionaru/array-utils';
import { AppComponent } from '../app.component';


class GridItem {
    image = '/assets/Planechase Back.jpg';
    visited = false;

    constructor(
        public row: Row,
        public column: Column,
    ) {
        row.add(this);
        column.add(this);
    }

    public visit(): void {
        if (!this.visited) {
            this.image = AppComponent.planes.pop().img as any;
            this.visited = true;
        }
    }
}

abstract class Line {
    items = [];

    public add(item: GridItem): void {
        this.items.push(item);
    }
}

class Row extends Line {}
class Column extends Line {}

const rows = [new Row(), new Row(), new Row(), new Row(), new Row()];
const columns = [new Column(), new Column(), new Column(), new Column(), new Column()];
const items = [];

for (const row of rows) {
    for (const column of columns) {
        items.push(new GridItem(row, column));
    }
}

@Component({
    selector: 'app-eternities',
    templateUrl: './eternities.component.html',
    styleUrls: ['./eternities.component.scss'],
})
export class EternitiesComponent implements AfterViewInit {

    public grid = generateNumbersArray(25);

    public x = [
        [1, 2, 3, 4, 5],
        [6, 7, 8, 9, 10],
        [6, 7, 8, 9, 10],
        [6, 7, 8, 9, 10],
        [6, 7, 8, 9, 10],
    ];

    constructor() { }

    ngAfterViewInit(): void {
        document.getElementById('grid-13-image').attributes.getNamedItem('src').value = AppComponent.planes.pop().img as any;
        document.getElementById('grid-12-image').attributes.getNamedItem('src').value = AppComponent.planes.pop().img as any;
        document.getElementById('grid-14-image').attributes.getNamedItem('src').value = AppComponent.planes.pop().img as any;
        document.getElementById('grid-8-image').attributes.getNamedItem('src').value = AppComponent.planes.pop().img as any;
        document.getElementById('grid-18-image').attributes.getNamedItem('src').value = AppComponent.planes.pop().img as any;
    }

    public doAction(target: EventTarget) {
        const element = target as HTMLImageElement;

        const actionableElements = [7, 8, 9, 12, 14, 17, 18, 19];
        const gridNumber = this.getGridNumber(element.id);
        if (!actionableElements.includes(gridNumber)) {
            return;
        }

        switch (gridNumber) {
            case 12:

        }
    }

    public setImage(gridItem: number, src: any) {
        document.getElementById(`grid-${gridItem}-image`).attributes.getNamedItem('src').value;
    }

    public getGridNumber(gridItemName: string): number {
        return Number(gridItemName.replace(/[^\d]*/, ''));
    }
}
