import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { faDiceD6, faRedo, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dice-roller',
  templateUrl: './dice-roller.component.html',
  styleUrls: ['./dice-roller.component.scss']
})
export class DiceRollerComponent {

    public rollCounter = 0;
    public rolled?: number;

    public rollIcon = faDiceD6;
    public resetIcon = faRedo;
    public xIcon = faTimes;

    public roll(): void {
        const roll = AppComponent.getRandomNumber(6, 1);
        this.rollCounter++;
        this.rolled = roll;
    }

    public reset(): void {
        this.rollCounter = 0;
        this.rolled = undefined;
    }
}
