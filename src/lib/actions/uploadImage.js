
"use server";

export async function uploadImageToImgbb(formData) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_IGMBB_API_KEY;

    if (!apiKey) {
      throw new Error("ImgBB API key is missing.");
    }

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.error?.message || "Image upload failed.");
    }

    return {
      success: true,
      url: result.data.display_url || result.data.url,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      url: null,
      error: error.message,
    };
  }
}
