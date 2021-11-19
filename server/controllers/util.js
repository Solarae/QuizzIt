import cloudinary from "../utils/cloudinary.js";

export const uploadImgToCloud = async (img) =>{
    try {
        const res = await cloudinary.uploader.upload(img, {
            upload_preset: 'dev_setups',
        });
        console.log(res);
        return res
    } catch (err) {
        console.error(err);
    }
}