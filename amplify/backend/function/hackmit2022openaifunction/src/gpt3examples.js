const gpt3examples = [
  [
    "Hello World button",
    '<button style="padding: 12px 24px; border: 1px solid lightgray; background-color: whitesmoke; border-radius: 4px; font-size: 14px; color: black; font-weight: normal;">Hello World</button>',
  ],
  [
    "pink button that says Banana with white text color",
    '<button style="padding: 12px 24px; border: 1px solid lightgray; background-color: pink; border-radius: 4px; font-size: 12px; color: white; font-weight: normal;">Banana</button>',
  ],
  [
    "Large Google Pixel button with no background",
    '<button style="padding: 12px 24px; border: 1px solid lightgray; background-color: transparent; border-radius: 4px; font-size: 24px; color: black; font-weight: normal;">Google Pixel</button>',
  ],
  [
    "red square",
    '<div style="width: 100px; height: 100px; background-color: #f87171;"></div>',
  ],
  [
    "orange rectangle",
    '<div style="width: 200px; height: 100px; background-color: #fb923c;"></div>',
  ],
  [
    "paragraph that says I like apples",
    '<p style="color: black; font-size: 14px;">I like apples</p>',
  ],
  [
    "large text that says Black Circle in blue",
    '<span style="color: #60a5fa; font-size: 24px;">Black Circle</span>',
  ],
  [
    "Air-Conditioner in brown color",
    '<span style="color: brown;">Air-Conditioner</span>',
  ],
  ["My birthday is coming up soon!", "<p>My birthday is coming up soon!</p>"],
  [
    "text that says Google and links to https://www.google.com/",
    '<a href="https://www.google.com/" target="_blank" style="color: black; text-decoration: none;">Google</a>',
  ],
  [
    "FACEBOOK and links to https://www.facebook.com/",
    '<a href="https://www.facebook.com/" target="_blank" style="color: black; text-decoration: none;">FACEBOOK</a>',
  ],
  [
    '<div style="width: 1024px; height: 200px; background-color: darkslategray;" />',
    '<div style="width: 1024px; height: 200px; background-color: darkslategray;" />',
  ],
  [
    '<input type="submit" value="Submit!"></input>',
    '<input type="submit" value="Submit!"></input>',
  ],
  [
    "table that says Fruits, Apple, Lime, Blueberries in the first column and Color, Red, Green, Blue in the second column",
    '<table style="width: 250px; border-collapse: collapse; border: 1px solid black; text-align: center;"><tr><th>Fruits</th><th>Color</th></tr><tr><td>Apple</td><td>Red</td></tr><tr><td>Lime</td><td>Green</td></tr><tr><td>Blueberries</td><td>Blue</td></tr></table>',
  ],
];

module.exports = {
  gpt3examples: gpt3examples,
};
