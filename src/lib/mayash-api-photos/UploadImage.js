
import Joi from 'joi';

import db, { ELEMENTS, IMAGES } from '../mayash-database/setup';
import { Id } from '../mayash-api-common/schema';

import gcs, { BUCKET_NAME } from '../mayash-config/gCloudStorage';

const bucket = gcs.bucket(BUCKET_NAME);

export default {
  auth: {
    mode: 'required',
    strategies: ['WriteTrafficCheck', 'owner'],
  },
  payload: {
    maxBytes: 209715200,
    output: 'stream',
    parse: true,
    allow: 'multipart/form-data',
  },
  validate: {
    params: Joi.object({
      id: Id.required(),
    }),
    payload: Joi.object({
      file: Joi.object().required(),
    }),
  },
  handler: (request, reply) => {
    const { id } = request.params;
    const { file } = request.payload;

    const { filename, headers } = file.hapi;
    const filenameArray = filename.split('.');

    const fileType = filenameArray[filenameArray.length - 1];
    const contentType = headers['content-type'];

    db.allocateIds(db.key([IMAGES]), 1)
      .then(
        (success) => {
          const key = success[0][0];

          const imageId = key.id;
          const timestamp = (new Date(Date.now()));
          const data = {
            imageId: key,
            authorId: db.key([ELEMENTS, id]),
            imageName: `${imageId}.${fileType}`,
            timestamp: timestamp.toString(),
          };

          db.save({ key, data })
            .then(
              () => {
                const newFile = bucket.file(`images/${id}/${imageId}.${fileType}`);
                file.pipe(newFile.createWriteStream({ metadata: { contentType } }))
                  .on('error', (err) => {
                    console.log(err);

                    return reply({
                      statusCode: 500,
                      error: 'Server Error',
                      message: 'Server Error',
                    });
                  })
                  .on('finish', () => {
                    return reply({
                      statusCode: 201,
                      message: 'Image upload successfully.',
                      imageUrl: `/api/elements/${id}/images/${imageId}.${fileType}`,
                    });
                  });
              },
              (error) => {
                console.log(error);
              },
            );
        },
        (error) => {
          console.log(error);
          return reply({
            statusCode: 500,
            error: 'Server Error',
            message: 'Server Error',
          });
        },
      );
  },
};
