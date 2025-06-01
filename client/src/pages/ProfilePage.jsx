import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Footer,
  Header,
  Loader,
  Breadcrumb,
  ProfileSidebar,
  ProfileContent,
} from "../components";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle="Your Profile" page="Profile" />
      <div className={`w-11/12 mx-auto flex py-10`}>
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <ProfileSidebar active={active} setActive={setActive} />
            </div>
            <ProfileContent active={active} />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
