import { ViewPage } from '../shared/models/view-page.model';
import { environment } from '../../environments/environment';

export const adminPath = '/admin';

export const pages: ViewPage[] = [
    {
        name: 'Home',
        path: `${adminPath}/`
    },
    {
        name: 'Estudiantes',
        path: `${adminPath}/students`
    },
    {
        name: 'Secretarias',
        path: `${adminPath}/secretaries`
    },
    {
        name: 'Docentes',
        path: `${adminPath}/professors`
    },
    {
        name: 'Facultades',
        path: `${adminPath}/faculties`
    },
    {
        name: 'Cursos',
        path: `${adminPath}/faculty-courses`
    },
    {
        name: 'Inscripciones',
        path: `${adminPath}/inscriptions`
    },
    {
        name: 'Pagos',
        path: `${adminPath}/payments`
    }
]