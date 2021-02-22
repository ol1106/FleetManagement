import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIssueComponent } from './update-issue.component';

describe('UpdateIssueComponent', () => {
  let component: UpdateIssueComponent;
  let fixture: ComponentFixture<UpdateIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
