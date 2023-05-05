import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatadogDashboardComponent } from './datadog-dashboard.component';

describe('DatadogDashboardComponent', () => {
  let component: DatadogDashboardComponent;
  let fixture: ComponentFixture<DatadogDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatadogDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatadogDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
