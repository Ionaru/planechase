import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, merge, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

@Directive({
    selector: '[appDelayedHover]',
})
export class DelayedHoverDirective implements OnInit, OnDestroy {
    @Input()
    delay = 1500;

    @Output('appDelayedHover') hoverEvent = new EventEmitter();

    constructor(private readonly element: ElementRef) {}

    ngOnInit(): void {
        const hide$ = fromEvent(this.element.nativeElement, 'mouseleave').pipe(map(_ => false));
        const show$ = fromEvent(this.element.nativeElement, 'mouseenter').pipe(map(_ => true));

        merge(hide$, show$)
            .pipe(
                switchMap(show => {
                    if (!show) {
                        return of(false);
                    }
                    return of(true).pipe(delay(this.delay));
                })
            )
            .subscribe(show => {
                if (show) {
                    this.hoverEvent.emit();
                }
            });
    }

    ngOnDestroy(): void {}
}
