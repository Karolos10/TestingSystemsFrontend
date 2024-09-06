import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExameneComponent } from './add-examene.component';

describe('AddExameneComponent', () => {
  let component: AddExameneComponent;
  let fixture: ComponentFixture<AddExameneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddExameneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExameneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
