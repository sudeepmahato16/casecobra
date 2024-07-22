import { db, Order } from "@casecobra/db";
import { BASE_PRICE, CLIENT_BASE_URL, PRODUCT_PRICES } from "@/config";
import AppError from "@/utils/appError";
import { catchAsync } from "@/utils/catchAsync";
import { stripe } from "@/lib/stripe";

export const createCheckoutSession = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) return next(new AppError("Id not found!", 404));

  const configuration = await db.configuration.findUnique({
    where: {
      id,
    },
  });

  if (!configuration)
    return next(new AppError("Configuration not found!", 404));

  if (!req.user) return next(new AppError("Unauthorized", 401));

  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  if (!user) return next(new AppError("User not found", 404));

  const { finish, material } = configuration;

  let price = BASE_PRICE;
  if (finish === "textured") price += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    price += PRODUCT_PRICES.material.polycarbonate;

  let order: Order | undefined = undefined;

  const existingOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      configurationId: configuration.id,
    },
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.order.create({
      data: {
        amount: price / 100,
        userId: user.id,
        configurationId: configuration.id,
      },
    });
  }

  const product = await stripe.products.create({
    name: "Custom iPhone Case",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: price,
    },
  });

  const stripeSession = await stripe.checkout.sessions.create({
    success_url: `${CLIENT_BASE_URL}/thank-you?orderId=${order.id}`,
    cancel_url: `${CLIENT_BASE_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card", "klarna"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["DE", "US", "NP", "CH", "BH", "AU"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [{ price: product.default_price as string, quantity: 1 }],
  });

  res.status(201).json({
    status: "success",
    data: {
      session: {
        url: stripeSession.url,
      },
    },
  });
});
