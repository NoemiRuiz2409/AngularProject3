import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-small-box',
  templateUrl: './small-box.component.html',
  styleUrls: ['./small-box.component.css']
})
export class SmallBoxComponent {
  @Input() backgroundImageUrl?: string;
  @Input() title?: string;
  @Input() flightInfo?: string;
  @Input() price?: string;
  @Input() detail?: string;
  @Input() buttonText?: string;
}
