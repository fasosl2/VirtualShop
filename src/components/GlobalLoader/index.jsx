import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useAppContext } from "../../storage/AppContext";
import { LoaderContainer } from './styles';

export const GlobalLoader = () => {
  const { state } = useAppContext();

  return (state.isLoading ?
    <LoaderContainer>
      <Spinner animation="border" variant="light" style={{ width: '3rem', height: '3rem' }} />
    </LoaderContainer> : null
  );
};