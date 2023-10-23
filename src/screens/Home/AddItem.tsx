import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {MyButton, MyTextInput} from '../../components';
import {useSetAtom} from 'jotai';
import {signOutAtom} from '../../store/mainStore';
import {ScreenWidth} from '../../utils/screenSize';
import Feather from 'react-native-vector-icons/Feather';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeParamList} from '../../types/navigation';
import {myNumberFormat} from '../../utils/myFormat';
import {mySum} from '../../utils/myFunc';

type Props = NativeStackScreenProps<HomeParamList, 'AddItem'>;

interface ListData {
  id: number;
  title: string;
  qty: number;
  price: number;
  total?: number;
}

const ava =
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=1480&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const listData: ListData[] = [
  {id: 1, title: 'Barang 1', qty: 2, price: 2000000},
  {id: 2, title: 'Barang 2', qty: 2, price: 2000000},
  {id: 3, title: 'Barang 3', qty: 2, price: 2000000},
];

const AddItem = ({}: Props) => {
  const signOut = useSetAtom(signOutAtom);
  const [data, setData] = useState(listData);

  const newData = useMemo(() => {
    const newVal = data.map(item => ({...item, total: item.qty * item.price}));

    const grandTotal = mySum(newVal.map(val => val.total));
    const items = mySum(newVal.map(val => val.qty));

    return {data: newVal, grandTotal, items};
  }, [data]);

  const handleQty = useCallback(
    (type: 'increment' | 'decrement', id: number) => {
      if (type === 'increment') {
        setData(prev =>
          prev.map(val => {
            if (val.id === id) {
              return {...val, qty: val.qty + 1};
            }

            return val;
          }),
        );
        return;
      }

      setData(prev =>
        prev.map(val => {
          if (val.id === id) {
            if (val.qty <= 1) {
              return val;
            }
            return {...val, qty: val.qty - 1};
          }

          return val;
        }),
      );
    },
    [],
  );
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
        <Text style={styles.title}>Sales Order Input</Text>
      </View>
      <View style={styles.shape} />
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <Text style={{fontWeight: '700', fontSize: 16}}>
            Sales Information
          </Text>
          <MyTextInput
            placeholder="sales order number"
            style={{height: 40, marginTop: 6}}
          />
          <MyTextInput
            placeholder="sales order date"
            style={{height: 40, marginTop: 6}}
          />
          <MyTextInput
            placeholder="customer"
            style={{height: 40, marginTop: 6}}
          />
          <MyTextInput
            placeholder="address"
            multiline
            numberOfLines={3}
            style={{marginTop: 6}}
          />
        </View>
        <View style={styles.orderContainer}>
          <Text style={{fontSize: 20, fontWeight: '700'}}>Details Sales</Text>
          <MyButton
            onPress={() => {}}
            title="Add Item"
            bg="#677800"
            styleContainer={{height: 32, paddingVertical: 4, minWidth: 90}}
          />
        </View>
        <View style={{marginTop: 20}}>
          {newData.data.map(item => {
            return (
              <View key={item.id} style={styles.list}>
                <View style={{flex: 1}}>
                  <Text style={{fontWeight: '700'}}>{item.title}</Text>
                  <Text style={{fontSize: 12}}>
                    {myNumberFormat(item.price)}
                  </Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <Text style={{fontSize: 12}}>Qty</Text>
                  <View style={styles.qtyContainer}>
                    <TouchableOpacity
                      style={styles.qtyCounter}
                      onPress={() => handleQty('decrement', item.id)}>
                      <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 12}}>{item.qty}</Text>
                    <TouchableOpacity
                      style={styles.qtyCounter}
                      onPress={() => handleQty('increment', item.id)}>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={{fontSize: 12}}>Total</Text>
                  <Text style={{fontSize: 12}}>
                    {myNumberFormat(item.total)}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={{padding: 6}}>
                    <Feather name="edit-2" size={16} color="#343149" />
                  </TouchableOpacity>
                  <TouchableOpacity style={{padding: 6}}>
                    <Feather name="trash-2" size={16} color="#343149" />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
        <View
          style={{
            marginTop: 24,
            backgroundColor: 'white',
            borderRadius: 14,
            paddingVertical: 12,
            paddingHorizontal: 20,
          }}>
          <Text style={{fontWeight: '700', fontSize: 12}}>Order Summary</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 14,
            }}>
            <Text style={{fontWeight: '700', fontSize: 12}}>Subtotal:</Text>
            <Text style={{fontWeight: '700', fontSize: 12}}>
              {myNumberFormat(newData.grandTotal)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontWeight: '700', fontSize: 12}}>
              Total Product:
            </Text>
            <Text style={{fontWeight: '700', fontSize: 12}}>
              {newData.items}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 18,
            }}>
            <MyButton
              onPress={() => {}}
              title="Process Order"
              bg="#677800"
              styleContainer={{
                height: 32,
                paddingVertical: 4,
                marginHorizontal: 6,
              }}
            />
            <MyButton
              onPress={() => {}}
              title="Cancel"
              bg="white"
              color="#343149"
              styleContainer={{
                height: 32,
                paddingVertical: 4,
                marginHorizontal: 6,
                borderWidth: 1,
                borderColor: '#343149',
              }}
            />
          </View>
        </View>
        <View style={{height: 40}} />
      </ScrollView>
    </View>
  );
};

export default AddItem;

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
  qtyContainer: {
    width: 80,
    height: 24,
    backgroundColor: '#d4d4d4',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  qtyCounter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
