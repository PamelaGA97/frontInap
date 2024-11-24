import { Route } from "@angular/router";
import { StudentListComponent } from "./components/student-list/student-list.component";
import { StudentCreateComponent } from "./components/student-create/student-create.component";

export const STUDENT_ROUTES: Route[] = [
    {
        path: '',
        component: StudentListComponent
    },
    {
        path: 'create',
        component: StudentCreateComponent
    }
]