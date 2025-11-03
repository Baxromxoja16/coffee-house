// src/test.ts
import 'zone.js';
import 'zone.js/testing';

// New recommended testing imports (Angular 16+ / 17+ / 20+)
import { getTestBed, TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

// Initialize the Angular testing environment.
TestBed.initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting()
);
