import { Component, EventEmitter, inject, input, Input, OnInit, Output } from '@angular/core';
import { Author } from 'src/app/core/models/author';
import { AuthorsList } from 'src/app/core/models/authors-list';
import { ListColumn } from 'src/app/core/models/list-column';
import { LibraryService } from 'src/app/services/nest-api/library.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { CatchErrorService } from 'src/app/services/utils/catch-error.service';
import { HeaderTitleService } from 'src/app/services/utils/header-title.service';
import { LoadingService } from 'src/app/services/utils/loading.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent  implements OnInit {
  private libraryService = inject(LibraryService)
  private loading = inject(LoadingService)
  private error = inject(CatchErrorService);
  public auth = inject(AuthService);
  private headerTitle = inject(HeaderTitleService)
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
  private previousSearch: string = '';
  private previousIndex: number = 1;

  constructor() { }

  async ngOnInit() {
    if (!this.component)
      this.headerTitle.setTitle('Authors')
    else
      return;
    try {
      await this.loading.present();
      await this.GetAuthors();
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }

  async GetAuthors(index: number | null = null, value: string | null = null) {
    this.pages = 0;
    this.selectedAuthor = null;
    if (value != null)
      this.previousSearch = value;
    else
      value = this.previousSearch;
    if (index == null)
      index = this.previousIndex
    else
      this.previousIndex = index;
    let authorsList: AuthorsList = await this.libraryService.GetAuthors(this.orderMode, (index - 1) * this.authorsPerPage, this.authorsPerPage, value);
    this.rows = authorsList.Authors;
    this.pages = Math.ceil(authorsList.TotalCount / this.authorsPerPage)
  }
  async previous(index: number) {
    try {
      await this.loading.present();
      this.selectedAuthor = null;
      await this.GetAuthors(index);
    }
    catch (error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async next(index: number) {
    try {
      await this.loading.present();
      this.selectedAuthor = null;
      await this.GetAuthors(index);
    }
    catch (error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async setAuthorsPerPage(number: number) {
    try {
      await this.loading.present();
      this.authorsPerPage = number;
      this.selectedAuthor = null;
      await this.GetAuthors();
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.present();
    }
  }
  async changeOrderMode(mode: string) {
    try {
      await this.loading.present();
      this.orderMode = mode.toLowerCase();
      await this.GetAuthors();
    }
    catch(error) {
      await this.error.catchError(error)
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async search(value: string) {
    try {
      await this.loading.present();
      await this.GetAuthors(null, value);
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
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
    try {
      await this.loading.present();
      await this.libraryService.SaveAuthor(this.authorToEdit);
      this.authorModal = false;
      await this.GetAuthors();
    }
    catch(error) {
      await this.error.catchError(error)
    }
    finally {
      await this.loading.dismiss();
    }
  }

  selectAuthor(author: any) {
    this.selectedAuthor = author;
    if (this.component)
      this.getSelected.emit(author);
  }

}
