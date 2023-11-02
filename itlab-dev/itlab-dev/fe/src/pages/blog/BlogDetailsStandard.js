import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import BlogSidebar from "../../wrappers/blog/BlogSidebar";
import BlogComment from "../../wrappers/blog/BlogComment";
import BlogPosts from "../../wrappers/blog/BlogPosts";
import NewsApi from "../../api/news/NewsApi";
import LoadingSpin from "../../components/loading/LoadingSpin";
const BlogDetailsStandard = ({ location, match }) => {
  const { pathname } = location;
  const newsId = match.params.id;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    try {
      setLoading(true);
      const res = await NewsApi.GetNewsDetail(newsId);
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Blog Post</title>
        <meta name="description" content="Blog post page of FolyFood." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Blog Post
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
            <div className="row">
              <div className="blog-details-wrapper ml-20">
                {/* blog post content */}
                <div className="container">
                  <div className="welcome-content text-center">
                    <h5>Tin tức</h5>
                    <h1>{data && data.title}</h1>
                    <h5 style={{ textAlign: "center" }}>
                      {data &&
                        (data.account.user.userName || data.account.email)}
                    </h5>
                    <div className="text-center" style={{ margin: "10px 0" }}>
                      <img
                        src={data && data.image}
                        alt="polyfood"
                        height={500}
                      />
                    </div>
                  </div>
                  {data && (
                    <div
                      className="text-center text-justify"
                      // style={{ tẽ: "left !impt" }}
                      dangerouslySetInnerHTML={{ __html: data.content }}
                    />
                  )}
                </div>
                {/* blog post comment */}
                <BlogComment />
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

BlogDetailsStandard.propTypes = {
  location: PropTypes.object,
};

export default BlogDetailsStandard;
