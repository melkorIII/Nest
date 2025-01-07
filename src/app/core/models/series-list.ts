import { Series } from "./series";

export class SeriesList {
    Series: Series[];
    TotalCount: number;

    constructor(series: Series[], totalCount: number) {
        this.Series = series;
        this.TotalCount = totalCount;
    }
}
