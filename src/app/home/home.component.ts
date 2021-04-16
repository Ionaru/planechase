import { Component } from '@angular/core';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';
import { AppComponent, IPlane } from '../app.component';
import * as uuid from 'uuid';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

    public funIcon = faDiceD20;

    public planes = AppComponent.planes;
    public customPlanes = AppComponent.customPlanes;

    public url: string | ArrayBuffer = 'assets/Planechase Back.jpg';

    public toggleSelection(context: IPlane[], enabled = true): void {
        context.forEach((plane) => plane.enabled = enabled);
    }

    public processFiles($event: Event): void {
        const input = $event.target as HTMLInputElement;

        const fileList = Array.from(input.files);
        for (const file of fileList) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const image = event.target.result;

                this.customPlanes.push({
                    id: uuid.v4(),
                    name: file.name,
                    img: event.target.result,
                    enabled: true,
                });

                if (fileList.indexOf(file) === (fileList.length - 1)) {
                    this.url = event.target.result;
                }
            };

            reader.readAsDataURL(file);
        }
    }

    public setUrl(plane: IPlane): void {
        this.url = typeof plane.img === 'string' ? `${plane.img}` : this.url = plane.img;
    }

    public togglePlane(plane: IPlane): void {
        plane.enabled = !plane.enabled;
    }
}
