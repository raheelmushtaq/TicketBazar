export type TabType = 'flight' | 'bus' | 'visa';
export type FlightType = 'one' | 'two' | 'any';
export type FlightDataItem = {
  from: string;
  fromError?: string;
  to: string;
  toError?: string;
  departDate: Date;
  departDateError?: string;
  returnDate?: Date;
  returnDateError?: string;
};
export type BusDataItem = {
  from: string;
  fromError?: string;
  to: string;
  toError?: string;
  departDate: Date;
  departDateError?: string;
};
export type VisaDataItem = {
  visa: string;
  visaError?: string;
};
export type TravelsData = {
  adult: number;
  children: number;
  infants: number;
  error?: string;
  travelClass: string;
  classError?: string;
};
