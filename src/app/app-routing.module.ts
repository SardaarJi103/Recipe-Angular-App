import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";


const appRoutes:Routes=[
{path:'',redirectTo : '/recipes',pathMatch:'full'},

{path:'recipes',loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule)}
//load children ill only load the path once the path is requested by the user
,
{path: 'shopping-list',loadChildren: () => import('./shopping-list/shopping.module').then(m => m.ShoppingModule)}
// using lazy loading for Shopping List
,
{path:'auth',loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)}
];

@NgModule({

imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
exports: [RouterModule]

})
export class AppRoutingModule{

}