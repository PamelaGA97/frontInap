import { ViewPage } from '../shared/models/view-page.model';
import { environment } from '../../environments/environment';

export const adminPath = '/admin';

export const pages: ViewPage[] = [
    {
        name: 'Home',
        path: `${environment.baseUrl}${adminPath}/`
    },
    {
        name: 'Estudiantes',
        path: `${environment.baseUrl}${adminPath}/students`
    },
    {
        name: 'Secretarias',
        path: `${environment.baseUrl}${adminPath}/secretaries`
    },
    {
        name: 'Docentes',
        path: `${environment.baseUrl}${adminPath}/professors`
    },
    {
        name: 'Facultades',
        path: `${environment.baseUrl}${adminPath}/faculties`
    },
    {
        name: 'Cursos',
        path: `${environment.baseUrl}${adminPath}/faculty-courses`
    },
    {
        name: 'Inscripciones',
        path: `${environment.baseUrl}${adminPath}/inscriptions`
    }
]