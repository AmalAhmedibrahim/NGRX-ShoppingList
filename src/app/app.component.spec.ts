import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { AppState } from './store/models/app-state.model';
import * as AppActions from './store/Action/shopping.actions';
import { ShoppingItem } from './store/models/shopping-item.model';
import { of } from 'rxjs';

const dummyItems: ShoppingItem[] = [
  { id: '1', name: 'Cookies' },
  { id: '2', name: 'Coke' },
];
describe('AppComponent', () => {
  const storeMock = {
    select() {
      return of(dummyItems);
    },
  };
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: Store<AppState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({})],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store);
    store.dispatch({ type: AppActions.LoadShoppingAction, pay });
  });

  it('should create the app', () => {
    // expect(app).toBeTruthy();
  });
});
