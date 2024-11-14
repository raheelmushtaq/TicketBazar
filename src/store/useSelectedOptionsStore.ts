import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import mmkvStorage from './mmkvStorage';
import { BusDataItem, FlightDataItem, FlightType, TabType, TravelsData, VisaDataItem } from '../types/SearchTypes';

type SelectedOptionsStore = {
    type: TabType,
    flighType: FlightType,
    data?: BusDataItem | VisaDataItem | FlightDataItem | FlightDataItem[] ,
    travelData?:TravelsData
    saveData:(type: TabType,flighType: FlightType,data: BusDataItem | VisaDataItem | FlightDataItem | FlightDataItem[], travelData: TravelsData )=>void
};

const useSelectedOptionsStore = create<SelectedOptionsStore>()(
    persist(
        (set) => ({
            type: 'flight',
            flighType:'one',
            saveData:(type, flight, data, travelData)=>{
                set({
                    type: type,
                    flighType:flight,
                    data: data,
                    travelData: travelData
                })
            }
        }),
        {
            name: 'options-store',
            storage: createJSONStorage(() => mmkvStorage),
        },
    ),
);

export default useSelectedOptionsStore;
