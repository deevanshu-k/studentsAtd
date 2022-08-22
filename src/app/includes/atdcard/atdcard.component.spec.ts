import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtdcardComponent } from './atdcard.component';

describe('AtdcardComponent', () => {
  let component: AtdcardComponent;
  let fixture: ComponentFixture<AtdcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtdcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtdcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
