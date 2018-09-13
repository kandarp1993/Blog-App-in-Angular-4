import { TestBed, inject } from '@angular/core/testing';

import { PostsserviceService } from './postsservice.service';

describe('PostsserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostsserviceService]
    });
  });

  it('should be created', inject([PostsserviceService], (service: PostsserviceService) => {
    expect(service).toBeTruthy();
  }));
});
