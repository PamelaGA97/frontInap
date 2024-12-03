import { Route } from "@angular/router";
import { SecretaryListComponent } from "./components/secretary-list/secretary-list.component";
import { SecretaryCreateComponent } from "./components/secretary-create/secretary-create.component";
import { EditSecretaryComponent } from "./components/edit-secretary/edit-secretary.component";
import { SecretaryDetailComponent } from "./components/secretary-detail/secretary-detail.component";

export const SECRETARY_ROUTES: Route[] = [
    {
        path: '',
        component: SecretaryListComponent
    },
    {
        path: 'create',
        component: SecretaryCreateComponent
    },
    {
        path: 'edit/:id',
        component: EditSecretaryComponent
    }, 
    {
        path: 'show/:id',
        component: SecretaryDetailComponent
    }
]