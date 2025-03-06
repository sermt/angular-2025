import Gif from "../interfaces/gif.interface";
import {  GiphyResponse } from "../interfaces/giphy.interfaces";

export function GiphyResponseToGifs(response: GiphyResponse): Gif[] {
 return response.data.map(gif => {
   return {
     id: gif.id,
     url: gif.images.original.url,
     title: gif.title,
   };
 });
}
