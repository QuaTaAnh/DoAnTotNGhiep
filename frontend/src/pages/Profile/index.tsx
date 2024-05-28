import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import CardProfile from "../../components/CardProfile";
import { useEffect } from "react";
import { getProfile } from "../../redux/callApi";
const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
      dispatch(getProfile());
  }, [dispatch]);

  return <CardProfile data={user} />;
};

export default Profile;
