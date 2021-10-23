import cloudinary from 'cloudinary';
import { envVariable } from '../configs/env';

const { CLOUD_NAME, API_KEY_CLOUD, API_SECRET_CLOUD } = envVariable;

class ImageUtils {
  constructor() {
    this.cloudinary = cloudinary.v2;
    this.cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY_CLOUD,
      api_secret: API_SECRET_CLOUD,
      sign_url: true,
    });
  }

  // register signature payload from cloudinary
  async signFileUploadRequest() {
    // grab a current UNIX timestamp
    let timestamp = Math.round(new Date().getTime() / 1000);
    let signature = await this.cloudinary.v2.utils.api_sign_request({ timestamp }, api_secret);
    let payload = {
      signature,
      timestamp,
    };
    return payload;
  }

  // remove old image from cloudinary
  removeImageToCloud(url) {
    global.logger.info("ImageUtils::removeImageToCloud" + url);
    const id = url.split('/').slice(-1)[0].split('.')[0];
    this.cloudinary.v2.uploader.destroy(id, (result) => {
      return true;
    });
  }

}

export default new ImageUtils();