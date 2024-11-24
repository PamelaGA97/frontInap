import { Route } from "@angular/router";
import { UsersComponent } from "../users/users.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserCreateComponent } from "./components/user-create/user-create.component";

export const USERS_ROUTES: Route[] = [
    {
        path: '',
        component: UserListComponent,
    },
    {
        path: 'create',
        component: UserCreateComponent
    }
];