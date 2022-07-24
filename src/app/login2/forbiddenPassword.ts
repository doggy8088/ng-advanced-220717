import { AbstractControl } from '@angular/forms';

export function forbiddenPassword(control: AbstractControl) {
  if (!control.value) { return null; }
  let words = ['will', 'duotify', '123'];
  var result = words.some(x => control.value.indexOf(x) >= 0);
  if (result) {
    return { forbiddenPassword: true };
  } else {
    return null;
  }
}
