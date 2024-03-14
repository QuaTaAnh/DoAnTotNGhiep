import Header from "./components/Header";
import { LayoutProp } from "./type";

const MainLayout: React.FC<LayoutProp> = (props: LayoutProp) => {
  return (
    <>
      <div className="relative dark:bg-bgDark dark:text-white text-black h-screen overflow-auto transition duration-300 ease-in-out">
        <div className="main">
          <Header />
          <div className="mt-marginTopHeader">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
