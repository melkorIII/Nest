import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Author } from 'src/app/core/models/author';
import { BookDetails } from 'src/app/core/models/book-details';
import { LibraryService } from 'src/app/services/nest-api/library.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent  implements OnInit {
  private route = inject(ActivatedRoute);
  private navigation = inject(NavController);
  private libraryService = inject(LibraryService);
  public bookDetails: BookDetails;
  public mappedAuthors: string | undefined = '';
  public bookErrors: string[] = [];
  public authorsModal: boolean = false;
  public authorToAdd: Author | null = null;
  public authorToRemove: Author | null = null;

  constructor() {
    this.bookDetails = new BookDetails(0, '', true, [], false, false, null, null, null, null, null, null, null, null, null, null);
   }

  async ngOnInit() {
    let id: any = this.route.snapshot.paramMap.get('id');
    if (! isNaN(Number(id))) {
      try {
        this.bookDetails = await this.libraryService.GetBookDetails(id as number);
        this.mappedAuthors = this.bookDetails.Authors.map(t => t.AuthorName).join(', ');
      }
      catch(error) {}
    }
  }

  async save() {
    this.bookErrors = [];
    if (this.bookDetails.Title == null || this.bookDetails.Title == '')
      this.bookErrors.push('The book title is required');

    if (this.bookErrors.length > 0)
      return;

    await this.libraryService.SaveBook(this.bookDetails);
  }

  cancel() {
    this.navigation.navigateBack('library/books');
  }

  getAuthorToAdd(author: any) {
    this.authorToAdd = author;
  }
  getAuthorToRemove(author: any) {
    this.authorToRemove = author;
  }

  openModal() {
    this.authorsModal = true;
    this.authorToAdd = null;
    this.authorToRemove = null;
  }
  addAuthor() {
    this.bookDetails.Authors.push(this.authorToAdd!);
    this.mappedAuthors = this.bookDetails.Authors.map(t => t.AuthorName).join(', ');
  }
  removeAuthor() {
    this.bookDetails.Authors.splice(this.bookDetails.Authors.indexOf(this.authorToRemove!, 0));
    this.mappedAuthors = this.bookDetails.Authors.map(t => t.AuthorName).join(', ');
  }
}
