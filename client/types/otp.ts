
export type OtpData = {
  email: string;
  password?: string;
  onSuccess?: (data: OtpData) => void;
};

export type OtpProps = {
  otpData: OtpData;
  code: string;  
};

export type GenOtpProps = {
  otpData: OtpData;
  callback: () => void;
};

export type OtpContextType = {
  otpData: OtpData;
  setOtpData: React.Dispatch<React.SetStateAction<OtpData>>;
};
