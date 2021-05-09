import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipe/recipe.model";
import { RecipeService } from "../recipe/recipe.service";
import { exhaustMap, map, take, tap} from 'rxjs/operators'
import { AuthService } from "../auth/auth.service";
@Injectable({providedIn:'root'})
export class DataStorageService{

     constructor(private http:HttpClient,private recipeService:RecipeService,
        private authService:AuthService){

     }

     storeRecipe(){
const recipes=this.recipeService.getRecipes();
this.http.put('https://ng-course-recipe-book-16b4f-default-rtdb.firebaseio.com/recipes.json',
recipes).subscribe(
    responseData=>{
        console.log(responseData);
    }
)

}
   fetchRecipes(){
     
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-16b4f-default-rtdb.firebaseio.com/recipes.json',
       ).pipe( map(recipes=>{ // this map is from rxjs/operators
        return recipes.map(recipe=>{
            //this map is from javascript object
            return {...recipe,ingredient:recipe.ingredient?recipe.ingredient:[]};
        });
    }),
    tap(recipes=>{
       console.log(recipes);
       this.recipeService.setRecipes(recipes);
    }));
           //take manages the subscription and only
           // asks how many values to fecth and aftert that it unsubscribes

       

     //it allows us to eecute some code 
     // i place withouth altering the data that is 
     // funnled through this observable
     

     //this resolves helps us to load the recipes 
     // as soon as the component is called
     
      
   }

}