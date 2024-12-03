import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { ListColumn } from 'src/app/core/models/list-column';
import { Series } from 'src/app/core/models/series';
import { LibraryService } from 'src/app/services/nest-api/library.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { CatchErrorService } from 'src/app/services/utils/catch-error.service';
import { HeaderTitleService } from 'src/app/services/utils/header-title.service';
import { LoadingService } from 'src/app/services/utils/loading.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent  implements OnInit {
  private libraryService = inject(LibraryService)
  private loading = inject(LoadingService);
  private error = inject(CatchErrorService);
  public auth = inject(AuthService);
  private header = inject(HeaderTitleService)
  @Input() public component: boolean = false;
  @Input() public seriesPerPage = 10;
  @Output() public getSelected: EventEmitter<any> = new EventEmitter();
  public columns: ListColumn[] = [{name: 'Series name', size: 12, identifier: 'SeriesName'}];
  public rows: Series[] = [];
  public pages: number = 0;
  public selectedSeries: Series | null = null;
  public seriesModal: boolean = false;
  public seriesToEdit: Series = new Series(0, '');
  public seriesErrors: string[] = [];
  private orderMode: string = 'asc';

  constructor() { }

  async ngOnInit() {
    if (!this.component)
      this.header.setTitle('Series')
    try {
      await this.loading.present();
      await this.GetSeries(1);
      await this.GetPages();
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally{
      await this.loading.dismiss();
    }
  }

  async GetPages() {
    this.pages = Math.ceil(await this.libraryService.GetSeriesCount() / this.seriesPerPage);
  }

  async GetSeries(index: number, value: string | null = null) {
    this.selectedSeries = null;
    this.rows = await this.libraryService.GetSeries(this.orderMode, (index - 1) * this.seriesPerPage, this.seriesPerPage, value);
  }
  async previous(index: number) {
    try {
      await this.loading.present();
      this.selectedSeries = null;
      await this.GetSeries(index);
    }
    catch(error) {
      await this.error.catchError(error)
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async next(index: number) {
    try {
      await this.loading.present();
      this.selectedSeries = null;
      await this.GetSeries(index);
    }
    catch (error) {
      await this.error.catchError(error)
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async setSeriesPerPage(number: number) {
    try {
      await this.loading.present();
      this.seriesPerPage = number;
      this.selectedSeries = null;
      await this.GetSeries(1);
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async changeOrderMode(mode: string) {
    try {
      await this.loading.present();
      this.orderMode = mode.toLowerCase();
      await this.GetSeries(1);
    }
    catch(error) {
      await this.error.catchError(error);
    }
    finally {
      await this.loading.dismiss();
    }
  }
  async search(value: string) {
    try {
      await this.loading.present();
      await this.GetSeries(1, value);
    }
    catch(error) {
      await this.error.catchError(error)
    }
    finally {
      await this.loading.dismiss();
    }
  }
  addSeries() {
    this.seriesModal = true;
    this.seriesToEdit = new Series(0, '');
  }
  editSeries() {
    this.seriesModal = true;
    this.seriesToEdit = this.selectedSeries as Series;
  }
  async saveSeries() {
    this.seriesErrors = [];
    if (this.seriesToEdit.SeriesName == null || this.seriesToEdit.SeriesName == '')
      this.seriesErrors.push('The series name is required');
    if (this.seriesErrors.length > 0)
      return;
    try {
      await this.loading.present();
      await this.libraryService.SaveSeries(this.seriesToEdit);
      this.seriesModal = false;
      await this.GetSeries(1);
      await this.GetPages();
    }
    catch(error) {
      await this.error.catchError(error)
    }
    finally {
      await this.loading.dismiss();
    }
  }

  selectSeries(series: any) {
    this.selectedSeries = series;
    if (this.component)
      this.getSelected.emit(series);
  }

}
