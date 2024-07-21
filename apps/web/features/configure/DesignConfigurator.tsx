"use client";
import React, { FC, useState } from "react";

import ImageAdjuster from "./ImageAdjuster";
import CaseCustomizationOptions from "./CaseCustomizationOptions";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/utils/constants";

interface DesignConfiguratorProps {
  configId: string;
  imageDimensions: {
    width: number;
    height: number;
  };
  imageUrl: string;
}

export type Options = {
  color: (typeof COLORS)[number];
  model: (typeof MODELS.options)[number];
  material: (typeof MATERIALS.options)[number];
  finish: (typeof FINISHES.options)[number];
};

const DesignConfigurator: FC<DesignConfiguratorProps> = ({
  configId,
  imageDimensions,
  imageUrl,
}) => {
  const [options, setOptions] = useState<Options>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });
  console.log(configId);
  return (
    <div className="relative mt-12 grid grid-cols-1 lg:grid-cols-3 mb-16 pb-16">
      <ImageAdjuster
        color={`bg-${options.color.tw}`}
        imageDimensions={imageDimensions}
        imageUrl={imageUrl}
      />
      <CaseCustomizationOptions options={options} setOptions={setOptions} />
    </div>
  );
};

export default DesignConfigurator;

// bg-blue-950 border-blue-950
// bg-zinc-900 border-zinc-900
// bg-rose-950 border-rose-950
