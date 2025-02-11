import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewonemovieComponent } from './viewonemovie.component';

describe('ViewonemovieComponent', () => {
  let component: ViewonemovieComponent;
  let fixture: ComponentFixture<ViewonemovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewonemovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewonemovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
