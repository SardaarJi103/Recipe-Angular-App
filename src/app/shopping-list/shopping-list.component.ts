import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers:[ShoppingService]
})
export class ShoppingListComponent implements OnInit {
Ingredients: Ingredient[];


// =[
// new Ingredient('apples',5)
// ,
// new Ingredient('tomaoes',10)
// ];

  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {
    this.Ingredients=this.shoppingService.getIngredients();
    this.shoppingService.ingredientAdded
    .subscribe(
      (ingredient:Ingredient[])=>{
        this.Ingredients=ingredient;
      }
    )
  }

  onEditItem(index:number){
    this.shoppingService.startedEditing.next(index);
  }

  // onIngrideintAdded(ingredient : Ingredient){
  //   this.Ingredients.push(ingredient);
  //   // this.shoppingService.getIngredients().push(ingredient);
  // }
}
