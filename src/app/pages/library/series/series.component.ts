import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ignoreElements } from 'rxjs';
import { ListColumn } from 'src/app/core/models/list-column';
import { Series } from 'src/app/core/models/series';
import { LibraryService } from 'src/app/services/nest-api/library.service';
import { LoadingService } from 'src/app/services/utils/loading.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss'],
})
export class SeriesComponent  implements OnInit {
  private libraryService = inject(LibraryService)
  private loading = inject(LoadingService)
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
    await this.loading.present();
    await this.GetSeries(1);
    await this.GetPages();
    await this.loading.dismiss();
  }

  async GetPages() {
    this.pages = Math.ceil(await this.libraryService.GetSeriesCount() / this.seriesPerPage);
  }

  async GetSeries(index: number, value: string | null = null) {
    this.selectedSeries = null;
    this.rows = await this.libraryService.GetSeries(this.orderMode, (index - 1) * this.seriesPerPage, this.seriesPerPage, value);
  }
  async previous(index: number) {
    await this.loading.present();
    this.selectedSeries = null;
    await this.GetSeries(index);
    await this.loading.dismiss();
  }
  async next(index: number) {
    await this.loading.present();
    this.selectedSeries = null;
    await this.GetSeries(index);
    await this.loading.dismiss();
  }
  async setSeriesPerPage(number: number) {
    await this.loading.present();
    this.seriesPerPage = number;
    this.selectedSeries = null;
    await this.GetSeries(1);
    await this.loading.dismiss();
  }
  async changeOrderMode(mode: string) {
    await this.loading.present();
    this.orderMode = mode.toLowerCase();
    await this.GetSeries(1);
    await this.loading.dismiss();
  }
  async search(value: string) {
    await this.loading.present();
    this.GetSeries(1, value);
    await this.loading.dismiss();
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
    await this.loading.present();
    await this.libraryService.SaveSeries(this.seriesToEdit);
    this.seriesModal = false;
    this.GetSeries(1);
    await this.loading.dismiss();
  }

  selectSeries(series: any) {
    this.selectedSeries = series;
    if (this.component)
      this.getSelected.emit(series);
  }

}
