import React, { Fragment } from "react";

const BlogComment = () => {
  return (
    <Fragment>
      <div className="blog-comment-wrapper mt-55">
        <h4 className="blog-dec-title">Bình luận</h4>
        <div className="single-comment-wrapper mt-35">
          <div className="blog-comment-img">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/team/user.png"}
              alt="polyfood"
            />
          </div>
          <div className="blog-comment-content">
            <h4>Lê Hùng</h4>
            <span>5 July, 2023 </span>
            <p>Ăn chay tốt cho sức khỏe </p>
          </div>
        </div>
        <div className="single-comment-wrapper mt-50 ml-120">
          <div className="blog-comment-img">
            <img
              src={process.env.PUBLIC_URL + "/assets/img/team/user.png"}
              alt="polyfood"
            />
          </div>
          <div className="blog-comment-content">
            <h4>Nguyễn Đức Thắng</h4>
            <span>12 July, 2023 </span>
            <p>Đúng vậy </p>
          </div>
        </div>
      </div>
      <div className="blog-reply-wrapper mt-50">
        <h4 className="blog-dec-title">Đăng bình luận</h4>
        <form className="blog-form">
          <div className="row">
            <div className="col-md-12">
              <div className="text-leave">
                <textarea placeholder="Nhập nội dung" defaultValue={""} />
                <input type="submit" defaultValue="Gửi" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default BlogComment;
