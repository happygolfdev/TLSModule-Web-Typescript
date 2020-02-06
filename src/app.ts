import { ExampleRequest, RequestType } from "./examples/exampleRequest";
import { RequestManager } from "./network/requestManager";
import { ExampleUser } from "./examples/exampleUser";
import { repeat } from "./universal/universal";
import { Logger } from "./universal/logger";
import { ExmapleUserManager } from "./examples/exampleUserManager";
import { MembershipManager } from "./membership/membershipManager";

var accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTc5MDA4MzgwLCJleHAiOjE1ODI2MDgzODAsImlzcyI6IkFydGlsZWFybiJ9.kkYmp6yN8HiveOjBA5ZbPst0z7Bu-KX-X-q8t1govwM";
const clientSecretKey =
  "7918c66fd8d7792a73ce0730dde6823ed07b1f7d259bf3c26f5c8d3517b1d3a5a00715d71abf187208e4aa334e447752";

async function renew() {
  const { newToken, error } = await MembershipManager.renewAccessToken(
    clientSecretKey
  );
  accessToken = newToken;
  Logger.showMessage(accessToken);
}

async function signUp() {
  const { error, status, User } = await MembershipManager.signUp(
    accessToken,
    "mteaasaat01@srg.com",
    1,
    "asdf",
    0,
    "nickname"
  );
  console.log(error);
  console.log(status);
  console.log(User);
}

async function reset() {
  const { error, status, User } = await MembershipManager.resetPassword(
    accessToken,
    11,
    "null"
  );
  console.log(error);
  console.log(status);
  console.log(User);
}

async function check() {
  const { error, isAvailable } = await MembershipManager.checkEmail(
    accessToken,
    "ajjeui0308@gmail.com",
    0
  );

  console.log(isAvailable);
}

const exampleUser = new ExampleUser(1, "asdf", "Asdf", "nickname");
