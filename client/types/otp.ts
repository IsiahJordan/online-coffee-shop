
export type OtpData = {
  email: string;
  password?: string;
};

export type OtpContextType = {
  otpData: OtpData;
  setOtpData: React.Dispatch<React.SetStateAction<OtpData>>;
};
