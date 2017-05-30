
import Joi from 'joi';

import { Id, ImageName } from '../mayash-api-common/schema';
import gcs, { BUCKET_NAME } from '../mayash-config/gCloudStorage';

const bucket = gcs.bucket(BUCKET_NAME);

export default {
  auth: {
    mode: 'required',
    strategies: ['visitor'],
  },
  validate: {
    params: Joi.object({
      id: Id.required(),
      imageName: ImageName.required(),
    }),
  },
  handler: (request, reply) => {
    const { id, imageName } = request.params;
    // const imageId = parseInt(imageName.split('.')[0], 10);
    const file = bucket.file(`images/${id}/${imageName}`);

    file.createReadStream()
      .on('data', () => {})
      .on('response', response => reply(response));
  },
};
