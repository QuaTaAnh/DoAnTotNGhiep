import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CardProfile from "../../components/CardProfile";

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  return <CardProfile data={user} />;
};

export default Profile;
