import { ManagepProducts } from "../../Api";
import React, { useEffect } from "react";


function generateRandomNames(numNames) {
    const adjectives = [
      "Aqua", "Blue", "Bright", "Bold", "Clear", "Crystal", "Deep", "Eclipse", "Golden", "Luminous",
      "Radiant", "Shiny", "Soft", "Vivid", "Mystic", "Pure", "Serene", "Fresh", "Glowing", "Dark",
      "Soft", "Silent", "Crystal", "Vibrant", "Sleek", "Brilliant", "Dazzling", "Elegant", "Lush",
      "Majestic", "Calm", "Whispering", "Misty", "Bright", "Smooth", "Shimmering", "Frosted", "Charming"
    ];
  
    const nouns = [
      "Bloom", "Bliss", "Wave", "Spark", "Dew", "Rain", "Mist", "Storm", "Flare", "Sparkle",
      "Flame", "Cure", "Vibe", "Zen", "Glow", "Shine", "Storm", "Breeze", "Wave", "Glow", "Whisper",
      "Touch", "Splash", "Breeze", "Rush", "Blaze", "Tide", "Whirl", "Twist", "Burst", "Edge", 
      "Gleam", "Glimmer", "Haze", "Vibe", "Echo", "Twilight", "Dusk", "Dream", "Aura", "Glow",
      "Shine", "Frost", "Flare", "Chime", "Burst", "Snap", "Lush", "Flash", "Glimpse", "Dawn",
      "Flicker", "Ember", "Charm", "Pine", "Whirlwind", "Rays", "Zenith", "Dewdrop", "Lumen"
    ];
  
    const names = [];
  
    for (let i = 0; i < numNames; i++) {
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      const name = `${adjective}${noun}`;
      names.push(name);
    }
  
    return names;
  }


const productNames = generateRandomNames(100000);

const BulkInsertProducts = () => {
  const submitAllProducts = async () => {
    const payloads = generatePayloads();

    for (const payload of payloads) {
      try {
        const data = await ManagepProducts(payload);

        if (data.isDataSet) {
          console.log(`✅ ${payload.productName} - ${data.msg}`);
        } else {
          console.warn(`❌ Failed to add ${payload.productName}`);
        }
      } catch (err) {
        console.error(`🔥 Error adding ${payload.productName}:`, err);
      }

      await new Promise((res) => setTimeout(res, 100));
    }
  };

  const generatePayloads = () => {
    return productNames.map((productName, i) => ({
      productName,
      category_id: "1",
      units_id: "1",
      brand_name_id: "1",
      sku: `178${i}`,
      subProducts: [
        {
          code: `${70000 + i}`,
          barcode: `${productName.toLowerCase()}_b1`,
          stocks: [
            {
              cost: 4,
              expireDate: "2025-07-10T18:30:00.000Z",
              qty: 4,
              retailPrice: 4,
              wholesalePrice: 3.6,
            },
            {
              cost: 4,
              expireDate: "2025-07-10T18:30:00.000Z",
              qty: 6,
              retailPrice: 4,
              wholesalePrice: 3.5,
            },
          ],
        },
        {
          code: `${80000 + i}`,
          barcode: `${productName.toLowerCase()}_b2`,
          stocks: [
            {
              cost: 4,
              expireDate: "2025-07-10T18:30:00.000Z",
              qty: 5,
              retailPrice: 3.8,
              wholesalePrice: 3.4,
            },
            {
              cost: 4,
              expireDate: "2025-07-10T18:30:00.000Z",
              qty: 7,
              retailPrice: 4.2,
              wholesalePrice: 3.7,
            },
          ],
        },
      ],
      userId: "14",
    }));
  };

  return (
    <div>
      <button
        onClick={() => {
          submitAllProducts();
        }}
      >
        click for insert product bulk
      </button>
    </div>
  );
};

export default BulkInsertProducts;
