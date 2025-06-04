import { Routes } from '@angular/router';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardK } from './components/guards/authK.guards';
import { AuthGuardS } from './components/guards/authS.guards';

export const routes: Routes = [
    {path: '', component:KitchenComponent,canActivate:[AuthGuardK]},
    {path: 'login', component:LoginComponent},
    {path: 'stats', component: StatisticsComponent,canActivate:[AuthGuardS]},
    {path: '**', component: LoginComponent}
];
