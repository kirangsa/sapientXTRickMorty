export interface Filter {
  species: Array<string>;
  gender: Array<string>;
  origin: Array<string>;
  searchString?: string,
  sort?:string
}
