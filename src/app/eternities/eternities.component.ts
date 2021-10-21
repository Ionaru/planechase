import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { generateRandomString } from '@ionaru/random-string';

import { AppComponent, IPlane } from '../app.component';

enum NavigationCoordinate {
    TOP_LEFT = '1:1',
    TOP_CENTER = '1:2',
    TOP_RIGHT = '1:3',
    CENTER_LEFT = '2:1',
    CENTER = '2:2',
    CENTER_RIGHT = '2:3',
    BOTTOM_LEFT = '3:1',
    BOTTOM_CENTER = '3:2',
    BOTTOM_RIGHT = '3:3',
}

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

    public rows = [new Row(), new Row(), new Row(), new Row(), new Row()];
    public columns = [new Column(), new Column(), new Column(), new Column(), new Column()];
    public items: GridItem[] = [];

    public canPlay = true;

    public seed: string;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
    ) {
        activatedRoute.queryParams.subscribe((params) => {
            this.seed = params.seed;

            if (!this.seed) {
                this.router.navigate(
                    [`/eternities`], {queryParams: {seed: generateRandomString(6)}},
                ).then();
            }

            this.planes = [
                ...AppComponent.planes.filter((plane) => plane.enabled),
                ...AppComponent.customPlanes.filter((plane) => plane.enabled),
            ];

            if (this.planes.length < 25) {
                this.canPlay = false;
                return;
            }

            for (const row of this.rows) {
                for (const column of this.columns) {
                    this.items.push(new GridItem(row, column));
                }
            }
            this.seeVisibleGridItems();
        });
    }

    public walkToPlane(item: GridItem): void {
        const coordinates = this.getCoordinates(item);
        switch (coordinates) {
            case NavigationCoordinate.TOP_LEFT:
                if (item.seen) {
                    return;
                }
                this.move(this.rows, 1);
                this.move(this.columns, 1);
                break;
            case NavigationCoordinate.TOP_CENTER:
                this.move(this.rows, 1);
                break;
            case NavigationCoordinate.TOP_RIGHT:
                if (item.seen) {
                    return;
                }
                this.move(this.rows, 1);
                this.move(this.columns, -1);
                break;
            case NavigationCoordinate.CENTER_LEFT:
                this.move(this.columns, 1);
                break;
            case NavigationCoordinate.CENTER_RIGHT:
                this.move(this.columns, -1);
                break;
            case NavigationCoordinate.BOTTOM_LEFT:
                if (item.seen) {
                    return;
                }
                this.move(this.rows, -1);
                this.move(this.columns, 1);
                break;
            case NavigationCoordinate.BOTTOM_CENTER:
                this.move(this.rows, -1);
                break;
            case NavigationCoordinate.BOTTOM_RIGHT:
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

    public move(lines: Line[], x: -1 | 1): void {
        if (x === 1) {
            const line = lines.pop();
            line.reset(this.planes);
            lines.unshift(line);
        } else {
            const line = lines.shift();
            line.reset(this.planes);
            lines.push(line);
        }
    }

    public seeVisibleGridItems(): void {

        const allowedCoordinates = [
            NavigationCoordinate.TOP_CENTER,
            NavigationCoordinate.CENTER_LEFT,
            NavigationCoordinate.CENTER,
            NavigationCoordinate.CENTER_RIGHT,
            NavigationCoordinate.BOTTOM_CENTER,
        ];

        for (const item of this.items) {
            const coordinates = this.getCoordinates(item);
            if (allowedCoordinates.includes(coordinates) && !item.seen) {
                item.see(this.getRandomPlane());
            }
        }
    }

    public getRandomPlane(): IPlane {
        return AppComponent.spliceRandomItemFromList(this.planes, this.seed);
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

        if ([
            NavigationCoordinate.TOP_CENTER,
            NavigationCoordinate.CENTER_LEFT,
            NavigationCoordinate.CENTER,
            NavigationCoordinate.CENTER_RIGHT,
            NavigationCoordinate.BOTTOM_CENTER,
        ].includes(coordinates)) {
            return true;
        }

        if ([
            NavigationCoordinate.TOP_LEFT,
            NavigationCoordinate.TOP_RIGHT,
            NavigationCoordinate.BOTTOM_LEFT,
            NavigationCoordinate.BOTTOM_RIGHT,
        ].includes(coordinates)) {
            return !item.seen;
        }

        return false;
    }

    public getCoordinates(item: GridItem): NavigationCoordinate {
        const itemRow = this.rows.indexOf(item.row);
        const itemColumn = this.columns.indexOf(item.column);
        return `${itemRow}:${itemColumn}` as NavigationCoordinate;
    }
}
