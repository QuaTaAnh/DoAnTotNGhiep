import { Link, useLocation } from "react-router-dom";
import { routes } from "../../config/routes";
import Logo from "../../assets/images/logo.png";
import Button from "../../components/Button/Button";
import useDark from "../../hooks/useDark";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

const Header = () => {
  const [isDarkMode, toggleDarkMode] = useDark();
  const { pathname } = useLocation();

  const LinkActive = (type: string) => {
    let classes: string =
      "text-base rounded-lg px-3 py-5 font-bold cursor-pointer";
    if (type === pathname) {
      classes += " text-primary font-bold";
    }
    return classes;
  };
  return (
    <>
      <header className="fixed h-defaultHeader w-full px-5 top-0 right-0 z-20 flex justify-between items-center dark:bg-bgDark shadow-lg dark:shadow-dark">
        <Link to={routes.home}>
          <div className="flex justify-between items-center">
            <div className="w-24 h-defaultHeader pr-5">
              <img className="w-full h-full" src={Logo} alt="House" />
            </div>
            <div>
              <Button to={routes.home} className={LinkActive(routes.home)}>
                Trang chủ
              </Button>
              <Button to={routes.about} className={LinkActive(routes.about)}>
                Cho thuê phòng trọ
              </Button>
            </div>
          </div>
        </Link>
        <div className="flex items-center">
          <div className="cursor-pointer text-2xl px-2 py-2.5 mr-2">
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
          <Button className="py-2 px-4 rounded-sm mr-2 border border-primary">
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
      </header>
    </>
  );
};

export default Header;
