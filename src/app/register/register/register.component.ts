import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertService } from 'src/app/_services/alert.service';
import { UserDto } from 'src/app/_models/user-dto';


@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    userDto: UserDto;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
        this.userDto = new UserDto();
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required],
            nickname: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.userDto.email = this.registerForm.value.email;
        this.userDto.nickname = this.registerForm.value.nickname;
        this.userDto.password = this.registerForm.value.password;
        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}