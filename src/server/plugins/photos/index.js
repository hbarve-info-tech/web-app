
import Joi from 'joi';
import fs from 'fs';
import './clean';

import db, { ELEMENTS, IMAGES } from '../../database/setup';
import { Id, ImageId } from '../../config/schema';

import gcs, { BUCKET_NAME } from '../../storage/setup';

const bucket = gcs.bucket(BUCKET_NAME);


const getImage = {
  auth: {
    mode: 'required',
    strategies: ['visitor'],
  },
  validate: {
    params: Joi.object({
      id: Id.required(),
      imageId: ImageId.required(),
    }),
  },
  handler: (request, reply) => {
    const { id, imageId } = request.params;
    const key = db.key([IMAGES, imageId]);

    db.get(key, (error1, image) => {
      if (error1) {
        console.log(error1);

        return reply({
          statusCode: 500,
          error: 'Server Error.',
          message: 'Server Error.',
        });
      }

      if (!image) {
        return reply({
          statusCode: 404,
          error: 'Image Not Found',
          message: 'Image Not Found',
        });
      }

      const file = bucket.file(`images/${id}/${imageId}.jpg`);

      file.download((error2, result) => {
        if (error2) {
          console.log(error2);

          return reply({
            statusCode: 500,
            error: 'Server Error.',
            message: 'Server Error.',
          });
        }

        return reply(result);
      });
    });
  },
};
const uploadImage = {
  auth: {
    mode: 'required',
    strategies: ['WriteTrafficCheck', 'owner'],
  },
  payload: {
    maxBytes: 209715200,
    output: 'file',
    uploads: `${__dirname}/temp_images`,
    parse: true,
  },
  validate: {
    params: Joi.object({
      id: Id.required(),
    }),
  },
  handler: (request, reply) => {
    const { id } = request.params;

    db.allocateIds(db.key([IMAGES]), 1, (error1, keys) => {
      if (error1) {
        console.log(error1);

        return reply({
          statusCode: 500,
          error: 'Server error.1',
        });
      }

      const key = db.key([IMAGES, keys[0].id]);
      const imageId = key.id;
      const timestamp = (new Date(Date.now()));
      const data = {
        imageId: key,
        authorId: db.key([ELEMENTS, id]),
        timestamp: timestamp.toString(),
      };

      db.save({ key, data }, (error2) => {
        if (error2) {
          console.log(error2);

          return reply({
            statusCode: 500,
            error: 'Server error.2',
          });
        }

        const option = {
          destination: bucket.file(`images/${id}/${imageId}.jpg`),
          metadata: {
            contentType: 'image/jpeg',
          },
        };

        bucket.upload(request.payload.path, option, (error3) => {
          if (error3) {
            console.log(error3);

            return reply({
              statusCode: 500,
              error: 'Server error.3',
            });
          }

          try {
            fs.unlinkSync(request.payload.image.path);
          }
          catch (e) {
            console.log(e);
          }

          const payload = {
            authorId: id,
            imageId,
          };

          return reply({
            statusCode: 200,
            message: 'Success',
            payload,
          });
        });
      });
    });
  },
};

const register = (server, options, next) => {
  server.route([

    { method: 'GET', path: '/api/elements/{id}/images/{imageId}', config: getImage },
    { method: 'POST', path: '/api/elements/{id}/images', config: uploadImage },

  ]);

  next();
};

register.attributes = {
  pkg: {
    name: 'Photos',
    version: '0.0.1',
    description: 'This plugin contains all the features related to Photos.',
  },
};

export default register;
