import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  editMode: boolean = false;
  editingIndex: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.slService.startedEditing.subscribe(
      (index) => {
        this.editMode = true;
        this.editingIndex = index;
        const editingIngredient = this.slService.getIngredient(index);
        this.form.setValue({
          name: editingIngredient.name,
          amount: editingIngredient.amount
        });
      }
    )
  }

  onSubmit(form: NgForm) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editingIndex, newIngredient);
      this.editMode = false;
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear() {
    this.form.resetForm();
  }

  onDeleteIngredient() {
    this.slService.deleteIngredient(this.editingIndex);
    this.editMode = false;
    this.onClear();
  }

}
