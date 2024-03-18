import CustomModal from "../CustomModal/CustomModal";
import { ILogin } from "../type";

const Login: React.FC<ILogin> = (props: ILogin) => {
  const { isOpen, onRequestClose } = props;
  return (
    <CustomModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1 className="text-2xl">Đăng nhập</h1>
    </CustomModal>
  );
};

export default Login;
