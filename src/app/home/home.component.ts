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
    public previewPlane = AppComponent.fakePlane;

    public toggleSelection(context: IPlane[], enabled = true): void {
        context.forEach((plane) => plane.enabled = enabled);
    }

    public processFiles($event: Event): void {
        const input = $event.target as HTMLInputElement;

        const fileList = Array.from(input.files);
        for (const file of fileList) {
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                const customPlane: IPlane = {
                    id: uuid.v4(),
                    name: file.name,
                    img: event.target.result,
                    enabled: true,
                };

                this.customPlanes.push(customPlane);

                if (fileList.indexOf(file) === (fileList.length - 1)) {
                    this.previewPlane = customPlane;
                }
            };

            reader.readAsDataURL(file);
        }
    }

    public setUrl(plane: IPlane): void {
        this.previewPlane = plane;
    }

    public togglePlane(plane: IPlane): void {
        plane.enabled = !plane.enabled;
    }
}
