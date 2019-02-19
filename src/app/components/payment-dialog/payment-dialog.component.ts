import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TourneeInterface } from './../../shared/interfaces/tournee';

import * as moment from 'moment';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  public paymentForm: FormGroup;

  public validationMessages: any;

  public monthes: Map<string, string> = new Map<string, string>();
  public years: Array<string> = new Array<string>();

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public tour: TourneeInterface
  ) { }

  // Getters typescript mode
  public get cardNumber(): AbstractControl {
    return this.paymentForm.controls.cardNumber;
  }
  public get crypto(): AbstractControl {
    return this.paymentForm.controls.crypto;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if ( !this.tour.hasOwnProperty('resa')) {
      this.tour.resa = 1;
    }

    // Liste les mois de l'année
    moment.locale('fr');
    const newYearDay: moment.Moment = moment('2019-01-01');
    // tslint:disable-next-line:no-inferrable-types
    for (let i: number = 0; i < 12; i++) {
      this.monthes.set(newYearDay.format('MM'), newYearDay.format('MMM'));
      newYearDay.add(1, 'month');
    }

    // Liste des années
    const today: moment.Moment = moment();
    for (let i: number = 0; i < 4; i++) {
      this.years.push(today.format('YYYY'));
      today.add(1, 'year');
    }

    // Définition des messages d'erreur
    this.validationMessages = {
      cardNumber : [
        {
          type: 'required',
          message: 'Le numéro de carte est obligatoire'
        },
        {
          type: 'minLength',
          message: 'Un numéro de carte doit avoir 16 caractères'
        },
        {
          type: 'maxLength',
          message: 'Votre numéro de carte ne peut avoir plus de 16 caractères'
        },
        {
          type: 'pattern',
          message: 'Votre numéro de carte ne peut contenir que des chiffres'
        }
      ],
      crypto: [
        {
          type: 'maxLength',
          message: 'Le cryptogramme ne peut avoir plus de 3 caractères'
        },
        {
          type: 'minLength',
          message: 'Le cryptogramme ne peut avoir moins de 3 caractères'
        },
        {
          type: 'pattern',
          message: 'Le cryptogramme ne peut contenir que des chiffres'
        }
      ]
    };

    this.paymentForm = this.formBuilder.group({
      cardNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
          Validators.pattern('[0-9]*$')
        ])
      ],
      month: [
        ''
      ],
      year: [
        moment().format('YYYY')
      ],
      crypto: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
          Validators.pattern('[0-9]*$')
        ])
      ]
    });
  }

}
