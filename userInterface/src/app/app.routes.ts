import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AlmoxarifadosComponent } from './componentes/almoxarifados/almoxarifados.component';
import { CategoriasComponent } from './componentes/categorias/categorias.component';


export const routes: Routes = [
    {path:"", component: LoginComponent},
    {path:"main", component: MainComponent, children: [
        {path: "categorias", component: CategoriasComponent},
        {path: "almoxarifados", component: AlmoxarifadosComponent}
    ]}
];
