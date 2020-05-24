import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
} from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { FilterService } from '../../services/filter.service';
import { Filter } from '../../models/filter';
import { Store } from '@ngrx/store';
import { updateFilter } from '../../state/home.actions';
import { distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() species;
  @Input() gender;
  @Input() origin;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  subscriptions: Subscription[] = [];
  form: FormGroup;
  selctedFilter: Filter = {
    gender: [],
    origin: [],
    species: [],
  };

  constructor(
    private fb: FormBuilder,
    private filterService: FilterService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.initSub();
  }

  createForm() {
    this.form = this.fb.group({
      species: this.fb.array([]),
      gender: this.fb.array([]),
      origin: this.fb.array([]),
    });
    this.addCheckboxes();
  }

  initSub() {
    // Observing chip set filter remove
    const filterSub = this.filterService.filterRemoved$.subscribe((x: any) => {
      let idx = this[x.key].indexOf(x.value);
      (this.form.get(x.key) as FormArray).controls[idx].setValue(false);
    });
    this.subscriptions.push(filterSub);

    const formSub = this.form.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((val) => {
        const temp: Filter = {
          gender: [],
          origin: [],
          species: [],
        };
        for (let key in this.selctedFilter) {
          temp[key] = val[key]
            .map((v, i) => (v ? this[key][i] : null))
            .filter((v) => v !== null);
        }
        this.subscriptions.push(formSub);
        this.store.dispatch(updateFilter({ filters: temp }));
      });
  }

  // Dynamicalluy adding form ctrls
  private addCheckboxes() {
    for (let key in this.selctedFilter) {
      this[key].forEach((o, i) => {
        const control = new FormControl(false);
        (this.form.controls[key] as FormArray).push(control);
      });
    }
  }

  /*
  Geters for form
  */
  get speciesFA(): FormArray {
    return this.form.get('species') as FormArray;
  }

  get genderFA(): FormArray {
    return this.form.get('gender') as FormArray;
  }

  get originFA(): FormArray {
    return this.form.get('origin') as FormArray;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
