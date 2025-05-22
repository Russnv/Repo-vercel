import { ENV } from "@/config/envs";

export async function newLogin(formData: string) {
  try {
    const response = await fetch(`${ENV.API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) return data;
  } catch {
    throw "error al obtener los datos";
  }
}

export async function newRegister(formData:string){
     try {
           const res = await fetch(`${ENV.API_URL}/users/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body:formData,
            });
            const data = await res.json();
             console.log(data);
            if(res.ok)return data
        }catch{
            throw('Error al obtener lo datos');
        } 
         
} 