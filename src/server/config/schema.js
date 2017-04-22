
import Joi from 'joi';

export const Id = Joi.number().integer();

export const Username = Joi.string().min(2).max(20).lowercase().trim().token();

export const PostId = Joi.string().length(24);

export const Password = Joi.string().regex(/[a-zA-Z0-9]+/).min(5).max(30);

export const Mobile = Joi.number().min(7000000000).max(9999999999).integer();

export const Email = Joi.string().email();

export const Name = Joi.string().min(3).max(50);

export const Dob = Joi.date().min('1-1-1974');

export const ElementType = Joi.string().valid('user', 'circle');
export const CircleType = Joi.string().valid('edu', 'org', 'location', 'field');

export const Status = Joi.string().max(148);

export const Description = Joi.string().min(1).max(300);

export const Classroom = Joi.boolean();


export const CourseId = Joi.number().integer();

export const ModuleId = Joi.number().integer();

export const CourseName = Joi.string().min(3).max(148);

export const CourseUrl = Joi.string().regex(/[a-zA-Z0-9-]+/);

export const Standard = Joi.string()
  .valid('primary', 'secondary', 'higher-secondary', 'graduation', 'post-graduation', 'phd');

export const Level = Joi.number().integer().min(1).max(5);


export const ModuleName = Joi.string().min(3).max(148);
export const ModuleData = Joi.object();


export const ArticleId = Joi.number().integer();

export const ArticleName = Joi.string().min(3).max(148);

export const ArticleUrl = Joi.string().regex(/[a-zA-Z0-9-]+/);

export const ArticleData = Joi.object();

export const ImageId = Joi.number().integer();
export const ImageName = Joi.string().regex(/^([0-9]{16})+(.jpg|.jpeg|.png|.gif)$/);

export const Semester = Joi.number().integer();
export const Degree = Joi.string();
export const Next = Joi.string();

// These are for posts.
export const PostType = Joi.string().valid('tweet', 'article', 'report');

export const Title = Joi.string().min(3).max(148);
export const PostData = Joi.object();

// Cover rest all the things here.
