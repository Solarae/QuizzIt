
import cloudinary from "../util/cloudinary.js";



export const uploadImage = async (req,res) =>{

    try {
        const img = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(img, {
            upload_preset: 'dev_setups',
        });
        console.log(uploadResponse);
        res.status(200).json({ url:uploadResponse.url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }



}