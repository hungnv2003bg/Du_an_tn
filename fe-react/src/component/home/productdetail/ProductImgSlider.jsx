import Gallery from "react-image-gallery";
import "./style.css";
import "react-image-gallery/styles/css/image-gallery.css";
function ProductImgSlider({ imgs }) {
  imgs = imgs
    ? imgs.map((item) => {
        return {
          original: item.linkHinhAnh,
          thumbnail: item.linkHinhAnh,
        };
      })
    : [
        {
          original: "",
          thumbnail: "",
        },
      ];

  return (
    <div className="slider-img">
      <Gallery items={imgs} />
    </div>
  );
}

export default ProductImgSlider;
