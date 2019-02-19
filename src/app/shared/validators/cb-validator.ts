import {
  FormControl, ValidatorFn
} from '@angular/forms';

export class CbValidator {
  public static isValid(
    validatorField: { [key: string]: boolean }
  ): ValidatorFn {
    return (c: FormControl): { [key: string]: boolean } | null => {
        const cb: string = c.value;

        if (!CbValidator.checkValue(cb)) {
          return validatorField;
        }
        return null;
    };
  }

  private static checkValue(cb: string, multiple: number = 10): boolean {
    // tslint:disable-next-line:no-inferrable-types
    let digit: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    let sum: number = 0;
    const length: number = cb.length;
    // tslint:disable-next-line:no-inferrable-types
    let odd: boolean = false;

    for (let i: number = (length - 1); i >= 0; i--) {
        digit = parseInt(cb[i], 10);

        if (odd === true) {
            digit = digit * 2;
        }
        if (digit > 9) {
            digit = digit - 9;
        }
        odd = !odd;
        sum += digit;
    }
    const res: number = sum % multiple;

    return res === 0;
  }
}
