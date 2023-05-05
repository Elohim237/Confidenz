import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDocUserComponent } from './liste-doc-user.component';

describe('ListeDocUserComponent', () => {
  let component: ListeDocUserComponent;
  let fixture: ComponentFixture<ListeDocUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeDocUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeDocUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
