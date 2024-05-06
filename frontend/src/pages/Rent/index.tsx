import ListItem from "../../components/ListItem";

import { useLocation } from "react-router-dom";

const Rent: React.FC = () => {
  const location = useLocation();

  return <ListItem category={location.state as number} />;
};

export default Rent;
