export interface ServiceResult<T = any> {
  message: string;
  data?: T;
}
