import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {MyButton, MyTextInput} from '../../components';
import {useSetAtom} from 'jotai';
import {signOutAtom} from '../../store/mainStore';
import {ScreenWidth} from '../../utils/screenSize';
import Feather from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeParamList } from '../../types/navigation';

type Props = NativeStackScreenProps<HomeParamList, 'Home'>;

interface ListData {
  id: number;
  code: string;
  title: string;
  date: string;
}

const ava =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const listData: ListData[] = [
  {id: 1, code: '50_001', title: 'PROFES', date: '24/2/2011'},
  {id: 2, code: '50_002', title: 'TITAN', date: '24/2/2011'},
  {id: 3, code: '50_003', title: 'PROFES', date: '25/2/2011'},
  {id: 4, code: '50_004', title: 'PROFES', date: '26/2/2011'},
  {id: 5, code: '50_004', title: 'DIPS', date: '28/2/2011'},
];

const Home = ({navigation}: Props) => {
  const signOut = useSetAtom(signOutAtom);
  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
      <StatusBar barStyle="light-content" backgroundColor="#677800" />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            source={{uri: ava}}
            alt="avatar"
            width={50}
            height={50}
            resizeMode="cover"
            style={styles.avatar}
          />
          <TouchableOpacity style={{padding: 10}} onPress={signOut}>
            <Feather name="log-out" size={22} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Sales Order List</Text>
      </View>
      <View style={styles.shape} />
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={{fontWeight: '700', fontSize: 16}}>Search</Text>
          <MyTextInput
            placeholder="keyword"
            style={{height: 40, marginTop: 6}}
          />
          <MyTextInput
            placeholder="order date"
            style={{height: 40, marginTop: 6}}
          />
        </View>
        <View style={styles.orderContainer}>
          <Text style={{fontSize: 20, fontWeight: '700'}}>Order List</Text>
          <Text style={{fontSize: 12, fontWeight: '700'}}>Total Items: 50</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <MyButton
            onPress={() => navigation.navigate('AddItem')}
            title="Add"
            bg="#677800"
            styleContainer={{height: 32, paddingVertical: 4, minWidth: 90}}
          />
        </View>
        <View style={{marginTop: 20}}>
          {listData.map(item => {
            return (
              <View key={item.id} style={styles.list}>
                <View style={{flex: 1}}>
                  <Text style={{fontWeight: '700'}}>{item.title}</Text>
                </View>
                <Text>{item.code}</Text>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  <Text>{item.date}</Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#677800',
    paddingHorizontal: ScreenWidth * 0.05,
    paddingTop: 16,
    paddingBottom: 50,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {borderRadius: 25, backgroundColor: 'gray'},
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  shape: {
    backgroundColor: '#f2f2f2',
    height: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
  },
  container: {
    paddingHorizontal: ScreenWidth * 0.05,
    marginTop: -30,
    paddingTop: 30,
  },
  searchContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#343149',
  },
  orderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
});
