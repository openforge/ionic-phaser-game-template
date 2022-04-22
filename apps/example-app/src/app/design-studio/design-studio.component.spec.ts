import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignStudioComponent } from './design-studio.component';

describe('DesignStudioComponent', () => {
  let component: DesignStudioComponent;
  let fixture: ComponentFixture<DesignStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignStudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
