import supabase from "./supabase";


// We expect a newSetting object that looks like {setting: newValue}
export async function getSettings() {
  let { data: settings, error } = await supabase
  .from('settings')
  .select('*').single()

  if (error) {
  console.log(error)
  throw new Error("Settings could not be loaded")
  }

  return settings
}


export async function updateSetting(newSettings) {
  

  const { data, error } = await supabase
  .from('settings')
  .update(newSettings)
  // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
  .eq('id', 1).single()

  if (error) {
    console.log(error.message)
    throw new Error("Settings could not be updated");
  }

  return data
}