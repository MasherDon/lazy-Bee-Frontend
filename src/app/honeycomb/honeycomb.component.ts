import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { Game } from "../interface/game";
import { Router } from "@angular/router";
import { GamesService } from "../service/games.service";
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-honeycomb',
  templateUrl: './honeycomb.component.html',
  styleUrls: ['./honeycomb.component.css']
})

export class HoneycombComponent {
  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, public gamesService: GamesService) {}

  @Input() games!: Game[][];
  @Output() point = new EventEmitter();
  orientation: boolean = window.matchMedia("(orientation: landscape)").matches;

  dripsL: any[] = [[4, 4.5, 5, 5], [5, 5.5, 4, 5.5], [4, 5, 4.5, 5], [5.5, 5, 4.5, 5.5]];
  dripsP: any[] = [[3, 3.5, 4, 4], [4, 4.5, 3, 4.5], [3, 4, 3.5, 4], [4.5, 4, 3.5, 4.5]];

  ngOnInit() {
    this.generateRandom(3, 4);
  }

  navigateGame(game: string) {
    this.router.navigate(['/games'],{queryParams: {game: game}}).then();
    setTimeout(() => {
      const element = this.document.getElementById(game) as HTMLLinkElement;
      element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      this.gamesService.setGamesHover(game);
    },500);
  }

  generateRandom(i: number, n: number) {
    this.point.emit(false);

    if (this.orientation) {
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-1",this.dripsL[((n+1)*(i+1)%4)][0]+'em');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-2",this.dripsL[((n+1)*(i+1)%4)][1]+'em');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-3",this.dripsL[((n+1)*(i+1)%4)][2]+'em');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-1-s",(this.dripsL[((n+1)*(i+1)%4)][0]/10)+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-2-s",(this.dripsL[((n+1)*(i+1)%4)][1]/10)+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-3-s",(this.dripsL[((n+1)*(i+1)%4)][2]/10)+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-1--s",(this.dripsL[((n+1)*(i+1)%4)][0]/10)*2+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-2--s",(this.dripsL[((n+1)*(i+1)%4)][1]/10)*2+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-3--s",(this.dripsL[((n+1)*(i+1)%4)][2]/10)*2+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--game-s",(this.dripsL[((n+1)*(i+1)%4)][3]/10)+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--game--s",(this.dripsL[((n+1)*(i+1)%4)][3]/10)*2+'s');
    } else {
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-1",this.dripsP[((n+1)*(i+1)%4)][0]+'em');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-2",this.dripsP[((n+1)*(i+1)%4)][1]+'em');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-3",this.dripsP[((n+1)*(i+1)%4)][2]+'em');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-1-s",(this.dripsP[((n+1)*(i+1)%4)][0]/10)+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-2-s",(this.dripsP[((n+1)*(i+1)%4)][2]/10)+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-3-s",(this.dripsP[((n+1)*(i+1)%4)][2]/10)+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-1--s",(this.dripsP[((n+1)*(i+1)%4)][0]/10)*2+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-2--s",(this.dripsP[((n+1)*(i+1)%4)][1]/10)*2+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--drip-3--s",(this.dripsP[((n+1)*(i+1)%4)][2]/10)*2+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--game-s",(this.dripsP[((n+1)*(i+1)%4)][3]/10)+'s');
      // @ts-ignore
      document.documentElement.style.setProperty("--game--s",(this.dripsP[((n+1)*(i+1)%4)][3]/10)*2+'s');
    }
  }

  setBottom(i: number, n: number) {
    if (this.orientation) {
      if (i < 1) {
        if (n < 5) {
          return -2.5+'em';
        } else {
          return 2.5*(i+i)+'em';
        }
      } else {
        if (n < 5) {
          return 2.5*(i+(i-1))+'em';
        } else {
          return 2.5*(i+i)+'em';
        }
      }
    } else {
      if (i < 1) {
        if (n < 3) {
          return -1.75+'em';
        } else {
          return 1.75*(i+i)+'em';
        }
      } else {
        if (n < 3) {
          return 1.75*(i+(i-1))+'em';
        } else {
          return 1.75*(i+i)+'em';
        }
      }
    }
  }

  setBottomDrip(i: number, n: number) {
    if (this.orientation) {
      if (i < 1) {
        if (n < 5) {
          return 0;
        } else {
          return 2.5*(i+i+1)+'em';
        }
      } else {
        if (n < 5) {
          return 2.5*(i+i)+'em';
        } else {
          return -2.5*(i+i+1)+'em';
        }
      }
    } else {
      if (i < 1) {
        if (n < 3) {
          return 0;
        } else {
          return 1.75*(i+i+1)+'em';
        }
      } else {
        if (n < 3) {
          return 1.75*(i+i)+'em';
        } else {
          return 1.75*(i+i+1)+'em';
        }
      }
    }
  }
}
