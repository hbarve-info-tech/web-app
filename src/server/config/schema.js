/**
 * Created by himank on 1/8/16.
 *
 * This file covers all the input validation with Joi.js
 * and it will export all variable further.
 */

import Joi from "joi";

export const id       = Joi.number().integer();
export const username = Joi.string().lowercase().trim().token().min(2).max(20);
export const postId   = Joi.string().length(24);

export const password = Joi.string().regex(/[a-zA-Z0-9]+/).min(5).max(30);
export const mobile   = Joi.number().min(7000000000).max(9999999999).integer();
export const email    = Joi.string().email();
export const name     = Joi.string().min(3).max(30);

export const circleType = Joi.string().valid('edu', 'org', 'location', 'field', 'social');
export const status     = Joi.string().min(1).max(148);
export const description= Joi.string().min(1).max(300);
export const classroom  = Joi.boolean();


export const courseId    = Joi.number().integer();
export const moduleId    = Joi.number().integer();
export const courseName  = Joi.string().min(3).max(148);
export const courseUrl   = Joi.string().regex(/[a-zA-Z0-9-]+/);
export const standard    = Joi.string().valid(
                              'primary', 'secondary',
                              'higher-secondary', 'graduation',
                              'post-graduation', 'phd');
export const level       = Joi.number().integer().min(1).max(5);


export const moduleName  = Joi.string().min(3).max(148);
export const moduleData  = Joi.object();


export const articleId   = Joi.number().integer();
export const articleName = Joi.string().min(3).max(148);
export const articleUrl  = Joi.string().regex(/[a-zA-Z0-9-]+/);
export const articleData = Joi.object();

//Cover rest all the things here.
