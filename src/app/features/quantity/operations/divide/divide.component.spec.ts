import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivideComponent } from './divide.component';

describe('DivideComponent', () => {
  let component: DivideComponent;
  let fixture: ComponentFixture<DivideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
