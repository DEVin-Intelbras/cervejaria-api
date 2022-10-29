export class NestResponse {
  status: number;
  headers: any;
  body: any;

  constructor(response: NestResponse) {
    Object.assign(this, response);
  }
}
