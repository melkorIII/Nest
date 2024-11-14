import { Component, inject, OnInit } from '@angular/core';
import {Howl} from 'howler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  public track: Howl;
  public musicOn: boolean = false;

  constructor() {
    this.track = new Howl({
      src: ['assets/media/Freezing Moon.mp3'],
      html5: true,
      loop: true
    })
   }

  ngOnInit() {}

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
