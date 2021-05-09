import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn:'root'})
export class RecipesResolverService implements Resolve<Recipe[]>{
//resolve is a function which resolves

constructor(private dataStorageService:DataStorageService
    ,private recipesService:RecipeService){

}

resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
    const recipe=this.recipesService.getRecipes();
    //it checks whether we already have the recipe or not
    if(recipe.length===0){
        return this.dataStorageService.fetchRecipes();

    }
    else{
       return recipe; 
    }
      // here resolve will do the subscribe for us 
      // once the data is here it will do
}

}