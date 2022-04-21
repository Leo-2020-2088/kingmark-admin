export type InternalNamePath = (string | number)[];
export interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}
export interface TableFormDateType {
  key: string;
  workId?: string;
  name?: string;
  department?: string;
  isNew?: boolean;
  editable?: boolean;
}
