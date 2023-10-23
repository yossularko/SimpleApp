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
  TouchableOpacity,
  GestureResponderEvent,
  TextStyle,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

interface MyInputProps extends TextInputProps {
  label?: string;
  onSecure: (event: GestureResponderEvent) => void;
  isSecure: boolean;
  colorLabel?: ColorValue;
  style?: StyleProp<TextStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  errorMessage?: string;
}

type Ref = React.LegacyRef<TextInput>;

const MyTextInputPassword = forwardRef(
  (
    {
      label,
      errorMessage,
      isSecure,
      onSecure,
      colorLabel,
      style,
      styleContainer,
      ...rest
    }: MyInputProps,
    ref: Ref,
  ) => {
    return (
      <View style={styles.container}>
        {label && (
          <Text style={[styles.label, {color: colorLabel || 'gray'}]}>
            {label}
          </Text>
        )}
        <View style={[styles.textInputContainer, styleContainer]}>
          <TextInput
            ref={ref}
            secureTextEntry={isSecure}
            style={[styles.textInput, style]}
            {...rest}
          />
          <TouchableOpacity onPress={onSecure}>
            {isSecure ? (
              <Feather name="eye-off" size={20} color="gray" />
            ) : (
              <Feather name="eye" size={20} color="gray" />
            )}
          </TouchableOpacity>
        </View>
        {errorMessage && <Text style={styles.errMsg}>{errorMessage}</Text>}
      </View>
    );
  },
);

export default MyTextInputPassword;

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
    borderRadius: 20,
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
