import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeRoutingModule } from "./recipe-routing.module";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeComponent } from "./recipe.component";
import { RecipeItemComponent } from "./RecipeList/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./RecipeList/RecipeList.component";

@NgModule({
declarations:[
    RecipeComponent,
    RecipeDetailComponent
    ,RecipeListComponent
    ,RecipeItemComponent,
     RecipeStartComponent

],
imports:[
    RouterModule,
SharedModule
,    ReactiveFormsModule,
    RecipeRoutingModule
]


})
export  class RecipeModule{

}