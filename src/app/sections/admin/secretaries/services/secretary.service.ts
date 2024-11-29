import { Injectable } from '@angular/core';
import { Secretary } from '../models/secretary.model';
import { BaseCrudService } from '../../../../core/services/base-crud/base-crud.service';
import { Api } from '../../../../core/services/base-crud/decorators/api.decorator';

@Injectable({
  providedIn: 'root'
})

@Api('secretaries')
export class SecretaryService extends BaseCrudService<Secretary> {}