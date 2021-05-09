import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
selector:'app-RecipeList',
templateUrl:'./RecipeList.component.html',
styleUrls:['./RecipeList.component.css']
})

export class RecipeListComponent implements OnInit,OnDestroy{

// @Output() recipeWasSelected= new EventEmitter<Recipe>();

 recipes: Recipe[];
 subscription:Subscription;
 //=[
//     new Recipe('A sample recipe',
//     'A sample test',
//     'https://s23209.pcdn.co/wp-content/uploads/2020/12/Creamy-Chicken-and-GnocchiIMG_1105-360x540.jpg')
//     ,
//     new Recipe('A sample recipe',
//     'A sample test',
//     'https://s23209.pcdn.co/wp-content/uploads/2020/12/Creamy-Chicken-and-GnocchiIMG_1105-360x540.jpg'),
// ];     // here we are using Recipe class from recipe.model.ts

constructor(private recipeService:RecipeService,private router:Router,private route:ActivatedRoute){


}


onRecipeSelected(recipe: Recipe){
// this.recipeWasSelected.emit(recipe);

}
    ngOnInit(){

       this.subscription= this.recipeService.recipChanged.
        subscribe(
            (recipes: Recipe[])=>{
              this.recipes=recipes;
            }
        );
this.recipes=this.recipeService.getRecipes();
}

onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});

}

ngOnDestroy(){
    this.subscription.unsubscribe();
    //to prevent any memory leaks
}

}