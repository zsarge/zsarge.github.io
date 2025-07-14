import imageSizes from "../assets/image_sizes.json";
//
// Note that, due to programmer laziness, the getImageDimensions function expects
// file names to 1:1 correspond to image sizes.
// If there are two images with the same name and different sizes, there
// may be a wrong answer.

export interface ImageDimensions {
  width: number;
  height: number;
}

export function getImageDimensions(imageName: string): ImageDimensions | undefined {
  if (imageName in imageSizes) {
    const dimensions = imageSizes[imageName];
    if ("width" in dimensions && "height" in dimensions) {
      return dimensions;
    }
  }
  return undefined;
}

