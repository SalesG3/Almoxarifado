import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { DetalhamentoComponent } from './produtos/detalhamento/detalhamento.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path: 'menu', component: MenuComponent,
        children: [
            {path:'produtos', component: ProdutosComponent,
                children: [
                    {path:'id', component: DetalhamentoComponent}
                ]
            }
        ]
    }
];
