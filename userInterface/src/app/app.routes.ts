import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
    {path:"", component: LoginComponent},
    {path:"index", component: MainComponent, children: [
        {path:"products", component: ProductsComponent}
    ]}
];
