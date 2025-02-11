import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerModalComponentComponent } from './trailer-modal-component.component';

describe('TrailerModalComponentComponent', () => {
  let component: TrailerModalComponentComponent;
  let fixture: ComponentFixture<TrailerModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrailerModalComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrailerModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
