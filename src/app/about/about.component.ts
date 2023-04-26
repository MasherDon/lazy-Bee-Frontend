import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent {
  constructor() {}

  @Input() about!: string;
  orientation: boolean = window.matchMedia("(orientation: landscape)").matches;
}
