import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

export class ValidacionesPropias {


    static confirmPass(control: AbstractControl, form: any): ValidationErrors| null {
        console.log(control, form?.controls);
        if (control.status === 'VALID' && form) {
          return control.value === form.controls['password'].value ? null : { confirmPass: "Passwords must match"};
        }
        return { required: '' };
    }

}
