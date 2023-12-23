import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import { v2 } from "cloudinary";

// Cloudinary configuration
v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
// Multer configuration
const storageOptions = {
  cloudinary:v2,
  params: {
    resource_type: 'auto',
    folder: 'mentoon images',
    allowed_formats: [ 'jpeg','png'],
    public_id: (req, file) => {
        // remove the file extension from the file name
        const fileName = file.originalname.split('.').slice(0, -1).join('.');
        return fileName+new Date();
    }
  }
};

const storage = new CloudinaryStorage(storageOptions);
const upload = multer({ storage: storage }).single('productimage');

export default upload



