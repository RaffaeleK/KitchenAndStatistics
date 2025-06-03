import { Routes } from '@angular/router';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/guards/auth.guards';

export const routes: Routes = [
    {path: '', component:KitchenComponent,canActivate:[AuthGuard]},
    {path: 'login', component:LoginComponent},
    {path: 'stats', component: StatisticsComponent,canActivate:[AuthGuard]},
    {path: '**', component: LoginComponent}
];
