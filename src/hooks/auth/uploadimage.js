export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
   formData.append("upload_preset", "payment_proof");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dc9gl8qud/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  return res.json();
};
