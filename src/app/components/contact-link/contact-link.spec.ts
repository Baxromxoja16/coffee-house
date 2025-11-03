import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactLink } from './contact-link';

describe('ContactLink', () => {
  let component: ContactLink;
  let fixture: ComponentFixture<ContactLink>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactLink]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactLink);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
