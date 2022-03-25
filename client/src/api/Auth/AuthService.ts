import apiClient from 'api/apiClient';
import {
  CertificateAdminReq,
  CertificateAdminRes,
  CertificationRes,
  MeRes,
  SignInReq,
  SignInRes,
  SignUpReq,
} from './authType';

const baseUrl = '/api/auth';

class AuthService {
  public static async signup(req: SignUpReq) {
    try {
      await apiClient.post(`${baseUrl}/signup`, req);
    } catch (error) {
      throw error;
    }
  }

  public static async certification(imp_uid: string) {
    try {
      const {data} = await apiClient.post<CertificationRes>(
        `${baseUrl}/certifications`,
        {imp_uid},
      );
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async signin(req: SignInReq) {
    try {
      const {data} = await apiClient.post<SignInRes>(`${baseUrl}/login`, req);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async me() {
    try {
      const {data} = await apiClient.get<MeRes>(`${baseUrl}/me`);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public static async logout() {
    try {
      await apiClient.get(`${baseUrl}/logout`);
    } catch (error) {
      throw error;
    }
  }

  public static async certificateAdmin(req: CertificateAdminReq) {
    try {
      const {data} = await apiClient.post<CertificateAdminRes>(
        `${baseUrl}/mail`,
        req,
      );
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
