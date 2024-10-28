import { prisma } from "./prisma";

interface Data {
  duration?: number,
  statusId?: number, 
  recordingUrl?: string,
  notes?: string,
  summary?: string,
  clientAddress?: string,
  transcript?: string,
  postCode?: string,
  hasPOA?: boolean,
  success?: boolean
}
export async function updateCallStatus(id: string, data:Data){
  try {
    console.log(data); 
    await prisma.call.update({
      where: {
        id
      },
      data 
    });
  } catch (error) {
    console.log(error)
    throw Error("Something wrong happened")
  }
}