import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController} from '@ionic/angular';
import { Author } from 'src/app/core/models/author';
import { BookDetails } from 'src/app/core/models/book-details';
import { Ownership } from 'src/app/core/models/ownership';
import { Reading } from 'src/app/core/models/reading';
import { Series } from 'src/app/core/models/series';
import { LibraryService } from 'src/app/services/nest-api/library.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { CatchErrorService } from 'src/app/services/utils/catch-error.service';
import { HeaderTitleService } from 'src/app/services/utils/header-title.service';
import { LoadingService } from 'src/app/services/utils/loading.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent  implements OnInit {
  private route = inject(ActivatedRoute);
  private navigation = inject(NavController);
  private libraryService = inject(LibraryService);
  private loading = inject(LoadingService);
  private error = inject(CatchErrorService);
  private header = inject(HeaderTitleService);
  private router = inject(Router)
  public auth = inject(AuthService);
  public bookDetails: BookDetails;
  public mappedAuthors: string | undefined = '';
  public bookErrors: string[] = [];
  public authorsModal: boolean = false;
  public authorToAdd: Author | null = null;
  public authorToRemove: Author | null = null;
  public series: Series = new Series(0, '');
  public seriesModal: boolean= false;
  public selectedSeries: Series | null = null;
  public reading: Reading = new Reading(0, null, false)
  public readingErrors: string[] = [];
  public ownership: Ownership = new Ownership(0, false, false);

  constructor() {
    this.bookDetails = new BookDetails(0, '', true, [], null, null, null, null);
   }

  async ngOnInit() {
    this.header.setTitle('Book Details');
    let id: any = this.route.snapshot.paramMap.get('id');
    if (! isNaN(Number(id))) {
      try {
        await this.loading.present();
        this.bookDetails = await this.libraryService.GetBookDetails(id as number, this.auth.getPersonification());
        this.mappedAuthors = this.bookDetails.Authors.map(t => t.AuthorName).join(', ');
        this.series = this.bookDetails.Series ?? this.series;
        this.reading = this.bookDetails.Reading ?? this.reading;
        this.ownership = this.bookDetails.Ownership ?? this.ownership;
      }
      catch(error) {
        await this.error.catchError(error)
      }
      finally {
        await this.loading.dismiss();
      }
    }
  }

  AddNew() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['library/book/add']);
    });
    this.bookDetails = new BookDetails(0, '', true, [], null, null, null, null);
    this.mappedAuthors = '';
    this.bookErrors = [];
    this.authorsModal = false;
    this.authorToAdd = null;
    this.authorToRemove = null;
    this.series = new Series(0, '');
    this.seriesModal = false;
    this.selectedSeries = null;
    this.reading = new Reading(0, null, false)
    this.readingErrors = [];
    this.ownership = new Ownership(0, false, false);
  }

  async saveGeneralData() {
    this.checkGeneralDataError();
    if (this.bookErrors.length > 0) {
      return;
    }
    try {
      await this.loading.present();
      if (this.series.SeriesId != 0)
        this.bookDetails.Series = this.series;
      this.bookDetails.BookId = await this.libraryService.SaveBookGeneralData(this.bookDetails);
    }
    catch (error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }

  checkGeneralDataError() {
    this.bookErrors = [];
    if (this.bookDetails.Title == null || this.bookDetails.Title == '')
      this.bookErrors.push('The book title is required');
    if (this.bookDetails.Authors.length == 0)
      this.bookErrors.push('At least one author is needed');
    if (this.series.SeriesId == 0)
      this.bookDetails.Position = null;
    if (this.series.SeriesId != 0 && this.bookDetails.Position == null)
      this.bookErrors.push('The book position in the series is needed')
  }

  async saveReading() {
    if (this.reading.ReadingDate?.toString() == '')
      this.reading.ReadingDate = null;
    console.log(this.reading);
    if (this.reading.ReadingDate == null && !this.reading.ToRead && this.reading.ReadingId == 0)
      return;
    try {
      await this.loading.present();
      if (this.reading.ReadingDate != null)
        this.reading.ToRead = false;
      this.reading.ReadingId = await this.libraryService.SaveReading(this.reading, this.auth.getUser(), this.bookDetails.BookId);
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async saveOwnership() {
    if (!this.ownership.PhysicallyOwned && !this.ownership.DigitallyOwned && this.ownership.OwnedBookId == 0)
      return;
    try {
      await this.loading.present();
      this.ownership.OwnedBookId = await this.libraryService.SaveOwnership(this.ownership, this.auth.getUser(), this.bookDetails.BookId);
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }
  back() {
    this.navigation.navigateBack('library/books');
  }

  getAuthorToAdd(author: any) {
    this.authorToAdd = author;
  }
  getAuthorToRemove(author: any) {
    this.authorToRemove = author;
  }

  openAuthorModal() {
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

  openSeriesModal() {
    this.seriesModal = true;
    this.selectedSeries = null;
  }
  getSelectedSeries(series: any) {
    this.selectedSeries = series as Series;
  }
  selectSeries() {
    this.series = this.selectedSeries as Series;
    this.selectedSeries = null;
    this.seriesModal = false;
  }
  removeSeries() {
    this.series = new Series(0, '');
    this.selectedSeries = null;
    this.seriesModal = false;
  }

}
