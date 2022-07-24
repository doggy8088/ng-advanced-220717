import { Observable, of } from 'rxjs';
import { Directive, Injectable, Injector } from '@angular/core';
import {
  Validator,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
  FormControl,
  ValidationErrors,
  AsyncValidator,
  AbstractControl,
} from '@angular/forms';
import {
  isGuiNumberValid, // 統一編號
  isNationalIdentificationNumberValid, // 身分證字號
  isResidentCertificateNumberValid, // 居留證編號
  isCitizenDigitalCertificateValid, // 自然人憑證
  isEInvoiceCellPhoneBarcodeValid, // 手機條碼
  isEInvoiceDonateCodeValid, // 捐贈碼
} from 'taiwan-id-validator2';

@Injectable({ providedIn: 'root' })
@Directive({
  selector: '[twid-async][ngModel]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: TwidAsyncValidatorDirective,
      multi: true,
    },
  ],
})
export class TwidAsyncValidatorDirective implements AsyncValidator {
  validate(c: AbstractControl): Observable<ValidationErrors | null> {
    if (!c.value) {
      return of(null);
    }

    return new Observable<ValidationErrors | null>((subs) => {
      setTimeout(() => {
        if (isNationalIdentificationNumberValid(c.value)) {
          subs.next(null);
        } else {
          subs.next({ twid: true });
        }
        subs.complete();
      }, 1000);
    });
  }
}
