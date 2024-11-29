import { Route, Routes } from 'react-router-dom';
import PointList from '../../views/pages/PointList/PointList';
import Start from '../../views/pages/Start/Start';

const StartRoutes = () => (
  <Routes>
    <Route path='/' element={<Start />} />
    <Route path='registro-pontos' element={<PointList />} />
  </Routes>
);

export default StartRoutes;
