import * as api from "@/server/api";
import apiEndpoints from "@/server/apiRouteConstant";

async function login(params: {
  registrationCode: string;
  ssn: string;
}): Promise<any> {
  try {
    return await api.post(apiEndpoints.Auth.login, params);
  } catch (error: any) {
    console.log(error);
  }
}
async function emailVerification(params: {
  registrationCode: string;
  ssn: string;
  emailAddress: string;
}): Promise<any> {
  try {
    return await api.post(apiEndpoints.Auth.emailVerification, params);
  } catch (error: any) {
    console.log(error);
  }
}
async function codeVerification(params: {
  verificationCode: string;
  emailAddress: string;
}): Promise<any> {
  try {
    return await api.post(apiEndpoints.Auth.codeVerification, params);
  } catch (error: any) {
    console.log(error);
  }
}

const AuthService = {
  login,
  emailVerification,
  codeVerification,
};

export default AuthService;
