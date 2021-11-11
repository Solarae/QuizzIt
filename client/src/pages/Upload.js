import React, { useState } from "react";
import axios from "axios";
import { Image } from "cloudinary-react";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dujtw76ek/image/upload";
const CLOUDINARY_IMG_URL = "https://res.cloudinary.com/dujtw76ek/image/upload";
function Upload() {
  const [image, setImage] = useState();
  const [imageURL, setImageURL] = useState(null);
  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "jxf92wae");
    try {
      const res = await axios.post(CLOUDINARY_URL, formData);
      console.log(res);
      const version = res.data.version;
      const public_id = res.data.public_id;
      console.log(res.data.public_id);
      console.log(res.data.version);
      setImageURL(`${CLOUDINARY_IMG_URL}/v${version}/${public_id}.png`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button onClick={handleUpload}>Upload File</button>
      {imageURL != null && (
        <Image
          style={{ width: 200 }}
          cloudName="dujtw76ek"
          publicId={imageURL}
        />
      )}
    </div>
  );
}

export default Upload;
