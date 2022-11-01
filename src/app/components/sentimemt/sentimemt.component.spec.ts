import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentimemtComponent } from './sentimemt-details.component';

describe('SentimemtDetailsComponent', () => {
  let component: SentimemtComponent;
  let fixture: ComponentFixture<SentimemtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentimemtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SentimemtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
