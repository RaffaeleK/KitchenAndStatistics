import { Routes } from '@angular/router';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {path: 'kitchen', component:KitchenComponent},
    {path: 'stats', component: StatisticsComponent},
    {path: '**', component: LoginComponent}
];
