import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons';

import { AppComponent, IPlane } from '../app.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [FontAwesomeModule, RouterLink, NgClass],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    funIcon = faDiceD20;

    planes = AppComponent.planes;
    customPlanes = AppComponent.customPlanes;
    previewPlane = AppComponent.fakePlane;

    toggleSelection(context: IPlane[], enabled = true): void {
        for (const plane of context) {
            plane.enabled = enabled;
        }
    }

    processFiles($event: Event): void {
        const input = $event.target as HTMLInputElement;
        if (!input.files) {
            return;
        }

        // eslint-disable-next-line unicorn/prefer-spread
        const fileList = Array.from(input.files);
        for (const file of fileList) {
            const reader = new FileReader();
            reader.addEventListener(
                'load',
                (event: ProgressEvent<FileReader>) => {
                    const img = event.target?.result;
                    if (!img) {
                        return;
                    }

                    const customPlane: IPlane = {
                        id: crypto.randomUUID(),
                        name: file.name,
                        img,
                        enabled: true,
                    };

                    this.customPlanes.push(customPlane);

                    if (fileList.indexOf(file) === fileList.length - 1) {
                        this.previewPlane = customPlane;
                    }
                },
            );

            reader.readAsDataURL(file);
        }
    }

    setUrl(plane: IPlane): void {
        this.previewPlane = plane;
    }

    togglePlane(plane: IPlane): void {
        plane.enabled = !plane.enabled;
    }

    countEnabledPlanes(planes: IPlane[]): number {
        return planes.filter((plane) => plane.enabled).length;
    }
}
