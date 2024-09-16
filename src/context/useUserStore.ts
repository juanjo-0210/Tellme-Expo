import { ICountry } from "react-native-international-phone-number";
import { create } from "zustand"

type Store = {
  userId: string;
  userName: string | null; 
  photo: string | null; 
  phoneNumber: string;
  region: ICountry | null;
  token: string | null;
  setUserId: (id: string ) => void;
  setUserName: (name: string | undefined) => void;
  setPhoto: (url: string | undefined) => void;
  setPhoneNumber: (number: string | undefined) => void;
  setRegion: (code: ICountry | null) => void;
  setToken: (token: string | null) => void;
}
export const useUserStore = create<Store>()((set) => ({
  userId: "",
  userName: "",
  photo: "",
  phoneNumber: "",
  region: null,
  token: "",
  setUserId: (id) => set( () => ({userId: id})),
  setUserName: (name) => set( () => ({userName: name})),
  setPhoto: (url) => set( () => ({photo: url})),
  setPhoneNumber: (number) => set( () => ({phoneNumber: number})),
  setRegion: (code) => set( () => ({region: code})),
  setToken: (token) => set( () => ({token: token})),
}))