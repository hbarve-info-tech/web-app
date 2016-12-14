'use strict';
import Joi from "joi";
import fs from "fs";
import "./clean";

import db, { ELEMENTS, IMAGES } from "../../database/setup";
import { id, imageId } from "../../config/schema";

import gcs, { BUCKET_NAME } from "../../storage/setup";
const bucket = gcs.bucket(BUCKET_NAME);


const getImage    = {
  auth    : {
    mode       : 'required',
    strategies : ['visitor']
  },
  validate: {
    params : Joi.object({
      id      : id.required(),
      imageId : imageId.required()
    })
  },
  handler : (request, reply) => {
    const { id, imageId } = request.params;
    const key = db.key([IMAGES, imageId]);

    db.get(key, (err, image) => {
      if(err) {
        console.log(err);

        return reply({
          statusCode: 500,
          error     : 'Server Error.',
          message   : 'Server Error.'
        });
      }

      if(!image) {
        return reply({
          statusCode: 404,
          error     : 'Image Not Found',
          message   : 'Image Not Found'
        });
      }

      let file = bucket.file(`images/${id}/${imageId}.jpg`);

      file.download((err, result) => {
        if(err) {
          console.log(err);

          return reply({
            statusCode: 500,
            error     : 'Server Error.',
            message   : 'Server Error.'
          });
        }

        return reply(result);
      });
    });
  }
};
const uploadImage = {
  auth    : {
    mode       : 'required',
    strategies : ['WriteTrafficCheck', 'owner']
  },
  payload :{
    maxBytes: 209715200,
    output  :'file',
    uploads: __dirname + '/temp_images',
    parse   : true
  },
  validate: {
    params : Joi.object({
      id : id.required()
    })
  },
  handler : (request, reply) => {
    const { id } = request.params;
    const key = db.key([IMAGES]);

    db.allocateIds(key, 1, (err, result1) => {
      if(err) {
        console.log(err);

        return reply({
          statusCode: 500,
          error     : 'Server error.1'
        });
      }

      const imageId = result1[0].id;

      let timestamp = (new Date(Date.now()));
      timestamp = timestamp.toString();
      const newImage = {
        key : db.key([IMAGES, imageId]),
        data: {
          imageId : db.key([IMAGES, imageId]),
          authorId: db.key([ELEMENTS, id]),
          timestamp
        }
      };

      db.save(newImage, (err, result2) => {
        if(err) {
          console.log(err);

          return reply({
            statusCode: 500,
            error     : 'Server error.2'
          });
        }

        const option = {
          destination: bucket.file(`images/${id}/${imageId}.jpg`),
          metadata: {
            contentType: 'image/jpeg'
          }
        };

        bucket.upload(request.payload.path, option, (err, newFile) => {
          if(err) {
            console.log(err);

            return reply({
              statusCode: 500,
              error     : 'Server error.3'
            });
          }

          try { fs.unlinkSync(request.payload.image.path); }
          catch (e) {}

          let payload = {
            authorId : newImage.data.authorId.id,
            imageId  : newImage.data.imageId.id
          };

          return reply({
            statusCode: 200,
            message   : 'Success',
            payload
          });
        });
      });
    });
  }
};

export const register = (server, options, next) => {

  server.route([

    {method: 'GET',  path: '/api/elements/{id}/images/{imageId}', config: getImage},
    {method: 'POST', path: '/api/elements/{id}/images',           config: uploadImage}

  ]);

  next();
};

register.attributes = {
  pkg : {
    "name": "Photos",
    "version": "0.0.1",
    "description": "This plugin contains all the features related to Photos."
  }
};
