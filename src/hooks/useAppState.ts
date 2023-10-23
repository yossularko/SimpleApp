import {useEffect} from 'react';
import {AppState, AppStateStatus} from 'react-native';

const useAppState = (onChange: (status: AppStateStatus) => void) => {
  useEffect(() => {
    const subcription = AppState.addEventListener('change', onChange);
    return () => {
      subcription.remove();
    };
  }, [onChange]);
};

export default useAppState;
