import { AbstractControl } from '@angular/forms';

export function forbiddenPassword(control: AbstractControl) {
  if (!control.value) { return null; }
  let words = ['will', 'duotify', '123'];
  var result = words.includes(control.value);
  if (result) {
    return { forbiddenPassword: true };
  } else {
    return null;
  }
}
