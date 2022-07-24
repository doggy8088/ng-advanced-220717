import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TwidAsyncValidatorDirective } from '../twid-async-validator.directive';
import { TwidValidatorDirective } from '../twid-validator.directive';
import { forbiddenPassword } from './forbiddenPassword';

@Component({
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css'],
})
export class Login2Component implements OnInit {
  data = {
    email: 'user@example.com',
    password: 'adfjalsdjflasdf',
    isRememberMe: true,
    profiles: [
      {
        city: 'Taipei',
        tel: 'A123456789',
      },
      {
        city: '台中',
        tel: 'A123456789',
      },
      {
        city: 'Kaoshuang',
        tel: 'A123456789',
      },
    ],
  };

  orig_body_className = document.body.className;

  form = this.fb.group(
    {
      email: this.fb.nonNullable.control('', {
        validators: [Validators.required, Validators.email],
        updateOn: 'blur',
      }),
      password: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
          forbiddenPassword,
        ],
        asyncValidators: [],
      }),
      isRememberMe: this.fb.control(true, {}),
      profiles: this.fb.array([
        this.makeProfile('Taipei', 'A123456789'),
        this.makeProfile('台中', 'A123456789'),
      ]),
    },
    {
      validators: [],
    }
  );

  makeProfile(city: string, tel: string) {
    return this.fb.group({
      city: this.fb.control(city, { validators: [Validators.required] }),
      tel: this.fb.control(tel, {
        validators: [Validators.required /*, this.twid.validate */],
        asyncValidators: [ this.twid.validate ],
        updateOn: 'blur'
      }),
    });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private twid: TwidAsyncValidatorDirective
  ) {}
  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';

    setTimeout(() => {
      this.checkValidity(this.form);

      this.form.controls.profiles.clear();
      this.data.profiles.forEach((profile) => {
        this.form.controls.profiles.push(
          this.makeProfile(profile.city, profile.tel)
        );
      });
      this.form.setValue(this.data, { emitEvent: false });
    }, 2000);
  }

  checkValidity(g: FormGroup) {
    Object.keys(g.controls).forEach((key) => {
      g.get(key)?.markAsDirty();
      g.get(key)?.markAsTouched();
      g.get(key)?.updateValueAndValidity();
    });
  }

  ngOnDestroy(): void {
    document.body.className = this.orig_body_className;
  }

  fc(name: string) {
    return this.form.get(name) as FormControl;
  }

  fg(name: string) {
    return this.form.get(name) as FormGroup;
  }

  fa(name: string) {
    return this.form.get(name) as FormArray;
  }

  resetForm() {
    this.form.reset(this.data);
  }

  addProfile() {
    this.form.controls.profiles.push(this.makeProfile('', ''));
  }

  doLogin() {
    if (this.form.valid) {
      localStorage.setItem('apikey', 'TEST');
      var url = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigateByUrl(url);
      this.router.navigate(['/'], {
        state: {},
      });
    }
  }

  // isInvalid(control: NgModel, form: NgForm) {
  //   return control.invalid && (control.touched || form.submitted);
  // }

  // isValid(control: NgModel) {
  //   return control.valid;
  // }

  // disableField(control: NgModel) {
  //   if (control.disabled) {
  //     control.control.enable();
  //   } else {
  //     control.control.disable();
  //   }
  // }
}
