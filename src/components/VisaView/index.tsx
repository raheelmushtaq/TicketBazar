import {View} from 'react-native';
import InputField from '../../../ui-kit/src/components/InputField';
import VisaInputField from '../VisaInputField';
import {dimensions} from '../../../ui-kit';
import {VisaDataItem} from '../../types/SearchTypes';

type VisaViewProps = {
  visaData: VisaDataItem;
  handleVisaChange: (text: string) => void;
};
const VisaView = ({visaData, handleVisaChange}: VisaViewProps) => {
  return (
    <View style={{marginVertical: dimensions.margin.medium}}>
      <InputField
        value={'Pakistani'}
        label="Nationaliy"
        placeholder="Pakistani"
        editable={false}
        blurOnSubmit={false}
        onPress={() => {}}
        onChangeText={() => {}}
      />
      <VisaInputField
        error={visaData.visaError}
        label="Visa"
        placeholder="Visa for?"
        value={visaData.visa}
        onValueSelected={handleVisaChange}
      />
    </View>
  );
};

export default VisaView;
