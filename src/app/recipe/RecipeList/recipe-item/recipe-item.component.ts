import { Component, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

@Input() list: Recipe
@Input() index:number;
//making this property accessed outside of the component of type Recipe

// @Output() recipeSelected=new EventEmitter<void>();
//passing event to parent compne t resipeList Component



  ngOnInit(): void {
  }

 

}
