import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDocComponent } from './config-doc.component';

describe('ConfigDocComponent', () => {
  let component: ConfigDocComponent;
  let fixture: ComponentFixture<ConfigDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
