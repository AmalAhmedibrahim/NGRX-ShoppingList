import { ShoppingAction, ShoppingActionTypes } from '../Action/shopping.actions';
import { ShoppingItem } from '../models/shopping-item.model';


export interface ShoppingState {
    list: ShoppingItem[];
    loading: boolean;
    error: Error;
}


const intialState: ShoppingState = {
    list: [],
    loading: false,
    error: undefined
};

export function ShoppingReducer(state: ShoppingState , action: ShoppingAction){
    switch (action.type){
        case ShoppingActionTypes.LOAD_SHOPPING:
            return{state, loading: true };
        case ShoppingActionTypes.LOAD_SHOPPING_SUCCESS:
                return {
                  ...state,
                  list: action.payload,
                  loading: false
                };
                case ShoppingActionTypes.LOAD_SHOPPING_FAILURE:
                return {
                  ...state,
                  error: action.payload,
                  loading: false
                };
                case ShoppingActionTypes.ADD_ITEM_SUCCESS:
                    return {
                        ...state,
                        list: [...state.list, action.payload],
                        loading: false
                      };
                case ShoppingActionTypes.DELETE_ITEM:
                    return {...state,
                        list: state.list.filter(item => item.id !== action.payload),
                        loading: false
                    };
                default:
                    return state;
    }
}