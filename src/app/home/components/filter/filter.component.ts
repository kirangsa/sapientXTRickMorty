import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  FormGroupName,
} from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { FilterService } from '../../services/filter.service';
import { Filter } from '../../models/filter';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() species;
  @Input() gender;
  @Input() origin;
  @Output() filterChange = new EventEmitter();
  @ViewChild(MatAccordion) accordion: MatAccordion;
  form: FormGroup;
  selctedFilter :Filter = {
    gender:[],
    origin:[],
    species:[]
  }

  constructor(private fb: FormBuilder, private filterService: FilterService) {}

  ngOnInit(): void {
    this.createForm();
    this.initSub();
  }

  createForm() {
    this.form = this.fb.group({
      species: this.fb.array([]),
      gender: this.fb.array([]),
      origin: this.fb.array([])
    });
    this.addCheckboxes();
  }

  initSub() {
    this.filterService.filterRemoved$.subscribe((x:any) => {
      let idx = this[x.key].indexOf(x.value);
      (this.form.get(x.key) as FormArray).controls[idx].setValue(false);
      this.filterChanged(x.key);
    });
  }

  private addCheckboxes() {
    for (let key in this.selctedFilter) {
      this[key].forEach((o, i) => {
        const control = new FormControl(false);
        (this.form.controls[key] as FormArray).push(control);
      });
    }

  }

  filterChanged(key){
    this.selctedFilter[key] = this.form.value[key]
      .map((v, i) => v ? this[key][i] : null)
      .filter(v => v !== null);
      this.filterChange.emit(this.selctedFilter);
  }

  get speciesFA(): FormArray {
    return this.form.get('species') as FormArray;
  }

  get genderFA(): FormArray {
    return this.form.get('gender') as FormArray;
  }

  get originFA(): FormArray {
    return this.form.get('origin') as FormArray;
  }
}
