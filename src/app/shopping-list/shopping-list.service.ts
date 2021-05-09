import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingService{

public ingredientAdded=new Subject<Ingredient[]>();

startedEditing=new Subject<number>();
//subject is a better event emitter

    private Ingredients: Ingredient[]=[
        new Ingredient('apples',5)
        ,
        new Ingredient('tomaoes',10)
        ];

    getIngredients(){

        return this.Ingredients.slice();
    }

    getIngredientsIndex(index:number){
        return this.Ingredients[index];
    }

    addIngredient(ingredient:Ingredient){
        this.Ingredients.push(ingredient);
        this.ingredientAdded.next(this.Ingredients.slice());

        //here we are emiting an event to get the new array of ingredients
    }

    addIngredientsFromRecipe(Ingredients: Ingredient[]){
    //     for(let ingredient of Ingredients){
    //         this.addIngredient(ingredient);

    this.Ingredients.push(...Ingredients); // using spread operator
    this.ingredientAdded.next(this.Ingredients.slice());
        }

    updateIngredient(index:number,newIngredient:Ingredient){
           this.Ingredients[index]=newIngredient;
           this.ingredientAdded.next(this.Ingredients.slice());
        }

    deleteIngredient(index:number){
        this.Ingredients.splice(index,1);
        this.ingredientAdded.next(this.Ingredients.slice());
        //splice is used to delete

    }
     }

   
