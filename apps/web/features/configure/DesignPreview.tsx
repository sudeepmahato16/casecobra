"use client";
import React, { FC, useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import { ArrowRight, Check } from "lucide-react";

import { Button, cn } from "@casecobra/ui";
import Phone from "@/components/Phone";

import { formatPrice } from "@/utils/helper";
import { BASE_PRICE, PRODUCT_PRICES } from "@/utils/config";
import { COLORS, MODELS } from "@/utils/constants";
import { Configuration } from "@/types";

interface DesignPreviewProps {
  configuration: Configuration;
}

const DesignPreview: FC<DesignPreviewProps> = ({ configuration }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  const { color, model, finish, material } = configuration;

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color
  )?.tw;

  const { label: modelLabel } = MODELS.options.find(
    ({ value }) => value === model
  )!;

  let totalPrice = BASE_PRICE;
  if (material === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;
  if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti
          active={showConfetti}
          config={{ elementCount: 200, spread: 90 }}
        />
      </div>

      <div className="mt-12 flex flex-col items-center md:grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="md:col-span-4 lg:px-12 lg:mt-6 md:row-span-2 lg:self-start md:row-end-2">
          <Phone
            className={cn(`bg-${tw}`, "max-w-[150px] md:max-w-full")}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>

        <div className="mt-6 sm:col-span-9 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {modelLabel} Case
          </h3>
          <div className="mt-3.5 flex items-center gap-3 text-base">
            <Check className="h-4 w-4 text-green-500" />
            In stock and ready to ship
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3.5 text-zinc-700 flex flex-col gap-3 list-inside">
                <li className="flex gap-3 items-center">
                  {" "}
                  <Check className="h-4 w-4 text-green-500" />
                  Wireless charging compatible
                </li>
                <li className="flex gap-3 items-center">
                  {" "}
                  <Check className="h-4 w-4 text-green-500" />
                  TPU shock absorption
                </li>
                <li className="flex gap-3 items-center">
                  {" "}
                  <Check className="h-4 w-4 text-green-500" />
                  Packaging made from recycled materials
                </li>
                <li className="flex gap-3 items-center">
                  {" "}
                  <Check className="h-4 w-4 text-green-500" />5 year print
                  warranty
                </li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3.5 text-zinc-700 list-inside flex flex-col gap-3">
                <li className="flex gap-3 items-center">
                  {" "}
                  <Check className="h-4 w-4 text-green-500" />
                  High-quality, durable material
                </li>
                <li className="flex gap-3 items-center">
                  {" "}
                  <Check className="h-4 w-4 text-green-500" />
                  Scratch- and fingerprint resistant coating
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-[15px]">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600">Base price</p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE / 100)}
                  </p>
                </div>

                {finish === "textured" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Textured finish</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.finish.textured / 100)}
                    </p>
                  </div>
                ) : null}

                {material === "polycarbonate" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Soft polycarbonate material</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate / 100)}
                    </p>
                  </div>
                ) : null}

                <div className="my-2 h-px bg-gray-200" />

                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900">Order total</p>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(totalPrice / 100)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pb-12">
              <Button className="px-4 sm:px-6 lg:px-8">
                Check out <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignPreview;
