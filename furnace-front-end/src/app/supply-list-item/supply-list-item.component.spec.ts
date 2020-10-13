import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyListItemComponent } from './supply-list-item.component';

describe('SupplyListItemComponent', () => {
  let component: SupplyListItemComponent;
  let fixture: ComponentFixture<SupplyListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
