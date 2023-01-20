import {FormControl, ValidationErrors} from "@angular/forms";

export class FormValidators{

  static notOnlyWhiteSpace(control:FormControl): ValidationErrors | null{
    if((control.value != null) && (control.value.length ===0)){
      return { notOnlyWhiteSpace : true};
    }else{
      return null;
    }
  }
}
