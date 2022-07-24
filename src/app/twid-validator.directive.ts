import { Directive, Injectable, Injector } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';
import {
  isGuiNumberValid, // 統一編號
  isNationalIdentificationNumberValid, // 身分證字號
  isResidentCertificateNumberValid, // 居留證編號
  isCitizenDigitalCertificateValid, // 自然人憑證
  isEInvoiceCellPhoneBarcodeValid, // 手機條碼
  isEInvoiceDonateCodeValid // 捐贈碼
} from 'taiwan-id-validator2'

@Injectable({ providedIn: 'root' })
@Directive({
  selector: '[twid][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: TwidValidatorDirective, multi: true }
  ]
})

export class TwidValidatorDirective implements Validator {
  validate(c: FormControl): { [key: string]: any } | null {
    if (!c.value) { return null; }

    if (isNationalIdentificationNumberValid(c.value)) {
      return null;
    } else {
      return { twid: true };
    }
  }
}
