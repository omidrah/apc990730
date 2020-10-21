import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableTestComponent } from './mat-table-test.component';

describe('MatTableTestComponent', () => {
  let component: MatTableTestComponent;
  let fixture: ComponentFixture<MatTableTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatTableTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatTableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
