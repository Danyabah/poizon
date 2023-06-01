import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setImages } from "../redux/slices/adminReducer";

export default function PreviewImage({ name, file, setField }) {
  const [preview, setPreview] = useState([]);
  const dispatch = useDispatch();
  let arr = [];
  console.log(file);
  useEffect(() => {
    file.forEach((element) => {
      if (element && typeof element == "object") {
        const reader = new FileReader();
        reader.readAsDataURL(element);
        reader.onload = () => {
          // console.log(reader.result);
          // if (!preview.includes(reader.result)) {
          arr.push(reader.result);
          console.log(arr);
          setPreview(arr);
          console.log(preview);
          // setPreview(preview.push(reader.result));
          setField(name, [...preview, reader.result]);
          // }
        };
      } else if (typeof element == "string") {
        if (!preview.includes(element)) {
          setPreview([...preview, element]);
          setField(name, [...preview, element]);
        }
      }
    });
  }, [file]);

  useEffect(() => {
    console.log(preview);
    dispatch(setImages(preview));
  }, [preview, file]);

  function deletePreview(e) {
    let img = e.target.closest(".image__item").querySelector("img");
    setPreview(preview.filter((el) => el !== img.src));
    setField(
      name,
      preview.filter((el) => el !== img.src)
    );
  }

  return (
    <>
      {preview.map((prev, index) => (
        <div key={index} className="image__item">
          <div className="delete" onClick={(e) => deletePreview(e)}>
            <svg
              fill="none"
              width={"38px"}
              height={"46px"}
              viewBox="0 0 38 46"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill="black"
                d="M11.4366 5.34813C11.4366 2.67237 13.2038 0.503662 15.3841 0.503662H23.2793C25.4597 0.503662 27.2269 2.67237 27.2269 5.34813V6.96296H36.4379C37.1643 6.96296 37.7538 7.6864 37.7538 8.57778C37.7538 9.46917 37.1643 10.1926 36.4379 10.1926H33.8062V37.6446C33.8062 42.1031 30.86 45.7187 27.2269 45.7187H11.4366C7.80346 45.7187 4.85725 42.1031 4.85725 37.6446V10.1926H2.22553C1.49917 10.1926 0.909668 9.46917 0.909668 8.57778C0.909668 7.6864 1.49917 6.96296 2.22553 6.96296H11.4366V5.34813ZM14.0683 6.96296H24.5952V5.34813C24.5952 4.45675 24.0057 3.73331 23.2793 3.73331H15.3841C14.6578 3.73331 14.0683 4.45675 14.0683 5.34813V6.96296ZM7.48897 10.1926V37.6446C7.48897 40.3204 9.25617 42.4891 11.4366 42.4891H27.2269C29.4073 42.4891 31.1745 40.3204 31.1745 37.6446V10.1926H7.48897ZM19.3317 15.0371C20.0581 15.0371 20.6476 15.7605 20.6476 16.6519V36.0298C20.6476 36.9212 20.0581 37.6446 19.3317 37.6446C18.6054 37.6446 18.0159 36.9212 18.0159 36.0298V16.6519C18.0159 15.7605 18.6054 15.0371 19.3317 15.0371Z"
              ></path>
            </svg>
          </div>

          <img src={prev} style={{ height: "200px" }} alt="" />
        </div>
      ))}
    </>
  );
}
