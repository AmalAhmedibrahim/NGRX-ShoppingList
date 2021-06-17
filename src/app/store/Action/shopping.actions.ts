import { createAction, props } from '@ngrx/store';
import { ShoppingItem } from '../models/shopping-item.model';

export enum ShoppingActionTypes {
  LOAD_SHOPPING = '[SHOPPING] Load Shopping',
  LOAD_SHOPPING_SUCCESS = '[SHOPPING] Load Shopping Success',
  LOAD_SHOPPING_FAILURE = '[SHOPPING] Load Shopping Failure',
  ADD_ITEM = '[SHOPPING] Add Item',
  ADD_ITEM_SUCCESS = '[SHOPPING] Add Item Success',
  ADD_ITEM_FAILURE = '[SHOPPING] Add Item Failure', 
  DELETE_ITEM = '[SHOPPING] Delete Item',
  DELETE_ITEM_SUCCESS = '[SHOPPING] Delete Item Success',
  DELETE_ITEM_FAILURE = '[SHOPPING] Delete Item Failure'
}


export const LoadShoppingAction = createAction(ShoppingActionTypes.LOAD_SHOPPING);

export const LoadShoppingSuccessAction = createAction(ShoppingActionTypes.LOAD_SHOPPING_SUCCESS,
  props<{payload: ShoppingItem[]}>());

export const LoadShoppingFailureAction = createAction(ShoppingActionTypes.LOAD_SHOPPING_FAILURE,
  props<{payload: Error}>());


export const AddItemAction = createAction( ShoppingActionTypes.ADD_ITEM,
  props<{payload: ShoppingItem}>());

export const AddItemSuccessAction = createAction(ShoppingActionTypes.ADD_ITEM_SUCCESS,
  props<{payload: ShoppingItem}>());

export const AddItemFailureAction  = createAction(ShoppingActionTypes.ADD_ITEM_FAILURE,
  props<{payload: Error}>());

export const DeleteItemAction = createAction(ShoppingActionTypes.DELETE_ITEM,
  props<{payload: string}>());


export const DeleteItemSuccessAction = createAction(ShoppingActionTypes.DELETE_ITEM_SUCCESS,
  props<{payload: string}>());

export const DeleteItemFailureAction = createAction(ShoppingActionTypes.DELETE_ITEM_FAILURE,
  props<{payload: string}>());
