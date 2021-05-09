import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";


@Injectable()

export class RecipeService{

recipChanged=new Subject<Recipe[]>();


public recipeSelected=new EventEmitter<Recipe>();

//    private recipes: Recipe[] =[
//         new Recipe('A sample recipe',
//         'A sample test',
//         'https://s23209.pcdn.co/wp-content/uploads/2020/12/Creamy-Chicken-and-GnocchiIMG_1105-360x540.jpg'
//         ,[

//                new Ingredient('Ing1',20),
//                new Ingredient('Ing2',1)

//         ])
//         ,
//         new Recipe('A sample recipe',
//         'A sample test',
//         'https://s23209.pcdn.co/wp-content/uploads/2020/12/Creamy-Chicken-and-GnocchiIMG_1105-360x540.jpg'
//         ,[

            
//             new Ingredient('Ing1',20),
//             new Ingredient('Ing2',1)
//         ]),
//     ];
    
private recipes:Recipe[]=[];
    
    constructor(private shoppingService:ShoppingService){

    }
getRecipes(){
    return this.recipes.slice();
    //slice() will give us a copy of array
}

getRecipeById(id:number){
    return this.recipes.slice()[id];
    //returns single recipe
}

addIngredientsToShoppigList(ingredient : Ingredient[]){
this.shoppingService.addIngredientsFromRecipe(ingredient);
}

addRecipe(recipe: Recipe){
this.recipes.push(recipe);
this.recipChanged.next(this.recipes.slice());
}

updateRecipe(index: number,newRecipe:Recipe){
this.recipes[index]=newRecipe;
this.recipChanged.next(this.recipes.slice());


}

setRecipes(recipes:Recipe[]){
    this.recipes=recipes;
    this.recipChanged.next(this.recipes.slice());
}

deleteRecipe(index:number){

    this.recipes.splice(index,1);
    this.recipChanged.next(this.recipes.slice());
    
}



}