import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobinhoodComponent } from './robinhood.component';

describe('RobinhoodComponent', () => {
  let component: RobinhoodComponent;
  let fixture: ComponentFixture<RobinhoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobinhoodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobinhoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
