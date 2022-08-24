import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputatdcardComponent } from './inputatdcard.component';

describe('InputatdcardComponent', () => {
  let component: InputatdcardComponent;
  let fixture: ComponentFixture<InputatdcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputatdcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputatdcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
