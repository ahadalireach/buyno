import { Link } from "react-router-dom";

const Breadcrumb = ({ mainTitle, page }) => {
  return (
    <div className="bg-gray-200 py-16">
      <div className="text-center">
        <h1 className="text-2xl text-gray-900 mb-4 uppercase">{mainTitle}</h1>
        <div className="text-lg text-gray-500 tracking-widest uppercase">
          <Link to="/" className="hover:text-orange-600 transition">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{page}</span>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
