import {FormControl} from '@angular/forms';

export class ValidationService {
    static nospaceValidator(control: FormControl): { [s: string]: boolean } {
        let re = / /;
        if (control.value && control.value.match(re)) {
            return { nospace: true };
        }
    }
}