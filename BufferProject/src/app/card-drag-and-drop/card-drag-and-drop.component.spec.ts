import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDragAndDropComponent } from './card-drag-and-drop.component';

describe('CardDragAndDropComponent', () => {
  let component: CardDragAndDropComponent;
  let fixture: ComponentFixture<CardDragAndDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardDragAndDropComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDragAndDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
