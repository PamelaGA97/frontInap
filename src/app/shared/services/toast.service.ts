import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertType } from './alert.enum';
import { ErrorHandler } from '../models/errorHandler.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private config = {
    timeOut: 3000
  };

  constructor(
    private toast: ToastrService
  ) { }

  showToast(title?: string, message?: string, alertType?: AlertType) {
    if (alertType === AlertType.SUCCESS) {
      this.toast.success(message, title, this.config);
      return;
    }
    if (alertType === AlertType.ERROR) {
      this.toast.error(message, title, this.config);
      return;      
    }
    if (alertType === AlertType.WARNING) {
      this.toast.warning(message, title, this.config);
      return;
    }
    if (alertType === AlertType.INFO) {
      this.toast.info(message, title, this.config);
    }
  }

  showHttpError(httpError: ErrorHandler) {
    this.toast.error(
      `${httpError.message}`,
      ``,
      this.config);
  }
}
