import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';

import { TreeMediumTestComponent } from './tree-medium-test.component';

describe('TreeMediumTestComponent', () => {
  let component: TreeMediumTestComponent;
  let fixture: ComponentFixture<TreeMediumTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeMediumTestComponent ],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatTreeModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeMediumTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
