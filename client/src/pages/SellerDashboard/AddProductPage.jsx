import {
  Breadcrumb,
  AddProduct,
  DashboardHeader,
  DashboardSideBar,
  Footer,
} from "../../components";

const AddProductPage = () => {
  return (
    <>
      <DashboardHeader />
      <Breadcrumb mainTitle="Add New Product" page="Add Product" />
      <div className="w-11/12 mx-auto flex items-center justify-between">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <AddProduct />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddProductPage;
