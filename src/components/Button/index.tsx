import {Badge, Spinner} from 'react-bootstrap';
import { ButtonBS } from './styles';
import type { IButton } from './type';

export const Button = ({loading, label, loadingLabel, freeShow, ...buttonProps} : IButton) => {
  return (
      <ButtonBS {...buttonProps}>
        {loading && (<>
        <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            >
                <span className="visually-hidden">Loading...</span>
            </Spinner>{' '}
        </>)
        }
        {buttonProps.badge ? 
        (<Badge bg={buttonProps.badge}>{loading ? loadingLabel : label}</Badge>)
        : loading ? loadingLabel : label}
      </ButtonBS>
  );
}