import { TestBed } from '@angular/core/testing';

import { ChangePasswordCompagnyService } from './change-password-compagny.service';

describe('ChangePasswordCompagnyService', () => {
  let service: ChangePasswordCompagnyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangePasswordCompagnyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
