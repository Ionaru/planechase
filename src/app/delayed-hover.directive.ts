import {
    Directive,
    ElementRef,
    EventEmitter,
    input,
    OnInit,
    Output,
    inject,
} from '@angular/core';
import { fromEvent, map, merge, of, switchMap, delay } from 'rxjs';

@Directive({
    selector: '[appDelayedHover]',
    standalone: true,
})
export class DelayedHoverDirective implements OnInit {
    private readonly element = inject(ElementRef);

    delay = input(1500);

    @Output('appDelayedHover') hoverEvent = new EventEmitter();

    ngOnInit(): void {
        const hide$ = fromEvent(this.element.nativeElement, 'mouseleave').pipe(
            map(() => false),
        );
        const show$ = fromEvent(this.element.nativeElement, 'mouseenter').pipe(
            map(() => true),
        );

        merge(hide$, show$)
            .pipe(
                switchMap((show) => {
                    if (!show) {
                        return of(false);
                    }
                    return of(true).pipe(delay(this.delay()));
                }),
            )
            .subscribe((show) => {
                if (show) {
                    this.hoverEvent.emit();
                }
            });
    }
}
