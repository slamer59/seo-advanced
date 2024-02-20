"use server"

import { revalidatePath } from "next/cache";

export default async function increment(formData: FormData) {

    formData.get("count");

    revalidatePath("/blog/reparer-thermostat")
}