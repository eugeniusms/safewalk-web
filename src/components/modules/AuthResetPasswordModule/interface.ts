export interface ResetPasswordModuleProps {
  prevPage: () => void;
  nextPage: () => void;
  selectAccount?: any;
  verificationSendTo?: string;
  control?: any;
  handleSubmit?: any;
  watch?: any;
  errors?: any;
  onSubmit?: any;
  showPassword?: boolean;
  setShowPassword?: any;
  showConfirmPassword?: boolean;
  setShowConfirmPassword?: any;
}
export interface FormDefault {
  password: string;
  confirmPassword: string;
}
export interface FormData {
  password: string;
  confirmPassword: string;
}
