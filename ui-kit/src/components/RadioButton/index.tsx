import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {styles} from './styles';
interface RadioButtonProps {
  options: string[];
  selected: string | null;
  onSelect: (option: string) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  selected,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.radioContainer}
          onPress={() => onSelect(option)}>
          <View style={styles.circle}>
            {selected === option && <View style={styles.checkedCircle} />}
          </View>
          <Text style={styles.label}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default RadioButton;
