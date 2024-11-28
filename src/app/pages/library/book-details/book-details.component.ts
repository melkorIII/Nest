import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Author } from 'src/app/core/models/author';
import { BookDetails } from 'src/app/core/models/book-details';
import { Series } from 'src/app/core/models/series';
import { LibraryService } from 'src/app/services/nest-api/library.service';
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
  private loading = inject(LoadingService)
  public bookDetails: BookDetails;
  public mappedAuthors: string | undefined = '';
  public bookErrors: string[] = [];
  public authorsModal: boolean = false;
  public authorToAdd: Author | null = null;
  public authorToRemove: Author | null = null;
  public series: Series = new Series(0, '');
  public seriesModal: boolean= false;
  public selectedSeries: Series | null = null;

  constructor() {
    this.bookDetails = new BookDetails(0, '', true, [], null, false, false, null, null, null, null, null, null, null, null);
   }

  async ngOnInit() {
    await this.loading.present();
    let id: any = this.route.snapshot.paramMap.get('id');
    if (! isNaN(Number(id))) {
      try {
        this.bookDetails = await this.libraryService.GetBookDetails(id as number);
        this.mappedAuthors = this.bookDetails.Authors.map(t => t.AuthorName).join(', ');
        this.series = this.bookDetails.Series ?? this.series;
      }
      catch(error) {}
    }
    await this.loading.dismiss();
  }

  async save() {
    await this.loading.present();
    this.checkError();
    if (this.bookErrors.length > 0) {
      await this.loading.dismiss();
      return;
    }
    if (this.series.SeriesId != 0)
      this.bookDetails.Series = this.series;
    await this.libraryService.SaveBookGeneralData(this.bookDetails);
    await this.loading.dismiss();
    this.cancel();
  }

  checkError() {
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

  cancel() {
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
