import {useState} from 'react';

type TabType = 'flight' | 'bus' | 'visa';
type FlightType = 'one' | 'two' | 'any';
type FlightDataItem = {
  from: string;
  fromError?: string;
  to: string;
  toError?: String;
  departDate: Date;
  departDateError?: string;
  returnDate?: Date;
  returnDateError?: string;
};
type FightsData = {
  flights: FlightDataItem[];
  adult: number | 0;
  child: number | 0;
  infants: number | 0;
  class: string;
  classError: string;
};
const useController = () => {
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');

  const [emailError, setEmailError] = useState('');
  const [orderIdError, setOrderIdError] = useState('');

  const [selectedTab, setSelectedTab] = useState<TabType>('flight');
  const [flightData, setFlightData] = useState<FlightDataItem>();

  const [selectedFlightType, setSelectedFlightType] =
    useState<FlightType>('one');
  const handleEmaiChange = (text: string) => {
    if (emailError) setEmailError('');
    setEmail(text);
  };
  const handleOrderIdChange = (text: string) => {
    if (orderIdError) setOrderIdError('');
    setOrderId(text);
  };
  const handleOneTwoWayDatChane = (
    from?: string,
    to?: string,
    departDate?: string,
    returnDate?: string,
  ) => {
    const dFrom = from ? from : flightData?.from || '';
    const dTo = to ? to : flightData?.to || '';
    const dDepart = departDate ? departDate : flightData?.departDate || '';
    const dReturn = returnDate ? returnDate : flightData?.returnDate;
  };
  const handleFlightFromChange = (from: string) => {
    let error = flightData?.fromError;
    if (from) {
      error = '';
    }
    // setFlightData({...flightData, fromError: error, from: from});
  };
  const handleFlightToChange = (to: string) => {};
  const handleFlightDepartDateChange = (departDate: string) => {};
  const handleFlightReturnDateChange = (returnDate: string) => {};
  return {
    email,
    emailError,
    orderIdError,
    handleEmaiChange,
    orderId,
    handleOrderIdChange,
    setSelectedTab,
    selectedFlightType,
    selectedTab,
    setSelectedFlightType,
    flightData,
  };
};

export default useController;
