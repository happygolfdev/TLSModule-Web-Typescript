import { BaseRequest, RequestConfig, Method } from "./request";

class ExampleRequest implements BaseRequest {
  baseURL = "https://golfroad72.co.kr/";
  tokeRenewalURL = "localhost:3001/v1/token";
  config: RequestConfig;

  constructor(type: RequestType) {
    switch (type) {
      case RequestType.signIn:
        this.config = new RequestConfig("auth/", Method.post);
      case RequestType.signOut:
        this.config = new RequestConfig("auth/", Method.put);
    }
  }

  addBody(body: Object) {
    if (body == null) {
      return;
    }

    this.config.body = body;
  }
}

enum RequestType {
  signIn,
  signOut
}

export { ExampleRequest, RequestType };
