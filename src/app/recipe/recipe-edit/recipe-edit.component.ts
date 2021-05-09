import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id:number;
allowEdit=false;
recipeForm:FormGroup;


get ingredientsControls(){
 // console.log(this.recipeForm.get('ingredients'));

  return (this.recipeForm.get('ingredients')as FormArray).controls;

  // it refers to the formArray
}
  constructor(private route:ActivatedRoute,private recipeService:RecipeService,
    private router: Router) { }

  ngOnInit(): void {
this.route.params.subscribe(
  (params:Params)=>{
    this.id=+params['id'];
    this.allowEdit=params['id'] !=null;
    this.inIt();
  }
);
  }

  private inIt(){
  let recipeName='';
  let imagePath='';
  let description='';
  let recipeIngredients=new FormArray([]);
  // using form array to store array values

    if(this.allowEdit){
     const recipe=this.recipeService.getRecipeById(this.id);
     recipeName=recipe.name;
     imagePath=recipe.imagePath;
     description=recipe.description;

     if(recipe['ingredient']){

      for(let ingredients of recipe.ingredient){
     recipeIngredients.push(

      new FormGroup({
        'name':new FormControl(ingredients.name,Validators.required),
        'amount':new FormControl(ingredients.amount,
          [
            Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
     );
      }
     }
    }
    this.recipeForm=new FormGroup({
    'name':new FormControl(recipeName,Validators.required),
    'imagePath':new FormControl(imagePath,Validators.required),
    'description':new FormControl(description,Validators.required),
    'ingredients':recipeIngredients
   

    });

  }


  onSubmit(){
    // const newRecipe=new Recipe(this.recipeForm.value['name'],
    // this.recipeForm.value['description'],this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingredients']);
    console.log(this.recipeForm);
    if(this.allowEdit){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    //this.recipeFOrm.value will take all the values as object
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.onCancel();
  }

  onAddIngredient(){

    (<FormArray>this.recipeForm.get('ingredients')).push(
      //creating new fields to enter the value
      new FormGroup({
  'name': new FormControl(null,Validators.required),
  'amount': new FormControl(null,Validators.required)

        
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route});

    // it will take the navigation one level up
  }

  onDeleteIngredient(index: number){
(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
