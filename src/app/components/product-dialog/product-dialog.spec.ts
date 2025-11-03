import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDialog } from './product-dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ProductDialog', () => {
  let component: ProductDialog;
  let fixture: ComponentFixture<ProductDialog>;
  const mockDynamicDialogRef = {
    close: jasmine.createSpy('close'),
  } as unknown as DynamicDialogRef;
  const mockDynamicDialogConfig: DynamicDialogConfig = {
    data: { id: 1 } // test uchun kerakli dialog data
  } as DynamicDialogConfig;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductDialog,
      ],
      providers: [
        { provide: DynamicDialogRef, useValue: mockDynamicDialogRef },
        { provide: DynamicDialogConfig, useValue: mockDynamicDialogConfig },
        HttpClient,
        HttpHandler
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
