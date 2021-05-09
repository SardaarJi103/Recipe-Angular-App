//It is a model for recipe it defines how our recipe should look like

import { Ingredient } from "../shared/ingredient.model";

export class Recipe{
public name: String;
public description: String;
public imagePath: String;
public ingredient:Ingredient[];

constructor(name: String, desc: String,image: String,ingredient:Ingredient[]){
    this.name=name;
    this.description=desc;
    this.imagePath=image;
    this.ingredient=ingredient;

}



}