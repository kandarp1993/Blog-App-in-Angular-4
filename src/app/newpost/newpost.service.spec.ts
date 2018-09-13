import { TestBed, inject } from '@angular/core/testing';

import { NewpostService } from './newpost.service';

describe('NewpostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewpostService]
    });
  });

  it('should be created', inject([NewpostService], (service: NewpostService) => {
    expect(service).toBeTruthy();
  }));
});
