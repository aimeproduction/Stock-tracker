import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackStockSymbolComponent } from './track-stock-symbol.component';

describe('TrackStockSymbolComponent', () => {
  let component: TrackStockSymbolComponent;
  let fixture: ComponentFixture<TrackStockSymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackStockSymbolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackStockSymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
