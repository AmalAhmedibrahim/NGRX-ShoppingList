import { ShoppingActionTypes } from '../Action/shopping.actions';
import { ShoppingReducer } from './shopping.reducer';

describe('test shopping reducers', () => {
  const intialState = {
    list: [],
    loading: false,
    error: undefined
  };
  beforeEach(() => {});

  it('should return init state', () => {
    const action = { type: 'noop' } as any;
    expect(ShoppingReducer(undefined, action)).toEqual(intialState);
  });

  it('Should return loading true', () => {
    const action = { type: ShoppingActionTypes.LOAD_SHOPPING } as any;
    expect(ShoppingReducer(intialState, action).loading).toEqual(true);
  });
  it('should return loading false and error', () => {
    const action = { type: ShoppingActionTypes.LOAD_SHOPPING_FAILURE } as any;
    const error = new Error('Load Shopping fail error');
    action.payload = error;
    expect(ShoppingReducer(intialState, action).loading).toEqual(false);
    expect(ShoppingReducer(intialState, action).error).toEqual(error);

  });
});
