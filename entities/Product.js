{
  "name": "Product",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "title": "\u0646\u0627\u0645 \u0645\u062d\u0635\u0648\u0644"
    },
    "name_en": {
      "type": "string",
      "title": "English Name"
    },
    "slug": {
      "type": "string",
      "title": "\u0634\u0646\u0627\u0633\u0647 \u06cc\u06a9\u062a\u0627"
    },
    "category": {
      "type": "string",
      "enum": [
        "marble",
        "onyx",
        "granite",
        "travertine",
        "luxury_slab"
      ],
      "title": "\u062f\u0633\u062a\u0647\u200c\u0628\u0646\u062f\u06cc"
    },
    "description": {
      "type": "string",
      "title": "\u062a\u0648\u0636\u06cc\u062d\u0627\u062a"
    },
    "origin": {
      "type": "string",
      "title": "\u0645\u062d\u0644 \u0627\u0633\u062a\u062e\u0631\u0627\u062c"
    },
    "color": {
      "type": "string",
      "title": "\u0631\u0646\u06af"
    },
    "finish_types": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "title": "\u0646\u0648\u0639 \u0641\u0631\u0622\u0648\u0631\u06cc"
    },
    "available_sizes": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "title": "\u0627\u0628\u0639\u0627\u062f \u0645\u0648\u062c\u0648\u062f"
    },
    "applications": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "title": "\u06a9\u0627\u0631\u0628\u0631\u062f\u0647\u0627"
    },
    "water_absorption": {
      "type": "string",
      "title": "\u062c\u0630\u0628 \u0622\u0628"
    },
    "compressive_strength": {
      "type": "string",
      "title": "\u0645\u0642\u0627\u0648\u0645\u062a \u0641\u0634\u0627\u0631\u06cc"
    },
    "density": {
      "type": "string",
      "title": "\u0686\u06af\u0627\u0644\u06cc"
    },
    "processing": {
      "type": "string",
      "title": "\u0641\u0631\u0622\u0648\u0631\u06cc"
    },
    "image": {
      "type": "string",
      "title": "\u062a\u0635\u0648\u06cc\u0631 \u0627\u0635\u0644\u06cc"
    },
    "gallery": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "title": "\u06af\u0627\u0644\u0631\u06cc \u062a\u0635\u0627\u0648\u06cc\u0631"
    },
    "installed_image": {
      "type": "string",
      "title": "\u062a\u0635\u0648\u06cc\u0631 \u0646\u0635\u0628 \u0634\u062f\u0647"
    },
    "price_range": {
      "type": "string",
      "title": "\u0645\u062d\u062f\u0648\u062f\u0647 \u0642\u06cc\u0645\u062a"
    },
    "in_stock": {
      "type": "boolean",
      "title": "\u0645\u0648\u062c\u0648\u062f",
      "default": true
    },
    "featured": {
      "type": "boolean",
      "title": "\u0648\u06cc\u0698\u0647",
      "default": false
    },
    "sort_order": {
      "type": "number",
      "title": "\u062a\u0631\u062a\u06cc\u0628 \u0646\u0645\u0627\u06cc\u0634",
      "default": 0
    }
  },
  "required": [
    "name",
    "category"
  ]
}