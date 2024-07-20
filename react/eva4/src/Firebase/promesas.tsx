import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from './firebase'
import { Usuario } from "@/interfaces/iUsuarios";

export const registrarUsuario =async(usuarios:Usuario)=>{
     const docRef= await addDoc(collection(db,'usuarios'), usuarios)
    }

export const obtenerUsuarios = async()=>{
    let usuarios:Usuario[] = []
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    querySnapshot.forEach((doc)=>{
        let usuario:Usuario={
            nombre:doc.data().nombre,
            apellido:doc.data().apellido,
            usuario:doc.data().usuario,
            equipofav:doc.data().equipofav,
        }
        usuarios.push(usuario)
    })
    return usuarios
}