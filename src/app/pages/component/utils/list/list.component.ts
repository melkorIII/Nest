import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { ListColumn } from 'src/app/core/models/list-column';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent  implements OnInit {
  @Input() public columns: ListColumn[] = [];
  @Input() public rows: any[] = [];
  @Input() public pages: number = -1;
  @Input() public orderBy: string[] = [];
  @Input() public orderMode: string = 'asc';
  @Input() public pagination: boolean = true;
  @Output() public previous: EventEmitter<any> = new EventEmitter();
  @Output() public next: EventEmitter<any> = new EventEmitter();
  @Output() public itemPerPages: EventEmitter<any> = new EventEmitter();
  @Output() public getSelected: EventEmitter<any> = new EventEmitter();
  @Output() public changeOrder: EventEmitter<any> = new EventEmitter();
  @Output() public changeOrderMode: EventEmitter<any> = new EventEmitter();
  @Output() public search: EventEmitter<any> = new EventEmitter();
  public index: number = 1;
  public selectedItem: any = null;
  public searchValue: string = '';

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
  changeOrderFunc(order: any) {
    this.changeOrder.emit(order.detail.value);
  }
  changeOrderModeFunc(mode: any) {
    this.changeOrderMode.emit(mode.detail.value);
  }
  searchFunc() {
    this.search.emit(this.searchValue);
  }
}
