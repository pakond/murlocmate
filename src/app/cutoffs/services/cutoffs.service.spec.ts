import { TestBed } from '@angular/core/testing';

import { CutoffsService } from './cutoffs.service';

describe('CutoffsService', () => {
  let service: CutoffsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CutoffsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
