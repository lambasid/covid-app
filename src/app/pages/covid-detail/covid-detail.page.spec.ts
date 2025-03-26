import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CovidDetailPage } from './covid-detail.page';

describe('CovidDetailPage', () => {
  let component: CovidDetailPage;
  let fixture: ComponentFixture<CovidDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
