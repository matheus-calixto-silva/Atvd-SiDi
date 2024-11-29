import { useAuth } from '../hooks/useAth';

import StartRoutes from './StartRoutes';

const LoggedUser = () => {
  useAuth(); 
  return (
    <section>
      <StartRoutes />
    </section>
  );
};

export default LoggedUser;
