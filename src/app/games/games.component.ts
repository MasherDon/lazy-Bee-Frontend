import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Game } from "../interface/game";
import { GamesService } from "../service/games.service";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})

export class GamesComponent {
  constructor(private gamesService: GamesService) {}

  @Input() games!: Game[];
  @Output() point = new EventEmitter();
  orientation: boolean = window.matchMedia("(orientation: landscape)").matches;

  ngOnInit() {
    // @ts-ignore
    document.documentElement.style.setProperty("--hex",this.orientation?'4em':'2.5em');
  }

  hideLogo(game: string) {
    this.gamesService.setGamesHover(game);
    setTimeout(() => {
      this.gamesService.setHideLogo(game);
    },1000);
  }
}
