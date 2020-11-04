const express = require("express");
const router = express.Router();
const passport = require("passport");
const AWS = require("aws-sdk");

const joiValidator = require("express-joi-validation").createValidator({
  passError: true,
});
const { commentValidation } = require("../../validation/comment.joiSchema");

const Release = require("../../models/Release");
const Personnel = require("../../models/Personnel");
const Product = require("../../models/Product");
const Seller = require("../../models/Seller");
const User = require("../../models/User");

const {
  RecordNotFoundError,
  ResourceNotFoundError,
  NotAuthorizedError,
  ValidationError,
} = require("../../validation/errors");

const imageResource = resource => {
  switch (resource) {
    case "release":
      return Release;
    case "personnel":
      return Personnel;
    case "product":
      return Product;
    case "seller":
      return Seller;
    case "user":
      return User;
    default:
      return new ResourceNotFoundError(`No resource called ${resource}`);
  }
};

const makeRandomId = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4();
};

router.put(
  "/add/:resource_type/:resource_id/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    imageResource(req.params.resource_type)
      .findById(req.params.resource_id)
      .then(resource => {
        if (!req.files)
          return next(new ValidationError("Please upload a file"));
        const file = req.files.file;

        if (!file.mimetype.startsWith("image"))
          return next(new ValidationError("File must be an image"));

        file.name = `${req.params.resource_type}_${
          resource._id
        }_${makeRandomId()}_${file.name}`;

        const blob = file.data;

        const s3_bucket = process.env.AWS_S3_BUCKET;
        const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY;
        const aws_access_key_id = process.env.AWS_ACCESS_KEY_ID;

        AWS.config.update({
          accessKeyId: aws_access_key_id,
          secretAccessKey: aws_secret_access_key,
        });

        const s3 = new AWS.S3();

        const params = {
          Bucket: s3_bucket,
          Key: file.name,
          Body: blob,
        };

        s3.upload(params, (err, data) => {
          console.log("AWS S3: Uploading to S3...");
          console.log(err, data);
          console.log("AWS S3: Done!");
        });

        const newImage = {
          description: req.body.description,
          imageUrl: `https://dancey-bucket.s3-ap-northeast-1.amazonaws.com/${file.name}`,
          mainImage: req.body.mainImage === "true",
        };

        if (resource.images.length > 0) {
          let resourceImages = resource.images;
          if (newImage.mainImage) {
            const changedImages = resourceImages.map(img =>
              Object.assign({}, img, { mainImage: false })
            );
            changedImages.push(newImage);
            imageResource(req.params.resource_type).findByIdAndUpdate(
              resource._id,
              {
                $set: { images: changedImages },
              },
              { new: true },
              (err, updatedResource) => {
                if (err) return next(err);
                res.json(updatedResource);
              }
            );
          } else {
            resourceImages.push(newImage);
            imageResource(req.params.resource_type).findByIdAndUpdate(
              resource._id,
              {
                $set: { images: resourceImages },
              },
              { new: true },
              (err, updatedResource) => {
                if (err) return next(err);
                res.json(updatedResource);
              }
            );
          }
        } else {
          newImage.mainImage = true;
          imageResource(req.params.resource_type).findByIdAndUpdate(
            resource._id,
            {
              $addToSet: { images: newImage },
            },
            { new: true },
            (err, updatedResource) => {
              if (err) return next(err);
              res.json(updatedResource);
            }
          );
        }
      })
      .catch(err => {
        return next(new RecordNotFoundError("No resource found"));
      });
  }
);

router.put(
  "/edit/:resource_type/:resource_id/:image_object_id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log("HELLO");
    imageResource(req.params.resource_type)
      .findById(req.params.resource_id)
      .then(resource => {
        const newResourceImages = resource.toObject().images.map(image =>
          image._id.toString() === req.params.image_object_id.toString()
            ? Object.assign({}, image, {
                mainImage: req.body.mainImage,
                description: req.body.description,
              })
            : req.body.mainImage
            ? Object.assign({}, image, { mainImage: false })
            : image
        );
        imageResource(req.params.resource_type).findByIdAndUpdate(
          resource._id,
          {
            $set: { images: newResourceImages },
          },
          { new: true },
          (err, updatedResource) => {
            if (err) return next(err);
            res.json(updatedResource);
          }
        );
      });
  }
);

router.delete(
  "/delete/:resource_type/:resource_id/:image_object_id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    imageResource(req.params.resource_type)
      .findById(req.params.resource_id)
      .then(resource => {
        const newResourceImages = resource
          .toObject()
          .images.filter(
            image =>
              image._id.toString() !== req.params.image_object_id.toString()
          );
        imageResource(req.params.resource_type).findByIdAndUpdate(
          resource._id,
          {
            $set: { images: newResourceImages },
          },
          { new: true },
          (err, updatedResource) => {
            if (err) return next(err);
            res.json(updatedResource);
          }
        );
      });
  }
);

module.exports = router;
