import {StyleSheet, Text, ScrollView, KeyboardAvoidingView} from 'react-native';
import React, {useCallback} from 'react';
import {MyButton, MyTextInput, MyTextInputPassword} from '../../components';
import {ScreenWidth} from '../../utils/screenSize';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoginParamList} from '../../types/navigation';
import {LoginInputs} from '../../types/input';
import {useSetAtom} from 'jotai';
import {signInAtom} from '../../store/mainStore';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {userList} from '../../utils/userList';
import {myToast} from '../../utils/myToast';
import {rules} from '../../utils/myRules';
import {useDisclosure} from '../../hooks';

type Props = NativeStackScreenProps<LoginParamList, 'Login'>;

const defaultValues: LoginInputs = {
  email: '',
  password: '',
};

const Login = ({}: Props) => {
  const signIn = useSetAtom(signInAtom);
  const {isOpen, onToggle} = useDisclosure();

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<LoginInputs>({
    defaultValues,
  });

  const onSubmit = useCallback<SubmitHandler<LoginInputs>>(
    dataSubmit => {
      const idx = userList.findIndex(item => item.email === dataSubmit.email);

      if (idx === -1) {
        myToast('User tidak ditemukan!');
        return;
      }

      const isValidPass = userList[idx].password === dataSubmit.password;

      if (!isValidPass) {
        myToast('Password Salah!');
        return;
      }

      signIn(userList[idx]);
    },
    [signIn],
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: '500'}}>Login</Text>
      <KeyboardAvoidingView behavior="padding" style={{marginTop: 10}}>
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <MyTextInput
              autoCapitalize="none"
              label="Email"
              placeholder="masukan email"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
              errorMessage={errors.email?.message}
            />
          )}
          name="email"
          rules={rules.email}
        />
        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <MyTextInputPassword
              autoCapitalize="none"
              label="Password"
              onSecure={onToggle}
              isSecure={!isOpen}
              placeholder="masukan password"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
              errorMessage={errors.password?.message}
            />
          )}
          name="password"
          rules={rules.password}
        />
        <MyButton onPress={handleSubmit(onSubmit)} title="Login" />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {paddingHorizontal: ScreenWidth * 0.05, paddingTop: 50},
});
