import { Component, OnInit, Input } from '@angular/core';
import { FilterService } from '../../services/filter.service';
import { Filter } from '../../models/filter';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
})
export class ChipsComponent implements OnInit {
  @Input() selectedFilter: Filter;
  constructor(private filterService: FilterService) {}

  ngOnInit(): void {}

  remove(value: string, key: string, index: number): void {
    this.filterService.removeFilter(value, key);
  }
}
