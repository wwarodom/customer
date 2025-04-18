'use server'
import { revalidatePath } from 'next/cache'  
import { cookies } from 'next/headers'  
import { redirect } from 'next/navigation'

const deleteCustomer = async (id: number) => {
    const token = (await cookies()).get('access_token')?.value
    
    console.log("id: ", id)
    const res = await fetch(`http://localhost:3000/customer/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    const json = await res.json();
    console.log("json: ", json)
    if (res.ok) {
        console.log("Customer deleted successfully")
        revalidatePath('/customer')  
    } else {
        console.error("Error deleting customer:", json); 
        redirect('/customer?error=Error deleting customer');
    }
}

export default deleteCustomer