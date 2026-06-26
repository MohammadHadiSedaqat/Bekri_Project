{
  "name": "BlogPost",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "title": "\u0639\u0646\u0648\u0627\u0646"
    },
    "slug": {
      "type": "string",
      "title": "\u0634\u0646\u0627\u0633\u0647 \u06cc\u06a9\u062a\u0627"
    },
    "excerpt": {
      "type": "string",
      "title": "\u062e\u0644\u0627\u0635\u0647"
    },
    "content": {
      "type": "string",
      "title": "\u0645\u062d\u062a\u0648\u0627"
    },
    "cover_image": {
      "type": "string",
      "title": "\u062a\u0635\u0648\u06cc\u0631 \u06a9\u0627\u0648\u0631"
    },
    "category": {
      "type": "string",
      "enum": [
        "buying_guide",
        "comparison",
        "trends",
        "projects",
        "maintenance"
      ],
      "title": "\u062f\u0633\u062a\u0647\u200c\u0628\u0646\u062f\u06cc"
    },
    "read_time": {
      "type": "number",
      "title": "\u0632\u0645\u0627\u0646 \u0645\u0637\u0627\u0644\u0639\u0647 (\u062f\u0642\u06cc\u0642\u0647)"
    },
    "featured": {
      "type": "boolean",
      "title": "\u0648\u06cc\u0698\u0647",
      "default": false
    }
  },
  "required": [
    "title"
  ]
}