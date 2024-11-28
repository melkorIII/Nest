import { Component, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import { Author } from 'src/app/core/models/author';
import { ListColumn } from 'src/app/core/models/list-column';
import { LibraryService } from 'src/app/services/nest-api/library.service';
import { LoadingService } from 'src/app/services/utils/loading.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent  implements OnInit {
  private libraryService = inject(LibraryService)
  private loading = inject(LoadingService)
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

  async ngOnInit() {
    await this.loading.present();
    await this.GetAuthors(1);
    await this.GetPages();
    await this.loading.dismiss();
  }

  async GetPages() {
    this.pages = Math.ceil(await this.libraryService.GetAuthorsCount() / this.authorsPerPage);
  }

  async GetAuthors(index: number, value: string | null = null) {
    this.selectedAuthor = null;
    this.rows = await this.libraryService.GetAuthors(this.orderMode, (index - 1) * this.authorsPerPage, this.authorsPerPage, value);
  }
  async previous(index: number) {
    await this.loading.present();
    this.selectedAuthor = null;
    await this.GetAuthors(index);
    await this.loading.dismiss();
  }
  async next(index: number) {
    await this.loading.present();
    this.selectedAuthor = null;
    await this.GetAuthors(index);
    await this.loading.dismiss();
  }
  async setAuthorsPerPage(number: number) {
    await this.loading.present();
    this.authorsPerPage = number;
    this.selectedAuthor = null;
    await this.GetAuthors(1);
    await this.loading.present();
  }
  async changeOrderMode(mode: string) {
    await this.loading.present();
    this.orderMode = mode.toLowerCase();
    await this.GetAuthors(1);
    await this.loading.dismiss();
  }
  async search(value: string) {
    await this.loading.present();
    await this.GetAuthors(1, value);
    await this.loading.dismiss();
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
    if (this.authorErrors.length > 0)
      return;
    await this.loading.present();
    await this.libraryService.SaveAuthor(this.authorToEdit);
    this.authorModal = false;
    this.GetAuthors(1);
    await this.loading.dismiss();
  }

  selectAuthor(author: any) {
    this.selectedAuthor = author;
    if (this.component)
      this.getSelected.emit(author);
  }

}
