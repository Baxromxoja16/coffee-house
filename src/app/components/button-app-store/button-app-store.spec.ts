import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAppStore } from './button-app-store';

describe('ButtonAppStore', () => {
  let component: ButtonAppStore;
  let fixture: ComponentFixture<ButtonAppStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonAppStore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonAppStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
