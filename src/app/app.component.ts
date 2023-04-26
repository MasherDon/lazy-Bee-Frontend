import { Component, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { GamesService } from "./service/games.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: Document, public gamesService: GamesService, private activatedRoute: ActivatedRoute, private router: Router) {}

  top!: any;
  left!: any;
  image: string = 'assets/images/cursor.png';
  orientation: boolean = window.matchMedia("(orientation: landscape)").matches;
  animL: any = ['move_375', 'move_125', 'move_25'];
  animR: any = ['_move_375', '_move_125', '_move_25'];

  async ngOnInit() {
    const bee = this.document.getElementById('bee') as HTMLLinkElement;
    const darkTheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (darkTheme.matches) {
      bee.href = 'assets/images/Bee.png';
    } else {
      bee.href = 'assets/images/Bee.svg';
    }

    await this.gamesService.getApiGamesData();
    await this.gamesService.getApiAbout();

    this.beeGenerate(true);
    setTimeout(() => {
      this.beeGenerate(false);
    },250);

    // @ts-ignore
    let game: string;
    await this.activatedRoute.queryParams.subscribe((item) => {
      game = item['game'];
    });

    let url: any = this.router.url.match(/^\/\w+/);
    if (url) { url = url[0]?.slice(1);}

    // @ts-ignore
    if (url && !game) {
      setTimeout(() => {
        const element = this.document.getElementById(url) as HTMLLinkElement;
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      },1000);
    }

    // @ts-ignore
    if (url && game) {
      setTimeout(() => {
        const element = this.document.getElementById(game) as HTMLLinkElement;
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      },1000);
    }

    setTimeout(() => {
      this.gamesService.setGamesHover(game);
      setTimeout(() => {
        this.gamesService.setHideLogo(game);
      }, 1000);
    },1000);
  }

  setBee(time: number, left: boolean) {
    const bees = this.document.getElementById('beeArray') as HTMLLinkElement;
    for(let n = 0; n < time % 5; n++) {
      let img = document.createElement('img');
      img.className = "bee";
      img.src = 'assets/images/BeeFon.png';
      img.style.width = 'auto';
      img.style.height = this.orientation? 1 + ((time * (n+1)) % 3) + 'em':1 + ((time * (n+1)) % 2) + 'em';
      img.style.animationName = left?this.animL[(time + n) % 3]:this.animR[(time + n) % 3];
      img.style.animationDuration = (5 + ((time + n) % 5)) + 's';
      if (!left) img.style.right = '-4em'; else img.style.left = '-4em';
      img.style.top = 4 + ((time * (n+1)) % 92) + 'vh';
      img.addEventListener('animationend', (event) => {
        img.remove();
      });
      bees.append(img);
    }
  }

  beeGenerate(left: boolean) {
    const time = Number(new Date());
    if (time % 2) {
      this.setBee(time, left);
    }
    setInterval(() => {
      const time = Number(new Date());
      if (time % 2) {
        this.setBee(time, left);
      }
    }, 500);
  }

  point(point: boolean) {
    if (point) {
      this.image = 'assets/images/cursor-click.png';
    } else {
      this.image = 'assets/images/cursor.png';
    }
  }

  @HostListener('document:click', ['$event'])
  onClick($event: any) {
    if (this.image !== 'assets/images/cursor-click.png') {
      this.image = 'assets/images/cursor-click.png';
      setTimeout(() => {
        this.image = 'assets/images/cursor.png';
      }, 500);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove($event: any) {
    this.top = ($event.pageY - 25) + "px";
    this.left = ($event.pageX - 25) + "px";
  }
}
