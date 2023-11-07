import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input('curRecipe') recipe: Recipe;
  @Input('index') id: number;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  recipeClicked() {
    this.router.navigate([this.id], {relativeTo: this.route})
  }

}
