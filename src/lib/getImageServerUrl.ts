
import { SERVER_URL } from "../consts";

export default function(image: string, collection?: string, convertTo?: "png" | "jpg" | "webp") {
  const url = new URL(SERVER_URL);
  if (collection) {
    url.pathname = `/files/${collection}`;
  } else {
    url.pathname = `/files`;
  }
  if (convertTo) {
    const lastDotIndex = image.lastIndexOf('.');
    if (lastDotIndex <= 0) throw new Error(`Expected to find a file extension in ${image}!`);
    const newName = image.substring(0, lastDotIndex) + '.' + convertTo;
    url.pathname = url.pathname.concat(newName);
  } else {
    url.pathname = url.pathname.concat(`/${image}`);
  }
  return url.toString();
}

