import {Badge, Button as ButtonBS, Spinner} from 'react-bootstrap';

export const Button = ({loading, label, loadingLabel, ...buttonProps}) => {
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