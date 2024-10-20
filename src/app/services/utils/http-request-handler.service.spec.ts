import { TestBed } from '@angular/core/testing';

import { HttpRequestHandlerService } from './http-request-handler.service';

describe('HttpRequestHandlerService', () => {
  let service: HttpRequestHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpRequestHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
