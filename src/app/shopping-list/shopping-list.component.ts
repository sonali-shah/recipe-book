import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  ingSubscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.ingSubscription = this.slService.ingredientAdded.subscribe(
      (ingredients) => this.ingredients = ingredients
    )
  }

  ingredientAdded(ingredient) {
    this.slService.addIngredient(ingredient);
  }

  editIngredient(index) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.ingSubscription.unsubscribe();
  }
}
