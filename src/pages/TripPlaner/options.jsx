
export const TravelOptions = [
  {
    id: 1,
    title: "Just Me",
    icon: "✈️",
    people: '1',
    desc: "Solo adventure, just you and the world!"
  },
  {
    id: 2,
    title: "Couple",
    icon: "💑",
    people: '2',
    desc: "A romantic getaway for two 💕"
  },
  {
    id: 3,
    title: "Family",
    icon: "👨‍👩‍👧‍👧",
    people: '3+',
    desc: "Fun times with the whole fam!"
  },
  {
    id: 4,
    title: "Friends",
    icon: "🎉",
    people: '4+',
    desc: "Adventures are better with friends!"
  },
];

export const BudgetOptions = [
  {
    id: 1,
    title: "Budget",
    icon: "💸",
    price: "0-25000",
    desc: "Smart and simple - save while you explore!"
  },
  {
    id: 2,
    title: "Moderate",
    icon: "💳",
    price:"25000-75000",
    desc: "A balanced trip - comfort without splurging."
  },
  {
    id: 3,
    title: "Luxury",
    icon: "💎",
    price:"75000+",
    desc: "Treat yourself to the finer things in travel!"
  },
];

export const AI_Prompt = `Plan a personalized travel itinerary for a trip to {{LOCATION}} for {{DAYS}} days. 
The trip is for {{PEOPLE}} people, with a {{BUDGET}} budget range ({{PRICE}} INR).

Return the result in **JSON format only**, structured as follows:

{
  "tripName": string,
  "traveler": string,
  "budget": string,
  "itinerary": [
    {
      "day": number,
      "location": string,
      "description": string,
      "activities": [
        {
          "name": string,
          "type": string,
          "description": string
        }
      ],
      "food": {
        "breakfast": string,
        "lunch": string,
        "dinner": string
      },
      "hiddenGem": string,
      "travelTip": string
    }
  ],
  "notes": string,
  "disclaimer": string
}

Important:
- Do NOT include any image URLs in the response.
- Only return activity names and food items in plain text. I will fetch matching images programmatically in my app.
- Avoid using placeholder text like "image: null" or "image: [insert image here]".

The destination is: **{{LOCATION}}**
Days: **{{DAYS}}**
Number of People: **{{PEOPLE}}**
Budget Range: **{{BUDGET}}**
`
