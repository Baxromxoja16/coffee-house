import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSocial } from './button-social';

describe('ButtonSocial', () => {
  let component: ButtonSocial;
  let fixture: ComponentFixture<ButtonSocial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSocial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSocial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
