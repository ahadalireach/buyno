import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Header,
  Loader,
  Breadcrumb,
  UserProfileSideBar,
  UserProfileData,
  Footer,
} from "../../../components";

const UserProfilePage = () => {
  const [active, setActive] = useState(1);
  const { loading } = useSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Breadcrumb mainTitle="User Profile" page="Profile" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 py-6 lg:py-10">
          {loading ? (
            <div className="flex flex-1 items-center justify-center min-h-[400px]">
              <Loader />
            </div>
          ) : (
            <>
              <div className="w-full lg:w-80 lg:flex-shrink-0">
                <UserProfileSideBar active={active} setActive={setActive} />
              </div>

              <div className="flex-1 min-w-0">
                <UserProfileData active={active} />
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;
