import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlertType } from './alert.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private config = {
    timeOut: 3000
  };

  constructor(
    private toastr: ToastrService
  ) { }

  showToast(title?: string, message?: string, alertType?: AlertType) {
    if (alertType === AlertType.SUCCESS) {
      this.toastr.success(message, title, this.config);
      return;
    }
    if (alertType === AlertType.ERROR) {
      this.toastr.error(message, title, this.config);
      return;      
    }
    if (alertType === AlertType.WARNING) {
      this.toastr.warning(message, title, this.config);
      return;
    }
    if (alertType === AlertType.INFO) {
      this.toastr.info(message, title, this.config);
    }
  }
}
