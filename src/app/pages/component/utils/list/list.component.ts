import { Component, EventEmitter, Input, OnInit, output, Output } from '@angular/core';
import { ListColumn } from 'src/app/core/models/list-column';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {
  public selectedItem: any = null;
  @Input() public columns: ListColumn[] = [];
  @Input() public rows: any[] = [];
  @Input() public pages: number = -1;
  @Output() public previous: EventEmitter<any> = new EventEmitter();
  @Output() public next: EventEmitter<any> = new EventEmitter();
  @Output() public itemPerPages: EventEmitter<any> = new EventEmitter();
  @Output() public getSelected: EventEmitter<any> = new EventEmitter();
  public index: number = 1;

  constructor() { }

  ngOnInit() {}

  selectItem(item: any) {
    this.selectedItem = item;
    this.getSelected.emit(item);
  }

  previousFunc() {
    this.index -= 1;
    this.previous.emit(this.index);
  }
  nextFunc() {
    this.index += 1;
    this.next.emit(this.index);
  }
  bookPerPagesFunc(number: any) {
    this.itemPerPages.emit(number.detail.value);
  }
}
