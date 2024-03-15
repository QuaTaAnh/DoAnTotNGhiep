import Footer from "./components/Footer";
import Header from "./components/Header";
import { LayoutProp } from "./type";

const MainLayout: React.FC<LayoutProp> = (props: LayoutProp) => {
  return (
    <>
      <div className="relative dark:bg-bgDark dark:text-white text-black h-screen overflow-auto transition duration-300 ease-in-out">
        <div className="max-w-screen-2xl text-base">
          <Header />
          <div className="mt-marginTopHeader">{props.children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
