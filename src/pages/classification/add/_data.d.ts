export type InternalNamePath = (string | number)[];
export interface ErrorField {
  name: InternalNamePath;
  errors: string[];
}
