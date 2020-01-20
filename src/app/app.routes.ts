import { Routes} from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';

export const ROUTES: Routes = [
    {path: 'users', component: UsersComponent},
    {path: 'user-detail/:id', component: UsersDetailComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'users'}
];
