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

  const dumyObject = {
    startTime: '9:00AM',
    flightTime: '3h 35m',
    endTime: '11:35 AM',
    startDesination: 'Islamabad',
    endDestination: 'Dubai',
    totalWeigghtAllowe: '25',
    flightNumber: 'EKL-313',
    compay: 'Emirates',
    amount: ' 925000',
    discountedAmount: '75000',
  };
  const dummyData = [
    dumyObject,
    {...dumyObject, discountedAmount: ''},
    dumyObject,
    dumyObject,
  ];

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

  return {
    travelData,
    flightData,
    visaData,
    busData,
    selectedFlightType,
    selectedTab,
    mutiFlightData,
    listOfSearch: dummyData,
  };
};

export default useController;
