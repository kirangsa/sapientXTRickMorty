export interface Character {
  id: number;
  name: string;
  status:number;
  species:string;
  type: string;
  gender: string;
  image: string;
  created: string;
  origin: Origin;
  location: Location;
}

export interface Origin {
  name: string
}

export interface Location {
  name: string
}
