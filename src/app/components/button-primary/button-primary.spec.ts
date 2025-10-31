import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonPrimary } from './button-primary';
import { ActivatedRoute } from '@angular/router';

describe('ButtonPrimary', () => {
  let component: ButtonPrimary;
  let fixture: ComponentFixture<ButtonPrimary>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonPrimary],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonPrimary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
