import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';

interface Props {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  bg?: string;
  color?: string;
  styleContainer?: StyleProp<ViewStyle>;
}

const MyButton = ({
  title,
  onPress,
  disabled,
  isLoading,
  bg,
  color,
  styleContainer,
}: Props) => {
  const loading = useMemo<boolean>(() => {
    return [isLoading, disabled].some(val => val === true);
  }, [isLoading, disabled]);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {backgroundColor: bg || '#343149', opacity: loading ? 0.5 : 1},
        styleContainer,
      ]}
      disabled={loading}
      onPress={onPress}>
      <Text
        style={{
          color: color || 'white',
          fontWeight: '500',
          textAlign: 'center',
        }}>
        {isLoading ? 'Loading...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    minWidth: 120,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
  },
});
