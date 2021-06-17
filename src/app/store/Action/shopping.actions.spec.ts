import { ShoppingItem } from '../models/shopping-item.model';
import * as actions from './shopping.actions';
import { ShoppingActionTypes } from './shopping.actions';

describe('Test Shopping Actions', () => {
    it('Create Shopping Action', () => {
        const loadAction  = actions.LoadShoppingAction();
        expect({...loadAction}).toEqual({type: ShoppingActionTypes.LOAD_SHOPPING});
    });
    it('Load Shopping Success', () => {
        const payLoad: ShoppingItem [] = [
            {id: '1', name: 'Cookies' },
            {id: '2', name: 'Coke' },
        ];
        const successAction = actions.LoadShoppingSuccessAction({payload: payLoad});
        expect({...successAction}).toEqual({type: ShoppingActionTypes.LOAD_SHOPPING_SUCCESS , payload: payLoad});
    });
    it('Load Shopping Fail', () => {
        const payLoad = new Error('Load Shopping Fail error');
        const failAction = actions.LoadShoppingFailureAction({payload: payLoad});
        expect({...failAction}).toEqual({type: ShoppingActionTypes.LOAD_SHOPPING_FAILURE, payload: payLoad});
    });
});
