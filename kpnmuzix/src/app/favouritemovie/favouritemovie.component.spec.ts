import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritemovieComponent } from './favouritemovie.component';

describe('FavouritemovieComponent', () => {
  let component: FavouritemovieComponent;
  let fixture: ComponentFixture<FavouritemovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavouritemovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavouritemovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
