export const downloadImage = async (
  path: string,
  supabase: any
): Promise<string | null> => {
  try {
    // Get the public URL directly from Supabase
    const { data } = supabase.storage.from("posts").getPublicUrl(path);

    if (!data || !data.publicUrl) {
      console.error("Error getting public URL");
      return null;
    }

    return data.publicUrl; // ✅ Return the public URL
  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
};
