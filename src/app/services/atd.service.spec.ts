import { TestBed } from '@angular/core/testing';

import { AtdService } from './atd.service';

describe('AtdService', () => {
  let service: AtdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
