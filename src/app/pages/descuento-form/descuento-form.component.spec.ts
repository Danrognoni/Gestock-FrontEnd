import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescuentoFormComponent } from './descuento-form.component';

describe('DescuentoFormComponent', () => {
  let component: DescuentoFormComponent;
  let fixture: ComponentFixture<DescuentoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescuentoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescuentoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
