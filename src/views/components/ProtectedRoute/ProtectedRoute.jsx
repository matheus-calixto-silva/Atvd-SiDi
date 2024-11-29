import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../app/hooks/useAth';

const ProtectedLayout = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) {
    return <h1>You don’t have access</h1>;
  }

  return children;
};

ProtectedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedLayout;
