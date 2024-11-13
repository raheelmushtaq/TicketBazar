import {useState} from 'react';

type TabType = 'flight' | 'bus' | 'visa';
type FlightType = 'one' | 'two' | 'any';
type FlightDataItem = {
  from: string;
  fromError?: string;
  to: string;
  toError?: string;
  departDate: Date;
  departDateError?: string;
  returnDate?: Date;
  returnDateError?: string;
};
type BusDataItem = {
  from: string;
  fromError?: string;
  to: string;
  toError?: string;
  departDate: Date;
  departDateError?: string;
};
type VisaDataItem = {
  visa: string;
  visaError?: string;
};
type TravelsData = {
  adult: number;
  children: number;
  infants: number;
  error?: string;
  travelClass: string;
  classError?: string;
};
const useController = () => {
  const [busData, setbusData] = useState<BusDataItem>({
    from: '',
    to: '',
    departDate: new Date(),
  });
  const [visaData, setVisaData] = useState<VisaDataItem>({
    visa: '',
  });

  const [travelData, setTravelData] = useState<TravelsData>({
    adult: 0,
    children: 0,
    infants: 0,
    travelClass: '',
  });

  const [selectedTab, setSelectedTab] = useState<TabType>('flight');

  const [flightData, setFlightData] = useState<FlightDataItem>({
    from: '',
    to: '',
    departDate: new Date(),
  });

  const [mutiFlightData, setMultiFlightData] = useState<FlightDataItem[]>([
    {
      from: '',
      to: '',
      departDate: new Date(),
    },
    {
      from: '',
      to: '',
      departDate: new Date(),
    },
  ]);

  const [selectedFlightType, setSelectedFlightType] =
    useState<FlightType>('one');

  const addMultiFlightData = () => {
    var array = [...mutiFlightData];
    array.push({from: '', to: '', departDate: new Date()});

    setMultiFlightData([...array]);
  };

  const removeDestination = (position: number) => {
    var array: FlightDataItem[] = [];
    mutiFlightData.forEach((element, index) => {
      if (index != position) {
        array.push(element);
      }
    });

    setMultiFlightData([...array]);
  };
  const handleFlightFromChange = (from: string) => {
    let error = flightData?.fromError;
    if (from) {
      error = '';
    }
    setFlightData({...flightData, fromError: error, from: from});
  };
  const handleFlightToChange = (to: string) => {
    let error = flightData?.toError;
    if (to) {
      error = '';
    }
    setFlightData({...flightData, toError: error, to: to});
  };
  const handleFlightDepartDateChange = (departDate: Date) => {
    let error = flightData?.departDateError;
    if (departDate) {
      error = '';
    }
    setFlightData({
      ...flightData,
      departDateError: error,
      departDate: departDate,
    });
  };
  const handleFlightReturnDateChange = (returnDate: Date) => {
    let error = flightData?.returnDateError;
    if (returnDate) {
      error = '';
    }
    setFlightData({
      ...flightData,
      returnDateError: error,
      returnDate: returnDate,
    });
  };
  const handleTravelDataChange = (
    adult: number,
    children: number,
    infants: number,
  ) => {
    console.log({adult, children, infants});
    let error = travelData?.error;
    if (error) {
      error = '';
    }
    setTravelData({
      ...travelData,
      error: error,
      adult: adult,
      children: children,
      infants: infants,
    });
  };
  const handleTravelClassChange = (travelClass: string) => {
    let error = travelData?.classError;
    if (error) {
      error = '';
    }
    setTravelData({
      ...travelData,
      classError: error,
      travelClass: travelClass,
    });
  };
  const handleVisaChange = (visa: string) => {
    let error = visaData?.visaError;
    if (error) {
      error = '';
    }
    setVisaData({
      ...visaData,
      visa: visa,
      visaError: error,
    });
  };

  const handleBusFromChange = (from: string) => {
    let error = busData?.fromError;
    if (from) {
      error = '';
    }
    setbusData({...busData, fromError: error, from: from});
  };
  const handleBusToChange = (to: string) => {
    let error = busData?.toError;
    if (to) {
      error = '';
    }
    setbusData({...busData, toError: error, to: to});
  };
  const handleBusDepartDateChange = (departDate: Date) => {
    let error = busData?.departDateError;
    if (departDate) {
      error = '';
    }
    setbusData({
      ...busData,
      departDateError: error,
      departDate: departDate,
    });
  };
  const handleMultiFlightFromChange = (from: string, index: number) => {
    const array = [...mutiFlightData];
    let error = array[index]?.fromError;
    if (from) {
      error = '';
    }
    array[index] = {...array[index], from: from, fromError: error};

    setMultiFlightData([...array]);
  };
  const handleMultiFlightToChange = (to: string, index: number) => {
    const array = [...mutiFlightData];
    let error = array[index]?.fromError;
    if (to) {
      error = '';
    }
    array[index] = {...array[index], to: to, toError: error};

    setMultiFlightData([...array]);
  };
  const handleMultiFlightsDepartDateChange = (
    departDate: Date,
    index: number,
  ) => {
    const array = [...mutiFlightData];
    let error = array[index]?.departDateError;
    if (departDate) {
      error = '';
    }
    array[index] = {...array[index], departDate: departDate, fromError: error};

    setMultiFlightData([...array]);
  };
  return {
    travelData,
    flightData,
    visaData,
    busData,
    setSelectedTab,
    selectedFlightType,
    selectedTab,
    setSelectedFlightType,
    mutiFlightData,
    addMultiFlightData,
    removeDestination,
    handleFlightDepartDateChange,
    handleFlightFromChange,
    handleFlightReturnDateChange,
    handleFlightToChange,
    handleTravelClassChange,
    handleTravelDataChange,
    handleVisaChange,
    handleBusDepartDateChange,
    handleBusFromChange,
    handleBusToChange,
    handleMultiFlightFromChange,
    handleMultiFlightToChange,
    handleMultiFlightsDepartDateChange,
  };
};

export default useController;
