import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loadAllCharacters } from './state/home.actions';
import { Observable, Subscription } from 'rxjs';
import { Character } from './models/character';
import {
  selectAllCharacters,
  isLoading,
  selectFilters,
} from './state/home.selectors';
import {
  tap,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Filter } from './models/filter';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  characters$: Observable<Character[]>;
  loading$: Observable<boolean>;
  filters$: Observable<Filter>;
  subscriptions: Subscription[] = [];
  speices: Array<string> = [];
  gender: Array<string> = [];
  origin: Array<string> = [];
  hasBackdrop: boolean = false;
  mode: string = 'side';
  unFilteredData: Character[];
  filteredData: Character[];
  selectedFilter: Filter;
  form: FormGroup;
  sortValue: string;
  sideBarState: boolean = false;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.store.dispatch(loadAllCharacters());
    this.initObs();
    this.createForm();
    this.initSub();
  }

  initObs() {
    this.characters$ = this.store.pipe(
      select(selectAllCharacters),
      filter((data) => !!data),
      tap((x) => this.createFilters(x))
    );
    this.loading$ = this.store.pipe(select(isLoading));
    this.filters$ = this.store.pipe(select(selectFilters));
  }

  initSub() {
    const breakpointSub = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          this.isMobile = result.breakpoints[Breakpoints.XSmall];
          this.isTablet =
            result.breakpoints[Breakpoints.Small] ||
            result.breakpoints[Breakpoints.Medium];
          this.isDesktop =
            result.breakpoints[Breakpoints.Large] ||
            result.breakpoints[Breakpoints.XLarge];
        }
        this.mode = !this.isDesktop ? 'over' : 'side';
        this.hasBackdrop = !this.isDesktop;
        this.sideBarState = this.isDesktop;
      });
    this.subscriptions.push(breakpointSub);

    const charactersSub = this.characters$.subscribe((data) => {
      this.unFilteredData = data;
      this.filterData();
    });
    this.subscriptions.push(charactersSub);

    const formSub1 = this.form
      .get('search')
      .valueChanges.pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((val) => {
        this.filterData();
      });
    this.subscriptions.push(formSub1);

    const formSub2 = this.form
      .get('sort')
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((val) => {
        this.sortValue = val;
        this.filterData();
      });
    this.subscriptions.push(formSub2);

    const filterSub = this.filters$.subscribe((value) => {
      this.selectedFilter = value;
      this.filterData();
    });
    this.subscriptions.push(filterSub);
  }

  createForm() {
    this.form = this.fb.group({
      search: new FormControl('', { updateOn: 'change' }),
      sort: new FormControl('Assending', { updateOn: 'change' }),
    });
  }

  createFilters(characters: Character[]) {
    characters.map((item) => {
      if (this.speices.indexOf(item.species) === -1) {
        this.speices.push(item.species);
      }
      if (this.gender.indexOf(item.gender) === -1) {
        this.gender.push(item.gender);
      }
      if (this.origin.indexOf(item.origin.name) === -1) {
        this.origin.push(item.origin.name);
      }
    });
  }

  buildFilter = (filter?) => {
    let query = {};
    if (!!filter) {
      for (let keys in filter) {
        if (filter[keys].constructor === Array && filter[keys].length > 0) {
          query[keys] = filter[keys];
        }
      }
    }
    return query;
  };

  filterData = () => {
    let query = this.buildFilter(this.selectedFilter);
    if (!Object.keys(query).length) {
      this.filteredData = this.unFilteredData;
    }
    const filteredData: Character[] = this.unFilteredData.filter((item) => {
      if (
        !item.name
          .toLowerCase()
          .startsWith(this.form.value.search.toLowerCase())
      ) {
        return false;
      }
      for (let key in query) {
        if (item[key] === undefined) {
          return false;
        } else if (key === 'origin' && query[key].includes(item[key]['name'])) {
          return true;
        } else if (!query[key].includes(item[key])) {
          return false;
        }
      }
      return true;
    });
    this.filteredData = this.sortList(filteredData);
  };

  sortList(characters: Character[]) {
    let sortedList: Character[] = [];
    if (!this.sortValue) {
      sortedList = characters;
    }
    if (this.sortValue === 'Assending') {
      sortedList = characters.sort(function (a, b) {
        return a.id - b.id;
      });
    }
    if (this.sortValue === 'Desending') {
      sortedList = characters.sort(function (a, b) {
        return b.id - a.id;
      });
    }
    return sortedList;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
