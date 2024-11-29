import { Injectable } from '@angular/core';
import { Faculty } from '../models/faculty.model';
import { BaseCrudService } from '../../../../core/services/base-crud/base-crud.service';
import { Api } from '../../../../core/services/base-crud/decorators/api.decorator';
@Injectable({
  providedIn: 'root'
})

@Api('faculties')
export class FacultyService extends BaseCrudService<Faculty> {}