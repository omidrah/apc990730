import { MatPaginatorIntl } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = 'تعداد در هر صفحه:';
  customPaginatorIntl.firstPageLabel = ' اولین ';
  customPaginatorIntl.nextPageLabel = ' بعدی ';

  customPaginatorIntl.previousPageLabel = ' قبلی ';
  customPaginatorIntl.lastPageLabel = ' آخرین ';

  customPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0)
    {
      return `0 از ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} – ${endIndex} از ${length}`;
  };

  return customPaginatorIntl;
}


export class PaginatorIntlService extends MatPaginatorIntl {
  translate: TranslateService;
  itemsPerPageLabel = 'Items per page';
  nextPageLabel = 'Next page';
  previousPageLabel = 'Previous page';
  firstPageLabel = 'First Page';
  lastPageLabel = 'Last Page';
  getRangeLabel = function (page, pageSize, length) {
    const of = this.translate ? this.translate.instant('customPaginatorIntl.of') : 'of';
    if (length === 0 || pageSize === 0) {
      return '0 ' + of + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' ' + of + ' ' + length;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.itemsPerPageLabel = this.translate.instant('customPaginatorIntl.itemsPerPageLabel');
    this.nextPageLabel = this.translate.instant('customPaginatorIntl.nextPageLabel');
    this.previousPageLabel = this.translate.instant('customPaginatorIntl.previousPageLabel');
    this.firstPageLabel = this.translate.instant('customPaginatorIntl.firstPageLabel');
    this.lastPageLabel = this.translate.instant('customPaginatorIntl.lastPageLabel');
  }

}
