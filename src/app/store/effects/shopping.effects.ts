import { LoadShoppingAction } from './../Action/shopping.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {
  AddItemAction,
  AddItemFailureAction,
  AddItemSuccessAction,
  DeleteItemAction,
  DeleteItemFailureAction,
  DeleteItemSuccessAction,
  LoadShoppingFailureAction,
  LoadShoppingSuccessAction,
  ShoppingActionTypes,
} from '../Action/shopping.actions';
import { ShoppingService } from 'src/app/services/shopping.service';
import * as AppActions from '../Action/shopping.actions';

@Injectable()
export class ShoppingEffects {
  loadShopping$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.LoadShoppingAction),
      mergeMap(() =>
        this.shoppingService.getShoppingItems().pipe(
          map((data) => {
            return LoadShoppingSuccessAction({payload: data});
          }),
          catchError((error) => of(LoadShoppingFailureAction(error)))
        )
      )
    );
  });

  addShoppingItem$ = createEffect(() => {
   return this.actions$.pipe(
     ofType(AppActions.AddItemAction),
     mergeMap((data) =>
       this.shoppingService.addShoppingItem(data.payload).pipe(
         map(() => AddItemSuccessAction({payload: data.payload})),
         catchError((error) => of(AddItemFailureAction(error)))
       )
     )
   );
  });

  deleteShoppingItem$ = createEffect (() => {

   return this.actions$.pipe(
      ofType(DeleteItemAction),
      mergeMap((data) =>
        this.shoppingService.deleteShoppingItem(data.payload).pipe(
          map(() => DeleteItemSuccessAction({payload: data.payload})),
          catchError((error) => of(DeleteItemFailureAction(error)))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private shoppingService: ShoppingService
  ) {}
}
