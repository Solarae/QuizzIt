// export const URL = "https://quizzit-server.herokuapp.com"
//export const URL = "http://localhost:5000"
export const URL = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ?
    "http://localhost:5000":
    "https://quizzit-server.herokuapp.com"
export const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dujtw76ek/image/upload"
export const CLOUDINARY_IMG_URL = "https://res.cloudinary.com/dujtw76ek/image/upload"