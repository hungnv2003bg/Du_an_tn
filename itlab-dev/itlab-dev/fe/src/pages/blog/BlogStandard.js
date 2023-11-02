import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogPagination from "../../wrappers/blog/BlogPagination";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import NewsApi from "../../api/news/NewsApi";
import LoadingSpin from "../../components/loading/LoadingSpin";

const BlogStandard = ({ location }) => {
  const { pathname } = location;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    page: 1,
    pageSize: 6,
  });
  useEffect(async () => {
    try {
      setLoading(true);
      const res = await NewsApi.GetNews(params);
      setData(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [params]);
  return (
    <Fragment>
      <MetaTags>
        <title>Poly Food | Tin tức</title>
        <meta name="description" content="Blog of PolyFood." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Tin tức
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        <div className="blog-area pt-100 pb-100">
          <div className="container">
            <div className="row flex-row-reverse">
              <div className="col">
                <div className="ml-20">
                  <div className="row">
                    {/* blog posts */}
                    <BlogPosts data={data && data.data && data.data.data} />
                  </div>

                  {/* blog pagination */}
                  {data && data.data && (
                    <BlogPagination data={data.data} SetParams={setParams} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

BlogStandard.propTypes = {
  location: PropTypes.object,
};

export default BlogStandard;
