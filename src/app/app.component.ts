import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddItemAction, DeleteItemAction, LoadShoppingAction } from './store/Action/shopping.actions';
import { AppState } from './store/models/app-state.model';
import { ShoppingItem } from './store/models/shopping-item.model';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ngrx-shopping-list';
  shoppingItems: Observable<Array<ShoppingItem>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  newShoppingItem: ShoppingItem;

  constructor(private store: Store<AppState>){
    this.newShoppingItem = {id: '', name: ''};

  }

  ngOnInit() {
    this.store.dispatch(LoadShoppingAction());

    this.shoppingItems = this.store.select(store => store.shopping.list);
    this.loading$ = this.store.select(store => store.shopping.loading);
    this.error$ = this.store.select(store => store.shopping.error);

  }
  addItem(): void{
    debugger;
    this.newShoppingItem.id = uuid();
    console.log(this.newShoppingItem);
    this.store.dispatch(AddItemAction({payload: this.newShoppingItem}));
    this.newShoppingItem = {id: '', name: ''};
  }
  deleteItem(id: string): void{
    this.store.dispatch(DeleteItemAction({payload: id}));
  }
}
