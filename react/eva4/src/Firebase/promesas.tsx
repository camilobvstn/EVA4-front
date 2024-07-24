import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from './firebase'
import { Usuario } from "@/interfaces/iUsuarios";
import { Comentario } from "@/interfaces/iOpinion";

export const registrarUsuario =async(usuarios:Usuario)=>{
     const docRef= await addDoc(collection(db,'usuarios'), usuarios)
    }

export const obtenerComentarios = async()=>{
    let comentarios:Comentario[] = []
    const querySnapshot = await getDocs(collection(db, 'comentarios'));
    querySnapshot.forEach((doc)=>{
        let comentario:Comentario={
            usuario:doc.data().usuario,
            partido:doc.data().partido,
            pais:doc.data().pais,
            comentario:doc.data().comentario,
            key:doc.id
        }
        comentarios.push(comentario)
    })
    return comentarios
}

export const obtenerComentario= async(key:string)=>{
    const docRef = doc(db, "comentarios", key);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let comentario:Comentario={
            usuario:docSnap.data().usuario,
            partido:docSnap.data().partido,
            pais:docSnap.data().pais,
            comentario:docSnap.data().comentario,
            key:docSnap.id
        };
     return comentario
    } else {
        return undefined
    }
}
export const actualizarComentario = async (id: string, comentario: Comentario) => {
    const usuarioRef = doc(db, 'comentarios', id);
    await updateDoc(usuarioRef, {
      usuario: comentario.usuario,
      partido: comentario.partido,
      pais: comentario.pais,
      comentario: comentario.comentario,
      key:comentario.key
    });

}

export const eliminarComentario = async(key:string) =>{
    const ref = doc(db,"comentarios",key);
    await deleteDoc (ref);
}

export const registrarComentario =async(comentarios:Comentario)=>{
    const docRef= await addDoc(collection(db,'comentarios'), comentarios)
   }