const cloudname = import.meta.env.VITE_CLOUD_NAME
const uploadset = import.meta.env.VITE_UPLOAD_PRESET
const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadset); 
    formData.append("cloud_name", cloudname);
    console.log(uploadset)
    console.log(cloudname)
    console.log(formData)
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudname}/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload Failed:", errorData); // Log the actual error response
        return null;
      }
  
      const data = await response.json();
      console.log("Upload Successful:", data); // Log successful upload
      return data.secure_url; // Return the image URL
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      return null;
    }
  };
  
  export default uploadImageToCloudinary;
  