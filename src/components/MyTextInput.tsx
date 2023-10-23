import React, {forwardRef} from 'react';
import {
  TextInput,
  TextInputProps,
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  ColorValue,
  TextStyle,
} from 'react-native';

interface MyInputProps extends TextInputProps {
  label?: string;
  colorLabel?: ColorValue;
  styleContainer?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  styleInput?: StyleProp<TextStyle>;
  errorMessage?: string;
}

type Ref = React.LegacyRef<TextInput>;

const MyTextInput = forwardRef(
  (
    {
      label,
      errorMessage,
      colorLabel,
      styleContainer,
      style,
      styleInput,
      ...rest
    }: MyInputProps,
    ref: Ref,
  ) => {
    return (
      <View style={[styles.container, styleContainer]}>
        {label && (
          <Text style={[styles.label, {color: colorLabel || 'gray'}]}>
            {label}
          </Text>
        )}
        <View style={[styles.textInputContainer, style]}>
          <TextInput
            ref={ref}
            style={[styles.textInput, styleInput]}
            {...rest}
          />
        </View>
        {errorMessage && <Text style={styles.errMsg}>{errorMessage}</Text>}
      </View>
    );
  },
);

export default MyTextInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 6,
  },
  textInput: {
    flex: 1,
    color: 'black',
  },
  errMsg: {
    fontSize: 12,
    color: 'red',
  },
});
