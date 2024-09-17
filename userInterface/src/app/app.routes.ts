import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoryComponent } from './components/category/category.component';


export const routes: Routes = [
    {path:"", component: LoginComponent},
    {path:"main", component: MainComponent, children: [
        {path:"products", component: ProductsComponent},
        {path: "category", component: CategoryComponent}
    ]}
];
