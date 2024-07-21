"use client";
import React, { FC } from "react";
import Image from "next/image";
import { Rnd } from "react-rnd";

import { AspectRatio, cn } from "@casecobra/ui";
import HandleComponent from "./HandleComponent";

interface ImageAdjusterProps {
  imageUrl: string;
  imageDimensions: { width: number; height: number };
  color: string;
}

const ImageAdjuster: FC<ImageAdjusterProps> = ({
  imageDimensions,
  imageUrl,
  color,
}) => {
  return (
    <div className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
      <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
        <AspectRatio className="pointer-events-none relative z-50 aspect-[896/1831] w-full">
          <Image
            fill
            alt="phone image"
            src="/phone-template.png"
            className="pointer-events-none z-50 select-none"
          />
        </AspectRatio>
        <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
        <div
          className={cn(
            "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
            color
          )}
        />
      </div>

      <Rnd
        default={{
          x: 105,
          y: 205,
          width: imageDimensions.width / 4,
          height: imageDimensions.height / 4,
        }}
        lockAspectRatio
        className="absolute z-20 border-[3px] border-primary"
        resizeHandleComponent={{
          bottomRight: <HandleComponent />,
          bottomLeft: <HandleComponent />,
          topRight: <HandleComponent />,
          topLeft: <HandleComponent />,
        }}
      >
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            fill
            sizes="100vw"
            alt="your image"
            className="pointer-events-none"
          />
        </div>
      </Rnd>
    </div>
  );
};

export default ImageAdjuster;
