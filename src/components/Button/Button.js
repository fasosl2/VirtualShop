import {Button as ButtonBS, Spinner} from 'react-bootstrap';

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
        {loading ? loadingLabel : label}
      </ButtonBS>
  );
}