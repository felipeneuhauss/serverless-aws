'use strict';

const { basename, extname } = require('path')
const sharp = require('sharp')
const AWS = require('aws-sdk')
const S3 = new AWS.S3()

module.exports.handle = async ({ Records: records}, context) => {
  try {
    await Promise.all(records.map(async (record) => {
      const { key } = record.s3.object
      const image = S3.getObject({
        Bucket: process.env.IMAGES_UPLOADED_BUCKET,
        Key: key
      })

      const optimized = await sharp(image.Body)
        .resize(1280, 720, { fit: 'inside', withoutEnlargement: true })
        .toFormat('jpeg', { progressive: true, quality: 50 })
        .toBuffer()

      await S3.putObject({
        Body: optimized,
        Bucket: process.env.IMAGES_UPLOADED_BUCKET,
        ContentType: 'image/jpeg',
        Key: `compressed/${basename(key, extname(key))}.jpg`
      })

    }));
  } catch (e) {
    return e
  }
}
