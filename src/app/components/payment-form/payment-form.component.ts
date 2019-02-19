import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

import { CbValidator } from './../../shared/validators/cb-validator';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  public months: Array<string> = new Array<string>();
  public years: Array<number> = new Array<number>();

  public paymentForm: FormGroup;

  public validationMessages: any;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  // Getters Typescript mode
  public get numeroCB(): AbstractControl {
    return this.paymentForm.controls.numeroCB;
  }
  ngOnInit() {
    this.months.push('Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jui', 'Jui', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec');

    // And now... les années (année courante + 3 années suivantes)
    let currentYear: number = parseInt(moment().format('YYYY'), 10);

    this.years.push(currentYear);

    // tslint:disable-next-line:no-inferrable-types
    for (let i: number = 0; i < 3; i++) {
      currentYear++;
      this.years.push(currentYear);
    }

    // Définition des messages d'erreur
    this.validationMessages = {
      numeroCB: [
          {
            type: 'required',
            message: 'Le numéro de carte est obligatoire' },
          {
            type: 'minlength',
            message: 'Le numéro de carte est constitué de 16 caractères'
          },
          {
            type: 'maxlength',
            message: 'Le numéro de carte ne peut dépasser 16 caractères'
          },
          {
            type: 'pattern',
            message: 'Le numéro de carte ne peut contenir que des chiffres.'},
          {
            type: 'isValid',
            message: 'Ce numéro semble ne pas être valide'
          }
        ],
    };
    // Création du formulaire via formBuilder
    this.paymentForm = this.formBuilder.group({
      numeroCB: [
        '', // Valeur par défaut dans le formulaire
        Validators.compose([
          Validators.minLength(16),
          Validators.maxLength(16),
          CbValidator.isValid({ 'isValid': false })
        ])
      ],
      month: [
        '',
        Validators.required
      ],
      year: [
        parseInt(moment().format('YYYY'), 10),
        Validators.required
      ],
      crypto: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(3),
          Validators.minLength(3),
          Validators.pattern('[0-9]*$')
        ])
      ]
    });
  }

}
