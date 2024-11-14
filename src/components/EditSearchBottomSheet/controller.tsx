import {useState} from 'react';
import {
  BusDataItem,
  FlightDataItem,
  FlightType,
  TabType,
  TravelsData,
  VisaDataItem,
} from '../../types/SearchTypes';
import useSelectedOptionsStore from '../../store/useSelectedOptionsStore';

const useController = () => {
  const {
    type: savedType,
    data: savedData,
    travelData: savedTravelData,
    saveData: onSave,
    flighType: savedFlightType,
  } = useSelectedOptionsStore();

  // Type guards for individual types
  const isBusDataItem = (data: any): data is BusDataItem => {
    return data;
  };
  const isVisaDataItem = (data: any): data is VisaDataItem => {
    return data;
  };
  const isFlightDataItem = (data: any): data is FlightDataItem => {
    return data
      ? data
      : {
          from: '',
          to: '',
          departDate: new Date(),
        };
  };
  const isMultiFlightDataItem = (data: any): data is FlightDataItem[] => {
    return Array.isArray(data) && data.every(isFlightDataItem);
  };
  const [busData, setbusData] = useState<BusDataItem>(
    isBusDataItem(savedData)
      ? savedData
      : {
          from: '',
          to: '',
          departDate: new Date(),
        },
  );
  const [visaData, setVisaData] = useState<VisaDataItem>(
    isVisaDataItem(savedData)
      ? savedData
      : {
          visa: '',
        },
  );

  const [travelData, setTravelData] = useState<TravelsData>({
    adult: 0,
    children: 0,
    infants: 0,
    travelClass: '',
  });

  const [selectedTab, setSelectedTab] = useState<TabType>('flight');

  const [flightData, setFlightData] = useState<FlightDataItem>(
    isFlightDataItem(savedData)
      ? savedData
      : {
          from: '',
          to: '',
          departDate: new Date(),
        },
  );

  const [mutiFlightData, setMultiFlightData] = useState<FlightDataItem[]>(
    isMultiFlightDataItem(savedData) ? savedData : [],
  );

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
  const validateTravellData = () => {
    let isValid = true;

    if (selectedTab === 'flight') {
      const data = {...travelData};
      if (
        travelData.adult === 0 &&
        travelData.children === 0 &&
        travelData.infants === 0
      ) {
        data.error = 'Please select the travellers';
        isValid = false;
      }
      if (
        travelData.adult === 0 &&
        (travelData.children !== 0 || travelData.infants !== 0)
      ) {
        data.error = 'Please select the Alteat 1 adult';
        isValid = false;
      }
      if (!travelData.travelClass) {
        data.classError = 'Please select the Flight class';
        isValid = false;
      }
      setTravelData(data);
    }

    return isValid;
  };
  const validateBusData = () => {
    let isValid = true;
    const data = {...busData};
    if (!busData.from) {
      data.fromError = 'Please select the Start Destination';
      isValid = false;
    }
    if (!busData.to) {
      data.toError = 'Please select the End Destination';
      isValid = false;
    }
    if (!busData.departDate) {
      data.departDateError = 'Please select the depart Date';
      isValid = false;
    }

    setbusData(data);
    return isValid;
  };
  const validateVisaData = () => {
    let isValid = true;
    const data = {...visaData};
    if (!visaData.visa) {
      data.visaError = 'Please select the Visa';
      isValid = false;
    }

    setVisaData(data);
    return isValid;
  };
  const validateSingleFlightData = () => {
    let isValid = true;
    const data = {...flightData};
    if (!flightData.from) {
      data.fromError = 'Please select the Start Destination';
      isValid = false;
    }
    if (!flightData.to) {
      data.toError = 'Please select the End Destination';
      isValid = false;
    }
    if (!flightData.departDate) {
      data.departDateError = 'Please select the depart Date';
      isValid = false;
    }
    if (selectedFlightType === 'two' && !flightData.returnDate) {
      data.returnDateError = 'Please select the Return Date';
      isValid = false;
    }

    setFlightData(data);
    return isValid;
  };
  const validateMultiFlightData = () => {
    let isValid = true;
    const data = [...mutiFlightData];
    for (let i = 0; i < mutiFlightData.length; i++) {
      if (!mutiFlightData[i].from) {
        data[i].fromError = 'Please select the Start Destination';
        isValid = false;
      }
      if (!mutiFlightData[i].to) {
        data[i].toError = 'Please select the End Destination';
        isValid = false;
      }
      if (!mutiFlightData[i].departDate) {
        data[i].departDateError = 'Please select the depart Date';
        isValid = false;
      }
    }
    setMultiFlightData([...data]);
    return isValid;
  };
  const saveFlightData = (onDataSaved: () => void) => {
    var error = false;
    if (selectedTab === 'bus') {
      error = !validateBusData();
    } else if (selectedTab === 'flight') {
      if (selectedFlightType === 'any') error = !validateMultiFlightData();
      else error = !validateSingleFlightData();
    } else if (selectedTab === 'visa') {
      error = !validateVisaData();
    }

    if (!validateTravellData()) {
      error = true;
    }
    if (!error) {
      let data: BusDataItem | VisaDataItem | FlightDataItem | FlightDataItem[] =
        visaData;
      if (selectedTab === 'bus') {
        data = busData;
      } else if (selectedTab === 'flight') {
        if (selectedFlightType === 'any') {
          data = mutiFlightData;
        } else {
          data = flightData;
        }
      } else if (selectedTab === 'visa') {
        data = visaData;
      }
      onSave(selectedTab, selectedFlightType, data, travelData);
      onDataSaved();
    }
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
    saveFlightData,
  };
};

export default useController;
