import { Link, useLocation } from "react-router-dom";
import { routes } from "../../config/routes";
import Logo from "../../assets/images/logo.png";
import Button from "../../components/Button/Button";
import useDark from "../../hooks/useDark";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai";
import CustomModal from "../../components/CustomModal/CustomModal";
import { useState } from "react";

const Header = () => {
  const [isDarkMode, toggleDarkMode] = useDark();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { pathname } = useLocation();

  const LinkActive = (type: string) => {
    let classes: string =
      "text-base rounded-lg px-3 py-5 font-bold cursor-pointer hover:text-primary hidden lg:flex";
    if (type === pathname) {
      classes += " text-primary font-bold";
    }
    return classes;
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className="fixed h-defaultHeader w-full px-5 top-0 right-0 z-20 flex justify-between items-center dark:bg-bgDark shadow-lg dark:shadow-dark">
        <Link to={routes.home}>
          <div className="flex justify-between items-center">
            <div className="w-24 h-defaultHeader pr-5">
              <img className="w-full h-full" src={Logo} alt="House" />
            </div>
            <Button to={routes.home} className={LinkActive(routes.home)}>
              Trang chủ
            </Button>
            <Button to={routes.about} className={LinkActive(routes.about)}>
              Cho thuê phòng trọ
            </Button>
          </div>
        </Link>
        <div className="hidden lg:flex items-center">
          <div className="cursor-pointer text-3xl px-2 py-2.5 mr-2">
            {isDarkMode ? (
              <MdOutlineLightMode
                className="cursor-pointer"
                color="#00b14f"
                onClick={() => toggleDarkMode(!isDarkMode)}
              />
            ) : (
              <MdOutlineDarkMode
                className="cursor-pointer"
                color="#00b14f"
                onClick={() => toggleDarkMode(!isDarkMode)}
              />
            )}
          </div>
          {/* {user?._id ? (
            <div className="relative group">
              <div className="flex justify-center items-center cursor-pointer py-1">
                <div className="w-8 h-8 rounded-full mr-2">
                  <img
                    src={user?.avatar ?? NoImage}
                    alt="Image"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <p className="text-sm">{user?.name}</p>
              </div>
              <div className="absolute z-50 hidden bg-white dark:bg-bgModalDark py-2 px-1 w-48 right-0 rounded-lg shadow-lg group-hover:block">
                {user?.role === 1 ? (
                  <Button
                    to={routes.dashboardAdmin}
                    leftIcon={<RxDashboard />}
                    className="flex items-center p-2 w-full hover:bg-primary rounded-lg text-sm dark:hover:bg-indigo-800"
                  >
                    Bảng điều khiển
                  </Button>
                ) : (
                  <Button
                    to={routes.orderUser}
                    leftIcon={<RxDashboard />}
                    className="flex items-center p-2 w-full hover:bg-primary rounded-lg text-sm dark:hover:bg-indigo-800"
                  >
                    Đơn hàng của tôi
                  </Button>
                )}
                <Button
                  to={"/account"}
                  leftIcon={<AiOutlineUser />}
                  className="flex items-center p-2 w-full hover:bg-primary rounded-lg text-sm dark:hover:bg-indigo-800"
                >
                  Chi tiết tài khoản
                </Button>
                <Button
                  leftIcon={<AiOutlineLogout />}
                  className="flex items-center p-2 w-full hover:bg-primary rounded-lg text-sm dark:hover:bg-indigo-800"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
            </div>
          ) : ( */}
          <Button
            className="py-1 px-3 rounded-sm mr-2 border border-primary"
            onClick={openModal}
          >
            Đăng nhập
          </Button>
          {/* )} */}
          <Button
            className="text-white bg-primary py-2 px-3 rounded-sm flex items-center"
            leftIcon={<IoIosAddCircleOutline />}
          >
            Đăng tin miễn phí
          </Button>
        </div>
        <div className="text-2xl lg:hidden cursor-pointer px-2 py-2.5">
          <AiOutlineMenu color="#00b14f" />
        </div>
      </header>
      <CustomModal isOpen={isOpen} onRequestClose={closeModal}>
        <h1 className="text-xl font-bold">Custom Modal Content</h1>
        <p className="mt-2">
          This is a custom modal using React Modal and Tailwind CSS.
        </p>
      </CustomModal>
    </>
  );
};

export default Header;
