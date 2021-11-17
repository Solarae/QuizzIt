import dotenv from 'dotenv'
dotenv.config()
import cloudinary from 'cloudinary'
cloudinary.config({
    cloud_name: 'dujtw76ek',
    api_key: '169115562552378',
    api_secret: 'sNgMaESS-IZd2LmMjPyIc3eOJ00',
});

export default cloudinary