import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimemtDetailsComponent } from './sentimemt-details.component';

describe('SentimemtDetailsComponent', () => {
  let component: SentimemtDetailsComponent;
  let fixture: ComponentFixture<SentimemtDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimemtDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimemtDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
