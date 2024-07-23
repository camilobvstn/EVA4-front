import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
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
            key:doc.id
        }
        usuarios.push(usuario)
    })
    return usuarios
}

export const obtenerUsuario= async(key:string)=>{
    const docRef = doc(db, "usuarios", key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let usuario:Usuario={
            nombre:docSnap.data().nombre,
            apellido:docSnap.data().apellido,
            usuario:docSnap.data().usuario,
            equipofav:docSnap.data().equipofav,
            key:docSnap.id
        };
     return usuario
    } else {
        return undefined
    }
}
export const actualizarUsuario = async (id: string, usuario: Usuario) => {
    const usuarioRef = doc(db, 'usuarios', id);
    await updateDoc(usuarioRef, {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      usuario: usuario.usuario,
      equipofav: usuario.equipofav,
      key:usuario.key
    });

}

export const eliminarUsuario = async(key:string) =>{
    const ref = doc(db,"usuarios",key);
    await deleteDoc (ref);
}