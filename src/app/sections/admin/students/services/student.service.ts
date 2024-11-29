import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { BaseCrudService } from '../../../../core/services/base-crud/base-crud.service';
import { Api } from '../../../../core/services/base-crud/decorators/api.decorator';
@Injectable({
	providedIn: 'root'
})

@Api('/students')
export class StudentService extends BaseCrudService<Student>{}