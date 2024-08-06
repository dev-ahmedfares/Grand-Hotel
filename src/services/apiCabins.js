import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin,id) {
  

  const hasImagePath= newCabin.image?.startsWith?.(supabaseUrl)
  const imageOldName = newCabin.image
  

  const imageName = hasImagePath ? `${Math.random()}-cabin${imageOldName?.slice(imageOldName?.lastIndexOf("."))}`.replaceAll(
    "/",
    ""
  ) : `${Math.random()}-${imageOldName.name}`.replaceAll(
    "/",
    ""
  );
  
  
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
  // 1) Add New Cabin
  let query = supabase.from("cabins")

  // For Create Cabin
  if (!id) query = query.insert([{...newCabin,image: imagePath}]);
  

  // A) update Cabin

  if (id) query = query.update({...newCabin,image: imagePath}).eq("id", id)
    
    const {data , error} = await query.select()


    if (error) {
      console.log(error);
      throw new Error("Cabins could not be created");
    }
  

  // 2) Upload Image To Storage
    if (!imagePath) return data // to prevent upload image in case there is no new image uploaded
    
  const { error: imageUploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3) Deleting the Cabin if there an error at Uploading Image
    if (imageUploadError) {
      console.log(imageUploadError);
      await supabase.from("cabins").delete().eq("id", data.id)
      throw new Error("Cabin Image Could not be Uploaded and cabin not created")
    }

    return data
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be deleted");
  }

  return data;
}
