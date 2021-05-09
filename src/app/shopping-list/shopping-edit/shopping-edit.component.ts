import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  @ViewChild('f') signUpForm:NgForm;

  subscriptin:Subscription;
  editMode=false;
  editedItemIndex:number;
  editIngredient:Ingredient;
 //using refernce variables to fecth the value

// @Output()  ingredientAdded = new EventEmitter<Ingredient>();
//passingthe event to parent component
//shopping list component
  constructor(private shoppingService:ShoppingService) { }

  ngOnInit(): void {

    this.subscriptin=this.shoppingService.startedEditing.subscribe(
      (index:number)=>{
        this.editedItemIndex=index
        this.editIngredient=this.shoppingService.getIngredientsIndex(index);
        this.editMode=true;
        this.signUpForm.setValue({
          name: this.editIngredient.name,
          amount:this.editIngredient.amount
        })

        //using set value to set the value sof form inputs to edit the ingredients on click
    });


  }

  onSubmit(form: NgForm)
  {
    const name=form.value.name;
    const amount=form.value.amount;

    //passing values from reference variables
    
    const   newIngredient=new Ingredient(name,amount);

    if(this.editMode){
      this.shoppingService.updateIngredient(this.editedItemIndex,newIngredient)
    }
    else{
      this.shoppingService.addIngredient(newIngredient);

    }
    this.editMode=false;
    form.reset();
    // this.ingredientAdded.emit(newIngredient);
    // this.shoppingService.ingredientAdded.emit(newIngredient);

  }
onClear(){
  this.editMode=false;
  this.signUpForm.reset();
}

onDelete(){
  this.onClear();
  this.shoppingService.deleteIngredient(this.editedItemIndex);
}

  ngOnDestroy(){
    this.subscriptin.unsubscribe();
  }
}
