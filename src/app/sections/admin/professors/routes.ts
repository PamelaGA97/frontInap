import { Routes } from "@angular/router";
import { ProfessorListComponent } from "./components/professor-list/professor-list.component";
import { ProfessorCreateComponent } from "./components/professor-create/professor-create.component";
import { ProfessorsEditComponent } from "./components/professors-edit/professors-edit.component";

export const PROFESSOR_ROUTES: Routes = [
    {
        path: '',
        component: ProfessorListComponent
    },
    {
        path: 'create',
        component: ProfessorCreateComponent
    },
    {
        path: 'edit/:id',
        component: ProfessorsEditComponent
    }
];
