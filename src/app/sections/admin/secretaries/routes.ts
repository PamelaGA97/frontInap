import { Route } from "@angular/router";
import { SecretaryListComponent } from "./components/secretary-list/secretary-list.component";

export const SECRETARY_ROUTES: Route[] = [
    {
        path: '',
        component: SecretaryListComponent
    }
]