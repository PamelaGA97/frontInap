import { Routes } from "@angular/router";
import { InscriptionListComponent } from "./components/inscription-list/inscription-list.component";
import { InscriptionCreateComponent } from "./components/inscription-create/inscription-create.component";

export const INSCRIPTIONS_ROUTES: Routes = [
    {
        path: '',
        component: InscriptionListComponent
    },
    {
        path: 'create',
        component: InscriptionCreateComponent
    }
];