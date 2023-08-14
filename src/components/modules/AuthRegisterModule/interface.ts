export interface RegisterModuleProps {
  nextPage: () => void;
  control: any;
  handleSubmit: any;
  watch: any;
  errors: any;
  onSubmit: any;
  showPassword: boolean;
  setShowPassword: any;
}
export interface FormDefault {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  photoUrl: string;
}
export interface FormData {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  photoUrl: string;
}