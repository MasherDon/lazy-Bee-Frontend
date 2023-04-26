import { Injectable } from '@angular/core';
import { Game } from "../interface/game";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class GamesService {
  constructor(private httpClient: HttpClient) {}

  gamesArray: Game[][] = [[]];
  games: Game[] = [];
  about!: string;

  orientation: boolean = window.matchMedia("(orientation: landscape)").matches;

  getHoneycomb() {
    return this.gamesArray;
  }
  getGames() {
    return this.games;
  }
  getAbout() {
    return this.about;
  }

  setGamesHover(name: string) {
    for (let game of this.games) {
      if (game.game === name) {
        game.hover = true;
      }
    }
  }

  setHideLogo(name: string) {
    for (let game of this.games) {
      if (game.game === name) {
        game.hideLogo = false;
      }
    }
  }

  getApiAbout() {
    this.httpClient.get('http://localhost:3000/about').subscribe((about) => {
      // @ts-ignore
      this.about = about['about'];
    });
  }

  getApiGamesData() {
    this.httpClient.get('http://localhost:3000/games').subscribe((games) => {
      // @ts-ignore
      const array = games['games'];

      for(let game of array) {
        // @ts-ignore
        this.games.push({
          game: game['game'],
          title: game['title'],
          text: game['text'],
          image: 'images/' + game['game'] + '/' + game['image'],
          linkGoogle: game['linkGoogle'],
          linkYandex: game['linkYandex'],
          hover: false,
          hideLogo: true,
        });
      }

      let mass = 0;
      if (this.orientation) {
        for (let n = 0; n < array.length; n++) {
          if (n % 9 || n === 0) {
            this.gamesArray[mass].push(array[n]);
          } else {
            this.gamesArray.push([]);
            mass++;
            this.gamesArray[mass].push(array[n]);
          }
          if ((n === array.length -1) && (n % 9 || n === 0) && (mass < 1)) {
            for (let i = n + 1; i < 9; i++) {
              // @ts-ignore
              this.gamesArray[mass].push({});
            }
          }
          if ((n === array.length -1) && (n % 9 || n === 0) && !(n % 2) && mass > 0) {
            // @ts-ignore
            this.gamesArray[mass].push({});
          }
        }
      } else {
        for (let n = 0; n < array.length; n++) {
          if (n % 5 || n === 0) {
            this.gamesArray[mass].push(array[n]);
          } else {
            this.gamesArray.push([]);
            mass++;
            this.gamesArray[mass].push(array[n]);
          }
          if ((n === array.length -1) && (n % 5 || n === 0) && (mass < 1)) {
            for (let i = n + 1; i < 5; i++) {
              // @ts-ignore
              this.gamesArray[mass].push({});
            }
          }
          if ((n === array.length -1) && (n % 5 || n === 0) && !(n % 2) && (mass > 0)) {
            // @ts-ignore
            this.gamesArray[mass].push({});
          }
        }
      }
    });
  }
}
