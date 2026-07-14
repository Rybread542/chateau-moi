"use server";
import { requireAdmin } from "@/lib/auth";
import { S3, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { File } from "buffer";


const spaces = new S3Client({
    region: 'us-east-1',
    endpoint: process.env.SPACES_ENDPOINT,
    forcePathStyle: false,
    credentials: {
        accessKeyId: process.env.SPACES_ID!,
        secretAccessKey: process.env.SPACES_SECRET!
    }
})

export async function uploadImage(
  formData: FormData
){
    await requireAdmin()

    const file = formData.get('file')
    if (!(file instanceof File)) {
        return "Error pasting"
    }

    const slug = String(formData.get('slug')) as string
    const id = String(formData.get('id'))
    const key = `${slug}/${file.name}-${id}`
    const imgBuffer = Buffer.from(await file.arrayBuffer())

    const command = new PutObjectCommand({
        Bucket: process.env.SPACES_BUCKET!,
        Key: key,
        Body: imgBuffer,
        ContentType: 'image/webp',
        ACL: "public-read",
        CacheControl: "public, max-age=31536000, immutable"
    })

    await spaces.send(command)

    return `${process.env.SPACES_CDN_ENDPOINT}/${key}`

}

