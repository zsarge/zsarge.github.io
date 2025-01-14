import { StlViewer, type StlViewerProps } from "react-stl-viewer";
import { BASE_URL } from "../consts";
import { styled } from "styled-components";

export interface AnnotatedStlProps extends StlViewerProps {
  name: string;
  /**
   * css value for the height
   */
  height?: string;
}

export function getIdFromPathName(url: string): string {
  return url.substring(url.lastIndexOf("/") + 1).replaceAll(".", "-");
}

export default function ({ name, height, url, ...rest }: AnnotatedStlProps) {
  height ??= "20em";
  const canvasId = getIdFromPathName(url);

  let presetHeight = name ? "5em" : "2em"; // we set the preset height to avoid layout-shift when the file loads

  return (
    <div style={{ height: `calc(${height} + ${presetHeight})` }}>
      <style>{`
        #${canvasId} {
          height: ${height} !important;
        }
      `}</style>
      {name && <h2 className="text-center">{name}</h2>}

      <div className="shadow-2xl">
        <StlViewer url={url} orbitControls shadows canvasId={canvasId} {...rest} />
      </div>

      <div className="text-center py-5">
        <a href={url} target="_blank">
          Download File
        </a>
      </div>
    </div>
  );
}
