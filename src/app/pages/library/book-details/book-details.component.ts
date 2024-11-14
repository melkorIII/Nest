import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent  implements OnInit {
  private route = inject(ActivatedRoute);

  constructor() { }

  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'))
  }

}
