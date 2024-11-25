import { Route } from "@angular/router";
import { SecretaryListComponent } from "./components/secretary-list/secretary-list.component";
import { SecretaryCreateComponent } from "./components/secretary-create/secretary-create.component";

export const SECRETARY_ROUTES: Route[] = [
    {
        path: '',
        component: SecretaryListComponent
    },
    {
        path: 'create',
        component: SecretaryCreateComponent
    }
]