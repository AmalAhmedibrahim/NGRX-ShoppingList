import { ShoppingItem } from './../models/shopping-item.model';
import {
  ShoppingActionTypes,
  AddItemAction,
} from './../Action/shopping.actions';
import { TestBed } from '@angular/core/testing';
import { ShoppingState } from './../reducers/shopping.reducer';
import { ShoppingEffects } from './shopping.effects';
import { ShoppingService } from './../../services/shopping.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import * as AppActions from '../Action/shopping.actions';

const dummyItems: ShoppingItem[] = [
  { id: '1', name: 'Cookies' },
  { id: '2', name: 'Coke' },
];
class MockShoppingService {
  getShoppingItems() {
    return of(dummyItems);
  }
  addShoppingItem() {
    const dummyItem: ShoppingItem = { id: '1', name: 'Cookies' };
    return of(dummyItem);
  }
}
describe('Testing Effect', () => {
  let actions$: Observable<any>;
  let effects: ShoppingEffects;
  let store: MockStore<ShoppingState>;
  let httpService: ShoppingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ShoppingEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: {
            list: [],
            loading: false,
            error: undefined,
          },
        }),
        { provide: ShoppingService, useClass: MockShoppingService },
      ],
    });

    effects = TestBed.inject(ShoppingEffects);
    store = TestBed.inject(MockStore);
    httpService = TestBed.inject(ShoppingService);
  });
  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return load shopping items  on success ', (done) => {
    const spy = spyOn(httpService, 'getShoppingItems').and.callThrough();
    actions$ = of(AppActions.LoadShoppingAction);
    effects.loadShopping$.subscribe((res) => {
      expect(res).toEqual(
        AppActions.LoadShoppingSuccessAction({ payload: dummyItems })
      );
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should return load shopping item error ', (done) => {
    const err = new Error('load Failed');
    const spy = spyOn(httpService, 'getShoppingItems').and.returnValue(
      throwError(err)
    );
    actions$ = of(AppActions.LoadShoppingAction);
    effects.loadShopping$.subscribe((res) => {
      expect(res.type).toEqual(ShoppingActionTypes.LOAD_SHOPPING_FAILURE);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should return an addShoppingItem on success', (done) => {
    const payload: ShoppingItem = { id: '1', name: 'Cookies' };
    // const spy = spyOn(httpService, 'addShoppingItem').withArgs(payload);
    const spy = spyOn(httpService, 'addShoppingItem').and.callFake(() => {
      return of(payload);
    });
    // console.log(payload);
    // httpService.addShoppingItem(payload);
    actions$ = of(AppActions.AddItemAction);
    effects.addShoppingItem$.subscribe((res) => {
      expect(res.type).toEqual(ShoppingActionTypes.ADD_ITEM_SUCCESS);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should return an addShoppingItem on error', (done) => {
    const payload: ShoppingItem = { id: '1', name: 'Cookies' };
    const err = new Error('load Failed');

    const spy = spyOn(httpService, 'addShoppingItem')
      .and.callFake(() => {
        return of(payload);
      })
      .and.returnValue(throwError(err));

    actions$ = of(AppActions.AddItemAction);
    effects.addShoppingItem$.subscribe((res) => {
      expect(res.type).toEqual(ShoppingActionTypes.ADD_ITEM_FAILURE);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
