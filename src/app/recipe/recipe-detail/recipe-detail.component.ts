import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

 recipeDetail:Recipe;
 id:number;
 //setting the value of this in Recipe component
  constructor(private recipeService : RecipeService,
    private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
       this.recipeDetail= this.recipeService.getRecipeById(this.id);
        //+ will ocnvert it into number
      }
    );

  
  }

  addToShoppingList(){
this.recipeService.addIngredientsToShoppigList(this.recipeDetail.ingredient);
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route,queryParamsHandling:'preserve'});

  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'],{relativeTo:this.route});
  }
}
