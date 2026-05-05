import { collection, getDocs } from "firebase/firestore";
import * as firebase from "./firebase";

export interface Product {
 id: string;
 name: string;
 category: string;
 description: string;
 price: number;
 // rating: number; // TODO: delete
 //reviewCount: number; // TODO: delete
 section: string;
 image: string;
 thumbnails: string[];
}

export interface Category {
 id: string;
 name: string;
 image: string;
 products: Product[];
}

export interface User {
 id: number;
 email: string;
 username: string;
 role: 'admin' | 'user';
}

const productsRef = collection(firebase.db, "products");
const categoriesRef = collection(firebase.db, "categories");

const productsDocs = await getDocs(productsRef);
const categoriesDocs = await getDocs(categoriesRef);

export const products: Product[] = productsDocs.docs.map((p) => {
 const data = p.data();
 return {
  id: p.id,
  name: data.name,
  category: data.category,
  description: data.description,
  price: data.price,
  rating: data.rating,
  reviewCount: data.reviewCount,
  image: data.imageUrl,
  section: data.section ?? "explore",
  thumbnails: data.thumbnails ?? [],
 }
});

export const categories: Category[] = categoriesDocs.docs.map((c) => {
 const data = c.data();
 return {
  id: c.id,
  name: data.name,
  image: data.iconPath,
  products: products.filter((p) => p.category?.toLowerCase() === data.name?.toLowerCase()),
 }
});


