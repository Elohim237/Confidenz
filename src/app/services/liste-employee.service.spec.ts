import { TestBed } from '@angular/core/testing';

import { ListeEmployeeService } from './liste-employee.service';

describe('ListeEmployeeService', () => {
  let service: ListeEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
