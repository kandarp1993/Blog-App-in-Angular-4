import { TestBed, inject } from '@angular/core/testing';

import { EditpostService } from './editpost.service';

describe('EditpostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditpostService]
    });
  });

  it('should be created', inject([EditpostService], (service: EditpostService) => {
    expect(service).toBeTruthy();
  }));
});
