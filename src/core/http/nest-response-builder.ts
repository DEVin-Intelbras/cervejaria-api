import { NestResponse } from './nest-response';

export class NestResponseBuilder {
  private response: NestResponse = {
    status: 200,
    headers: {},
    body: {},
  };

  public withStatus(status: number) {
    this.response.status = status;
    return this;
  }

  public withHeaders(headers: any) {
    this.response.headers = headers;
    return this;
  }

  public withBody(body: any) {
    this.response.body = body;
    return this;
  }

  public build() {
    return new NestResponse(this.response);
  }
}
