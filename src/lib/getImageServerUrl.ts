
import { SERVER_URL } from "../consts";

export default function(image: string, collection?: string, convertTo?: "png" | "jpg" | "webp") {
  const url = new URL(SERVER_URL);
  if (collection) {
    url.pathname = `/files/${collection}`;
  } else {
    url.pathname = `/files`;
  }
  url.searchParams.append("file_name", image);
  if (convertTo) {
    url.searchParams.append("convert_to", convertTo);
  } 
  return url.toString();
}

