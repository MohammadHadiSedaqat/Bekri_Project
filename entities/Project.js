{
  "name": "Project",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "title": "\u0639\u0646\u0648\u0627\u0646 \u067e\u0631\u0648\u0698\u0647"
    },
    "slug": {
      "type": "string",
      "title": "\u0634\u0646\u0627\u0633\u0647 \u06cc\u06a9\u062a\u0627"
    },
    "location": {
      "type": "string",
      "title": "\u0645\u0648\u0642\u0639\u06cc\u062a"
    },
    "architect": {
      "type": "string",
      "title": "\u0645\u0639\u0645\u0627\u0631"
    },
    "area": {
      "type": "string",
      "title": "\u0645\u062a\u0631\u0627\u0698"
    },
    "stones_used": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "title": "\u0633\u0646\u06af\u200c\u0647\u0627\u06cc \u0627\u0633\u062a\u0641\u0627\u062f\u0647 \u0634\u062f\u0647"
    },
    "description": {
      "type": "string",
      "title": "\u062f\u0627\u0633\u062a\u0627\u0646 \u067e\u0631\u0648\u0698\u0647"
    },
    "hero_image": {
      "type": "string",
      "title": "\u062a\u0635\u0648\u06cc\u0631 \u0627\u0635\u0644\u06cc"
    },
    "gallery": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "title": "\u06af\u0627\u0644\u0631\u06cc"
    },
    "year": {
      "type": "string",
      "title": "\u0633\u0627\u0644"
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