import { Component, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import { Author } from 'src/app/core/models/author';
import { ListColumn } from 'src/app/core/models/list-column';
import { LibraryService } from 'src/app/services/nest-api/library.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent  implements OnInit {
  private libraryService = inject(LibraryService)
  @Input() public component: boolean = false;
  @Input() public authorsPerPage = 10;
  @Output() public getSelected: EventEmitter<any> = new EventEmitter();
  public columns: ListColumn[] = [{name: 'Author name', size: 12, identifier: 'AuthorName'}];
  public rows: Author[] = [];
  public pages: number = 0;
  public selectedAuthor: Author | null = null;
  public authorModal: boolean = false;
  public authorToEdit: Author = new Author(0, '');
  public authorErrors: string[] = [];
  private orderMode: string = 'asc';

  constructor() { }

  ngOnInit() {
    this.GetAuthors(1);
    this.GetPages();
  }

  async GetPages() {
    this.pages = Math.ceil(await this.libraryService.GetAuthorsCount() / this.authorsPerPage);
  }

  async GetAuthors(index: number, value: string | null = null) {
    this.selectedAuthor = null;
    this.rows = await this.libraryService.GetAuthors(this.orderMode, (index - 1) * this.authorsPerPage, this.authorsPerPage, value);
  }
  previous(index: number) {
    this.selectedAuthor = null;
    this.GetAuthors(index);
  }
  next(index: number) {
    this.selectedAuthor = null;
    this.GetAuthors(index);
  }
  setAuthorsPerPage(number: number) {
    this.authorsPerPage = number;
    this.selectedAuthor = null;
    this.GetAuthors(1);
  }
  changeOrderMode(mode: string) {
    this.orderMode = mode.toLowerCase();
    this.GetAuthors(1);
  }
  search(value: string) {
    this.GetAuthors(1, value);
  }
  addAuthor() {
    this.authorModal = true;
    this.authorToEdit = new Author(0, '');
  }
  editAuthor() {
    this.authorModal = true;
    this.authorToEdit = this.selectedAuthor as Author;
  }
  async saveAuthor() {
    this.authorErrors = [];
    if (this.authorToEdit.AuthorName == null || this.authorToEdit.AuthorName == '')
      this.authorErrors.push('The author name is required');
    await this.libraryService.SaveAuthor(this.authorToEdit);
    this.authorModal = false;
    this.GetAuthors(1);
  }

  selectAuthor(author: any) {
    this.selectedAuthor = author;
    if (this.component)
      this.getSelected.emit(author);
  }

}
