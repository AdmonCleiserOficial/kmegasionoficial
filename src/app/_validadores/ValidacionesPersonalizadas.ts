import { AbstractControl, ValidatorFn } from "@angular/forms";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: "root"
})

export class ValidacionesPersonalizadas {
   passwordMatcher(c: AbstractControl) {
    if (!c.get("password") || !c.get("password2")) {
      return null;
    } else {
      return c.get("password").value === c.get("password2").value
        ? null
        : { nomatch: true };
    }
  }
  // control.value = dskfnsk@gmail.com
  // nameRe = /@/i   regexpresion

   Busque(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valide = nameRe.test(control.value);
      return !valide ? { tieneArroba: { value: control.value } } : null;
    };
  }

   tieneNumero(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valide = nameRe.test(control.value);
      return !valide ? { tieneNumero: { value: control.value } } : null;
    };
  }

  tieneNumeroCC(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valide = nameRe.test(control.value);
      return !valide ? { tieneNumeroCC: { value: control.value } } : null;
    };
  }
}
