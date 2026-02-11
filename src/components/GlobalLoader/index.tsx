import { Spinner } from 'react-bootstrap';
import { useAppContext } from "../../storage/AppContext";
import { LoaderContainer } from './styles';
import type { AppState } from '../../interfaces/Context';

export const GlobalLoader = () => {
  const { state } = useAppContext() as { state: AppState };

  return (state?.isLoading > 0 ?
    <LoaderContainer>
      <Spinner animation="border" variant="light" style={{ width: '3rem', height: '3rem' }} />
    </LoaderContainer> : null
  );
};