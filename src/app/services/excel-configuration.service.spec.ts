import { TestBed } from '@angular/core/testing';

import { ExcelConfigurationService } from './excel-configuration.service';

describe('ExcelConfigurationService', () => {
  let service: ExcelConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
