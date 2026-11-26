import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OficinasResponsables } from './oficinas-responsables';

describe('OficinasResponsables', () => {
  let component: OficinasResponsables;
  let fixture: ComponentFixture<OficinasResponsables>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OficinasResponsables],
    }).compileComponents();

    fixture = TestBed.createComponent(OficinasResponsables);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
