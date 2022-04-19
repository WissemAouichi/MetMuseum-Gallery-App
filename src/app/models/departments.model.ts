export interface IDepartments {
  departmentId: number;
  displayName: string;
  artworks?: Array<string>;
}

export interface RootObject {
  total: number;
  objectIDs: number[];
}
