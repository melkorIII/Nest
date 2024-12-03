import { Component, inject, OnInit } from '@angular/core';
import {Howl} from 'howler';
import { HeaderTitleService } from 'src/app/services/utils/header-title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  public track: Howl;
  public musicOn: boolean = false;
  private headeTitle = inject(HeaderTitleService)

  constructor() {
    this.track = new Howl({
      src: ['assets/media/Freezing Moon.mp3'],
      html5: true,
      loop: true
    })
   }

  ngOnInit() {
    this.headeTitle.setTitle('Home');
  }

  ionViewDidEnter() {
    //this.track.play();
  }
  ionViewWillLeave() {
    this.track.stop();
  }
  startMusic() {
    this.track.play();
    this.musicOn = true;
  }
  stopMusic() {
    this.track.stop();
    this.musicOn = false;
  }
}
