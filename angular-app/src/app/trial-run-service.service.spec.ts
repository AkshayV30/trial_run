import { TestBed } from '@angular/core/testing';

import { TrialRunServiceService } from './trial-run-service.service';

describe('TrialRunServiceService', () => {
  let service: TrialRunServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrialRunServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
