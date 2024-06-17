import { Component } from '@angular/core';
import { PasswordOptions } from '../../shared/options/password.options';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Record } from '../../shared/interfaces/records';
import { AppState } from '../../shared/interfaces/state';
import { Store } from '@ngrx/store';
import { selectRecords } from '../../state/selectors';
import { selectedRecord } from '../../state/actions';

@Component({
  selector: 'app-generate-pass',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './generate-pass.component.html',
  styleUrl: './generate-pass.component.css'
})
export class GeneratePassComponent {


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>,
  ) { }

  public password: string = '';
  public passwordOptions: PasswordOptions = new PasswordOptions();
  public form!: FormGroup;
  public isShow: string = "";
  public selectedRecord!: Record | null;
  private passCont!: HTMLInputElement;
  public pointerEvents: string = "";

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      pass: new FormControl('', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/)]),
      long: new FormControl(this.passwordOptions.long),
      uppercase: new FormControl(this.passwordOptions.mayus),
      lowercase: new FormControl(this.passwordOptions.minus),
      symbol: new FormControl(this.passwordOptions.symbol),
      numbers: new FormControl(this.passwordOptions.numbers),
    });

    this.store.select(selectRecords).subscribe(records => {
      this.selectedRecord = records.selectedRecord;
    })

  }
  showPass(event: Event, password: HTMLInputElement) {
    const icon = event.target as HTMLInputElement;
    if (password.type === "password") {
      password.type = "text";
      icon.classList.add("fa-eye");
      icon.classList.remove("fa-eye-slash");
      // this.canCopy = true;
    }
    else {
      password.type = "password";
      icon.classList.add("fa-eye-slash");
      icon.classList.remove("fa-eye");
      // this.canCopy = false;
    }
  }

  generatePassword() {
    if (this.passwordOptions.long < 6) {
      alert('Must be at least 6 characters');
      return false;
    }

    if (!(this.passwordOptions.minus || this.passwordOptions.mayus || this.passwordOptions.numbers || this.passwordOptions.symbol)) {
      alert('Please select at least one of the options of type of password');
      return false;
    }

    if (this.passwordOptions.long >= 25) {
      alert('Generated password was too long');
      return false;
    }

    this.password = '';

    for (let c = 0; c < this.passwordOptions.long; c++) {
      this.password += this.getPasswordChar();
    }

    console.log(this.passwordOptions);

    this.validateOptions();

    this.form.patchValue({ pass: this.password });

    return true;

  }

  private validateOptions() {
    console.log('Validator: ', this.passwordOptions);
    if (this.passwordOptions.symbol) {

      const hasSymbol = this.password.split('').some((char) => this.simbolos.includes(char));

      if (!hasSymbol) {

        const arr = this.password.split('');

        arr.shift();
        arr.push(this.getCaracter(this.simbolos));

        this.password = arr.join('');

      }
    }

    if (this.passwordOptions.mayus) {
      console.log('Add Mayus')
      const hasUpper = this.password.split('').some((char) => this.letras.toUpperCase().includes(char));

      if (!hasUpper) {
        const arr = this.password.split('');

        arr.shift();
        arr.push(this.getCaracter(this.letras).toUpperCase());

        this.password = arr.join('');

      }
    }

    if (this.passwordOptions.minus) {

      const hasUpper = this.password.split('').some((char) => this.letras.includes(char));

      if (!hasUpper) {
        const arr = this.password.split('');

        arr.shift();
        arr.push(this.getCaracter(this.letras));

        this.password = arr.join('');

      }

    }

    if (this.passwordOptions.numbers) {
      const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      const hasNumber = this.password.split('').some((char) => numeros.includes(Number(char)));

      if (!hasNumber) {
        const arr = this.password.split('');

        arr.shift();
        arr.push(this.getNumero());

        this.password = arr.join('');
      }

    }

  }

  getPasswordChar(): string {
    //se genera un numero al azar entre 1 y 4, dicho numero representa el tipo de caracter a insertar
    let option: number = Math.round(Math.random() * (4 - 1) + 1);
    let ch: string = '';

    switch (option) {
      case 1:
        if (!this.passwordOptions.mayus) { //si no se seleccionaron las mayusculas
          return this.getPasswordChar();
        }
        return this.getCaracter(this.letras).toUpperCase();

      case 2:
        if (!this.passwordOptions.minus) { //si no se seleccionaron las minusculas
          return this.getPasswordChar();
        }
        return this.getCaracter(this.letras);

      case 3:
        if (!this.passwordOptions.numbers) { //si no se seleccionaron numeros
          return this.getPasswordChar();
        }
        return this.getNumero();

      case 4:
        if (!this.passwordOptions.symbol) { //si no se seleccionaron simbolos
          return this.getPasswordChar();
        }
        return this.getCaracter(this.simbolos);
    }

    return ch;
  }

  private letras: string = 'abcdefghijklmnñopqrstuvwxyz';
  private simbolos: string = '!$%&/()=?^_-:;@*º|#~{[]}';
  getCaracter(chs: string): string {
    let chsCount = chs.length - 1;
    let chsSelect = Math.round(Math.random() * (chsCount - 0) + 0);
    return chs[chsSelect];
  }

  private getNumero(): string {
    return String(Math.round(Math.random() * (9 - 0) + 0));
  }

  showModal() {
    this.isShow = "display: block;";

    this.disableBackgroundInteractions();

  }


  closeModal() {
    const body = document.querySelector('body');

    if (body) {
      body.style.pointerEvents = "auto";
      this.isShow = "";
    }
  }

  disableBackgroundInteractions() {
    const body = document.querySelector('body');

    if (body) {
      body.style.pointerEvents = "none";
      this.pointerEvents = "pointer-events: auto;";
    }

  }

  changeOptions(event: Event) {
    const input = event.target as HTMLInputElement;
    const type = input.attributes.getNamedItem('ng-reflect-name')?.value;

    console.log(input, type)

    switch (type) {
      case 'symbol':
        this.passwordOptions.symbol = !this.passwordOptions.symbol;
        break;
      case 'uppercase':
        this.passwordOptions.mayus = !this.passwordOptions.mayus;
        break;
      case 'lowercase':
        this.passwordOptions.minus = !this.passwordOptions.minus;
        break;
      case 'numbers':
        this.passwordOptions.numbers = !this.passwordOptions.numbers;
        break;
      case 'long':
        this.passwordOptions.long = Number.isNaN(input.value) ? 6 : Number(input.value);
        break;
      default:
        break;
    }

  }

savePass() {
    console.log('Save Pass');
    let newRecord: Record | null = null;
    this.store.select(selectRecords).subscribe(record => {
      console.log('Getting the store values')
      if (record.selectedRecord) {

        newRecord = { ...record.selectedRecord };

        newRecord.password = this.password;
      }
    }).add(this.store.dispatch(selectedRecord({ record: newRecord })));

    console.log('Finishing')

    this.closeModal();
  }

}
