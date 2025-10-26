import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCarousel } from './button-carousel';

describe('ButtonCarousel', () => {
  let component: ButtonCarousel;
  let fixture: ComponentFixture<ButtonCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCarousel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
