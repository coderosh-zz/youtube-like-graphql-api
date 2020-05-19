import { generate } from 'shortid'
import { createWriteStream } from 'fs'

const uploadDir = 'videos'

const storeUpload = async ({ stream, filename }: any): Promise<any> => {
  const id = generate()
  const file = `${id}-${filename}`
  const path = `${uploadDir}/${file}`

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ id, path, file }))
      .on('error', reject)
  )
}

const processUpload = async (upload: any) => {
  const { createReadStream, filename, mimetype, encoding } = await upload

  if (!mimetype.startsWith('video')) {
    throw new Error('Please upload a video')
  }

  const stream = createReadStream()
  const { id, path, file } = await storeUpload({ stream, filename })

  return file
}

export { storeUpload, processUpload }
