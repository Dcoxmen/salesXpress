import React from 'react';
import PropTypes from 'utils/propTypes';

import { Media, Button } from 'reactstrap';



const ProductMedia = ({ image, title, description, right, ...restProps }) => {
  return (
    <Media {...restProps}>
      <Media left>
        <Media
          object
          src={image}
          className="rounded mr-2 mb-2"
          style={{ width: 100, height: 'auto' }}
        />
      </Media>
      <Media body className="overflow-hidden">
        <Media heading tag="h5" className="text-truncate">
          {title}
        </Media>
        <p className="text-muted text-truncate">{description}</p>
      </Media>
      <Media right className="align-self-center">
        {right && typeof right === 'string' ? (
          <Button color="secondary" size="sm">{right}</Button>
        ) : (
          right
        )}
      </Media>
    </Media>
  );
};

ProductMedia.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  right: PropTypes.node,
};

export default ProductMedia;
