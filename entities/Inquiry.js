{
  "name": "Inquiry",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "title": "\u0646\u0627\u0645"
    },
    "phone": {
      "type": "string",
      "title": "\u0634\u0645\u0627\u0631\u0647 \u062a\u0645\u0627\u0633"
    },
    "email": {
      "type": "string",
      "title": "\u0627\u06cc\u0645\u06cc\u0644"
    },
    "type": {
      "type": "string",
      "enum": [
        "price_request",
        "consultation",
        "sample_request",
        "general"
      ],
      "title": "\u0646\u0648\u0639 \u062f\u0631\u062e\u0648\u0627\u0633\u062a"
    },
    "product_name": {
      "type": "string",
      "title": "\u0646\u0627\u0645 \u0645\u062d\u0635\u0648\u0644"
    },
    "message": {
      "type": "string",
      "title": "\u067e\u06cc\u0627\u0645"
    },
    "description": {
      "type": "string",
      "title": "\u062a\u0648\u0636\u06cc\u062d\u0627\u062a",
      "maxLength": 1000
    },
    "status": {
      "type": "string",
      "enum": [
        "new",
        "in_progress",
        "completed"
      ],
      "title": "\u0648\u0636\u0639\u06cc\u062a",
      "default": "new"
    }
  },
  "required": [
    "name",
    "phone"
  ]
}