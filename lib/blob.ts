import { put, del, list } from "@vercel/blob"

export async function uploadImage(file: File, folder = "products"): Promise<string> {
  try {
    const filename = `${folder}/${Date.now()}-${file.name}`
    const blob = await put(filename, file, {
      access: "public",
      addRandomSuffix: true,
    })
    return blob.url
  } catch (error) {
    console.error("Error uploading image:", error)
    throw new Error("Failed to upload image")
  }
}

export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error("Error deleting image:", error)
    throw new Error("Failed to delete image")
  }
}

export async function listImages(folder = "products") {
  try {
    const { blobs } = await list({
      prefix: folder,
      limit: 100,
    })
    return blobs
  } catch (error) {
    console.error("Error listing images:", error)
    throw new Error("Failed to list images")
  }
}

export function validateImageFile(file: File): boolean {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  const maxSize = 5 * 1024 * 1024 // 5MB

  return allowedTypes.includes(file.type) && file.size <= maxSize
}
